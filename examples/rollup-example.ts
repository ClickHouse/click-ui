/**
 * Example: Using Click UI with Rollup
 */

import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import { rollupClickUIConfig } from '@clickhouse/click-ui/config';

export default defineConfig({
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es',
  },
  plugins: [
    typescript(),

    // Auto-discovers click-ui.config.ts in project root
    rollupClickUIConfig(),

    // Or with options:
    // rollupClickUIConfig({
    //   configPath: './click-ui.config.ts',
    //   cssOutput: 'theme-vars.css',
    //   verbose: true,
    // }),
  ],
});
