/**
 * Shared types for Click UI bundler plugins
 */

export interface PluginOptions {
  /**
   * Path to config file (relative to project root)
   * @default 'click-ui.config.ts'
   */
  configPath?: string;

  /**
   * Custom CSS output filename
   * @default 'theme-vars.css'
   */
  cssOutput?: string;

  /**
   * Enable verbose logging
   * @default false
   */
  verbose?: boolean;

  /**
   * Skip config file discovery (use defaults)
   * @default false
   */
  skipConfigDiscovery?: boolean;
}

export interface LoadedConfig {
  configFile: string | null;
  config: any;
  cssVariables: string;
}

export interface BundlerDefines {
  [key: string]: string;
}
