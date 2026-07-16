'use client';

import { useEffect } from 'react';
import { THEMES, themes } from '@/theme/theme.core';
import type { ThemeName } from '@/theme/theme.types';
import { isValidThemeName } from '@/theme/theme.utils';
import { ThemeContext } from '@/theme/ThemeContext';

import '@/theme/styles/tokens-light.css';
import '@/theme/styles/tokens-dark.css';

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

  // Mirror the old createGlobalStyle body rule without styled-components:
  // apply the theme's default text/background colors to <body>, restoring the
  // previous inline values on unmount.
  useEffect(() => {
    const { color } = theme.click.global;
    const { style } = document.body;
    const prevColor = style.color;
    const prevBackground = style.backgroundColor;

    style.color = color.text.default;
    style.backgroundColor = color.background.default;

    return () => {
      style.color = prevColor;
      style.backgroundColor = prevBackground;
    };
  }, [theme]);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};
