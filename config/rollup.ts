/**
 * Rollup plugin for Click UI configuration
 * Uses shared core for config discovery and CSS generation
 */

import type { Plugin } from 'rollup';
import { ClickUIConfigCore } from './core';
import type { PluginOptions } from './types';

export function clickUIConfig(options: PluginOptions = {}): Plugin {
  const core = new ClickUIConfigCore(options);
  let loadedConfig: any = null;
  let cssVariables = '';
  let resolvedRoot: string;

  return {
    name: 'click-ui-config',

    // Build start hook - initialize config
    async buildStart() {
      try {
        resolvedRoot = process.cwd();
        const result = await core.initialize(resolvedRoot);

        loadedConfig = result.config;
        cssVariables = result.cssVariables;

        // Watch config file for changes
        if (result.configFile) {
          this.addWatchFile(result.configFile);
        }

        if (core.isVerbose()) {
          console.log('✅ Click UI config loaded for Rollup');
        }
      } catch (error) {
        console.error('❌ Failed to initialize Click UI config:', error);
        loadedConfig = {};
        cssVariables = '';
      }
    },

    // Transform code to inject defines
    transform(code, id) {
      // Skip non-JS/TS files
      if (!id.match(/\.(js|ts|jsx|tsx|mjs|cjs)$/)) {
        return null;
      }

      // Replace global constants
      const defines = core.createDefines(loadedConfig);
      let transformedCode = code;
      let hasReplacement = false;

      Object.entries(defines).forEach(([key, value]) => {
        const regex = new RegExp(`\\b${key}\\b`, 'g');
        if (regex.test(transformedCode)) {
          transformedCode = transformedCode.replace(regex, value);
          hasReplacement = true;
        }
      });

      if (hasReplacement) {
        return {
          code: transformedCode,
          map: null,
        };
      }

      return null;
    },

    // Generate bundle hook - emit CSS file
    generateBundle() {
      if (cssVariables && cssVariables.length > 0) {
        const filename = core.getCSSOutputFilename();

        this.emitFile({
          type: 'asset',
          fileName: filename,
          source: cssVariables,
        });

        if (core.isVerbose()) {
          console.log(`✅ Generated ${filename}`);
        }
      }
    },
  };
}
