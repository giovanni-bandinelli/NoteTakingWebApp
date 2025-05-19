import pool from '../config/db.js';

export async function getFont(req, res) {
  const { email } = req;
  try {
    const { rows } = await pool.query('SELECT font FROM users WHERE email = $1', [email]);
    res.json({ font: rows[0]?.font || 'sans-serif' });
  } catch (err) {
    console.error('Error fetching font:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function updateFont(req, res) {
  const { email } = req;
  const { font } = req.body;
  try {
    await pool.query('UPDATE users SET font = $1 WHERE email = $2', [font, email]);
    res.status(200).json({ message: 'Font updated' });
  } catch (err) {
    console.error('Error updating font:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function getTheme(req, res) {
  console.log("req:",req)
  const { email } = req;
  try {
    const { rows } = await pool.query('SELECT theme FROM users WHERE email = $1', [email]);
    res.json({ theme: rows[0]?.theme || 'system' });
  } catch (err) {
    console.error('Error fetching theme:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function updateTheme(req, res) {
  const email = req.email;
  const { theme } = req.body;
  try {
    await pool.query('UPDATE users SET theme = $1 WHERE email = $2', [theme, email]);
    res.status(200).json({ message: 'Theme updated' });
  } catch (err) {
    console.error('Error updating theme:', err);
    res.status(500).json({ message: 'Server error' });
  }
}
