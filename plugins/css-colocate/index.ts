import type { Plugin, ResolvedConfig } from 'vite';
import { preprocessCssModules } from './css-preprocess';
import { resolveCssModule, loadCssModule } from './virtual-modules';
import { injectModuleCssImports, injectRegularCssImports } from './import-inject';
import { copyCssFiles } from './utils';
import path from 'path';

interface TrackedCssImport {
  sourceFile: string;
  cssPaths: string[];
}

const REGULAR_CSS_IMPORT_REGEX = /import\s+['"]([^'"]+\.css)['"];?/g;
// Matches `import styles from './x.module.css'`, `import * as s from …`,
// `import { a } from …`, and bare `import './x.module.css'`.
const MODULE_CSS_IMPORT_REGEX =
  /import\s+(?:(?:[\w$]+|\*\s+as\s+[\w$]+|\{[^}]*\})\s+from\s+)?['"]([^'"]+\.module\.css)['"]/g;

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
  const trackedModuleImports: TrackedCssImport[] = [];

  return {
    name: 'vite-plugin-css-colocate',
    apply: 'build',

    async buildStart() {
      // WARN: Reset between rebuilds
      // to prevent future build:watch transform to keep
      // appending, causing duplicate CSS imports
      // on each rebuild
      trackedImports.length = 0;
      trackedModuleImports.length = 0;
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
      if (id.includes('node_modules') || !/\.[jt]sx?$/.test(id)) {
        return null;
      }

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

      // Track .module.css imports so the colocated rules file is injected into
      // every importer, not just the directory's index file.
      const moduleCssImports: string[] = [];
      MODULE_CSS_IMPORT_REGEX.lastIndex = 0;
      while ((match = MODULE_CSS_IMPORT_REGEX.exec(code)) !== null) {
        moduleCssImports.push(match[1]);
      }

      if (moduleCssImports.length) {
        trackedModuleImports.push({ sourceFile: id, cssPaths: moduleCssImports });
      }

      return null;
    },

    async closeBundle() {
      const formats = ['esm', 'cjs'] as const;

      for (const format of formats) {
        const distDir = path.join(config.root, 'dist', format);

        // Copy all CSS files (from temp and src)
        await copyCssFiles(config.root, distDir);

        // Inject colocated .module.css rules into every importer
        await injectModuleCssImports(trackedModuleImports, config.root, distDir, format);

        // Inject CSS imports into files with tracked imports
        await injectRegularCssImports(trackedImports, config.root, distDir, format);
      }
    },
  };
};

export default cssColocatePlugin;
