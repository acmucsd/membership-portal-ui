import React, { createContext } from 'react';

interface IThemeContext {
    theme: string;
    toggleTheme?: () => void;
}
const defaultState = {
    theme: "light",
    toggleTheme: () => {},
};
const ThemeContext = createContext<IThemeContext>(defaultState);

export default ThemeContext;
