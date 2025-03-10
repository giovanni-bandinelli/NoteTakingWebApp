import { createContext, useContext, useState, useEffect } from 'react';

// Create AuthContext
export const AuthContext = createContext(null);

// Custom Hook to use AuthContext
export function useAuth() {
    return useContext(AuthContext);
}

// AuthProvider Component
export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);

    // Decode JWT token and check expiration
    const decodeToken = (token) => {
        const payload = JSON.parse(window.atob(token.split('.')[1]));
        return payload;
    };

    // On mount, check localStorage and set token if it exists
    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            const decoded = decodeToken(storedToken);
            if (decoded.exp * 1000 < Date.now()) {
                localStorage.removeItem('authToken');
                setToken(null);
                setIsAuthenticated(false);
            } else {
                setToken(storedToken);
            }
        }
    }, []);

    // Whenever the token state changes, verify it
    useEffect(() => {
        if (!token) {
            setIsAuthenticated(false);
        } else {
            verifyToken(token);
        }
    }, [token]);

    const verifyToken = async (token) => {

        try {
            const response = await fetch('http://localhost:5000/auth/verify', {
                method: 'GET',
                headers:{'Authorization': `Bearer ${token}`} ,
            });
            if (response.ok) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                localStorage.removeItem('authToken');
            }
        } catch (err) {
            console.error(' Error verifying token:', err);
            setIsAuthenticated(false);
            localStorage.removeItem('authToken');
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}
