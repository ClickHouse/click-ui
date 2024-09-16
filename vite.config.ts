/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { resolve } from "path";
import dts from "vite-plugin-dts";

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
    dts({
      include: ["src/"],
      exclude: ["**/*.stories.ts", "**/*.stories.tsx", "**/*.test.ts", "**/*.test.tsx"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: false,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "click-ui",
      formats: ["es", "umd"],
      fileName: format => `click-ui.${format}.js`,
    },
    rollupOptions: {
      // Add _all_ external dependencies here
      external: [
        "react",
        "react-dom",
        "styled-components",
        "**/*.stories.ts",
        "**/*.stories.tsx",
        "**/*.test.ts",
        "**/*.test.tsx",
        "react/jsx-runtime",
      ],
      output: {
        globals: {
          react: "React",
          "styled-components": "styled",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  test: {
    environment: "jsdom",
    include: ["**/*.test.{ts,tsx}"],
    globals: true,
    watch: false,
    exclude: ["node_modules"],
    setupFiles: ["@testing-library/jest-dom", "./setupTests.ts"],
  }
});
