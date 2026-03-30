import { defineConfig, Plugin } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import { resolve } from "path";
import { build } from "vite";
import { rename, rm } from "fs/promises";

function buildOtherEntries(): Plugin {
  let hasRun = false;
  return {
    name: "build-other-entries",
    closeBundle: async () => {
      if (hasRun) return;
      hasRun = true;

      await rename(
        resolve(__dirname, "dist/src/ui/import/index.html"),
        resolve(__dirname, "dist/import.html"),
      );

      await build({
        configFile: false,
        plugins: [viteSingleFile()],
        build: {
          outDir: "dist",
          emptyOutDir: false,
          rollupOptions: {
            input: resolve(__dirname, "src/ui/export/index.html"),
          },
        },
      });

      await rename(
        resolve(__dirname, "dist/src/ui/export/index.html"),
        resolve(__dirname, "dist/export.html"),
      );

      await rm(resolve(__dirname, "dist/src"), { recursive: true });

      await build({
        configFile: false,
        build: {
          lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "code",
            fileName: () => "code.js",
            formats: ["iife"],
          },
          outDir: "dist",
          emptyOutDir: false,
          rollupOptions: {
            output: {
              extend: true,
              banner:
                'console.log("DTCG Variables Plugin v2.0 - Build: " + new Date().toISOString() + " - ES5 Compatible");',
            },
          },
        },
        esbuild: {
          target: "es2015",
          minifyIdentifiers: false,
          minifySyntax: false,
        },
      });
    },
  };
}

export default defineConfig({
  plugins: [viteSingleFile(), buildOtherEntries()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, "src/ui/import/index.html"),
    },
  },
  esbuild: {
    target: "es2015",
  },
});
