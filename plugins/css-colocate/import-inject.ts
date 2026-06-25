import fs from 'fs-extra';
import path from 'path';
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
 * Map a source file to its emitted JS output path, mirroring the
 * `createEntryFileNames` rule in vite.config.ts: when a module's filename equals
 * its parent directory (e.g. Button/Button.tsx), the output is renamed to
 * `index` (Button/index.js). Siblings like Collapsible/IconWrapper.tsx are not
 * renamed.
 */
const resolveJsOutputFile = (
  sourceFile: string,
  srcDir: string,
  distDir: string,
  ext: string
): string => {
  const relative = path.relative(srcDir, sourceFile).replace(/\.tsx?$/, '');
  const dir = path.dirname(relative);
  const name = path.basename(relative);
  const outName = path.basename(dir) === name ? 'index' : name;
  return path.join(distDir, dir, `${outName}.${ext}`);
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
  if (!cssSourcePath || !(await fileExists(cssSourcePath))) {
    return null;
  }

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
 * Inject the colocated rules stylesheet for every module that imported a `.module.css`.
 *
 * Driven by the actual source imports tracked during `transform` (any file, not just
 * `index.*`), so non-index consumers are covered too — e.g. Collapsible/IconWrapper.tsx
 * imports Collapsible.module.css but is reached by SidebarNavigationItem without ever
 * pulling in Collapsible/index.js. Keying off the directory name (the old approach) left
 * such siblings without their stylesheet, which then got tree-shaken out of consumer builds.
 *
 * The rules file (`<Name>.css`) for a `<Name>.module.css` is produced by
 * preprocessCssModules and copied into dist by copyCssFiles before this runs.
 */
export const injectModuleCssImports = async (
  trackedModuleImports: TrackedImport[],
  rootDir: string,
  distDir: string,
  format: 'esm' | 'cjs'
): Promise<void> => {
  if (trackedModuleImports.length === 0) {
    return;
  }

  const srcDir = path.join(rootDir, 'src');
  const ext = format === 'esm' ? 'js' : 'cjs';

  for (const { sourceFile, cssPaths } of trackedModuleImports) {
    const jsOutputFile = resolveJsOutputFile(sourceFile, srcDir, distDir, ext);

    if (!(await fileExists(jsOutputFile))) {
      continue;
    }

    let content = await fs.readFile(jsOutputFile, 'utf-8');
    const importStatements: string[] = [];

    for (const moduleCssPath of cssPaths) {
      const moduleCssAbs = resolveCssPath(moduleCssPath, sourceFile, srcDir);
      if (!moduleCssAbs) {
        continue;
      }

      // `<Name>.module.css` -> `<Name>.css` (the emitted rules file, same relative dir)
      const cssRulesSourcePath = moduleCssAbs.replace(/\.module\.css$/, '.css');
      const cssOutputPath = path.join(distDir, path.relative(srcDir, cssRulesSourcePath));
      if (!(await fileExists(cssOutputPath))) {
        continue;
      }

      const importPath = calculateImportPath(jsOutputFile, cssRulesSourcePath, srcDir, distDir);
      if (!importPath) {
        continue;
      }

      const importStatement = createImportStatement(importPath, format);
      if (!content.includes(importPath) && !importStatements.includes(importStatement)) {
        importStatements.push(importStatement);
      }
    }

    content = removeEmptyCssComments(content);

    if (importStatements.length > 0) {
      content = insertAtTop(content, importStatements.join('\n') + '\n');
    }

    await fs.writeFile(jsOutputFile, content);
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
  if (trackedImports.length === 0) {
    return;
  }

  const srcDir = path.join(rootDir, 'src');

  for (const { sourceFile, cssPaths } of trackedImports) {
    const relativeToSrc = path.relative(srcDir, sourceFile);
    const jsOutputFile = path.join(
      distDir,
      relativeToSrc.replace(/\.tsx?$/, `.${format === 'esm' ? 'js' : 'cjs'}`)
    );

    if (!(await fileExists(jsOutputFile))) {
      continue;
    }

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
