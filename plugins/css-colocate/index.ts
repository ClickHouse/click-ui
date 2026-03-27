import type { Plugin, ResolvedConfig } from 'vite';
import { preprocessCssModules } from './css-preprocess';
import { resolveCssModule, loadCssModule } from './virtual-modules';
import { injectComponentCss, injectRegularCssImports } from './import-inject';
import { copyCssFiles, getTempDir } from './utils';
import fs from 'fs-extra';
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
      // Clean old temp files and pre-process CSS modules
      await fs.remove(getTempDir(config.root));
      await preprocessCssModules(config.root);
    },

    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },

    async resolveId(id, importer) {
      return resolveCssModule(id, importer, config.root);
    },

    async load(id) {
      return loadCssModule(id, this);
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

      for (const { format, ext } of formats) {
        const distDir = path.join(config.root, 'dist', format);

        // Copy all CSS files (from temp and src)
        await copyCssFiles(config.root, distDir);

        // Inject CSS imports into component files
        await injectComponentCss(distDir, format, ext);

        // Inject CSS imports into files with tracked imports
        await injectRegularCssImports(trackedImports, config.root, distDir, format);
      }
    },
  };
};

export default cssColocatePlugin;
