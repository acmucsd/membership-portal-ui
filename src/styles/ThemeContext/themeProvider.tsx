import React, { useState, FC, createContext } from 'react';
import ThemeContext from './themeContext';


const ThemeProvider: FC = ({ children }) => {

    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        let currentTheme = document.body.className;
        let newTheme = currentTheme === 'light-theme' ? 'dark-theme' : 'light-theme';
        document.body.className! = newTheme
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider
        value={{
            theme,
            toggleTheme,
        }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
