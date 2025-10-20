/**
 * Example: Using Click UI with Vite
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { clickUIConfig } from '@clickhouse/click-ui/config';
// Or explicitly import Vite version:
// import { viteClickUIConfig } from '@clickhouse/click-ui/config';

export default defineConfig({
  plugins: [
    react(),

    // Auto-discovers click-ui.config.ts in project root
    clickUIConfig(),

    // Or specify custom path:
    // clickUIConfig({ configPath: './my-theme.config.ts' }),

    // Or with options:
    // clickUIConfig({
    //   configPath: './click-ui.config.ts',
    //   cssOutput: 'my-theme-vars.css',
    //   verbose: true,
    // }),
  ],
});
