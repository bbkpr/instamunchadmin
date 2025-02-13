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
  CYBORG: {
    name: 'Cyborg',
    href: 'https://cdn.jsdelivr.net/npm/bootswatch@5.3.0/dist/cyborg/bootstrap.min.css'
  },
  JOURNAL: {
    name: 'Journal',
    href: 'https://cdn.jsdelivr.net/npm/bootswatch@5.3.0/dist/journal/bootstrap.min.css'
  },
  LITERA: {
    name: 'Litera',
    href: 'https://cdn.jsdelivr.net/npm/bootswatch@5.3.0/dist/litera/bootstrap.min.css'
  },
  LUMEN: {
    name: 'Lumen',
    href: 'https://cdn.jsdelivr.net/npm/bootswatch@5.3.0/dist/lumen/bootstrap.min.css'
  },
  LUX: {
    name: 'Lux',
    href: 'https://cdn.jsdelivr.net/npm/bootswatch@5.3.0/dist/lux/bootstrap.min.css'
  },
  MATERIA: {
    name: 'Materia',
    href: 'https://cdn.jsdelivr.net/npm/bootswatch@5.3.0/dist/materia/bootstrap.min.css'
  },
  PULSE: {
    name: 'Pulse',
    href: 'https://cdn.jsdelivr.net/npm/bootswatch@5.3.0/dist/pulse/bootstrap.min.css'
  },
  QUARTZ: {
    name: 'Quartz',
    href: 'https://cdn.jsdelivr.net/npm/bootswatch@5.3.0/dist/quartz/bootstrap.min.css'
  },
  SANDSTONE: {
    name: 'Sandstone',
    href: 'https://cdn.jsdelivr.net/npm/bootswatch@5.3.0/dist/sandstone/bootstrap.min.css'
  },
  SIMPLEX: {
    name: 'Simplex',
    href: 'https://cdn.jsdelivr.net/npm/bootswatch@5.3.0/dist/simplex/bootstrap.min.css'
  },
  SLATE: {
    name: 'Slate',
    href: 'https://cdn.jsdelivr.net/npm/bootswatch@5.3.0/dist/slate/bootstrap.min.css'
  },
  SOLAR: {
    name: 'Solar',
    href: 'https://cdn.jsdelivr.net/npm/bootswatch@5.3.0/dist/solar/bootstrap.min.css'
  },
  SPACELAB: {
    name: 'Spacelab',
    href: 'https://cdn.jsdelivr.net/npm/bootswatch@5.3.0/dist/spacelab/bootstrap.min.css'
  },
  UNITED: {
    name: 'United',
    href: 'https://cdn.jsdelivr.net/npm/bootswatch@5.3.0/dist/united/bootstrap.min.css'
  },
  VAPOR: {
    name: 'Vapor',
    href: 'https://cdn.jsdelivr.net/npm/bootswatch@5.3.0/dist/vapor/bootstrap.min.css'
  },
  YETI: {
    name: 'Yeti',
    href: 'https://cdn.jsdelivr.net/npm/bootswatch@5.3.0/dist/yeti/bootstrap.min.css'
  },
  ZEPHYR: {
    name: 'Zephyr',
    href: 'https://cdn.jsdelivr.net/npm/bootswatch@5.3.0/dist/zephyr/bootstrap.min.css'
  }
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
