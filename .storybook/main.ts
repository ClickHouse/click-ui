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

  addons: ["@storybook/addon-links", //"@storybook/addon-interactions",
  "storybook-addon-pseudo-states", "@storybook/addon-a11y", "@storybook/addon-docs"],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  staticDirs: ["../public"]
};
export default config;
