import express from 'express';
import { getFont, updateFont, getTheme, updateTheme } from '../controllers/user.controllers.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

const spamActionLimiter = rateLimit({
  windowMs: 10 * 1000,
  max: 2,
  handler: (req, res) => {
    res.status(429).json({ message: `Too many requests, slow down.` });
  },
  standardHeaders: true,
  legacyHeaders: false
  } 
);

router.get('/font', verifyToken, getFont);
router.post('/font', verifyToken, spamActionLimiter, updateFont);

router.get('/theme', verifyToken, getTheme);
router.post('/theme', verifyToken, spamActionLimiter, updateTheme);

export default router;
