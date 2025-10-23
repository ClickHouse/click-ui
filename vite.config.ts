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
  // Note: "click-ui-config" is intentionally NOT external
  // It's loaded via optional dynamic import with graceful fallback
];

const buildOptions: BuildOptions = {
  target: "baseline-widely-available",
  emptyOutDir: false,
  minify: true,
  lib: {
    entry: resolve(__dirname, "src/index.ts"),
    name: "click-ui",
    formats: ["es", "umd"],
    fileName: format =>
      isBundledBuild ? `click-ui.bundled.${format}.js` : `click-ui.${format}.js`,
  },
  rollupOptions: {
    // Add _all_ external dependencies here
    external: id => {
      // Mark all listed libraries as external
      if (externalLibraries.some(lib => id === lib || id.startsWith(lib + "/"))) {
        return true;
      }
      // Force ALL React imports to be external, even from dependencies
      if (
        id === "react" ||
        id.startsWith("react/") ||
        id === "react-dom" ||
        id.startsWith("react-dom/")
      ) {
        return true;
      }
      return false;
    },
    output: {
      globals: {
        dayjs: "dayjs",
        react: "React",
        "react-dom": "ReactDOM",
        "react/jsx-runtime": "jsxRuntime",
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
    modules: {
      // Use consistent class name generation for library builds
      // Format: _className_hash where hash is deterministic
      generateScopedName: "[local]_[hash:base64:5]",
    },
    preprocessorOptions: {
      scss: {
        // Auto-inject tokens import in all SCSS files
        // Components can directly use: tokens.$clickGlobalColorBackgroundDefault
        additionalData: `@use "@/styles/tokens-light-dark.scss" as tokens;\n`,
      },
    },
    postcss: {
      plugins: [
        {
          // Wrap only CSS custom properties in @layer for easy consumer override
          postcssPlugin: "wrap-tokens-in-layer",
          Once(root, { AtRule }) {
            // 1. Add layer declaration for tokens at the top
            const layerDeclaration = new AtRule({
              name: "layer",
              params: "click-ui.tokens",
            });
            root.prepend(layerDeclaration);

            // 2. Find and wrap only :root rules with CSS custom properties
            const tokenRules = [];
            const otherNodes = [];

            root.each(node => {
              if (node === layerDeclaration) {
                return; // Skip the layer declaration itself
              }

              if (node.type === "rule" && node.selector === ":root") {
                // Check if it contains CSS custom properties
                const hasCustomProps = node.nodes?.some(
                  child => child.type === "decl" && child.prop.startsWith("--")
                );
                if (hasCustomProps) {
                  tokenRules.push(node.clone());
                  node.remove();
                  return;
                }
              }

              // Keep all other nodes as-is (component classes stay unlayered)
              otherNodes.push(node);
            });

            // 3. Wrap tokens in @layer click-ui.tokens
            if (tokenRules.length > 0) {
              const tokensLayer = new AtRule({
                name: "layer",
                params: "click-ui.tokens",
              });
              tokenRules.forEach(rule => tokensLayer.append(rule));
              root.append(tokensLayer);
            }

            // 4. Component styles stay unlayered (normal priority)
            // This allows consumers to override with regular CSS
          },
        },
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "cui-mixins": path.resolve(__dirname, "./src/styles/_mixins"),
      "cui-variants": path.resolve(__dirname, "./src/styles/_cui-variants"),
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
