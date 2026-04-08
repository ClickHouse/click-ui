import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["legacy/**/index.ts"],
  outDir: "dist/legacy",
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  bundle: false,
  target: "es2020",
  platform: "neutral",
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
