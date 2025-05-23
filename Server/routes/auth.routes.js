import express from 'express';
import { registerUser, loginUser, googleAuth, forgotPassword, verifyResetToken, resetPassword, changePassword } from '../controllers/auth.controllers.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 10 * 1000,
  max: 2,
  keyGenerator: (req) => {
    const ip = req.headers['fly-client-ip'] || req.ip;
    console.log('\n=== ALL client IP INFO ===');
    console.log('req.ip:', req.ip);
    console.log('fly-client-ip:', req.headers['fly-client-ip']);
    console.log('x-forwarded-for:', req.headers['x-forwarded-for']);
    console.log('x-real-ip:', req.headers['x-real-ip']);
    console.log('cf-connecting-ip:', req.headers['cf-connecting-ip']);
    console.log('==================\n')
    return ip;
  },
  handler: (req, res) => {
    const retryAfter = Math.ceil((req.rateLimit.resetTime - new Date()) / 1000);
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

