/**
 * Shared CSS Builder Utility
 * Consolidates CSS output generation logic used across build and CLI commands
 */

export interface CSSBuildOptions {
  /**
   * Header comment to include at the top of the CSS file
   */
  headerComment?: string;
  /**
   * Include color-scheme property in :root
   * @default true
   */
  includeColorScheme?: boolean;
}

/**
 * Build CSS output from light-dark variables and theme overrides
 * Single source of truth for CSS generation across all build pipelines
 *
 * @param lightDarkVars - CSS variables with light-dark() values for colors
 * @param themeOverrides - Non-color variables that differ between themes
 * @param options - Configuration options for CSS generation
 * @returns Complete CSS string ready to be written to file
 *
 * @example
 * ```typescript
 * const lightDarkVars = generateLightDarkVariables(lightTheme, darkTheme);
 * const themeOverrides = generateThemeOverrides(lightTheme, darkTheme);
 * const css = buildCSSOutput(lightDarkVars, themeOverrides, {
 *   headerComment: '/* My Custom Theme *\/'
 * });
 * ```
 */
export const buildCSSOutput = (
  lightDarkVars: Record<string, string>,
  themeOverrides: { light: Record<string, string>; dark: Record<string, string> },
  options: CSSBuildOptions = {}
): string => {
  const { headerComment = "/* Click UI Theme */", includeColorScheme = true } = options;

  // Build CSS variable entries
  const cssVars = Object.entries(lightDarkVars)
    .map(([property, value]) => `  ${property}: ${value};`)
    .join("\n");

  // Start with header comment
  let css = `${headerComment}\n`;

  // Add :root block with base variables
  css += ":root {\n";
  if (includeColorScheme) {
    css += "  color-scheme: light dark;\n";
  }
  css += `${cssVars}\n`;
  css += "}\n";

  // Add light theme non-color overrides if they exist
  if (Object.keys(themeOverrides.light).length > 0) {
    const lightOverrideCss = Object.entries(themeOverrides.light)
      .map(([property, value]) => `  ${property}: ${value};`)
      .join("\n");
    css += "\n/* Light theme non-color overrides */\n";
    css += `:root[data-theme="light"] {\n${lightOverrideCss}\n}\n`;
  }

  // Add dark theme non-color overrides if they exist
  if (Object.keys(themeOverrides.dark).length > 0) {
    const darkOverrideCss = Object.entries(themeOverrides.dark)
      .map(([property, value]) => `  ${property}: ${value};`)
      .join("\n");
    css += "\n/* Dark theme non-color overrides */\n";
    css += `:root[data-theme="dark"] {\n${darkOverrideCss}\n}\n`;
  }

  return css;
};
