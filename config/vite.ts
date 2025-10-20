/**
 * Vite plugin for Click UI configuration
 * Uses shared core for config discovery and CSS generation
 */

import type { Plugin, ResolvedConfig } from 'vite';
import { ClickUIConfigCore } from './core';
import type { PluginOptions } from './types';

export function clickUIConfig(options: PluginOptions = {}): Plugin {
  const core = new ClickUIConfigCore(options);
  let resolvedRoot: string;
  let loadedConfig: any = null;
  let cssVariables = '';

  return {
    name: 'click-ui-config',

    // Load config during Vite config resolution
    async config(config) {
      const root = config.root || process.cwd();
      resolvedRoot = root;

      try {
        const result = await core.initialize(root);
        loadedConfig = result.config;
        cssVariables = result.cssVariables;

        // Return Vite config modifications
        return {
          define: core.createDefines(loadedConfig),
        };
      } catch (error) {
        console.error('❌ Failed to initialize Click UI config:', error);
        return {
          define: core.createDefines({}),
        };
      }
    },

    // Store resolved config for later use
    configResolved(config: ResolvedConfig) {
      resolvedRoot = config.root;
    },

    // Emit CSS file with theme variables
    generateBundle() {
      if (cssVariables && cssVariables.length > 0) {
        this.emitFile({
          type: 'asset',
          fileName: core.getCSSOutputFilename(),
          source: cssVariables,
        });

        if (core.isVerbose()) {
          console.log(`✅ Generated ${core.getCSSOutputFilename()}`);
        }
      }
    },

    // Watch config file for changes in dev mode
    async handleHotUpdate({ file, server }) {
      const configFile = core.findConfigFile(resolvedRoot);

      if (configFile && file === configFile) {
        console.log('🔄 Config file changed, reloading...');
        core.clearCache();

        // Re-initialize with new config
        const result = await core.initialize(resolvedRoot);
        loadedConfig = result.config;
        cssVariables = result.cssVariables;

        // Trigger full reload
        server.ws.send({
          type: 'full-reload',
          path: '*',
        });
      }
    },
  };
}
