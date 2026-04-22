import type { StorybookConfig } from "@storybook/react-vite";
import { appendFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const DEBUG_LOG_PATH = "/opt/cursor/logs/debug.log";

const appendDebugLog = (payload: unknown) => {
  if (!payload || typeof payload !== "object") {
    return;
  }

  const entry = payload as Record<string, unknown>;
  const normalized = {
    hypothesisId: typeof entry.hypothesisId === "string" ? entry.hypothesisId : "UNKNOWN",
    location: typeof entry.location === "string" ? entry.location : "unknown",
    message: typeof entry.message === "string" ? entry.message : "missing-message",
    data: typeof entry.data === "object" && entry.data !== null ? entry.data : {},
    timestamp: typeof entry.timestamp === "number" ? entry.timestamp : Date.now(),
  };

  mkdirSync(dirname(DEBUG_LOG_PATH), { recursive: true });
  appendFileSync(DEBUG_LOG_PATH, `${JSON.stringify(normalized)}\n`);
};

const config: StorybookConfig = {
  core: {
    disableTelemetry: true
  },
  stories: [
    "./Introduction.mdx",
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

  async viteFinal(config, { configType }) {
    config.plugins = (config.plugins || []).filter((plugin) => {
      const pluginName = plugin && typeof plugin === 'object' && 'name' in plugin ? plugin.name : null;
      return pluginName !== 'css-external';
    });
    config.plugins.push({
      name: 'fix-storybook-mdx-shim',
      resolveId(source) {
        // Intercept the malformed file:// URL and resolve to the correct package
        if (source.includes('mdx-react-shim')) {
          return this.resolve('@mdx-js/react', undefined, { skipSelf: true });
        }
        return null;
      },
    });
    config.plugins.push({
      name: "agent-debug-log-endpoint",
      configureServer(server) {
        server.middlewares.use("/__agent-debug-log", (req, res) => {
          if (req.method !== "POST") {
            res.statusCode = 405;
            res.end("Method Not Allowed");
            return;
          }

          let body = "";
          req.on("data", chunk => {
            body += chunk.toString();
          });

          req.on("end", () => {
            try {
              appendDebugLog(JSON.parse(body || "{}"));
              res.statusCode = 204;
              res.end();
            } catch {
              res.statusCode = 400;
              res.end("Invalid JSON");
            }
          });
        });
      },
    });

    // Suppress Rollup warnings for production builds
    if (configType === 'PRODUCTION') {
      config.build = config.build || {};
      config.build.rollupOptions = config.build.rollupOptions || {};
      const originalOnWarn = config.build.rollupOptions.onwarn;
      config.build.rollupOptions.onwarn = (warning, warn) => {
        if (warning.message?.includes('mdx-react-shim')) return;
        originalOnWarn ? originalOnWarn(warning, warn) : warn(warning);
      };
    }

    return config;
  },
};
export default config;
