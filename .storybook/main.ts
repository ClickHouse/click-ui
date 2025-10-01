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

  staticDirs: ["../public"],
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
      shouldRemoveUndefinedFromOptional: true,
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop =>
        prop.parent ? !/node_modules\/(?!@radix-ui)/.test(prop.parent.fileName) : true,
    },
  },

  async viteFinal(config) {
    if (config.css?.preprocessorOptions?.scss) {
      config.css.preprocessorOptions.scss.api = 'modern-compiler';
    } else {
      config.css = config.css || {};
      config.css.preprocessorOptions = config.css.preprocessorOptions || {};
      config.css.preprocessorOptions.scss = {
        api: 'modern-compiler'
      };
    }
    return config;
  },
};
export default config;
