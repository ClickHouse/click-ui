import type { StorybookConfig } from "@storybook/react-vite";
const config: StorybookConfig = {
  core: {
    disableTelemetry: true
  },
  stories: [
    "../src/Introduction.mdx", 
    "../src/components/icons/Icons.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    {
      name: '@storybook/addon-storysource',
      options: {
        loaderOptions: {
          prettierConfig: { printWidth: 80, singleQuote: false },
        },
      },
    },
    //"@storybook/addon-interactions",
    "storybook-addon-pseudo-states",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../public"],
};
export default config;
