import type { StorybookConfig } from "@storybook/react-vite";
const config: StorybookConfig = {
  core: {
    disableTelemetry: true,
  },
  stories: [
    "../src/Introduction.mdx",
    "../src/components/icons/Icons.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
  ],

  addons: [
    "@storybook/addon-links", //"@storybook/addon-interactions",
    "storybook-addon-pseudo-states",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],

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

  viteFinal: async (config, { configType }) => {
    const { mergeConfig } = await import("vite");

    // Workaround for Storybook 10.0.7 bug where MDX files generate file:// imports
    // See: https://github.com/storybookjs/storybook/issues (mdx-react-shim resolution)
    config.plugins = config.plugins || [];
    config.plugins.push({
      name: "fix-storybook-mdx-shim",
      resolveId(source) {
        // Intercept the malformed file:// URL and resolve to the correct package
        if (source.includes("mdx-react-shim")) {
          return this.resolve("@mdx-js/react", undefined, { skipSelf: true });
        }
        return null;
      },
    });

    // Suppress Rollup warnings for production builds
    if (configType === "PRODUCTION") {
      config.build = config.build || {};
      config.build.rollupOptions = config.build.rollupOptions || {};
      const originalOnWarn = config.build.rollupOptions.onwarn;
      config.build.rollupOptions.onwarn = (warning, warn) => {
        if (warning.message?.includes("mdx-react-shim")) {
          return;
        }
        if (originalOnWarn) {
          originalOnWarn(warning, warn);
        } else {
          warn(warning);
        }
      };
    }

    return mergeConfig(config, {
      css: {
        preprocessorOptions: {
          scss: {
            api: "modern-compiler",
          },
        },
      },
    });
  },
};
export default config;
