import type { Plugin, ResolvedConfig } from 'vite';
import { preprocessCssModules } from './css-preprocess';
import { resolveCssModule, loadCssModule } from './virtual-modules';
import { injectComponentCss, injectRegularCssImports } from './import-inject';
import { copyCssFiles, preventCssNameOverwrites } from './utils';
import path from 'path';

interface TrackedCssImport {
  sourceFile: string;
  cssPaths: string[];
}

const REGULAR_CSS_IMPORT_REGEX = /import\s+['"]([^'"]+\.css)['"];?/g;

/**
 * Vite plugin that:
 * 1. Pre-processes CSS modules (creates hashed CSS + JSON mappings)
 * 2. Handles CSS module imports as virtual modules
 * 3. Copies CSS files to dist and injects imports into JS files
 * 4. Removes empty css comments from output
 */
export const cssColocatePlugin = (): Plugin => {
  let config: ResolvedConfig;
  const trackedImports: TrackedCssImport[] = [];

  return {
    name: 'vite-plugin-css-colocate',
    apply: 'build',

    async buildStart() {
      // WARN: Reset between rebuilds
      // to prevent future build:watch transform to keep
      // appending, causing duplicate CSS imports
      // on each rebuild
      trackedImports.length = 0;
      await preprocessCssModules(config.root);
    },

    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },

    async resolveId(id, importer) {
      return resolveCssModule(id, importer, config.root);
    },

    async load(id) {
      return loadCssModule(id, this, config.root);
    },

    transform(code, id) {
      if (id.includes('node_modules') || !/\.[jt]sx?$/.test(id)) return null;

      // Track regular CSS imports (not .module.css)
      const cssImports: string[] = [];
      let match: RegExpExecArray | null;

      REGULAR_CSS_IMPORT_REGEX.lastIndex = 0;
      while ((match = REGULAR_CSS_IMPORT_REGEX.exec(code)) !== null) {
        if (!match[1].endsWith('.module.css')) {
          cssImports.push(match[1]);
        }
      }

      if (cssImports.length) {
        trackedImports.push({ sourceFile: id, cssPaths: cssImports });
      }

      return null;
    },

    async closeBundle() {
      const formats = [
        { format: 'esm' as const, ext: 'js' as const },
        { format: 'cjs' as const, ext: 'cjs' as const },
      ];

      // WARN: Prevents CSS file name collisions between processed .module.css files and regular .css files. E.g. throws an error if a .module.css file would produce the same output name as a .css file. This check is format-independent because it validates source files, not output.
      await preventCssNameOverwrites(config.root);

      for (const { format, ext } of formats) {
        const distDir = path.join(config.root, 'dist', format);

        await copyCssFiles(config.root, distDir);

        await injectComponentCss(distDir, format, ext);

        await injectRegularCssImports(trackedImports, config.root, distDir, format);
      }
    },
  };
};

export default cssColocatePlugin;
