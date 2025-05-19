import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';
import notesRoutes from './routes/notes.routes.js';
import userRoutes from './routes/user.routes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: `http://localhost:5173`,
}));

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/notes',notesRoutes);
app.use('/settings',userRoutes);  //router.get('/font', verifyToken, getFont);   API CLIENT (URL string is correct) authFetch(`${API_URL}/settings/font`, {}, token);

app.get('/test', (req, res) => {
    res.send('Backend OK');
  });
  
app.get('/', (req, res) => {
    res.send('Server is running...');
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));
