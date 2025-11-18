/**
 * Minimal runtime theme switching utility
 * Used when theme CSS is already loaded via build-time plugin
 */

export type ThemeMode = "light" | "dark";

/**
 * Set theme attribute on document root
 * This triggers CSS theme switching without regenerating CSS variables
 *
 * @param theme - The resolved theme ("light" or "dark")
 * @param isSystem - Whether system preference mode is active
 */
export const setThemeAttribute = (theme: ThemeMode, isSystem: boolean = false): void => {
  if (typeof document === "undefined") return;

  const root = document.documentElement;

  if (isSystem) {
    // System mode: Let CSS prefers-color-scheme handle it
    root.style.colorScheme = "light dark";
    root.removeAttribute("data-theme");
  } else {
    // Explicit mode: Set both color-scheme and data-theme
    root.style.colorScheme = theme;
    root.setAttribute("data-theme", theme);
  }
};
