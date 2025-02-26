import jwt from 'jsonwebtoken';

export function generateJwtToken(userId){
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};
