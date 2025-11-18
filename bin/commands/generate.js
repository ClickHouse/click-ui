#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pathToFileURL } from 'url';
import { findConfigFile } from '../../src/theme/utils/find-config.js';
import { loadConfig, validateConfig } from '../utils/config-loader.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generate custom theme CSS from click-ui.config.ts/js
 */
export async function generateCommand(options = {}) {
  const cwd = process.cwd();
  const outputPath = options.output || path.join(cwd, 'public', 'cui-custom-theme.css');
  const verbose = options.verbose || false;

  console.log('🎨 Click UI Theme Generator\n');

  try {
    // Find config file
    const configFile = findConfigFile(cwd);

    if (!configFile) {
      console.log('ℹ️  No click-ui.config.ts/js found');
      console.log('   Run "click-ui init" to create a config file');
      process.exit(0);
    }

    if (verbose) {
      console.log(`📄 Found config: ${path.relative(cwd, configFile)}`);
    }

    // Load config
    const config = await loadConfig(configFile);

    if (!validateConfig(config)) {
      console.log('⚠️  Config file exists but has no theme configuration');
      console.log('   Add "theme" or "dark" properties to customize your theme');
      process.exit(0);
    }

    // Generate CSS
    const css = await generateCSS(config);

    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
      if (verbose) {
        console.log(`📁 Created directory: ${path.relative(cwd, outputDir)}`);
      }
    }

    // Write CSS file
    fs.writeFileSync(outputPath, css, 'utf-8');

    console.log('✅ Generated custom theme CSS');
    console.log(`   Location: ${path.relative(cwd, outputPath)}`);
    console.log(`   Size: ${(css.length / 1024).toFixed(2)} KB\n`);

    console.log('📝 Next steps:');
    console.log('   1. Import the CSS in your app:');
    console.log(`      import '${path.relative(cwd, outputPath).replace(/\\/g, '/')}';`);
    console.log('   2. Or add to your HTML:');
    console.log(`      <link rel="stylesheet" href="/${path.basename(outputPath)}">`);

  } catch (error) {
    console.error('❌ Failed to generate theme CSS:', error.message);
    if (verbose) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

/**
 * Generate CSS from config
 */
async function generateCSS(config) {
  // Import the CSS generation function from bin/utils
  const cssGeneratorPath = path.join(__dirname, '../utils/css-generator.js');

  if (!fs.existsSync(cssGeneratorPath)) {
    throw new Error('CSS generator module not found at ' + cssGeneratorPath);
  }

  const { generateThemeCSS } = await import(pathToFileURL(cssGeneratorPath).href);

  // Get full config and generate CSS
  const fullConfig = config.default || config;
  const css = generateThemeCSS(fullConfig);

  if (!css || css.length === 0) {
    throw new Error('No CSS generated. Please check your theme configuration.');
  }

  return css;
}

/**
 * Split config into build-time and runtime
 */
function splitConfig(fullConfig) {
  const { theme, dark, ...runtimeConfig } = fullConfig;

  return {
    buildTimeConfig: {
      ...(theme && { theme }),
      ...(dark && { dark }),
    },
    runtimeConfig,
  };
}
