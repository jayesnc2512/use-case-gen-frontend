// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState('');

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
