import express from 'express';
import { getFont, updateFont, getTheme, updateTheme } from '../controllers/user.controllers.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

const spamActionLimiter = rateLimit({
  windowMs: 10 * 1000,
  max: 3,
  handler: (req, res) => {
    res.status(429).json({ message: 'Too many actions, slow down.' });
  }
});

router.get('/font', verifyToken, getFont);
router.post('/font', verifyToken, spamActionLimiter, updateFont);

router.get('/theme', verifyToken, getTheme);
router.post('/theme', verifyToken, spamActionLimiter, updateTheme);

export default router;
