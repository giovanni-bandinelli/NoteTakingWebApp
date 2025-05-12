import pool from '../config/db.js';

export async function getUserIdByEmail(email) {
  const { rows } = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
  return rows[0]?.id;
}

export async function getTagsByEmail(email) {
  const { rows } = await pool.query(`
    SELECT DISTINCT t.name
    FROM tags t
    INNER JOIN users u ON t.user_id = u.id
    INNER JOIN note_tags nt ON t.id = nt.tag_id
    INNER JOIN notes n ON nt.note_id = n.id
    WHERE u.email = $1
    ORDER BY t.name
  `, [email]);

  return rows.map(r => r.name);
}

export async function getFilteredNotes({ userId, archived, tag, search }) {
  const values = [userId];
  const conditions = [];
  let paramIndex = 2;

  let query = `
    SELECT n.id AS note_id, n.title, n.archived, n.content, n.created_at, n.last_edited, t.name AS tag
    FROM notes n
    LEFT JOIN note_tags nt ON n.id = nt.note_id
    LEFT JOIN tags t ON nt.tag_id = t.id
    WHERE n.user_id = $1
  `;

  if (archived === 'true') {
    conditions.push(`n.archived = true`);
  } else if (archived === 'false') {
    conditions.push(`n.archived = false`);
    if (tag) {
      conditions.push(`t.name = $${paramIndex}`);
      values.push(tag);
      paramIndex++;
    } else if (search) {
      conditions.push(`(
        n.title ILIKE $${paramIndex} OR 
        n.content ILIKE $${paramIndex} OR
        n.id IN (
          SELECT note_id FROM note_tags nt 
          JOIN tags t ON nt.tag_id = t.id 
          WHERE t.name ILIKE $${paramIndex}
        )
      )`);
      values.push(`%${search}%`);
      paramIndex++;
    }
  }

  if (conditions.length > 0) {
    query += ` AND ${conditions.join(' AND ')}`;
  }

  query += ' ORDER BY n.last_edited DESC';

  const { rows } = await pool.query(query, values);
  return rows;
}

export async function createNote({ userId, title, content, archived }) {
  const { rows } = await pool.query(`
    INSERT INTO notes (user_id, title, content, archived)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `, [userId, title, content, archived]);
  return rows[0];
}

export async function upsertTag(userId, tagName) {
  const { rows } = await pool.query(`
    INSERT INTO tags (user_id, name)
    VALUES ($1, $2)
    ON CONFLICT (user_id, name) DO UPDATE SET name = EXCLUDED.name
    RETURNING id
  `, [userId, tagName]);
  return rows[0].id;
}

export async function linkNoteTag(noteId, tagId) {
  await pool.query(`
    INSERT INTO note_tags (note_id, tag_id)
    VALUES ($1, $2)
    ON CONFLICT DO NOTHING
  `, [noteId, tagId]);
}

export async function updateNote({ userId, noteId, title, content, archived }) {
  const { rows } = await pool.query(`
    UPDATE notes SET
      title = COALESCE($1, title),
      content = COALESCE($2, content),
      archived = COALESCE($3, archived),
      last_edited = NOW()
    WHERE id = $4 AND user_id = $5
    RETURNING *
  `, [title, content, archived, noteId, userId]);
  return rows[0];
}

export async function deleteNoteTags(noteId) {
  await pool.query('DELETE FROM note_tags WHERE note_id = $1', [noteId]);
}

export async function deleteNote(userId, noteId) {
  const result = await pool.query('DELETE FROM notes WHERE id = $1 AND user_id = $2', [noteId, userId]);
  return result.rowCount;
}
