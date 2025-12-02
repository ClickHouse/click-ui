// === CORE TYPES ===
export type {
  Theme,
  ThemeName,
  ThemeConfig,
  ThemeContextValue,
  BaseThemeName,
  ResolvedThemeName,
  DeepPartial,
  TypedTheme,
  NestedJSONObject,
  ConfigThemeValues,
} from "./types";

// === CORE PROVIDERS ===
export { ClickUIProvider, ServerClickUIProvider } from "./ClickUIProvider";

// === HOOKS ===
export {
  useCUITheme,
  useCUITheme as useClickUITheme, // Alias for convenience
} from "./ClickUIProvider";

// === UTILITIES ===
export { getBaseTheme, getThemeValue, loadCustomConfig, deepMerge } from "./utils";

// === CSS UTILITIES ===
export { setThemeAttribute } from "./utils/theme-attribute";

// === CONFIGURATION ===
export { getThemeConfig } from "./config";

// === RE-EXPORTS ===
// For backward compatibility
export type { ThemeName as ClickUIThemeName } from "./types";
