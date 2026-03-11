import type { Plugin, ResolvedConfig } from 'vite';
import path from 'path';
import { preprocessCssModules } from './css-preprocess';
import { resolveCssModule, loadCssModule } from './virtual-modules';
import { copyCssFiles } from './css-operations';
import { injectComponentCss } from './import-inject';

interface RegularCssImport {
  sourceFile: string;
  cssPaths: string[];
}

export const cssColocatePlugin = (): Plugin => {
  let config: ResolvedConfig;
  const regularImports: RegularCssImport[] = [];
  const CSS_IMPORT_REGEX = /import\s+['"]([^'"]+\.css)['"];?/g;

  return {
    name: 'vite-plugin-css-colocate',
    apply: 'build',
    enforce: 'pre',

    // Preprocess CSS modules before build starts
    async buildStart() {
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

      const imports: string[] = [];
      let match: RegExpExecArray | null;

      while ((match = CSS_IMPORT_REGEX.exec(code)) !== null) {
        if (!match[1].endsWith('.module.css')) imports.push(match[1]);
      }

      if (imports.length) {
        regularImports.push({ sourceFile: id, cssPaths: imports });
      }

      return null;
    },

    async closeBundle() {
      const outputs = [
        { format: 'esm' as const, ext: 'js' as const },
        { format: 'cjs' as const, ext: 'cjs' as const },
      ];

      for (const { format, ext } of outputs) {
        await copyCssFiles(config, format);
        await injectComponentCss(path.join(config.root, 'dist', format), format, ext);
      }
    },
  };
};

export default cssColocatePlugin;
