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

/**
 * Deep merge utility for merging theme objects
 * Recursively merges nested objects, with source properties taking precedence
 *
 * @param target - The target object to merge into
 * @param source - The source object to merge from
 * @returns A new merged object
 *
 * @example
 * ```typescript
 * const result = deepMerge({ a: 1, b: { c: 2 } }, { b: { d: 3 } });
 * // Result: { a: 1, b: { c: 2, d: 3 } }
 * ```
 */
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

// Synchronous version for immediate access (with fallback)
const getBaseThemesCached = (): Record<BaseThemeName, Theme> => {
  if (BASE_THEMES) return BASE_THEMES;

  // Merge base tokens with theme-specific colors
  BASE_THEMES = {
    light: deepMerge(baseVariables, lightVariables) as unknown as Theme,
    dark: deepMerge(baseVariables, darkVariables) as unknown as Theme,
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
export const getThemeValue = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  theme: Theme | Record<string, any>,
  path: string
): unknown => {
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
  return null;
};
