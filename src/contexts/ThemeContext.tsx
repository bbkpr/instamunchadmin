import React, { createContext, useContext } from 'react';
import { useTheme, ThemeKey, THEMES } from '@/hooks/useTheme';

interface ThemeContextType {
  currentTheme: ThemeKey;
  setTheme: (theme: ThemeKey) => void;
  themes: typeof THEMES;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeValue = useTheme();

  return <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>;
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}
