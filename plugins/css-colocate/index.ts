import type { Plugin, ResolvedConfig } from 'vite';
import path from 'path';
import fs from 'fs-extra';
import { preprocessCssModules } from './css-preprocess';
import { resolveCssModule, loadCssModule } from './virtual-modules';
import { copyCssFiles } from './css-operations';
import { injectComponentCss } from './import-inject';
import { getTempDir } from './utils';

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
    // No enforce setting - use default hook order

    // Preprocess CSS modules before build starts
    async buildStart() {
      // Clean up any old temp files from previous builds
      await fs.remove(getTempDir(config.root));
      // Preprocess CSS modules for this build
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

    // Inject CSS imports after build completes
    async closeBundle() {
      const outputs = [
        { format: 'esm' as const, ext: 'js' as const },
        { format: 'cjs' as const, ext: 'cjs' as const },
      ];

      for (const { format, ext } of outputs) {
        await copyCssFiles(config, format);
        await injectComponentCss(path.join(config.root, 'dist', format), format, ext);
        await injectRegularCssImports(regularImports, config, format, ext);
      }
    },
  };
};

async function injectRegularCssImports(
  regularImports: RegularCssImport[],
  config: { root: string },
  format: 'esm' | 'cjs',
  ext: string
): Promise<void> {
  if (regularImports.length === 0) return;

  const distDir = path.join(config.root, 'dist', format);
  const srcDir = path.join(config.root, 'src');

  for (const { sourceFile, cssPaths } of regularImports) {
    // Find the corresponding JS output file
    const relativeToSrc = path.relative(srcDir, sourceFile);
    const jsOutputFile = path.join(distDir, relativeToSrc.replace(/\.tsx?$/, `.${ext}`));

    if (!(await fs.pathExists(jsOutputFile))) continue;

    let content = await fs.readFile(jsOutputFile, 'utf-8');

    // Build all import statements first
    const importStatements: string[] = [];

    for (const cssImportPath of cssPaths) {
      // Resolve the CSS file path
      let cssSourcePath: string | null = null;

      if (cssImportPath.startsWith('@/')) {
        cssSourcePath = path.join(srcDir, cssImportPath.slice(2));
      } else if (cssImportPath.startsWith('./') || cssImportPath.startsWith('../')) {
        cssSourcePath = path.resolve(path.dirname(sourceFile), cssImportPath);
      }

      if (!cssSourcePath || !(await fs.pathExists(cssSourcePath))) continue;

      // Calculate output CSS path in dist
      const cssRelativeToSrc = path.relative(srcDir, cssSourcePath);
      const cssOutputPath = path.join(distDir, cssRelativeToSrc);

      // Copy CSS file if not already there
      if (!(await fs.pathExists(cssOutputPath))) {
        await fs.ensureDir(path.dirname(cssOutputPath));
        await fs.copy(cssSourcePath, cssOutputPath);
      }

      // Calculate relative path from JS file to CSS file
      const cssRelativeToJs = path.relative(path.dirname(jsOutputFile), cssOutputPath);
      const normalizedCssPath = cssRelativeToJs.replace(/\\/g, '/');
      const importPath = normalizedCssPath.startsWith('.')
        ? normalizedCssPath
        : `./${normalizedCssPath}`;

      importStatements.push(
        format === 'esm' ? `import "${importPath}";` : `require("${importPath}");`
      );
    }

    // Remove all "/* empty css */" comments
    content = content.replace(/\/\*\s*empty css\s*\*\//g, '');

    // Inject all import statements at the top (after 'use client' directive if present)
    if (importStatements.length > 0) {
      const importCode = importStatements.join('\n') + '\n';

      // Find position after 'use client' directive if present
      let insertPos = 0;
      const useClientMatch = content.match(/^(['"]use client['"];?)/);
      if (useClientMatch) {
        insertPos = useClientMatch[0].length;
        // Add newline if not present
        if (content[insertPos] !== '\n') {
          insertPos = content.indexOf('\n', insertPos) + 1;
        } else {
          insertPos++;
        }
      }

      content = content.slice(0, insertPos) + importCode + content.slice(insertPos);
    }

    await fs.writeFile(jsOutputFile, content);
  }
}

export default cssColocatePlugin;
