/**
 * Shared core logic for Click UI bundler plugins
 * This core is used by all bundler-specific wrappers (Vite, Webpack, Rollup, Next.js)
 */

import * as fs from 'fs';
import * as path from 'path';
import type { PluginOptions, LoadedConfig, BundlerDefines } from './types';

export class ClickUIConfigCore {
  private options: PluginOptions;
  private cachedConfig: LoadedConfig | null = null;

  constructor(options: PluginOptions = {}) {
    this.options = options;
  }

  /**
   * Auto-discover config file in project root
   * Tries multiple file extensions in order of preference
   */
  findConfigFile(root: string): string | null {
    // If user specified a custom path, use it
    if (this.options.configPath) {
      const fullPath = path.resolve(root, this.options.configPath);
      if (fs.existsSync(fullPath)) {
        return fullPath;
      }

      if (this.options.verbose) {
        console.warn(`⚠️  Config file not found at: ${this.options.configPath}`);
      }
      return null;
    }

    // Skip discovery if requested
    if (this.options.skipConfigDiscovery) {
      return null;
    }

    // Auto-discover config file
    const possibleFiles = [
      'click-ui.config.ts',
      'click-ui.config.mts',
      'click-ui.config.cts',
      'click-ui.config.js',
      'click-ui.config.mjs',
      'click-ui.config.cjs',
    ];

    for (const file of possibleFiles) {
      const fullPath = path.resolve(root, file);
      if (fs.existsSync(fullPath)) {
        if (this.options.verbose) {
          console.log(`✅ Found config file: ${file}`);
        }
        return fullPath;
      }
    }

    return null;
  }

  /**
   * Load and parse config file
   */
  async loadConfig(configFile: string): Promise<any> {
    try {
      // Use cache-busting for hot reload support
      const imported = await import(configFile + '?t=' + Date.now());
      const config = imported.default || imported;

      if (this.options.verbose) {
        console.log('📦 Loaded config:', JSON.stringify(config, null, 2));
      }

      return config;
    } catch (error) {
      console.warn(`⚠️  Failed to load config from ${configFile}:`, error);
      return {};
    }
  }

  /**
   * Generate CSS variables from theme config
   */
  generateCSS(config: any): string {
    if (!config || Object.keys(config).length === 0) {
      return '';
    }

    const prefix = config.cssPrefix || '--click';
    let css = '';

    // Generate light theme CSS (theme config is the light mode theme)
    if (config.theme) {
      const lightVars = this.generateVariables(config.theme, prefix);

      if (lightVars) {
        css += `/* Light Theme */\n`;
        css += `@media (prefers-color-scheme: light) {\n  :root {\n${lightVars}  }\n}\n\n`;
        css += `:root[data-theme="light"] {\n${lightVars}}\n\n`;
      }
    }

    // Generate dark theme CSS (theme + dark overrides)
    // If dark is not defined, theme values are used for dark mode too
    if (config.theme || config.dark) {
      const darkVars = this.generateVariables(
        { ...config.theme, ...config.dark },
        prefix
      );

      if (darkVars) {
        css += `/* Dark Theme */\n`;
        css += `@media (prefers-color-scheme: dark) {\n  :root {\n${darkVars}  }\n}\n\n`;
        css += `:root[data-theme="dark"] {\n${darkVars}}\n`;
      }
    }

    return css;
  }

  /**
   * Recursively generate CSS variables from nested config object
   */
  private generateVariables(obj: any, prefix: string, path: string[] = []): string {
    let vars = '';

    if (!obj || typeof obj !== 'object') {
      return vars;
    }

    Object.entries(obj).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        return;
      }

      if (typeof value === 'string' || typeof value === 'number') {
        const varName = `${prefix}-${[...path, key].join('-')}`;
        vars += `    ${varName}: ${value};\n`;
      } else if (typeof value === 'object' && !Array.isArray(value)) {
        vars += this.generateVariables(value, prefix, [...path, key]);
      }
    });

    return vars;
  }

  /**
   * Create define/globals for build-time injection
   */
  createDefines(config: any): BundlerDefines {
    return {
      '__CLICK_UI_CONFIG__': JSON.stringify(config || {}),
      '__CLICK_UI_PREFIX__': JSON.stringify(config?.cssPrefix || '--click'),
    };
  }

  /**
   * Main initialization method used by all bundlers
   * Returns everything needed for bundler-specific implementation
   */
  async initialize(root: string): Promise<LoadedConfig> {
    // Return cached config if available
    if (this.cachedConfig) {
      return this.cachedConfig;
    }

    const configFile = this.findConfigFile(root);

    if (!configFile) {
      if (!this.options.skipConfigDiscovery) {
        console.log('ℹ️  No click-ui config found, using defaults');
      }

      this.cachedConfig = {
        configFile: null,
        config: {},
        cssVariables: '',
      };

      return this.cachedConfig;
    }

    const config = await this.loadConfig(configFile);
    const cssVariables = this.generateCSS(config);

    this.cachedConfig = {
      configFile,
      config,
      cssVariables,
    };

    return this.cachedConfig;
  }

  /**
   * Clear cache (useful for watch mode)
   */
  clearCache(): void {
    this.cachedConfig = null;
  }

  /**
   * Get verbose flag
   */
  isVerbose(): boolean {
    return this.options.verbose || false;
  }

  /**
   * Get CSS output filename
   */
  getCSSOutputFilename(): string {
    return this.options.cssOutput || 'theme-vars.css';
  }
}
