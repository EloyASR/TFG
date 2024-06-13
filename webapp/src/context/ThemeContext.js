import React, { createContext, useContext, useEffect } from 'react';
import { applyTheme } from './theme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    useEffect(() => {
        applyTheme();

        const handleStorageChange = (event) => {
            applyTheme();
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <ThemeContext.Provider value={{}}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);