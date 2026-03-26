import { defineConfig } from "@terrazzo/cli";
import css from "@terrazzo/plugin-css";
import { CSS_VAR_PREFIX, DICTIONARY_PATH, TOKEN_FILES } from "./config.js";

const tokens = TOKEN_FILES.map((v) => `${DICTIONARY_PATH}/${v}.dtcg.json`);

export default defineConfig({
  tokens,
  outDir: "./dist",
  lint: {
    rules: {
      // TODO: Pick colour space
      // Disable the color format validation to allow hex colors
      "core/valid-color": "off",
    },
  },
  plugins: [
    css({
      legacyHex: true,
      filename: "tokens.css",
      variableName: (token) => `--${CSS_VAR_PREFIX}-${token.id.replace(/\./g, "-")}`,
      modeSelectors: [
        { mode: "light", selectors: [":root", "[data-theme='light']"] },
        {
          mode: "dark",
          selectors: [
            "@media (prefers-color-scheme: dark)",
            "[data-theme='dark']",
          ],
        },
      ],
    }),
  ],
});
