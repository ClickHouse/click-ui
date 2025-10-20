import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Add this alias to enable auto-discovery of click-ui.config.ts
      'click-ui-config': path.resolve(__dirname, './click-ui.config.ts'),
    },
  },
});
