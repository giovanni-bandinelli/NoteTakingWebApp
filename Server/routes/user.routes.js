import express from 'express';
import { getFont, updateFont, getTheme, updateTheme } from '../controllers/user.controllers.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/font', verifyToken, getFont);
router.post('/font', verifyToken, updateFont);

router.get('/theme', verifyToken, getTheme);
router.post('/theme', verifyToken, updateTheme);

export default router;
