import express from 'express';
import { registerUser, loginUser, googleAuth, forgotPassword, verifyResetToken, resetPassword, changePassword } from '../controllers/auth.controllers.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 3 * 60 * 1000,
  max: 10, 
  keyGenerator: req => req.headers['fly-client-ip'],//same as doing req.headers['x-forwarded-for']?.split(',')[0] if hosting somewhere else
  handler: (req, res) => {
    const retryAfter = Math.ceil((req.rateLimit.resetTime - Date.now()) / 1000);
    res.status(429).json({ message: `Too many requests, try again in ${retryAfter} seconds.` });
  },
  standardHeaders: true,
  legacyHeaders: false,
});



router.post('/register', authLimiter, registerUser);
router.post('/login', authLimiter, loginUser);
router.post('/forgot-password', authLimiter, forgotPassword);
router.post('/reset-password', authLimiter, resetPassword);
router.post('/change-password', authLimiter, changePassword);

router.post('/google-login', googleAuth);
router.get('/verify-reset-token', verifyResetToken);
// Root webapp route protected with JWT
router.get('/verify', verifyToken, (req, res) => {
  res.json({ message: 'Token is valid', email: req.email });
});

export default router;

