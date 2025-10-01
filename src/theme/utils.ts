"use client";

import { Theme } from "@/theme/types";
import { BaseThemeName } from "@/theme/types";

// Import base variables containing all tokens
import baseVariables from "@/theme/tokens/variables.json";
// Import theme-specific color overrides
import lightVariables from "@/theme/tokens/variables.light.json";
import darkVariables from "@/theme/tokens/variables.dark.json";
import classicVariables from "@/theme/tokens/variables.classic.json";

// Lazy-loaded themes for better performance
let BASE_THEMES: Record<BaseThemeName, Theme> | null = null;

const loadBaseThemes = async (): Promise<Record<BaseThemeName, Theme>> => {
  if (BASE_THEMES) return BASE_THEMES;

  // Lazy load theme files
  const [base, lightTheme, darkTheme, classicTheme] = await Promise.all([
    import("@/theme/tokens/variables.json"),
    import("@/theme/tokens/variables.light.json"),
    import("@/theme/tokens/variables.dark.json"),
    import("@/theme/tokens/variables.classic.json"),
  ]);

  // Merge base tokens with theme-specific colors
  BASE_THEMES = {
    light: deepMerge(base.default, lightTheme.default) as unknown as Theme,
    dark: deepMerge(base.default, darkTheme.default) as unknown as Theme,
    classic: deepMerge(base.default, classicTheme.default) as unknown as Theme,
  };

  return BASE_THEMES;
};

// Deep merge helper (defined below, but referenced here)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deepMergeInternal = (target: any, source: any): any => {
  if (!source) return target;

  const output = { ...target };

  Object.keys(source).forEach(key => {
    const sourceValue = source[key];
    if (sourceValue && typeof sourceValue === "object" && !Array.isArray(sourceValue)) {
      output[key] = deepMergeInternal(output[key] || {}, sourceValue);
    } else {
      output[key] = sourceValue;
    }
  });

  return output;
};

// Synchronous version for immediate access (with fallback)
const getBaseThemesCached = (): Record<BaseThemeName, Theme> => {
  if (BASE_THEMES) return BASE_THEMES;

  // Merge base tokens with theme-specific colors
  BASE_THEMES = {
    light: deepMergeInternal(baseVariables, lightVariables) as unknown as Theme,
    dark: deepMergeInternal(baseVariables, darkVariables) as unknown as Theme,
    classic: deepMergeInternal(baseVariables, classicVariables) as unknown as Theme,
  };

  return BASE_THEMES;
};

/**
 * Get base theme by name (synchronous with fallback)
 */
export const getBaseTheme = (themeName: BaseThemeName): Theme => {
  const themes = getBaseThemesCached();
  return themes[themeName] || themes.light;
};

/**
 * Get base theme by name (async, fully loaded)
 */
export const getBaseThemeAsync = async (themeName: BaseThemeName): Promise<Theme> => {
  const themes = await loadBaseThemes();
  return themes[themeName] || themes.light;
};

/**
 * Preload all base themes for better performance
 */
export const preloadThemes = async (): Promise<void> => {
  await loadBaseThemes();
};

/**
 * Get system theme preference
 */
export const getSystemTheme = (): BaseThemeName => {
  if (typeof window === "undefined") return "light";

  try {
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  } catch {
    return "light";
  }
};

/**
 * Create system theme listener
 */
export const createSystemThemeListener = (callback: (theme: BaseThemeName) => void) => {
  if (typeof window === "undefined") return () => {};

  try {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const listener = (e: MediaQueryListEvent) => {
      callback(e.matches ? "dark" : "light");
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
    // Legacy browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(listener);
      return () => mediaQuery.removeListener(listener);
    }
  } catch {
    // Fallback for environments that don't support matchMedia
  }

  return () => {};
};

/**
 * Configuration loading utilities
 */
import type { ThemeConfig } from "./types";

export const loadCustomConfig = async (): Promise<ThemeConfig | null> => {
  if (typeof window === "undefined") {
    // SSR: Try to load from Node environment
    try {
      // Try CommonJS first
      const configPath = `${process.cwd()}/click-ui.config`;
      delete require.cache[require.resolve(configPath)];
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const config = require(configPath);
      return config.default || config;
    } catch {
      try {
        // Try ES modules
        const config = await import(/* @vite-ignore */ `${process.cwd()}/click-ui.config.js`);
        return config.default || config;
      } catch {
        return null;
      }
    }
  }

  // Client-side loading - check if window.clickUIConfig exists
  try {
    // Check if config is available on window object
    const config = (window as unknown as { clickUIConfig?: unknown }).clickUIConfig;
    return config || null;
  } catch {
    return null;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deepMerge = (target: any, source: any): any => {
  if (!source) return target;

  const output = { ...target };

  Object.keys(source).forEach(key => {
    const sourceValue = source[key];
    if (sourceValue && typeof sourceValue === "object" && !Array.isArray(sourceValue)) {
      output[key] = deepMerge(output[key] || {}, sourceValue);
    } else {
      output[key] = sourceValue;
    }
  });

  return output;
};
