import { createContext, useContext, useState, useEffect } from 'react';

// Create AuthContext
export const AuthContext = createContext(null);

// Custom Hook to use AuthContext
export function useAuth() {
    return useContext(AuthContext);
}

// AuthProvider Component
export function AuthProvider({ children }) {
    // Start with no token and unauthenticated state.
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);

    // On mount, check localStorage and set token if it exists.
    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        console.log('🔹 Initial token from localStorage:', storedToken);
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    // Whenever the token state changes, verify it.
    useEffect(() => {
        if (!token) {
            console.log('❌ No token, user not authenticated.');
            setIsAuthenticated(false);
            return;
        }

        async function verifyToken() {
            console.log('🔹 Verifying token:', token);

            const headers = {'Authorization': `Bearer ${token}`};

            console.log('🔹 Headers being sent:', headers);

      
            try {
                const response = await fetch('http://localhost:5000/auth/verify', {
                    method: 'GET',
                    headers
                });
                console.log('🔹 Server response:', response.status);
                if (response.ok) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    localStorage.removeItem('authToken');
                }
            } catch (err) {
                console.error('⚠️ Error verifying token:', err);
                setIsAuthenticated(false);
            }
        }

        verifyToken();
    }, [token]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}
