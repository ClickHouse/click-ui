import { pathToFileURL } from 'url';

/**
 * Load Click UI configuration file
 * Handles TypeScript, JavaScript, ESM, and CommonJS formats
 *
 * @param configFile - Full path to config file
 * @returns Loaded configuration object
 * @throws Error if config cannot be loaded or TypeScript file without tsx
 *
 * @example
 * ```typescript
 * const config = await loadConfig('/path/to/click-ui.config.js');
 * console.log('Theme:', config.theme);
 * ```
 */
export async function loadConfig(configFile: string): Promise<any> {
  try {
    // For ES modules (.js, .mjs, .ts)
    if (configFile.endsWith('.js') || configFile.endsWith('.mjs') || configFile.endsWith('.ts')) {
      // TypeScript files require tsx or ts-node
      if (configFile.endsWith('.ts')) {
        console.log('⚠️  TypeScript config files require tsx or ts-node to be installed');
        console.log('   Run: npx tsx node_modules/@clickhouse/click-ui/bin/commands/generate.js');
        console.log('   Or convert your config to .js format');
        process.exit(1);
      }

      // Convert to file URL for proper ESM import
      const fileUrl = pathToFileURL(configFile).href;
      const module = await import(fileUrl);
      return module.default || module;
    }

    // For CommonJS (.cjs)
    if (configFile.endsWith('.cjs')) {
      return require(configFile);
    }

    throw new Error(`Unsupported config file extension: ${configFile}`);
  } catch (error: any) {
    throw new Error(`Failed to load config from ${configFile}: ${error.message}`);
  }
}

/**
 * Validate that config has required theme properties
 *
 * @param config - Configuration object to validate
 * @returns true if config has theme or dark properties
 *
 * @example
 * ```typescript
 * if (!validateConfig(config)) {
 *   console.error('Config missing theme configuration');
 * }
 * ```
 */
export function validateConfig(config: any): boolean {
  return !!(config && (config.theme || config.dark));
}
