/**
 * Webpack plugin for Click UI configuration
 * Uses shared core for config discovery and CSS generation
 */

import type { Compiler, WebpackPluginInstance } from 'webpack';
import { ClickUIConfigCore } from './core';
import type { PluginOptions } from './types';
import { Compilation, sources } from 'webpack';

export function clickUIConfig(options: PluginOptions = {}): WebpackPluginInstance {
  const core = new ClickUIConfigCore(options);
  let loadedConfig: any = null;
  let cssVariables = '';

  return {
    apply(compiler: Compiler) {
      const pluginName = 'ClickUIConfigPlugin';

      // Initialize config at the start of compilation
      compiler.hooks.beforeCompile.tapAsync(pluginName, async (params, callback) => {
        try {
          const root = compiler.context || process.cwd();
          const result = await core.initialize(root);

          loadedConfig = result.config;
          cssVariables = result.cssVariables;

          callback();
        } catch (error) {
          console.error('❌ Failed to initialize Click UI config:', error);
          callback();
        }
      });

      // Add config as webpack DefinePlugin globals
      compiler.hooks.compilation.tap(pluginName, (compilation) => {
        const defines = core.createDefines(loadedConfig);

        // Inject defines into compilation
        Object.entries(defines).forEach(([key, value]) => {
          compilation.hooks.processAssets.tap(
            {
              name: pluginName,
              stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
            },
            () => {
              // Make defines available globally
              (compilation as any).valueCacheVersions.set(key, value);
            }
          );
        });
      });

      // Emit CSS file as asset
      compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
        compilation.hooks.processAssets.tap(
          {
            name: pluginName,
            stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
          },
          () => {
            if (cssVariables && cssVariables.length > 0) {
              const filename = core.getCSSOutputFilename();

              compilation.emitAsset(
                filename,
                new sources.RawSource(cssVariables)
              );

              if (core.isVerbose()) {
                console.log(`✅ Generated ${filename}`);
              }
            }
          }
        );
      });

      // Watch config file for changes
      compiler.hooks.afterCompile.tap(pluginName, (compilation) => {
        const root = compiler.context || process.cwd();
        const configFile = core.findConfigFile(root);

        if (configFile) {
          compilation.fileDependencies.add(configFile);
        }
      });
    },
  };
}
