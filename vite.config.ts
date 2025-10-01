/// <reference types="vitest" />

import { BuildOptions, defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { resolve } from "path";
import dts from "vite-plugin-dts";

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

const buildOptions: BuildOptions = {
  emptyOutDir: false,
  minify: process.env.NODE_ENV === "production",
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
        "react-dom": "ReactDOM",
      },
    },
  },
  sourcemap: process.env.NODE_ENV === "development",
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ["src/"],
      exclude: ["**/*.stories.ts", "**/*.stories.tsx", "**/*.test.ts", "**/*.test.tsx"],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        includePaths: [path.resolve(__dirname, "src")],
        silenceDeprecations: ["legacy-js-api"],
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "cui-mixins": path.resolve(__dirname, "./src/styles/_mixins"),
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
