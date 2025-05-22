import jwt from 'jsonwebtoken';

export function verifyToken(req, res, next) {
    //console.log(' Middleware hit: verifyToken'); commented out because it's overkill for prod

    const token = req.headers['authorization']?.split(' ')[1];  //<-- http headers get normalized to lowecased, spent hours trying to solve bug here T-T
    //console.log('Token received:', token); // Log received token, commented out because it's overkill for prod
    
    if (!token) {
        console.log('No token found');
        return res.status(403).json({ message: 'Token is missing' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log('Invalid or expired token:', err.message);
            return res.status(403).json({ message: 'Invalid or expired token' });
        }

        //console.log('Token verified for user:', decoded.email); commented out because it's overkill for prod
        req.email = decoded.email; // Store email for route access <--I don't remember why i added this :P
        next();
    });
}


