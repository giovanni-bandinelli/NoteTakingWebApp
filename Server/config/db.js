import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pkg; 

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

pool.on('connect', () => {
    console.log('✅ PostgreSQL Database Connected');
});

export default pool;
