import { createContext } from "react";
import { BaseThemeName, ConfigThemeValues } from "@/theme/types";

// Enhanced theme name type with auto-detection
export type ThemeName = "light" | "dark" | "classic" | "system" | "auto";

// Theme transition modes
export type ThemeTransition = "none" | "fade" | "slide" | "scale";

// Enhanced theme context value
export interface ThemeContextValue {
  // Core theme state
  themeName: ThemeName;
  resolvedTheme: BaseThemeName;
  isSystemTheme: boolean;

  // Theme management
  updateTheme: (theme: ThemeName) => void;
  toggleTheme: () => void;
  resetTheme: () => void;

  // Theme data
  theme: ConfigThemeValues;
  breakpoints: Record<string, string>;
  sizes: Record<string, string>;

  // Utility functions
  utils: {
    isDark: boolean;
    isLight: boolean;
    getThemeValue: (path: string) => unknown;
    setThemeValue: (path: string, value: unknown) => void;
  };

  // State indicators
  isLoading: boolean;
  isHydrated: boolean;

  // Available themes
  availableThemes: ThemeName[];
}

// Theme context
export const ThemeContext = createContext<ThemeContextValue | null>(null);
