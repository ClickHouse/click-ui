import type { RuntimeConfig, ConfigThemeValues, BuildTimeThemeConfig } from './types';
import { deepMerge } from './utils';
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
 * Combines base theme + config overrides
 *
 * @param mode - "light" or "dark"
 * @returns Merged theme object with all token values
 */
export const getThemeValues = (mode: 'light' | 'dark'): ConfigThemeValues => {
  const baseTheme = mode === 'dark' ? baseThemeDark : baseThemeLight;

  // Check if plugin injected custom theme config
  if (typeof __CLICK_UI_CONFIG__ !== "undefined") {
    const { theme, dark } = __CLICK_UI_CONFIG__;

    // For light mode: merge base light theme + custom theme config
    // For dark mode: merge base dark theme + custom dark config (or theme if dark not specified)
    const customOverrides = mode === 'dark' ? (dark || theme) : theme;

    if (customOverrides) {
      return deepMerge(baseTheme as any, customOverrides) as ConfigThemeValues;
    }
  }

  return baseTheme as ConfigThemeValues;
};

/**
 * @deprecated Use getRuntimeConfig() instead
 * This function is kept for backwards compatibility
 */
export const getThemeConfig = getRuntimeConfig;
