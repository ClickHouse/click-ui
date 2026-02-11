'use client';

import { useState, useEffect } from 'react';
import { type ThemeName } from '@/theme';
import { CUI_THEME_STORAGE_KEY } from '@/utils/localStorage';
import { THEME_ATTRIBUTE, getRootElement } from '@/utils/dom';

interface UseThemeParams {
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

      // TODO: This should not be hard typed
      // once https://github.com/ClickHouse/click-ui/pull/773
      // is merged update here
      if (attr === 'light' || attr === 'dark') {
        return attr;
      }
    }

    return defaultTheme;
  });

  // TODO: Remove mounted once migrated from styled-components
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);

      // TODO: This should not be hard typed
      // once https://github.com/ClickHouse/click-ui/pull/773
      // is merged update here
      if (stored && (stored === 'light' || stored === 'dark') && stored !== theme) {
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
