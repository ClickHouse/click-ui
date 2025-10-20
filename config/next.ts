/**
 * Next.js plugin for Click UI configuration
 * Uses shared core for config discovery and CSS generation
 */

import type { NextConfig } from 'next';
import { ClickUIConfigCore } from './core';
import type { PluginOptions } from './types';
import * as path from 'path';
import * as fs from 'fs';

export function clickUIConfig(options: PluginOptions = {}) {
  return (nextConfig: NextConfig = {}): NextConfig => {
    const core = new ClickUIConfigCore(options);

    return {
      ...nextConfig,

      // Extend webpack configuration
      webpack(config, context) {
        const { isServer, dev, dir } = context;
        const root = dir || process.cwd();

        // Initialize Click UI config
        (async () => {
          try {
            const result = await core.initialize(root);
            const loadedConfig = result.config;
            const cssVariables = result.cssVariables;

            // Add webpack DefinePlugin for global constants
            const webpack = await import('webpack');
            const defines = core.createDefines(loadedConfig);

            config.plugins = config.plugins || [];
            config.plugins.push(
              new webpack.DefinePlugin(defines)
            );

            // Write CSS file to public directory (Next.js specific)
            if (!isServer && cssVariables && cssVariables.length > 0) {
              const publicDir = path.join(root, 'public');
              const cssFilePath = path.join(publicDir, core.getCSSOutputFilename());

              // Ensure public directory exists
              if (!fs.existsSync(publicDir)) {
                fs.mkdirSync(publicDir, { recursive: true });
              }

              // Write CSS file
              fs.writeFileSync(cssFilePath, cssVariables, 'utf-8');

              if (core.isVerbose()) {
                console.log(`✅ Generated ${core.getCSSOutputFilename()} in public/`);
              }
            }
          } catch (error) {
            console.error('❌ Failed to initialize Click UI config:', error);
          }
        })();

        // Call original webpack config if it exists
        if (typeof nextConfig.webpack === 'function') {
          return nextConfig.webpack(config, context);
        }

        return config;
      },

      // Add env variables for build-time access
      env: {
        ...nextConfig.env,
        CLICK_UI_CONFIG_LOADED: 'true',
      },
    };
  };
}
