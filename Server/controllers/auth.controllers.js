import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { generateJwtToken, generateResetToken } from '../utils/generateJWT.js';
import sendResetPasswordEmail from '../utils/sendEmail.js';

import {
  findUserByEmail,
  createUser,
  createGoogleUser,
  updateUserPassword
} from '../models/user.model.js';

import {
  mergeLocalAndGoogleAccount,
  upgradeProviderToLocalGoogle
} from '../models/auth.model.js';

// Register
export async function registerUser(req, res) {
  const { email, password } = req.body;
  try {
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      if (existingUser.provider === 'google') {
        const hashedPassword = await bcrypt.hash(password, 10);
        await mergeLocalAndGoogleAccount(email, hashedPassword);
        return res.json({ token: generateJwtToken(email) });
      }
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(email, hashedPassword);

    res.json({ token: generateJwtToken(user.email) });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
}

// Login
export async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    res.json({ token: generateJwtToken(user.email) });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
}

// Google OAuth
export async function googleAuth(req, res) {
  const { token } = req.body;
  try {
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error('Failed to fetch Google user info');

    const { email } = await response.json();
    let user = await findUserByEmail(email);

    if (!user) {
      user = await createGoogleUser(email);
    } else if (user.provider === 'local') {
      await upgradeProviderToLocalGoogle(email);
    }

    res.json({ token: generateJwtToken(email) });
  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(500).json({ message: 'Google Authentication Failed' });
  }
}

// Change Password
export async function changePassword(req, res) {
  const { authtoken, currentPassword, newPassword } = req.body;
  try {
    const decoded = jwt.verify(authtoken, process.env.JWT_SECRET);
    const email = decoded.email;

    const user = await findUserByEmail(email);
    if (!user) return res.status(401).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Incorrect current password' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await updateUserPassword(email, hashedPassword);

    res.status(200).json({ message: 'Password updated' });
  } catch (error) {
    console.error('Change Password Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
}

// Forgot Password
export async function forgotPassword(req, res) {
  const { email } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user || user.provider === 'google') {
      return res.status(404).json({ message: 'No local account associated with this email' });
    }

    const resetToken = generateResetToken(user.email);
    const resetLink = `${process.env.CLIENT_URL_DEV}/auth/reset-password/?token=${resetToken}`;
    await sendResetPasswordEmail(email, resetLink);

    res.status(200).json({ message: 'Password reset link sent' });
  } catch (error) {
    console.error('Forgot Password Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
}

// Verify Token
export function verifyResetToken(req, res) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Token missing' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    res.status(200).json({ email: decoded.email });
  });
}

// Reset Password
export async function resetPassword(req, res) {
  const { linkToken, newPassword } = req.body;
  try {
    const decoded = jwt.verify(linkToken, process.env.JWT_SECRET);
    const email = decoded.email;
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await updateUserPassword(email, hashedPassword);
    res.status(200).json({ message: 'Password has been updated' });
  } catch (error) {
    console.error('Reset Password Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
}
