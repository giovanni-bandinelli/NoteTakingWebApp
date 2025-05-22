import pool from '../config/db.js';

// Merge local and Google accounts (during registration)
export async function mergeLocalAndGoogleAccount(email, hashedPassword) {
  await pool.query(`
    UPDATE users SET password = $1, provider = 'local+google'
    WHERE email = $2
  `, [hashedPassword, email]);
}

// Merge Google and Local accounts (during Google login)
export async function upgradeProviderToLocalGoogle(email) {
  await pool.query(`
    UPDATE users SET provider = 'local+google'
    WHERE email = $1
  `, [email]);
}
