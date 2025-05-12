import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { generateJwtToken, generateResetToken } from '../utils/generateJWT.js';
import sendResetPasswordEmail from '../utils/sendEmail.js';
import { findUserByEmail, createUser, createGoogleUser, updateUserPassword } from '../models/user.model.js';
import pool from '../config/db.js';

// Register User
export async function registerUser(req, res) {
    const { email, password } = req.body;
    console.log("Register attempt for:", email);
    try {
        const existingUser = await findUserByEmail(email);
        if (existingUser){
            if(existingUser.provider === "google"){//means that email has signed with google provider, merge the 2 ""accounts""
                const hashedPassword = await bcrypt.hash(password, 10);
                await pool.query("UPDATE users SET password = $1, provider = 'local+google' WHERE email = $1", [hashedPassword,email]);
                res.json({ token: generateJwtToken(user.email) });
            }else{return res.status(400).json({ message: 'User already exists' })}
        };

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser(email, hashedPassword);

        res.json({ token: generateJwtToken(user.email) });
    } catch (error) {
        console.log("Server Error:",error);
        res.status(500).json({ message: 'Server Error' });
    }
}

// Login User
export async function loginUser(req, res) {
    const { email, password } = req.body;
    console.log("Login attempt for:", email); 
    try {
        const user = await findUserByEmail(email);
        if (!user) {
            console.log("User not found:", email); 
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Incorrect password for:", email);
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        console.log("Login successful for:", email);
        res.json({ token: generateJwtToken(user.email) });
    } catch (error) {
        console.error("Server Error:", error); 
        res.status(500).json({ message: 'Server Error' });
    }
}

// Google OAuth Login
export async function googleAuth(req, res) {
    try {
        const { token } = req.body;

        const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`,{
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch Google user info')
        };
        const { email } = await response.json();

        let user = await findUserByEmail(email);

        if (!user) {
            user = await createGoogleUser(email)
        }else if (user.provider === 'local'){//means that email has signed with local provider, merge the 2 ""accounts""
            await pool.query("UPDATE users SET provider = 'local+google' WHERE email = $1", [email]);
        }

        res.json({ token: generateJwtToken(user.email) });
    } catch (error) {
        console.log("Google Auth Error:",error);
        res.status(500).json({ message: 'Google Authentication Failed' });
    }
}

// Password change through settings:
export async function changePassword(req,res) {
    const {authtoken, currentPassword, newPassword} = req.body;
    const decoded = jwt.verify(authtoken, process.env.JWT_SECRET);
    const email = decoded.email;
    console.log('Decoded email from JWT:', email);
    try {
        const user = await findUserByEmail(email);
        if(!user){
            return res.status(401).json({ message: "Request can't be associated to any registered account" });
        }
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if(!isMatch){
            return res.status(401).json({message: "Old password isn't valid"});
        } 
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await updateUserPassword(email,hashedPassword);
        console.log(`updating password for ${email} from " ${currentPassword} " to " ${newPassword} "`);
        res.status(200).json({ message: 'Password has been updated!' });
    } catch (error) {
        console.error("Server Error:", error); // Log any server errors
        res.status(500).json({ message: 'Server Error' });
    }
}


//GET USER SETTINGS & TAGS:
export async function getUserProfile(email) {
    const userRes = await pool.query(
      'SELECT id, email, theme, font FROM users WHERE email = $1',
      [email]
    );
  
    const user = userRes.rows[0];
    if (!user) return null;
  
    const tagsRes = await pool.query(
      `SELECT DISTINCT tags.name
       FROM tags 
       JOIN note_tags ON note_tags.tag_id = tags.id
       WHERE tags.user_id = $1`,
      [user.id]
    );
  
    return {
      user: {
        email: user.email,
        theme: user.theme,
        font: user.font
      },
      tags: tagsRes.rows.map(row => row.name)
    };
  }
  
// PASSWORD RECOVERY CONTROLLERS:

// 1)Send password reset email
export async function forgotPassword(req, res) {
    const { email } = req.body;
    
    try {
      const user = await findUserByEmail(email);
      if (!user || user.provider === "google") return res.status(404).json({ message: 'Email has not been used to register with local provider' });
  
      const resetToken = generateResetToken(user.email);
  
      // Send email with reset link (includes token)
      const resetLink = `${process.env.CLIENT_URL_DEV}/auth/reset-password/?token=${resetToken}`;
      await sendResetPasswordEmail(email, resetLink);  
  
      res.status(200).json({ message: 'Password reset link sent to your email' });
    } catch (error) {
      console.error('Forgot Password Error:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  }

// 2)Verify reset token (so frontend knows it's valid)
export function verifyResetToken(req, res) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Token is missing' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }

        return res.status(200).json({ email: decoded.email }); // Send email in response
    });
}

  // 3) Reset password with valid token
  export async function resetPassword(req, res) {
    const { linkToken, newPassword } = req.body;
    try {
        const decoded = jwt.verify(linkToken, process.env.JWT_SECRET);
        const email = decoded.email;
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await updateUserPassword(email,hashedPassword);

        res.status(200).json({ message: 'Password has been updated!' });
    }catch (error) {
        console.error('Reset Password Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
  }

