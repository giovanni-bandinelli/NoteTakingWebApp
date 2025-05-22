import { getFontByEmail, updateFontByEmail, getThemeByEmail, updateThemeByEmail } from '../models/user.model.js';

export async function getFont(req, res) {
  try {
    const font = await getFontByEmail(req.email);
    res.json({ font });
  } catch (err) {
    console.error('Error fetching font:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function updateFont(req, res) {
  try {
    await updateFontByEmail(req.email, req.body.font);
    res.status(200).json({ message: 'Font updated' });
  } catch (err) {
    console.error('Error updating font:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function getTheme(req, res) {
  try {
    const theme = await getThemeByEmail(req.email);
    res.json({ theme });
  } catch (err) {
    console.error('Error fetching theme:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function updateTheme(req, res) {
  try {
    await updateThemeByEmail(req.email, req.body.theme);
    res.status(200).json({ message: 'Theme updated' });
  } catch (err) {
    console.error('Error updating theme:', err);
    res.status(500).json({ message: 'Server error' });
  }
}
