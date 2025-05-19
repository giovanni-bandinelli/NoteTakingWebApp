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
    origin: 'https://note-taking-web-2nd1wpzjf-giovannis-projects-5124523b.vercel.app',
}));

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/notes',notesRoutes);
app.use('/settings',userRoutes);  

app.get('/test', (req, res) => {
    res.send('Backend OK');
  });
  
app.get('/', (req, res) => {
    res.send('Server is running...');
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));
