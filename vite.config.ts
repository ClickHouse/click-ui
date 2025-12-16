/// <reference types="vitest" />

import { BuildOptions, defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { resolve } from "path";
import dts from "vite-plugin-dts";
import { copyFileSync, mkdirSync } from "fs";

const buildType = process.argv[4];
const isBundledBuild = buildType === "bundled";

const externalLibraries = [
  "dayjs",
  "react",
  "react-dom",
  "**/*.stories.ts",
  "**/*.stories.tsx",
  "**/*.test.ts",
  "**/*.test.tsx",
  "react/jsx-runtime",
];

if (!isBundledBuild) {
  externalLibraries.push("styled-components");
}

const buildOptions: BuildOptions = {
  emptyOutDir: false,
  minify: false,
  lib: {
    entry: resolve(__dirname, "src/index.ts"),
    name: "click-ui",
    formats: ["es", "umd"],
    fileName: format =>
      isBundledBuild ? `click-ui.bundled.${format}.js` : `click-ui.${format}.js`,
  },
  rollupOptions: {
    // Add _all_ external dependencies here
    external: externalLibraries,
    output: {
      globals: {
        dayjs: "dayjs",
        react: "React",
        "styled-components": "styled",
        "react-dom": "ReactDOM",
      },
    },
  },
  sourcemap: true,
};

// Plugin to copy CSS files to dist after build
const copyCSSPlugin = () => ({
  name: "copy-css",
  closeBundle() {
    if (!isBundledBuild) {
      try {
        mkdirSync(resolve(__dirname, "dist"), { recursive: true });

        // Copy SCSS theme CSS (filtered for migrated components only)
        copyFileSync(
          resolve(__dirname, "src/styles/cui-scss-theme.css"),
          resolve(__dirname, "dist/cui-scss-theme.css")
        );

        console.log("✅ Copied cui-scss-theme.css to dist/");
      } catch (error) {
        console.error("❌ Failed to copy CSS files:", error);
      }
    }
  },
});

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
    copyCSSPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "cui-mixins": path.resolve(__dirname, "./src/styles/_mixins.scss"),
      "cui-variants": path.resolve(__dirname, "./src/styles/_cui-variants.scss"),
    },
  },
  build: buildOptions,
  test: {
    environment: "jsdom",
    include: ["**/*.test.{ts,tsx}"],
    globals: true,
    watch: false,
    exclude: ["node_modules"],
    setupFiles: ["@testing-library/jest-dom", "./setupTests.ts"],
  },
});
