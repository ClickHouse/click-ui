/**
 * Click UI Bundler Plugins
 *
 * Universal configuration plugins for Vite, Webpack, Rollup, and Next.js
 *
 * @example Vite
 * ```ts
 * import { clickUIConfig } from '@clickhouse/click-ui/config';
 * // or
 * import { viteClickUIConfig } from '@clickhouse/click-ui/config';
 *
 * export default defineConfig({
 *   plugins: [clickUIConfig()],
 * });
 * ```
 *
 * @example Webpack
 * ```ts
 * import { webpackClickUIConfig } from '@clickhouse/click-ui/config';
 *
 * module.exports = {
 *   plugins: [webpackClickUIConfig()],
 * };
 * ```
 *
 * @example Rollup
 * ```ts
 * import { rollupClickUIConfig } from '@clickhouse/click-ui/config';
 *
 * export default {
 *   plugins: [rollupClickUIConfig()],
 * };
 * ```
 *
 * @example Next.js
 * ```ts
 * import { nextClickUIConfig } from '@clickhouse/click-ui/config';
 *
 * export default nextClickUIConfig()({
 *   // your next config
 * });
 * ```
 */

// Export bundler-specific plugins
export { clickUIConfig as viteClickUIConfig } from './vite';
export { clickUIConfig as webpackClickUIConfig } from './webpack';
export { clickUIConfig as rollupClickUIConfig } from './rollup';
export { clickUIConfig as nextClickUIConfig } from './next';

// Export default (Vite) for convenience
export { clickUIConfig } from './vite';

// Export types
export type { PluginOptions, LoadedConfig, BundlerDefines } from './types';

// Export core for advanced usage
export { ClickUIConfigCore } from './core';
