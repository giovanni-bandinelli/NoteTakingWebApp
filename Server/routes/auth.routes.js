import express from 'express';
import { registerUser, loginUser, googleAuth, forgotPassword, verifyResetToken, resetPassword, changePassword } from '../controllers/auth.controllers.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 10 * 1000,
  max: 2,
  handler: (req, res) => {
    const retryAfter = Math.ceil((req.rateLimit.resetTime - new Date()) / 1000);
    res.status(429).json({ message: `Too many requests, try again in ${retryAfter} seconds.` });
  }}
);

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

