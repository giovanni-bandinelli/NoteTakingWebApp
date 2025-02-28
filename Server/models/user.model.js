import pool from '../config/db.js';

// Find user by email
export async function findUserByEmail(email) {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return rows[0];
}

// Create new user
export async function createUser(email, hashedPassword) {
    const { rows } = await pool.query(
        'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
        [email, hashedPassword]
    );
    return rows[0];
}

export async function updateUserPassword(email, password){
    const { rows } = await pool.query(
        "UPDATE users SET password=$1 WHERE email=$2 RETURNING *",
        [password,email]
    );
    return rows[0];
}
// Store Google User
export async function createGoogleUser(email) {
    const { rows } = await pool.query(
        "INSERT INTO users (email, password, provider) VALUES ($1, '', 'google') RETURNING *",
        [email]
    );
    return rows[0];
}

