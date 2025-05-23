import express from 'express';
import { getNotes, getTags, createNote, updateNote, deleteNote } from '../controllers/notes.controllers.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

const spamActionLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 20,
  keyGenerator: req => req.email || req.headers['fly-client-ip'] || req.ip,
  handler: (req, res) => {
    res.status(429).json({ message: 'Too many actions, slow down.' });
  },
  standardHeaders: true,
  legacyHeaders: false,
});


//feels overkill to make routes,controller etc for a single tag related function so i'm putting it here
router.get('/tags', verifyToken, getTags);

router.get('/', verifyToken, getNotes);
router.post('/', verifyToken, spamActionLimiter, createNote);
router.patch('/:id', verifyToken, spamActionLimiter, updateNote);
router.delete('/:id', verifyToken, spamActionLimiter, deleteNote);

export default router;
