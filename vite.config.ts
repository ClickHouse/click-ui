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
