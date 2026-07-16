'use client';

import { useState, useEffect } from 'react';
import { THEMES } from '@/theme/theme.core';
import type { ThemeName } from '@/theme/theme.types';
import { CUI_THEME_STORAGE_KEY } from '@/utils/localStorage';
import { THEME_ATTRIBUTE, getRootElement } from '@/utils/dom';

export interface UseThemeParams {
  defaultTheme?: ThemeName;
  storageKey?: string;
  attribute?: string;
}

export const useInitialTheme = ({
  defaultTheme = 'light',
  storageKey = CUI_THEME_STORAGE_KEY,
  attribute = THEME_ATTRIBUTE,
}: UseThemeParams = {}) => {
  // WARNING: This is intentional due to SSR state
  const [theme, setTheme] = useState<ThemeName | null>(() => {
    if (typeof document !== 'undefined') {
      const el = getRootElement();

      if (!el) {
        console.warn('Failed to get root html');
        return null;
      }

      const attr = el.getAttribute(attribute);

      if (attr === THEMES.Light || attr === THEMES.Dark) {
        return attr;
      }
    }

    return defaultTheme;
  });

  // `mounted` gates against SSR/hydration mismatches: it flips true only after
  // the client-side effect runs, letting consumers defer theme-dependent output
  // until the stored theme has been reconciled.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);

      if (
        stored &&
        (stored === THEMES.Light || stored === THEMES.Dark) &&
        stored !== theme
      ) {
        setTheme(stored);
      }
    } catch {
      console.warn('localStorage not available');
    }

    setMounted(true);
  }, [storageKey, attribute, theme]);

  return {
    theme,
    mounted,
  };
};
