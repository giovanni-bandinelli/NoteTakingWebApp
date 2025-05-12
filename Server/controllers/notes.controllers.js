import {getUserIdByEmail, getTagsByEmail, getFilteredNotes,upsertTag,linkNoteTag,deleteNoteTags,
  createNote as createNoteModel,
  updateNote as updateNoteModel,
  deleteNote as deleteNoteModel,
} from '../models/notes.model.js';

// GET /tags
export async function getTags(req, res) {
  try {
    const tags = await getTagsByEmail(req.email);
    res.status(200).json({ tags });
  } catch (err) {
    console.error('Error fetching tags:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

// GET /notes
export async function getNotes(req, res) {
  const { email } = req;
  const { archived, tag, search } = req.query;

  try {
    const userId = await getUserIdByEmail(email);
    if (!userId) return res.status(404).json({ message: 'User not found' });

    const rows = await getFilteredNotes({ userId, archived, tag, search });

    const notesMap = new Map();
    for (const row of rows) {
      const note = notesMap.get(row.note_id) || {
        id: row.note_id,
        title: row.title,
        content: row.content,
        archived: row.archived,
        created_at: row.created_at,
        date: row.last_edited,
        tags: [],
      };
      if (row.tag) note.tags.push(row.tag);
      notesMap.set(row.note_id, note);
    }

    res.json(Array.from(notesMap.values()));
  } catch (err) {
    console.error('Error fetching notes with tags:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

// POST /notes
export async function createNote(req, res) {
  const { email } = req;
  const { title, content = '', tags = [], archived = false } = req.body;

  try {
    const userId = await getUserIdByEmail(email);
    if (!userId) return res.status(404).json({ message: 'User not found' });

    const note = await createNoteModel({ userId, title, content, archived });

    for (const tagName of tags) {
      const tagId = await upsertTag(userId, tagName);
      await linkNoteTag(note.id, tagId);
    }

    res.status(201).json(note);
  } catch (err) {
    console.error('Error creating note:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

// PATCH /notes/:id
export async function updateNote(req, res) {
  const { email } = req;
  const { id } = req.params;
  const { title, content, tags, archived } = req.body;

  try {
    const userId = await getUserIdByEmail(email);
    const updated = await updateNoteModel({ userId, noteId: id, title, content, archived });

    if (!updated) return res.status(404).json({ message: 'Note not found' });

    if (tags) {
      await deleteNoteTags(id);
      for (const tagName of tags) {
        const tagId = await upsertTag(userId, tagName);
        await linkNoteTag(id, tagId);
      }
    }

    res.json(updated);
  } catch (err) {
    console.error('Error updating note:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

// DELETE /notes/:id
export async function deleteNote(req, res) {
  const { email } = req;
  const { id } = req.params;

  try {
    const userId = await getUserIdByEmail(email);
    const rowCount = await deleteNoteModel(userId, id);

    if (rowCount === 0) return res.status(404).json({ message: 'Note not found' });

    res.status(204).end();
  } catch (err) {
    console.error('Error deleting note:', err);
    res.status(500).json({ message: 'Server error' });
  }
}
