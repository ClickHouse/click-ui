import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-styled-components", { displayName: false }]],

        env: {
          development: {
            plugins: [["babel-plugin-styled-components", { displayName: true }]],
          },
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "clcik-ui",
      formats: ["es", "umd"],
      fileName: format => `click-ui.${format}.js`,
    },
    rollupOptions: {
      // Add _all_ external dependencies here
      external: ["react", "react-dom", "styled-components"],
    },
  },
});
