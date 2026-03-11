import type { Plugin, ResolvedConfig } from 'vite';
import fs from 'fs/promises';
import path from 'path';
import MagicString from 'magic-string';

interface RegularCssImport {
  sourceFile: string;
  cssPaths: string[];
}

interface OutputFormat {
  format: 'esm' | 'cjs';
  ext: string;
}

const VIRTUAL_PREFIX = 'virtual:css-module:';
// Store mappings from virtual module IDs to JSON file paths
const cssModuleMapping = new Map<string, string>();

function getTempDir(config: ResolvedConfig): string {
  return path.resolve(config.root, '.temp', 'css-modules');
}

/**
 * Vite plugin that handles pre-processed CSS modules.
 *
 * This plugin assumes CSS modules have been pre-processed by the
 * preprocess-css-modules script into .temp/css-modules/, which generates:
 * - .css files with hashed class names
 * - .module.json files with class name mappings
 *
 * The plugin:
 * 1. Intercepts .module.css imports and returns JSON mappings as JS
 * 2. Copies pre-generated .css files from .temp/css-modules/ to dist
 * 3. Injects CSS import statements into component JS files
 * 4. Handles regular CSS imports
 */
export const cssColocatePlugin = (): Plugin => {
  let config: ResolvedConfig;
  const regularCssImports: RegularCssImport[] = [];

  return {
    name: 'vite-plugin-css-colocate',
    apply: 'build',
    enforce: 'pre', // Run before Vite's default CSS handling

    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },

    /**
     * Intercept .module.css imports and redirect to virtual module
     */
    async resolveId(id, importer) {
      // Only handle .module.css imports
      if (!id.endsWith('.module.css')) return null;

      // Check if pre-generated JSON exists in temp directory
      if (!importer) return null;

      const resolvedPath = path.resolve(path.dirname(importer), id);
      const relativeToSrc = path.relative(path.join(config.root, 'src'), resolvedPath);
      const jsonPath = path.join(
        getTempDir(config),
        relativeToSrc.replace('.module.css', '.module.json')
      );

      try {
        await fs.access(jsonPath);
        // Create a unique virtual module ID using counter
        const virtualId = VIRTUAL_PREFIX + cssModuleMapping.size;
        cssModuleMapping.set(virtualId, jsonPath);
        return virtualId;
      } catch {
        // JSON doesn't exist, let Vite handle it normally
        return null;
      }
    },

    /**
     * Load CSS module mappings as JavaScript
     */
    async load(id) {
      // Only handle our virtual modules
      if (!id.startsWith(VIRTUAL_PREFIX)) return null;

      const jsonPath = cssModuleMapping.get(id);
      if (!jsonPath) return null;

      try {
        const json = await fs.readFile(jsonPath, 'utf-8');
        const parsed = JSON.parse(json);

        // Convert to ES module exports
        const exports = Object.entries(parsed)
          .map(([key, value]) => {
            return `"${key}": "${value}"`;
          })
          .join(',\n  ');

        return `export default {\n  ${exports}\n};`;
      } catch (error) {
        this.error(
          `Failed to load CSS module mappings from ${jsonPath}: ${error.message}`
        );
        return null;
      }
    },

    /**
     * Track regular CSS imports (not modules) for processing
     */
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

    /**
     * After build: copy CSS files and inject imports
     */
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
    // Only include regular CSS (not .module.css which we handle separately)
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
  const tempDir = getTempDir(config);
  const srcDir = path.resolve(config.root, 'src');

  // Copy pre-generated CSS files from temp directory to dist
  const cssFiles = await findFiles(tempDir, /\.css$/);

  for (const cssFile of cssFiles) {
    const relativeToTemp = path.relative(tempDir, cssFile);
    const outputPath = path.join(distDir, relativeToTemp);

    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.copyFile(cssFile, outputPath);
  }

  // Also copy regular CSS files from src
  const regularCssFiles = await findFiles(srcDir, /\.css$/);

  for (const cssFile of regularCssFiles) {
    // Skip original .module.css files and pre-generated files (already in temp)
    if (cssFile.endsWith('.module.css')) continue;

    const relativeToSrc = path.relative(srcDir, cssFile);
    const outputPath = path.join(distDir, relativeToSrc);

    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.copyFile(cssFile, outputPath);
  }

  // Inject CSS imports into component JS files
  const jsModuleFiles = await findFiles(distDir, new RegExp(`index\.${ext}$`));

  for (const jsFile of jsModuleFiles) {
    const dir = path.dirname(jsFile);
    const baseName = path.basename(dir);
    const cssFileName = `${baseName}.css`;
    const cssFilePath = path.join(dir, cssFileName);

    // Check if there's a corresponding CSS file
    if (await fileExists(cssFilePath)) {
      await injectCssImport(jsFile, cssFileName, format);
    }
  }

  // Process regular CSS imports
  await processRegularCssImports(regularCssImports, distDir, format, ext, config.root);
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
    format === 'esm' ? `import "${importPath}";` : `require("${importPath}");`;

  const emptyCssRegex = /\/\*\s*empty css\s*\*\//;
  if (!emptyCssRegex.test(content)) return;

  const newContent = content.replace(emptyCssRegex, importStatement);
  await fs.writeFile(jsFilePath, newContent);
}

async function findFiles(dir: string, pattern: RegExp): Promise<string[]> {
  const results: string[] = [];

  async function walk(currentDir: string) {
    try {
      const entries = await fs.readdir(currentDir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(currentDir, entry.name);

        if (entry.isDirectory()) {
          await walk(fullPath);
        } else if (entry.isFile() && pattern.test(entry.name)) {
          results.push(fullPath);
        }
      }
    } catch {
      // Directory doesn't exist or can't be read
    }
  }

  await walk(dir);
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

export default cssColocatePlugin;
