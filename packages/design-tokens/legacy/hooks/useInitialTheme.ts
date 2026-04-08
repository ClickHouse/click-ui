"use client";

/**
 * @deprecated This hook is deprecated and will be removed in a future version.
 * Import from '@clickhouse/design-tokens/legacy/hooks' only for backward compatibility.
 */

import { useState, useEffect, useRef } from "react";
import { THEMES } from "../theme/theme.core";
import type { ThemeName } from "../theme/theme.types";
import { CUI_THEME_STORAGE_KEY } from "../utils/localStorage";
import { THEME_ATTRIBUTE, getRootElement } from "../utils/dom";

export interface UseThemeParams {
  defaultTheme?: ThemeName;
  storageKey?: string;
  attribute?: string;
}

export const useInitialTheme = ({
  defaultTheme = "light",
  storageKey = CUI_THEME_STORAGE_KEY,
  attribute = THEME_ATTRIBUTE,
}: UseThemeParams = {}) => {
  // WARNING: This is intentional due to SSR state
  const [theme, setTheme] = useState<ThemeName | null>(() => {
    if (typeof document !== "undefined") {
      const el = getRootElement();

      if (!el) {
        console.warn("Failed to get root html");
        return null;
      }

      const attr = el.getAttribute(attribute);

      if (attr === THEMES.Light || attr === THEMES.Dark) {
        return attr;
      }
    }

    return defaultTheme;
  });

  // TODO: Remove mounted once migrated from styled-components
  const [mounted, setMounted] = useState(false);

  // NOTE: Use ref to avoid effect re-firing when theme changes externally
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);

      if (
        stored &&
        (stored === THEMES.Light || stored === THEMES.Dark) &&
        stored !== themeRef.current
      ) {
        setTheme(stored);
      }
    } catch {
      console.warn("localStorage not available");
    }

    setMounted(true);
  }, [storageKey]);

  return {
    theme,
    mounted,
  };
};
