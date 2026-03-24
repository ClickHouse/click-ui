import type { StorybookConfig } from "@storybook/react-vite";
const config: StorybookConfig = {
  core: {
    disableTelemetry: true
  },
  stories: [
    "./Introduction.stories.tsx",
    "../src/**/*.stories.@(ts|tsx)",
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
    config.plugins = config.plugins || [];

    // NOTE: Vite 8 workaround: Remove vite-plugin-externalize-deps from Storybook builds due to plugin use of function externals which Rolldown doesn't support
    config.plugins = config.plugins.filter(
      (plugin): plugin is NonNullable<typeof plugin> =>
        plugin != null &&
        typeof plugin === 'object' &&
        'name' in plugin &&
        plugin.name !== 'vite-plugin-externalize-deps'
    );

    return config;
  },
};
export default config;
