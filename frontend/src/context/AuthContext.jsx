import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
        setLoading(false);
    }, [token]);

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

// ADD THIS IMPORT AT TOP: import API from '../utils/api';

    const updateBrandKit = async (kitData) => {
        try {
            const { data } = await API.put('/auth/brand-kit', kitData);
            const updatedUser = { ...user, ...data };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            return data;
        } catch (err) {
            console.error("Failed to sync brand kit");
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, token, setToken, logout, loading, updateBrandKit }}>
            {children}
        </AuthContext.Provider>
    );
};

// THIS IS THE CRITICAL LINE:
export const useAuth = () => useContext(AuthContext);