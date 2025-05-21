import jwt from 'jsonwebtoken';

export function generateJwtToken(email){
    return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export function generateResetToken(email) {
    return jwt.sign({ email } , process.env.JWT_SECRET, { expiresIn: '12h' });
  }