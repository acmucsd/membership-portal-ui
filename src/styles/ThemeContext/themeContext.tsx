import { createContext } from 'react';

interface IThemeContext {
  theme: string;
  toggleTheme: () => void;
}

// set initial theme to localStorage if it exists, otherwise set to light
const initialTheme: string = localStorage.getItem('theme') || 'light';
const initialState = {
  theme: initialTheme,
  toggleTheme: () => {},
};

const ThemeContext = createContext<IThemeContext>(initialState);
export default ThemeContext;
