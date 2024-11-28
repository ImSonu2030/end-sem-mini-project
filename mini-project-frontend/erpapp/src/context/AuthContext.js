import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        // Retrieve token from localStorage
        const storedToken = localStorage.getItem("authToken");
        if (storedToken) {
            setIsAuthenticated(true);
            setToken(storedToken);
        }
    }, []);

    const login = (token) => {
        setIsAuthenticated(true);
        setToken(token);
        localStorage.setItem("authToken", token); // Store token in localStorage
    };

    const logout = () => {
        setIsAuthenticated(false);
        setToken(null);
        localStorage.removeItem("authToken"); // Remove token from localStorage
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
