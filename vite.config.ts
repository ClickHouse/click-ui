/// <reference types="vitest" />

import { BuildOptions, defineConfig, mergeConfig } from "vite";
import { defineConfig as defineVitestConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path, { resolve } from "path";
import dts from "vite-plugin-dts";

const buildType = process.argv[4];
const isBundledBuild = buildType === "bundled";

const external = (id: string) => {
  if (id === "react" || id.startsWith("react/")) return true;
  if (id === "react-dom" || id.startsWith("react-dom/")) return true;
  if (id.includes(".test.ts") || id.includes(".stories.ts")) return true;

  if (id === "dayjs") return true;

  if (!isBundledBuild && id === "styled-components") return true;

  return false;
};

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
    external,
    output: {
      globals: {
        dayjs: "dayjs",
        react: "React",
        "styled-components": "styled",
        "react-dom": "ReactDOM",
        "react/jsx-runtime": "jsxRuntime",
      },
    },
  },
  sourcemap: true,
};

const viteConfig = defineConfig({
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
  css: {
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
    },
  },
  build: buildOptions,
});

const vitestConfig = defineVitestConfig({
  test: {
    environment: "jsdom",
    include: ["**/*.test.{ts,tsx}"],
    globals: true,
    watch: false,
    exclude: ["node_modules"],
    setupFiles: ["@testing-library/jest-dom", "./setupTests.ts"],
  },
});

export default mergeConfig(viteConfig, vitestConfig);
