import * as fs from 'fs';
import * as path from 'path';
export function clickUI(options = {}) {
    const configPath = options.configPath || 'click-ui.config.ts';
    let userConfig = {};
    let cssVariables = '';
    return {
        name: 'vite-plugin-click-ui',
        async config(config, { command }) {
            // Load user configuration at build time
            const fullPath = path.resolve(config.root || process.cwd(), configPath);
            if (fs.existsSync(fullPath)) {
                // Use Vite's built-in TS/JS loader
                const { default: loadedConfig } = await import(fullPath + '?t=' + Date.now());
                userConfig = loadedConfig;
                // Generate CSS variables from config
                cssVariables = generateCSSFromConfig(userConfig);
            }
            return {
                define: {
                    // Inject config as global constant
                    '__CLICK_UI_CONFIG__': JSON.stringify(userConfig),
                    '__CLICK_UI_PREFIX__': JSON.stringify(userConfig.cssPrefix || '--click'),
                },
                css: {
                    preprocessorOptions: {
                        scss: {
                            additionalData: `$click-ui-prefix: "${userConfig.cssPrefix || '--click'}";`
                        }
                    }
                }
            };
        },
        transform(code, id) {
            // Transform theme imports to use injected config
            if (id.includes('click-ui') && code.includes('getThemeConfig')) {
                return code.replace('getThemeConfig()', `(() => __CLICK_UI_CONFIG__)()`);
            }
            return null;
        },
        generateBundle(_, bundle) {
            // Generate CSS file with variables
            if (cssVariables) {
                this.emitFile({
                    type: 'asset',
                    fileName: 'theme-vars.css',
                    source: cssVariables
                });
            }
        }
    };
}
function generateCSSFromConfig(config) {
    const prefix = config.cssPrefix || '--click';
    let css = '';
    // Light theme (theme config is the light mode theme)
    if (config.theme) {
        const lightVars = generateVariables(config.theme, prefix);
        css += `@media (prefers-color-scheme: light) {\n  :root {\n${lightVars}  }\n}\n\n`;
        css += `:root[data-theme="light"] {\n${lightVars}}\n\n`;
    }
    // Dark theme (theme + dark overrides)
    // If dark is not defined, theme values are used for dark mode too
    if (config.theme || config.dark) {
        const darkVars = generateVariables({ ...config.theme, ...config.dark }, prefix);
        css += `@media (prefers-color-scheme: dark) {\n  :root {\n${darkVars}  }\n}\n\n`;
        css += `:root[data-theme="dark"] {\n${darkVars}}\n`;
    }
    return css;
}
function generateVariables(obj, prefix, path = []) {
    let vars = '';
    Object.entries(obj).forEach(([key, value]) => {
        if (typeof value === 'string' || typeof value === 'number') {
            const varName = `${prefix}-${[...path, key].join('-')}`;
            vars += `    ${varName}: ${value};\n`;
        }
        else if (typeof value === 'object' && value !== null) {
            vars += generateVariables(value, prefix, [...path, key]);
        }
    });
    return vars;
}
