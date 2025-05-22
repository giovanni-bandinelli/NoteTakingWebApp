import pool from '../config/db.js';

export async function findUserByEmail(email) {
  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return rows[0];
}

export async function createUser(email, hashedPassword) {
  const { rows } = await pool.query(
    'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
    [email, hashedPassword]
  );
  return rows[0];
}

export async function updateUserPassword(email, hashedPassword) {
  const { rows } = await pool.query(
    'UPDATE users SET password = $1 WHERE email = $2 RETURNING *',
    [hashedPassword, email]
  );
  return rows[0];
}

export async function createGoogleUser(email) {
  const { rows } = await pool.query(
    "INSERT INTO users (email, password, provider) VALUES ($1, '', 'google') RETURNING *",
    [email]
  );
  return rows[0];
}

export async function getFontByEmail(email) {
  const { rows } = await pool.query('SELECT font FROM users WHERE email = $1', [email]);
  return rows[0]?.font || 'sans-serif';
}

export async function updateFontByEmail(email, font) {
  await pool.query('UPDATE users SET font = $1 WHERE email = $2', [font, email]);
}

export async function getThemeByEmail(email) {
  const { rows } = await pool.query('SELECT theme FROM users WHERE email = $1', [email]);
  return rows[0]?.theme || 'system';
}

export async function updateThemeByEmail(email, theme) {
  await pool.query('UPDATE users SET theme = $1 WHERE email = $2', [theme, email]);
}

export async function getUserProfileData(email) {
  const userRes = await pool.query(
    'SELECT id, email, theme, font FROM users WHERE email = $1',
    [email]
  );

  const user = userRes.rows[0];
  if (!user) return null;

  const tagsRes = await pool.query(`
    SELECT DISTINCT tags.name
    FROM tags 
    JOIN note_tags ON note_tags.tag_id = tags.id
    WHERE tags.user_id = $1`,
    [user.id]
  );

  return {
    user: {
      email: user.email,
      theme: user.theme,
      font: user.font
    },
    tags: tagsRes.rows.map(r => r.name)
  };
}
