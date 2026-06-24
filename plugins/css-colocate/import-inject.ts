import fs from 'fs-extra';
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
 *
 * NOTE: This function assumes the CSS filename matches the parent directory name.
 * For example, components/Button/index.js expects components/Button/Button.css to exist.
 * Components that don't follow this naming convention will be silently skipped.
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
    const updated = insertAtTop(content, importStmt);

    await fs.writeFile(jsFile, updated);
  }
};

/**
 * Inject the compiled CSS for every `.module.css` a source file imports.
 *
 * CSS module imports are served as virtual modules that expose only the
 * class-name map — they carry no styles. `injectComponentCss` loads the rules
 * for `<Dir>/index.js`, but any other module that uses a CSS module (e.g.
 * Collapsible/IconWrapper.js, which other components render) would otherwise
 * render with class names but no styles. This injects `<name>.css` into each
 * such file so the rules travel with every consumer.
 */
export const injectModuleCssImports = async (
  trackedModuleImports: TrackedImport[],
  rootDir: string,
  distDir: string,
  format: 'esm' | 'cjs',
  ext: string
): Promise<void> => {
  if (trackedModuleImports.length === 0) return;

  const srcDir = path.join(rootDir, 'src');

  for (const { sourceFile, cssPaths } of trackedModuleImports) {
    const relativeToSrc = path.relative(srcDir, sourceFile);
    const jsOutputFile = path.join(distDir, relativeToSrc.replace(/\.tsx?$/, `.${ext}`));

    if (!(await fileExists(jsOutputFile))) continue;

    let content = await fs.readFile(jsOutputFile, 'utf-8');
    const importStatements: string[] = [];

    for (const cssPath of cssPaths) {
      const moduleSourcePath = resolveCssPath(cssPath, sourceFile, srcDir);
      if (!moduleSourcePath) continue;

      // The pre-processor emits `<name>.css` next to the `<name>.module.css`.
      const compiledSourcePath = moduleSourcePath.replace(/\.module\.css$/, '.css');
      const compiledDistPath = path.join(
        distDir,
        path.relative(srcDir, compiledSourcePath)
      );

      if (!(await fileExists(compiledDistPath))) continue;

      const importPath = calculateImportPath(
        jsOutputFile,
        compiledSourcePath,
        srcDir,
        distDir
      );
      if (!importPath) continue;

      // Skip when this file already imports the CSS (e.g. via injectComponentCss).
      if (content.includes(`"${importPath}"`)) continue;

      importStatements.push(createImportStatement(importPath, format));
    }

    if (importStatements.length > 0) {
      content = removeEmptyCssComments(content);
      content = insertAtTop(content, importStatements.join('\n') + '\n');
      await fs.writeFile(jsOutputFile, content);
    }
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
