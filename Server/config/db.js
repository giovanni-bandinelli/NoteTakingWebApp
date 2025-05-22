import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pkg; 

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } //needed for Fly.io to work properly
,
});

pool.on('connect', () => {
    console.log('PostgreSQL Database Connected');
});

pool.on('error', (err) => {
    console.error('Unexpected PostgreSQL error:', err);
});

export default pool;
