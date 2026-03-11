import fs from 'fs-extra';
import MagicString from 'magic-string';
import path from 'path';
import { glob } from 'glob';
import { fileExists, createImportStatement } from './utils';

interface TrackedImport {
  sourceFile: string;
  cssPaths: string[];
}

/**
 * Resolve a CSS import path to an absolute path
 */
const resolveCssPath = (
  cssImportPath: string,
  sourceFile: string,
  srcDir: string
): string | null => {
  if (cssImportPath.startsWith('@/')) {
    return path.join(srcDir, cssImportPath.slice(2));
  }
  if (cssImportPath.startsWith('./') || cssImportPath.startsWith('../')) {
    return path.resolve(path.dirname(sourceFile), cssImportPath);
  }
  return null;
};

/**
 * Calculate the import path from a JS file to a CSS file
 */
const calculateImportPath = (
  jsFile: string,
  cssFile: string,
  srcDir: string,
  distDir: string
): string | null => {
  const cssRelativeToSrc = path.relative(srcDir, cssFile);
  const cssOutputPath = path.join(distDir, cssRelativeToSrc);
  const cssRelativeToJs = path.relative(path.dirname(jsFile), cssOutputPath);
  const normalized = cssRelativeToJs.replace(/\\/g, '/');
  return normalized.startsWith('.') ? normalized : `./${normalized}`;
};

/**
 * Copy CSS file to dist and get the import path
 */
const copyAndResolveCss = async (
  cssImportPath: string,
  sourceFile: string,
  srcDir: string,
  distDir: string,
  jsOutputFile: string
): Promise<string | null> => {
  const cssSourcePath = resolveCssPath(cssImportPath, sourceFile, srcDir);
  if (!cssSourcePath || !(await fileExists(cssSourcePath))) return null;

  const cssRelativeToSrc = path.relative(srcDir, cssSourcePath);
  const cssOutputPath = path.join(distDir, cssRelativeToSrc);

  // Copy CSS file if not already there
  if (!(await fileExists(cssOutputPath))) {
    await fs.ensureDir(path.dirname(cssOutputPath));
    await fs.copy(cssSourcePath, cssOutputPath);
  }

  return calculateImportPath(jsOutputFile, cssSourcePath, srcDir, distDir);
};

/**
 * Remove all empty css comments from content
 */
const removeEmptyCssComments = (content: string): string => {
  return content.replace(/\/\*\s*empty css\s*\*\//g, '');
};

/**
 * Insert code at the top of a file, after use client directive if present
 */
const insertAtTop = (content: string, codeToInsert: string): string => {
  let insertPos = 0;
  const useClientMatch = content.match(/^(['"]use client['"];?)/);

  if (useClientMatch) {
    insertPos = useClientMatch[0].length;
    if (content[insertPos] !== '\n') {
      insertPos = content.indexOf('\n', insertPos) + 1;
    } else {
      insertPos++;
    }
  }

  return content.slice(0, insertPos) + codeToInsert + content.slice(insertPos);
};

/**
 * Inject CSS imports into component files (e.g., Button/index.js gets import "./Button.css")
 */
export const injectComponentCss = async (
  distDir: string,
  format: 'esm' | 'cjs',
  ext: string
): Promise<void> => {
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
};

/**
 * Inject CSS imports into files that had CSS imports in source
 * (e.g., ThemeProvider.tsx imports theme CSS files)
 */
export const injectRegularCssImports = async (
  trackedImports: TrackedImport[],
  rootDir: string,
  distDir: string,
  format: 'esm' | 'cjs'
): Promise<void> => {
  if (trackedImports.length === 0) return;

  const srcDir = path.join(rootDir, 'src');

  for (const { sourceFile, cssPaths } of trackedImports) {
    const relativeToSrc = path.relative(srcDir, sourceFile);
    const jsOutputFile = path.join(
      distDir,
      relativeToSrc.replace(/\.tsx?$/, `.${format === 'esm' ? 'js' : 'cjs'}`)
    );

    if (!(await fileExists(jsOutputFile))) continue;

    let content = await fs.readFile(jsOutputFile, 'utf-8');

    // Build import statements
    const importStatements: string[] = [];

    for (const cssPath of cssPaths) {
      const importPath = await copyAndResolveCss(
        cssPath,
        sourceFile,
        srcDir,
        distDir,
        jsOutputFile
      );
      if (importPath) {
        importStatements.push(createImportStatement(importPath, format));
      }
    }

    // Remove empty css comments and inject imports
    content = removeEmptyCssComments(content);

    if (importStatements.length > 0) {
      const importCode = importStatements.join('\n') + '\n';
      content = insertAtTop(content, importCode);
    }

    await fs.writeFile(jsOutputFile, content);
  }
};
