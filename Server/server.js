import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';
import notesRoutes from './routes/notes.routes.js';
import userRoutes from './routes/user.routes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

app.set('trust proxy', 1);

const allowedOrigins = [
    process.env.CLIENT_URL_PROD,
    process.env.CLIENT_URL_DEV
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        callback(new Error('Not allowed by CORS'));
    }
}));

app.use(express.json());



app.use('/auth', authRoutes);
app.use('/notes', notesRoutes);
app.use('/settings', userRoutes);

app.get('/test', (req, res) => {
    res.send('Backend OK');
});

app.get('/', (req, res) => {
    res.send('Server is running...');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
