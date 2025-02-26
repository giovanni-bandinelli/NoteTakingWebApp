import express from 'express';
import { registerUser, loginUser, googleAuth } from '../controllers/auth.controllers.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google-login', googleAuth);

// Root webapp route protected with JWT
router.get('/verify', verifyToken, (req, res) => {
    res.json({ message: 'Token is valid', userId: req.userId });
});

export default router;
