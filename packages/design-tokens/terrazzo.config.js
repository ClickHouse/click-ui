import { defineConfig } from "@terrazzo/cli";
import css from "@terrazzo/plugin-css";

const DICTIONARY_PATH = './dictionary';
const CSS_VAR_PREFIX = process.env.DESIGN_TOKENS_PREFIX || "cui";

const tokens = [
  'primitives',
  'semantic',
  'spacing',
  'radius',
  'sizing',
  'typography',
].map(v => `${DICTIONARY_PATH}/${v}.dtcg.json`);

export default defineConfig({
  tokens,
  outDir: "./dist",
  lint: {
    rules: {
      // Disable the color format validation to allow hex colors
      "core/valid-color": "off",
    },
  },
  plugins: [
    css({
      filename: "tokens.css",
      variableName: (token) => `--${CSS_VAR_PREFIX}-${token.id.replace(/\./g, "-")}`,
    }),
  ],
});
