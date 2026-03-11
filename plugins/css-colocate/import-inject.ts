import fs from 'fs-extra';
import MagicString from 'magic-string';
import path from 'path';
import { glob } from 'glob';
import { createImportStatement, fileExists } from './utils';

interface RegularCssImport {
  sourceFile: string;
  cssPaths: string[];
}

export async function injectComponentCss(
  distDir: string,
  format: 'esm' | 'cjs',
  ext: string
): Promise<void> {
  const files = await glob(`**/index.${ext}`, { cwd: distDir, absolute: true });

  for (const jsFile of files) {
    const dir = path.dirname(jsFile);
    const component = path.basename(dir);
    const cssFile = path.join(dir, `${component}.css`);

    if (!(await fileExists(cssFile))) continue;

    const content = await fs.readFile(jsFile, 'utf-8');
    if (content.includes(`${component}.css`)) continue;

    const importStmt = createImportStatement(`./${component}.css`, format) + '\n';
    const ms = new MagicString(content);

    if (content.startsWith("'use client'")) {
      const pos = content.indexOf(';', content.indexOf("'use client'")) + 1;
      ms.appendLeft(pos, '\n' + importStmt);
    } else {
      ms.prepend(importStmt);
    }

    await fs.writeFile(jsFile, ms.toString());
  }
}

export async function injectRegularCssImports(
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

    if (!(await fileExists(jsOutputFile))) continue;

    let content = await fs.readFile(jsOutputFile, 'utf-8');
    let modified = false;

    for (const cssImportPath of cssPaths) {
      // Resolve the CSS file path
      let cssSourcePath: string | null = null;

      if (cssImportPath.startsWith('@/')) {
        cssSourcePath = path.join(srcDir, cssImportPath.slice(2));
      } else if (cssImportPath.startsWith('./') || cssImportPath.startsWith('../')) {
        cssSourcePath = path.resolve(path.dirname(sourceFile), cssImportPath);
      }

      if (!cssSourcePath || !(await fileExists(cssSourcePath))) continue;

      // Calculate output CSS path in dist
      const cssRelativeToSrc = path.relative(srcDir, cssSourcePath);
      const cssOutputPath = path.join(distDir, cssRelativeToSrc);

      // Copy CSS file if not already there
      if (!(await fileExists(cssOutputPath))) {
        await fs.ensureDir(path.dirname(cssOutputPath));
        await fs.copy(cssSourcePath, cssOutputPath);
      }

      // Calculate relative path from JS file to CSS file
      const cssRelativeToJs = path.relative(path.dirname(jsOutputFile), cssOutputPath);
      const normalizedCssPath = cssRelativeToJs.replace(/\\/g, '/');
      const importPath = normalizedCssPath.startsWith('.')
        ? normalizedCssPath
        : `./${normalizedCssPath}`;

      const importStatement = createImportStatement(importPath, format);

      // Replace "/* empty css */" comment with actual import
      // The regex matches: /* empty css */ (with optional whitespace)
      const emptyCssRegex = /\/\*\s*empty css\s*\*\//;
      if (emptyCssRegex.test(content)) {
        content = content.replace(emptyCssRegex, importStatement);
        modified = true;
      }
    }

    if (modified) {
      await fs.writeFile(jsOutputFile, content);
    }
  }
}
