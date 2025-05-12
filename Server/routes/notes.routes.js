import express from 'express';
import { getNotes, getTags, createNote, updateNote, deleteNote } from '../controllers/notes.controllers.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

//feels overkill to make routes,controller etc for a single tag related function so i'm putting it here
router.get('/tags', verifyToken, getTags);

router.get('/', verifyToken, getNotes);
router.post('/', verifyToken, createNote);
router.patch('/:id', verifyToken, updateNote);
router.delete('/:id', verifyToken, deleteNote);

export default router;
