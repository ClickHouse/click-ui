import { useState, useEffect } from "react";
import type { ResolvedThemeName } from "../types";

/**
 * Hook that detects and tracks the user's system color scheme preference
 * @returns Current system theme preference ("light" | "dark")
 */
export const useSystemColorSchemePreference = (): ResolvedThemeName => {
  const [systemTheme, setSystemTheme] = useState<ResolvedThemeName>("light");

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };

    // Initial check
    handleChange(mediaQuery);

    // Listen for changes
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    // Fallback for older browsers
    if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  return systemTheme;
};
