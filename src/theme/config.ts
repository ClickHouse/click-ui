import type { RuntimeConfig, ConfigThemeValues, BuildTimeThemeConfig } from './types';
import { deepMerge } from './utils';
import baseTheme from './tokens/variables.json';
import baseThemeLight from './tokens/variables.light.json';
import baseThemeDark from './tokens/variables.dark.json';

declare global {
  const __CLICK_UI_CONFIG__: RuntimeConfig & BuildTimeThemeConfig;
}

/**
 * Get runtime configuration injected by build plugin
 *
 * NOTE: This returns ONLY runtime config (storageKey, tooltipConfig, toastConfig)
 * Theme tokens (theme + dark) are NOT included here - they are compiled to CSS
 *
 * @returns Runtime configuration object
 */
export const getRuntimeConfig = (): RuntimeConfig => {
  // Check if plugin injected runtime config at build time
  if (typeof __CLICK_UI_CONFIG__ !== "undefined") {
    // Extract only runtime config (exclude theme/dark)
    const { theme, dark, ...runtimeConfig } = __CLICK_UI_CONFIG__;
    return runtimeConfig;
  }

  // Use defaults if no config provided
  return {};
};

/**
 * Get the merged theme values for the specified mode
 * Combines base theme (merged) + theme-specific overrides + config overrides
 *
 * @param mode - "light" or "dark"
 * @returns Merged theme object with all token values
 */
export const getThemeValues = (mode: 'light' | 'dark'): ConfigThemeValues => {
  // Start with merged base theme (contains all tokens from all themes)
  const themeSpecific = mode === 'dark' ? baseThemeDark : baseThemeLight;

  // Merge: base (all tokens) + theme-specific overrides
  let mergedTheme = deepMerge(baseTheme as any, themeSpecific as any) as ConfigThemeValues;

  // Check if plugin injected custom theme config
  if (typeof __CLICK_UI_CONFIG__ !== "undefined") {
    const { theme, dark } = __CLICK_UI_CONFIG__;

    // For light mode: merge with custom theme config
    // For dark mode: merge with custom dark config (or theme if dark not specified)
    const customOverrides = mode === 'dark' ? (dark || theme) : theme;

    if (customOverrides) {
      mergedTheme = deepMerge(mergedTheme as any, customOverrides) as ConfigThemeValues;
    }
  }

  return mergedTheme;
};

/**
 * @deprecated Use getRuntimeConfig() instead
 * This function is kept for backwards compatibility
 */
export const getThemeConfig = getRuntimeConfig;
