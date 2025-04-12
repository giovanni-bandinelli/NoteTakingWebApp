import express from 'express';
import { registerUser, loginUser, googleAuth, forgotPassword, verifyResetToken, resetPassword, changePassword } from '../controllers/auth.controllers.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google-login', googleAuth);
router.post('/forgot-password', forgotPassword);
router.get('/verify-reset-token', verifyResetToken);
router.post('/reset-password', resetPassword);
router.post('/change-password', changePassword);
// Root webapp route protected with JWT
router.get('/verify', verifyToken, (req, res) => {
    res.json({ message: 'Token is valid', email: req.email });
});

export default router;
