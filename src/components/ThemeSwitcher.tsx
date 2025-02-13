import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { ThemeKey } from '@/hooks/useTheme';
import { useThemeContext } from '@/contexts/ThemeContext';

export function ThemeSwitcher() {
  const { currentTheme, setTheme, themes } = useThemeContext();

  return (
    <Dropdown>
      <Dropdown.Toggle variant="outline-secondary" id="theme-switcher">
        Theme: {themes[currentTheme].name}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {Object.entries(themes).map(([key, theme]) => (
          <Dropdown.Item key={key} active={currentTheme === key} onClick={() => setTheme(key as ThemeKey)}>
            {theme.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
