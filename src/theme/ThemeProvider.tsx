'use client';

import { THEMES, themes } from './theme.core';
import type { ThemeName } from './theme.types';
import { isValidThemeName } from './theme.utils';
import { ThemeContext } from './ThemeContext';

import './styles/tokens-light.css';
import './styles/tokens-dark.css';
import './styles/global.css';

export const ThemeProvider = ({
  theme: name,
  children,
}: {
  theme: ThemeName;
  children: React.ReactNode;
}) => {
  const hasValidTheme = isValidThemeName(name);
  const resolvedTheme = !hasValidTheme ? THEMES.Light : name;
  const theme = themes[resolvedTheme];

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};
