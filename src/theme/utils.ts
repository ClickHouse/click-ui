"use client";

import { Theme } from "@/theme/types";
import { BaseThemeName } from "@/theme/types";

// Import base variables containing all tokens
import baseVariables from "@/theme/tokens/variables.json";
// Import theme-specific color overrides
import lightVariables from "@/theme/tokens/variables.light.json";
import darkVariables from "@/theme/tokens/variables.dark.json";

// Cached themes for better performance
let BASE_THEMES: Record<BaseThemeName, Theme> | null = null;

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
 * Helper to get a specific value from a theme by path
 * @example
 * getThemeValue(lightTheme, "click.button.primary.background.default")
 * // Returns: "#007bff"
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getThemeValue = (theme: Theme | Record<string, any>, path: string): unknown => {
  const keys = path.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = theme;

  for (const key of keys) {
    if (value && typeof value === "object" && key in value) {
      value = value[key];
    } else {
      return undefined;
    }
  }

  return value;
};


/**
 * Configuration loading utilities
 */
import type { ThemeConfig } from "./types";

export const loadCustomConfig = async (): Promise<ThemeConfig | null> => {
  // This function is kept for backwards compatibility
  // but now only returns null since build-time config is the only supported method
  // Build-time config is injected via __CLICK_UI_CONFIG__ by the plugin
  return null;
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
