import { defineConfig } from "@terrazzo/cli";
import css from "@terrazzo/plugin-css";
import { CSS_VAR_PREFIX, DICTIONARY_PATH, TOKEN_FILES } from "./config.js";
import semanticTokens from "./dictionary/semantic.dtcg.json" with { type: "json" };

const tokens = TOKEN_FILES.map((v) => `${DICTIONARY_PATH}/${v}.dtcg.json`);

// Type for mode mappings
interface ModeMappings {
  light: string;
  dark: string;
}

// Build a mapping of semantic token IDs to their primitive references for both modes
function buildSemanticToPrimitiveMap(
  obj: unknown,
  path: string[] = [],
  map: Map<string, ModeMappings> = new Map()
): Map<string, ModeMappings> {
  if (typeof obj !== "object" || obj === null) return map;

  for (const [key, value] of Object.entries(obj)) {
    const currentPath = [...path, key];

    if (key.startsWith("$")) {
      // This is a metadata key
      if (key === "$extensions" && value?.mode) {
        // Found a mode extension
        const lightAlias = value.mode.light;
        const darkAlias = value.mode.dark;
        if (
          typeof lightAlias === "string" &&
          lightAlias.startsWith("{") &&
          typeof darkAlias === "string" &&
          darkAlias.startsWith("{")
        ) {
          const tokenId = currentPath.slice(0, -1).join("."); // Remove $extensions
          map.set(tokenId, {
            light: lightAlias.replace(/[{}]/g, ""),
            dark: darkAlias.replace(/[{}]/g, ""),
          });
        }
      }
      continue;
    }

    if (value && typeof value === "object") {
      if (value.$type === "color" && value.$extensions?.mode) {
        // Found a color token with mode
        const lightAlias = value.$extensions.mode.light;
        const darkAlias = value.$extensions.mode.dark;
        if (
          typeof lightAlias === "string" &&
          lightAlias.startsWith("{") &&
          typeof darkAlias === "string" &&
          darkAlias.startsWith("{")
        ) {
          const tokenId = currentPath.join(".");
          map.set(tokenId, {
            light: lightAlias.replace(/[{}]/g, ""),
            dark: darkAlias.replace(/[{}]/g, ""),
          });
        }
      }
      // Recurse into nested objects
      buildSemanticToPrimitiveMap(value, currentPath, map);
    }
  }

  return map;
}

const semanticToPrimitive = buildSemanticToPrimitiveMap(semanticTokens);

// Primitive patterns - these are mode-independent
const PRIMITIVE_PATTERNS = [
  "chart.**",
  "checkbox.**",
  "color.babyblue.**",
  "color.brand.**",
  "color.charcoal.**",
  "color.format",
  "color.format-light",
  "color.gray.**",
  "color.indigo.**",
  "color.neutral.**",
  "color.off-white",
  "color.orange.**",
  "color.red.**",
  "color.green.**",
  "color.blue.**",
  "color.teal.**",
  "color.violet.**",
  "color.scrim.**",
  "color.shadow.**",
  "color.transparent",
  "color.white",
  "space.**",
  "radius.**",
  "sizing.**",
  "font.**",
];

// Semantic patterns - these change per mode
const SEMANTIC_PATTERNS = [
  "color.background.**",
  "color.foreground.**",
  "color.border.**",
  "color.feedback.**",
  "utility.**",
];

export default defineConfig({
  tokens,
  outDir: "./dist",
  lint: {
    rules: {
      "core/valid-color": "error",
    },
  },
  plugins: [
    // Plugin 1: Primitives only - output once in base :root
    css({
      legacyHex: true,
      filename: "tokens-primitives.css",
      variableName: (token) => `--${CSS_VAR_PREFIX}-${token.id.replace(/\./g, "-")}`,
      include: PRIMITIVE_PATTERNS,
    }),
    // Plugin 2: Semantic tokens - output in mode-specific blocks
    css({
      legacyHex: true,
      filename: "tokens-semantic.css",
      variableName: (token) => `--${CSS_VAR_PREFIX}-${token.id.replace(/\./g, "-")}`,
      transform(token, { permutation }) {
        const modeMappings = semanticToPrimitive.get(token.id);
        if (modeMappings) {
          // This is a semantic token - output a CSS variable reference
          const isDarkMode = permutation?.tzMode === "dark";
          const primitiveId = isDarkMode ? modeMappings.dark : modeMappings.light;
          const cssVar = `--${CSS_VAR_PREFIX}-${primitiveId.replace(/\./g, "-")}`;
          return `var(${cssVar})`;
        }
        return undefined;
      },
      include: SEMANTIC_PATTERNS,
      permutations: [
        {
          input: { tzMode: "light" },
          prepare: (contents) => `:root, [data-theme='light'] {\n${contents}\n}`,
        },
        {
          input: { tzMode: "dark" },
          prepare: (contents) =>
            `@media (prefers-color-scheme: dark) {\n  :root {\n${contents}\n  }\n}\n\n[data-theme='dark'] {\n${contents}\n}`,
        },
      ],
    }),
  ],
});
