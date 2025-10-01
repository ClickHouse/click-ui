import type { NestedJSONObject, Theme } from "../types";

export const generateCSSVariables = (obj: Theme | NestedJSONObject): string => {
  let css = "";

  const traverse = (current: Theme | NestedJSONObject, path: string[] = []) => {
    Object.entries(current).forEach(([key, value]) => {
      // Skip non-variable fields
      if (key === "name" || key === "isSystem" || key === "resolvedTheme") {
        return;
      }

      const varPath = [...path, key];

      if (typeof value === "string" || typeof value === "number") {
        const varName = `--${varPath.join("-")}`;
        css += `  ${varName}: ${value};\n`;
      } else if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        traverse(value as Theme | NestedJSONObject, varPath);
      }
    });
  };

  traverse(obj);
  return css;
};

// Helper to convert theme object to CSS variable object
const themeToVariables = (theme: Theme): Record<string, string> => {
  const vars: Record<string, string> = {};

  const traverse = (current: Theme | NestedJSONObject, path: string[] = []) => {
    Object.entries(current).forEach(([key, value]) => {
      // Skip non-variable fields
      if (key === "name" || key === "isSystem" || key === "resolvedTheme") {
        return;
      }

      const varPath = [...path, key];

      if (typeof value === "string" || typeof value === "number") {
        const varName = `--${varPath.join("-")}`;
        vars[varName] = String(value);
      } else if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        traverse(value as Theme | NestedJSONObject, varPath);
      }
    });
  };

  traverse(theme);
  return vars;
};

export const injectThemeStyles = (
  theme: Theme,
  resolvedTheme: string,
  isSystem = false,
  systemLightTheme?: Theme,
  systemDarkTheme?: Theme
): void => {
  if (typeof window === "undefined") return;

  const rootElement = document.documentElement;

  if (isSystem && systemLightTheme && systemDarkTheme) {
    // For system mode, use CSS with media queries
    let styleEl = document.getElementById("click-ui-theme-vars");
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "click-ui-theme-vars";
      document.head.appendChild(styleEl);
    }

    const lightVars = generateCSSVariables(systemLightTheme);
    const darkVars = generateCSSVariables(systemDarkTheme);

    const cssContent = `
/* System theme mode */
@media (prefers-color-scheme: light) {
  :root {
${lightVars}  }
}

@media (prefers-color-scheme: dark) {
  :root {
${darkVars}  }
}`;

    styleEl.textContent = cssContent;
    rootElement.removeAttribute("data-theme");
  } else {
    // Direct CSS variable injection for explicit themes
    const themeVars = themeToVariables(theme);

    // Batch CSS variable updates for better performance
    // Using style element instead of individual setProperty calls is faster
    let styleEl = document.getElementById("click-ui-theme-vars");
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "click-ui-theme-vars";
      document.head.appendChild(styleEl);
    }

    // Generate CSS content
    const cssVars = Object.entries(themeVars)
      .map(([property, value]) => `  ${property}: ${value};`)
      .join("\n");

    styleEl.textContent = `:root {\n${cssVars}\n}`;

    // Set data-theme attribute for specificity if needed
    rootElement.setAttribute("data-theme", resolvedTheme);
  }
};
