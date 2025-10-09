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

// Helper to convert theme object to flat variable map
export const themeToFlatVariables = (theme: Theme): Record<string, string> => {
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

// Generate light-dark() CSS values from light and dark themes
export const generateLightDarkVariables = (
  lightTheme: Theme,
  darkTheme: Theme
): Record<string, string> => {
  const lightVars = themeToFlatVariables(lightTheme);
  const darkVars = themeToFlatVariables(darkTheme);
  const lightDarkVars: Record<string, string> = {};

  // Create light-dark() values for all variables
  Object.keys(lightVars).forEach(varName => {
    const lightValue = lightVars[varName];
    const darkValue = darkVars[varName] || lightValue;
    lightDarkVars[varName] = `light-dark(${lightValue}, ${darkValue})`;
  });

  // Add any dark-only variables
  Object.keys(darkVars).forEach(varName => {
    if (!lightDarkVars[varName]) {
      const darkValue = darkVars[varName];
      const lightValue = lightVars[varName] || darkValue;
      lightDarkVars[varName] = `light-dark(${lightValue}, ${darkValue})`;
    }
  });

  return lightDarkVars;
};

export const injectThemeStyles = (
  theme: Theme,
  resolvedTheme: string,
  isSystem = false,
  systemLightTheme?: Theme,
  systemDarkTheme?: Theme,
  lightTheme?: Theme,
  darkTheme?: Theme
): void => {
  if (typeof window === "undefined") return;

  const rootElement = document.documentElement;

  // Always use light-dark() approach for efficient theme switching
  let styleEl = document.getElementById("click-ui-theme-vars");
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = "click-ui-theme-vars";
    document.head.appendChild(styleEl);
  }

  // Use provided light/dark themes or fall back to system themes
  const finalLightTheme = lightTheme || systemLightTheme || theme;
  const finalDarkTheme = darkTheme || systemDarkTheme || theme;

  const lightDarkVars = generateLightDarkVariables(finalLightTheme, finalDarkTheme);

  // Generate CSS content with light-dark()
  const cssVars = Object.entries(lightDarkVars)
    .map(([property, value]) => `  ${property}: ${value};`)
    .join("\n");

  const cssContent = `:root {\n${cssVars}\n}`;

  styleEl.textContent = cssContent;

  // Update only the color-scheme property to switch themes
  if (isSystem) {
    rootElement.style.colorScheme = "light dark";
    rootElement.removeAttribute("data-theme");
  } else {
    const colorScheme = resolvedTheme === "dark" ? "dark" : "light";
    rootElement.style.colorScheme = colorScheme;
    rootElement.setAttribute("data-theme", resolvedTheme);
  }
};
