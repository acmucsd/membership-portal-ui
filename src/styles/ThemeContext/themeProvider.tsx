import React, { useEffect, useState, FC } from 'react';
import ThemeContext from './themeContext';

const ThemeProvider: FC = ({ children }) => {
  // set initial theme to localStorage if it exists, otherwise set to light
  const [theme, setTheme] = useState(document.documentElement.getAttribute('theme') || 'light');

  const toggleTheme = () => {
    // change html theme attribute to opposite of current theme
    const currentTheme = document.documentElement.getAttribute('theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('theme', newTheme);
    // update state
    setTheme(newTheme);
  };

  useEffect(() => {
    // sync localStorage with theme state when it changes
    if (theme) {
      localStorage.setItem('theme', theme);
    }
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
