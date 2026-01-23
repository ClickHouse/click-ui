import { BuildOptions, defineConfig, mergeConfig } from "vite";
import { defineConfig as defineVitestConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";
import dts from "vite-plugin-dts";
import { glob } from "glob";

const external = (id: string) => {
  if (id === "react" || id.startsWith("react/")) return true;
  if (id === "react-dom" || id.startsWith("react-dom/")) return true;
  if (id.includes(".test.ts") || id.includes(".stories.ts")) return true;
  if (id === "dayjs") return true;
  if (id === "styled-components") return true;

  if (!id.startsWith(".") && !id.startsWith("/") && !id.startsWith("\0")) return true;

  return false;
};

const buildOptions: BuildOptions = {
  target: "esnext",
  // WARNING: Do not empty to preserve typescript artifacts
  emptyOutDir: false,
  // WARNING: This is an unbundled build
  // Do not minify unbundled builds, let the consumer do it
  // otherwise, tree shaking will fail, bundling, etc.
  minify: false,
  // lib: {
  //   entry: path.resolve(__dirname, "src/index.ts"),
  //   formats: ["es"],
  //   fileName: () => `[name].js`,
  // },
  lib: {
    entry: glob.sync(path.resolve(__dirname, "src/**/*.{ts,tsx}"), {
      ignore: ["**/*.test.{ts,tsx}", "**/*.stories.{ts,tsx}"],
    }),
    formats: ["es"],
    fileName: () => `[name].js`,
  },
  rollupOptions: {
    external,
    output: {
      preserveModules: true,
      preserveModulesRoot: "src",
      entryFileNames: "[name].js",
      banner: chunk => {
        if (chunk.name === "index") {
          return `'use client';`;
        }
        return "";
      },
      interop: "auto",
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
    {
      name: "resolve-tsconfig-paths-to-relative",
      enforce: "post",
      apply: "build",
      generateBundle(options, bundle) {
        for (const fileName in bundle) {
          const chunk = bundle[fileName];

          if (chunk.type === "chunk" && chunk.code) {
            // fileName is like: "components/Select/common/InternalSelect.js"
            // We need to calculate relative path from this file to the target

            chunk.code = chunk.code.replace(
              /(from|import)\s+['"]@\/([^'"]+)['"]/g,
              (match, keyword, importPath) => {
                // Get the directory of the current file (relative to output root)
                const currentFileDir = path.dirname(fileName);

                // The target is relative to output root
                const targetPath = importPath;

                // Calculate relative path from current file to target
                let relativePath = path.relative(currentFileDir, targetPath);

                // Handle empty path (same directory)
                if (relativePath === "") {
                  // Extract the file name from importPath
                  const targetFileName = path.basename(importPath);
                  relativePath = "./" + targetFileName;
                } else {
                  // Normalize path separators for consistency
                  relativePath = relativePath.split(path.sep).join("/");

                  // Ensure it starts with ./ or ../
                  if (!relativePath.startsWith(".")) {
                    relativePath = "./" + relativePath;
                  }
                }

                // Check if this path corresponds to a directory in the bundle
                // by looking for an index.js file at that location
                const potentialIndexPath = targetPath + "/index.js";
                const hasIndexFile = Object.keys(bundle).some(
                  f => f === potentialIndexPath
                );

                if (hasIndexFile) {
                  // It's a directory with an index file, don't add .js
                  // The path should point to the directory, and bundlers will resolve to index.js
                  // We don't need to do anything special
                } else {
                  // Add .js extension if not already present and not a directory index
                  if (!relativePath.endsWith(".js") && !relativePath.endsWith("/")) {
                    relativePath += ".js";
                  }
                }

                return `${keyword} '${relativePath}'`;
              }
            );
          }
        }
      },
    },
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
