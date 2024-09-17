import React, { createContext, useContext, useState, useMemo, useEffect, ReactNode } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import Cookies from 'js-cookie';
import { lightTheme, darkTheme } from './Theme';
import { COOKIE_EXPIRY_DAYS, THEME_MODE_COOKIE } from './Config';

interface ThemeContextProps {
  isLightMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProviderComponent = ({ children }: { children: ReactNode }) => {
  const [isLightMode, setIsLightMode] = useState(true);

  useEffect(() => {
    const savedThemeMode = Cookies.get(THEME_MODE_COOKIE);
    if (savedThemeMode) {
      setIsLightMode(savedThemeMode === 'light');
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key.toLowerCase() === 'q') {
        toggleTheme();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleTheme = () => {
    setIsLightMode((prevMode) => {
      const newMode = !prevMode;
      Cookies.set(THEME_MODE_COOKIE, newMode ? 'light' : 'dark', { expires: COOKIE_EXPIRY_DAYS });
      return newMode;
    });
  };

  const theme = useMemo(() => (isLightMode ? lightTheme : darkTheme), [isLightMode]);

  return (
    <ThemeContext.Provider value={{ isLightMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProviderComponent');
  }
  return context;
};
