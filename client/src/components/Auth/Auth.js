import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated,setIsAuthenticated] = useState(false)
    // const navigate = useNavigate()

    const login = (userData) => {
        setUser(userData);  // Store user data after login
        setIsAuthenticated(true)
        localStorage.setItem('user', JSON.stringify(userData)); // Optionally persist login
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false)
        localStorage.removeItem('user'); // Clear stored login data
        localStorage.setItem('logout', Date.now());
        localStorage.removeItem('authToken');
        // navigate('/login')
    };

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setIsAuthenticated(true);
        }

        // Function to handle logout event
        const handleStorageChange = (event) => {
            if (event.key === 'logout') {
                setUser(null);
                setIsAuthenticated(false);
                localStorage.removeItem('user'); // Clear user from local storage
            }
        };

        // Add event listener for storage changes
        window.addEventListener('storage', handleStorageChange);

        // Cleanup event listener on unmount
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
