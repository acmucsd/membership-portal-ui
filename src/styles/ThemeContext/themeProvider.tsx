import React, { useEffect, useState, FC } from 'react';
import ThemeContext from './themeContext';


const ThemeProvider: FC = ({ children }) => {

    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        // change body className
        let currentTheme = document.body.className;
        let newTheme = currentTheme === 'light-theme' ? 'dark-theme' : 'light-theme';
        document.body.className! = newTheme
        // update state
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    useEffect(() => {
        // sync theme state with localStorage on first render
        const localTheme = localStorage.getItem('theme');
        if (localTheme) {
            setTheme(localTheme);
        }
        // if dark, toggle theme to light on first render
        if (localTheme === "dark") {
            document.body.className! = 'dark-theme';
        }
    }, []);

    useEffect(() => {
        // sync localStorage with theme state when it changes
        localStorage.setItem('theme', theme);
    }, [theme]);

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
