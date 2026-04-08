import { defineConfig } from "tsup";
import { globSync } from "glob";

const entries = globSync("legacy/**/index.ts");

export default defineConfig({
  entry: entries,
  outDir: "dist/legacy",
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  bundle: false,
  target: "es2020",
  platform: "browser",
  esbuildOptions(options) {
    // NOTE: InitCUIThemeScript.tsx contains JSX syntax
    options.jsx = "transform";
  },
  outExtension({ format }) {
    return {
      js: format === "cjs" ? ".cjs" : ".js",
      dts: format === "cjs" ? ".d.cts" : ".d.ts",
    };
  },
});
