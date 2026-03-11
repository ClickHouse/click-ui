import type { Plugin, ResolvedConfig } from 'vite';
import fs from 'fs/promises';
import path from 'path';
import postcss, { Rule, AtRule } from 'postcss';
import MagicString from 'magic-string';

interface RegularCssImport {
  sourceFile: string;
  cssPaths: string[];
}

interface OutputFormat {
  format: 'esm' | 'cjs';
  ext: string;
}

/**
 * Vite plugin that co-locates precompiled CSS with components.
 *
 * After Vite's build, this plugin:
 * 1. Finds all CSS module JS files (e.g., Button.module.css.js)
 * 2. Extracts the hashed class names from each
 * 3. Extracts the corresponding CSS rules from the bundled click-ui.css
 * 4. Writes a co-located CSS file (e.g., Button.css)
 * 5. Injects a side-effect CSS import into the component's index.js
 * 6. Handles regular CSS imports by copying them and fixing imports
 */
export const cssColocatePlugin = (): Plugin => {
  let config: ResolvedConfig;
  const regularCssImports: RegularCssImport[] = [];

  return {
    name: 'vite-plugin-css-colocate',
    apply: 'build',

    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },

    transform(code, id) {
      if (id.includes('node_modules') || !/\.(ts|tsx|js|jsx)$/.test(id)) {
        return null;
      }

      const imports = extractRegularCssImports(code);
      if (imports.length > 0) {
        regularCssImports.push({ sourceFile: id, cssPaths: imports });
      }

      return null;
    },

    async closeBundle() {
      const outputs: OutputFormat[] = [
        { format: 'esm', ext: 'js' },
        { format: 'cjs', ext: 'cjs' },
      ];

      for (const { format, ext } of outputs) {
        await processOutputFormat(config, format, ext, regularCssImports);
      }
    },
  };
};

function extractRegularCssImports(code: string): string[] {
  const imports: string[] = [];
  const regex = /import\s+['"]([^'"]+\.css)['"];?/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(code)) !== null) {
    const cssPath = match[1];
    if (!cssPath.endsWith('.module.css')) {
      imports.push(cssPath);
    }
  }

  return imports;
}

async function processOutputFormat(
  config: ResolvedConfig,
  format: 'esm' | 'cjs',
  ext: string,
  regularCssImports: RegularCssImport[]
): Promise<void> {
  const distDir = path.resolve(config.root, 'dist', format);
  const bundledCssPath = path.join(distDir, 'click-ui.css');

  let bundledCss: string;
  try {
    bundledCss = await fs.readFile(bundledCssPath, 'utf-8');
  } catch {
    return;
  }

  const cssModuleJsFiles = await findFiles(
    distDir,
    new RegExp(`\\.module\\.css\\.${ext}$`)
  );

  for (const jsMapFile of cssModuleJsFiles) {
    await processCssModule(jsMapFile, bundledCss, distDir, format, ext);
  }

  await processRegularCssImports(regularCssImports, distDir, format, ext, config.root);

  await fs.unlink(bundledCssPath);
}

async function processCssModule(
  jsMapFile: string,
  bundledCss: string,
  distDir: string,
  format: 'esm' | 'cjs',
  ext: string
): Promise<void> {
  const jsContent = await fs.readFile(jsMapFile, 'utf-8');
  const classMap = extractClassMap(jsContent);

  if (Object.keys(classMap).length === 0) return;

  const hashedClasses = Object.values(classMap);
  const componentCss = await extractComponentCss(bundledCss, hashedClasses);

  if (!componentCss.trim()) return;

  const dir = path.dirname(jsMapFile);
  const basename = path.basename(jsMapFile, `.module.css.${ext}`);
  const outputCssPath = path.join(dir, `${basename}.css`);

  await fs.writeFile(outputCssPath, componentCss);

  const indexJsPath = path.join(dir, `index.${ext}`);
  if (await fileExists(indexJsPath)) {
    await injectCssImport(indexJsPath, `${basename}.css`, format);
  }
}

function extractClassMap(jsContent: string): Record<string, string> {
  const classMap: Record<string, string> = {};
  const patterns = [
    /"([^"]+)":\s*"([^"]+)"/g,
    /["']?(\w[\w-]*)["']?:\s*["']([^"']+)["']/g,
    /(?:const|var|let)\s+(\w+)\s*=\s*["']([^"']+)["']/g,
  ];

  for (const pattern of patterns) {
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(jsContent)) !== null) {
      const [, key, value] = match;
      if (value && /^[_a-zA-Z][\w-]*$/.test(value) && value.length <= 12) {
        classMap[key] = value;
      }
    }
  }

  return classMap;
}

async function extractComponentCss(
  bundledCss: string,
  classNames: string[]
): Promise<string> {
  if (classNames.length === 0) return '';

  const root = postcss.parse(bundledCss);
  const usedKeyframes = new Set<string>();
  const resultRules: postcss.Node[] = [];

  // First pass: find keyframes used by our classes
  root.walkRules(rule => {
    const ruleText = rule.toString();
    const hasOurClass = classNames.some(cn =>
      new RegExp(`\\.${escapeRegex(cn)}(?:[^\\w-]|$)`).test(rule.selector)
    );

    if (hasOurClass) {
      const animationMatch = ruleText.match(/animation(?:-name)?:\s*([\w-]+)/);
      if (animationMatch) {
        usedKeyframes.add(animationMatch[1]);
      }
    }
  });

  // Second pass: collect matching rules
  root.walk(node => {
    if (node.type === 'rule') {
      const hasOurClass = classNames.some(cn =>
        new RegExp(`\\.${escapeRegex(cn)}(?:[^\\w-]|$)`).test((node as Rule).selector)
      );
      if (hasOurClass) {
        resultRules.push(node);
      }
    } else if (node.type === 'atrule') {
      const atRule = node as AtRule;
      const keyframesMatch =
        atRule.name === 'keyframes' && usedKeyframes.has(atRule.params);
      const isMediaWithOurClass =
        atRule.name === 'media' &&
        classNames.some(cn => atRule.toString().includes(`.${cn}`));

      if (keyframesMatch || isMediaWithOurClass) {
        resultRules.push(node);
      }
    }
  });

  return resultRules.map(rule => rule.toString()).join('\n\n');
}

async function processRegularCssImports(
  regularCssImports: RegularCssImport[],
  distDir: string,
  format: 'esm' | 'cjs',
  ext: string,
  rootDir: string
): Promise<void> {
  const srcDir = path.resolve(rootDir, 'src');

  for (const { sourceFile, cssPaths } of regularCssImports) {
    for (const cssImportPath of cssPaths) {
      const cssSourcePath = resolveCssPath(cssImportPath, sourceFile, srcDir);
      if (!cssSourcePath || !(await fileExists(cssSourcePath))) continue;

      const relativeToCss = path.relative(srcDir, cssSourcePath);
      const outputCssPath = path.join(distDir, relativeToCss);

      await fs.mkdir(path.dirname(outputCssPath), { recursive: true });
      await fs.copyFile(cssSourcePath, outputCssPath);

      const relativeToJs = path
        .relative(srcDir, sourceFile)
        .replace(/\.tsx?$/, `.${ext}`);
      const jsOutputPath = path.join(distDir, relativeToJs);

      if (await fileExists(jsOutputPath)) {
        const cssRelativeToJs = path.relative(path.dirname(jsOutputPath), outputCssPath);
        await replaceEmptyCssComment(jsOutputPath, cssRelativeToJs, format);
      }
    }
  }
}

function resolveCssPath(
  cssImportPath: string,
  sourceFile: string,
  srcDir: string
): string | null {
  if (cssImportPath.startsWith('@/')) {
    return path.resolve(srcDir, cssImportPath.slice(2));
  }
  if (cssImportPath.startsWith('./') || cssImportPath.startsWith('../')) {
    return path.resolve(path.dirname(sourceFile), cssImportPath);
  }
  return null;
}

async function injectCssImport(
  jsFilePath: string,
  cssFileName: string,
  format: 'esm' | 'cjs'
): Promise<void> {
  const content = await fs.readFile(jsFilePath, 'utf-8');

  if (content.includes(cssFileName)) return;

  const importStatement =
    format === 'esm' ? `import "./${cssFileName}";\n` : `require("./${cssFileName}");\n`;

  const ms = new MagicString(content);

  if (content.startsWith("'use client'")) {
    const insertPos = content.indexOf(';', content.indexOf("'use client'")) + 1;
    ms.appendLeft(insertPos, '\n' + importStatement);
  } else {
    ms.prepend(importStatement);
  }

  await fs.writeFile(jsFilePath, ms.toString());
}

async function replaceEmptyCssComment(
  jsFilePath: string,
  cssRelativePath: string,
  format: 'esm' | 'cjs'
): Promise<void> {
  const content = await fs.readFile(jsFilePath, 'utf-8');
  const normalizedPath = cssRelativePath.replace(/\\/g, '/');
  const importPath = normalizedPath.startsWith('.')
    ? normalizedPath
    : `./${normalizedPath}`;

  const importStatement =
    format === 'esm' ? `import "${importPath}"` : `require("${importPath}")`;

  const emptyCssRegex = /\/\*\s*empty css\s*\*/;
  if (!emptyCssRegex.test(content)) return;

  const newContent = content.replace(emptyCssRegex, importStatement);
  await fs.writeFile(jsFilePath, newContent);
}

async function findFiles(dir: string, pattern: RegExp): Promise<string[]> {
  const results: string[] = [];

  async function walk(currentDir: string) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.isFile() && pattern.test(entry.name)) {
        results.push(fullPath);
      }
    }
  }

  try {
    await walk(dir);
  } catch {
    // Directory doesn't exist
  }

  return results;
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default cssColocatePlugin;
