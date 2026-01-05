import StyleDictionary, { getStyleDictionaryConfig } from "./style-dictionary.config.js";

const config = await getStyleDictionaryConfig();
const { themes, configs } = config;

const scssSD = new StyleDictionary(configs.scss);
await scssSD.cleanAllPlatforms();
await scssSD.buildAllPlatforms();

for (const theme of themes) {
  const themeSD = new StyleDictionary(configs.theme(theme));
  await themeSD.cleanAllPlatforms();
  await themeSD.buildAllPlatforms();
}
