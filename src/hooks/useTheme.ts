import { useState, useEffect } from 'react';

const THEME_STORAGE_KEY = 'preferred-theme';

export const THEMES = {
  DEFAULT: {
    name: 'Default',
    href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css'
  },
  DARKLY: {
    name: 'Darkly',
    href: 'https://cdn.jsdelivr.net/npm/bootswatch@5.3.0/dist/darkly/bootstrap.min.css'
  },
  FLATLY: {
    name: 'Flatly',
    href: 'https://cdn.jsdelivr.net/npm/bootswatch@5.3.0/dist/flatly/bootstrap.min.css'
  },
  COSMO: {
    name: 'Cosmo',
    href: 'https://cdn.jsdelivr.net/npm/bootswatch@5.3.0/dist/cosmo/bootstrap.min.css'
  }
  // Add more themes as needed
} as const;

export type ThemeKey = keyof typeof THEMES;

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeKey;
    return saved || 'DEFAULT';
  });

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, currentTheme);
    updateThemeLink(THEMES[currentTheme].href);
  }, [currentTheme]);

  return {
    currentTheme,
    setTheme: setCurrentTheme,
    themes: THEMES
  };
}

function updateThemeLink(href: string) {
  let link = document.getElementById('bootstrap-theme') as HTMLLinkElement;

  if (!link) {
    link = document.createElement('link');
    link.id = 'bootstrap-theme';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }

  // Create a new link element
  const newLink = document.createElement('link');
  newLink.id = 'bootstrap-theme';
  newLink.rel = 'stylesheet';
  newLink.href = href;

  // When the new stylesheet loads, remove the old one
  newLink.onload = () => {
    if (link.parentNode) {
      link.parentNode.removeChild(link);
    }
  };

  // Insert new link before the old one
  link.parentNode?.insertBefore(newLink, link);
}
