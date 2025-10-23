#!/usr/bin/env node

/**
 * Generate theme-default.css with light-dark() functions
 * This runs during library build to create pre-compiled CSS
 */

import * as fs from "fs";
import * as path from "path";
import { getBaseTheme } from "../../src/theme/utils";
import { generateLightDarkVariables, generateThemeOverrides } from "../../src/theme/utils/css-generator";
import { buildCSSOutput } from "../../src/theme/utils/css-builder";

// Load light and dark base themes from tokens
const lightTheme = getBaseTheme("light");
const darkTheme = getBaseTheme("dark");

// Debug: Check if themes loaded correctly
console.log("\n🔍 Debug Info:");
console.log(`Light theme loaded: ${Object.keys(lightTheme).length} keys`);
console.log(`Dark theme loaded: ${Object.keys(darkTheme).length} keys`);
console.log(`Light accordion color: ${lightTheme?.click?.accordion?.color?.default?.label?.default}`);
console.log(`Dark accordion color: ${darkTheme?.click?.accordion?.color?.default?.label?.default}`);

// Generate CSS using the same logic as injectThemeStyles()
const lightDarkVars = generateLightDarkVariables(lightTheme, darkTheme);
const themeOverrides = generateThemeOverrides(lightTheme, darkTheme);

// Build CSS using shared builder
const css = buildCSSOutput(lightDarkVars, themeOverrides, {
  headerComment: '/* Click UI Default Theme */\n/* Generated during library build - DO NOT EDIT MANUALLY */\n/* Uses light-dark() CSS function for automatic theme switching */\n'
});

// Ensure output directory exists
const outputDir = path.join(process.cwd(), "src", "styles");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write the CSS file
const outputPath = path.join(outputDir, "cui-default-theme.css");
fs.writeFileSync(outputPath, css, "utf-8");

console.log(`✅ Generated cui-default-theme.css (${css.length} bytes)`);
console.log(`   Location: ${outputPath}`);
console.log(`   Light vars: ${Object.keys(lightDarkVars).length}`);
console.log(`   Light overrides: ${Object.keys(themeOverrides.light).length}`);
console.log(`   Dark overrides: ${Object.keys(themeOverrides.dark).length}`);
