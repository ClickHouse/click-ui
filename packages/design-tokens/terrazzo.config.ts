import { defineConfig } from "@terrazzo/cli";
import css from "@terrazzo/plugin-css";
import { CSS_VAR_PREFIX, DICTIONARY_PATH, TOKEN_FILES } from "./config.js";

const tokens = TOKEN_FILES.map((v) => `${DICTIONARY_PATH}/${v}.dtcg.json`);

export default defineConfig({
  tokens,
  outDir: "./dist",
  lint: {
    rules: {
      "core/valid-color": "error",
    },
  },
  plugins: [
    css({
      legacyHex: true,
      filename: "tokens.css",
      variableName: (token) => `--${CSS_VAR_PREFIX}-${token.id.replace(/\./g, "-")}`,
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
