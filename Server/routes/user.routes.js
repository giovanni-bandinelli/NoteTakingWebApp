import express from 'express';
import { getFont, updateFont, getTheme, updateTheme } from '../controllers/user.controllers.js';
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

router.get('/font', verifyToken, getFont);
router.post('/font', verifyToken, spamActionLimiter, updateFont);

router.get('/theme', verifyToken, getTheme);
router.post('/theme', verifyToken, spamActionLimiter, updateTheme);

export default router;
