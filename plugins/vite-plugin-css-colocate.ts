import type { Plugin, ResolvedConfig } from 'vite';
import fs from 'fs';
import path from 'path';

/**
 * Vite plugin that co-locates precompiled CSS with components.
 *
 * After Vite's build, this plugin:
 * 1. Finds all CSS module JS files (e.g., Button.module.css.js)
 * 2. Extracts the hashed class names from each
 * 3. Extracts the corresponding CSS rules from the bundled click-ui.css
 * 4. Writes a co-located CSS file (e.g., Button.css)
 * 5. Injects a side-effect CSS import into the component's index.js
 * 6. Handles regular CSS imports (non-module) by copying them and fixing imports
 *
 * This enables "zero-config" CSS for consumers - importing a component
 * automatically includes its styles.
 */
export const cssColocatePlugin = (): Plugin => {
  let config: ResolvedConfig;
  // Track regular CSS imports: sourceFile -> [cssImportPaths]
  const regularCssImports = new Map<string, string[]>();

  return {
    name: 'vite-plugin-css-colocate',
    apply: 'build',

    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },

    /**
     * Track regular CSS imports before Vite processes them.
     * Vite replaces these with "/* empty css *\/" in the output.
     */
    transform(code, id) {
      // Only process JS/TS source files
      if (id.includes('node_modules')) return null;
      if (!/\.(ts|tsx|js|jsx)$/.test(id)) return null;

      // Find CSS imports (not module CSS)
      const cssImportRegex = /import\s+['"]([^'"]+\.css)['"];?/g;
      const imports: string[] = [];
      let match;

      while ((match = cssImportRegex.exec(code)) !== null) {
        const cssPath = match[1];
        // Skip .module.css - handled separately
        if (!cssPath.endsWith('.module.css')) {
          imports.push(cssPath);
        }
      }

      if (imports.length > 0) {
        regularCssImports.set(id, imports);
      }

      return null; // Let Vite handle normally
    },

    closeBundle() {
      const outputs: Array<{ format: 'esm' | 'cjs'; ext: string }> = [
        { format: 'esm', ext: 'js' },
        { format: 'cjs', ext: 'cjs' },
      ];

      for (const { format, ext } of outputs) {
        const distDir = path.resolve(config.root, 'dist', format);
        const bundledCssPath = path.join(distDir, 'click-ui.css');

        if (!fs.existsSync(bundledCssPath)) {
          console.warn(`[css-colocate] No bundled CSS found at ${bundledCssPath}`);
          continue;
        }

        const bundledCss = fs.readFileSync(bundledCssPath, 'utf-8');

        // Find all CSS module JS files
        const cssModuleJsFiles = findFiles(distDir, new RegExp(`\\.module\\.css\\.${ext}$`));

        for (const jsMapFile of cssModuleJsFiles) {
          const jsContent = fs.readFileSync(jsMapFile, 'utf-8');
          const classMap = extractClassMapFromJs(jsContent);

          if (Object.keys(classMap).length === 0) {
            continue;
          }

          const hashedClassNames = Object.values(classMap);
          const componentCss = extractComponentCss(bundledCss, hashedClassNames);

          if (!componentCss.trim()) {
            continue;
          }

          // Determine output paths
          const dir = path.dirname(jsMapFile);
          const basename = path.basename(jsMapFile, `.module.css.${ext}`);
          const outputCssPath = path.join(dir, `${basename}.css`);

          // Write component CSS file
          fs.writeFileSync(outputCssPath, componentCss);

          // Inject side-effect import into the component's index.js/cjs
          const indexJsPath = path.join(dir, `index.${ext}`);

          if (fs.existsSync(indexJsPath)) {
            injectCssImport(indexJsPath, `${basename}.css`, format);
          }

          console.log(`[css-colocate] Created ${path.relative(distDir, outputCssPath)}`);
        }

        // Handle regular CSS imports (non-module CSS like token files)
        const srcDir = path.resolve(config.root, 'src');
        for (const [sourceFile, cssImportPaths] of regularCssImports) {
          for (const cssImportPath of cssImportPaths) {
            // Resolve the CSS file path (handle @/ alias)
            let cssSourcePath: string;
            if (cssImportPath.startsWith('@/')) {
              cssSourcePath = path.resolve(srcDir, cssImportPath.slice(2));
            } else if (cssImportPath.startsWith('./') || cssImportPath.startsWith('../')) {
              cssSourcePath = path.resolve(path.dirname(sourceFile), cssImportPath);
            } else {
              // Skip node_modules imports
              continue;
            }

            if (!fs.existsSync(cssSourcePath)) {
              console.warn(`[css-colocate] CSS file not found: ${cssSourcePath}`);
              continue;
            }

            // Determine output location (preserve directory structure relative to src)
            const relativeToCss = path.relative(srcDir, cssSourcePath);
            const outputCssPath = path.join(distDir, relativeToCss);

            // Copy CSS file to dist (create directories if needed)
            fs.mkdirSync(path.dirname(outputCssPath), { recursive: true });
            fs.copyFileSync(cssSourcePath, outputCssPath);
            console.log(`[css-colocate] Copied ${relativeToCss}`);

            // Find the corresponding output JS file
            const relativeToJs = path.relative(srcDir, sourceFile);
            // Replace .tsx/.ts with .js/.cjs
            const jsOutputRelative = relativeToJs.replace(/\.tsx?$/, `.${ext}`);
            const jsOutputPath = path.join(distDir, jsOutputRelative);

            if (fs.existsSync(jsOutputPath)) {
              // Calculate relative path from JS file to CSS file
              const jsDir = path.dirname(jsOutputPath);
              const cssRelativeToJs = path.relative(jsDir, outputCssPath);
              replaceEmptyCssComment(jsOutputPath, cssRelativeToJs, format);
              console.log(`[css-colocate] Fixed CSS import in ${jsOutputRelative}`);
            }
          }
        }

        // Remove the bundled CSS since it's now split into per-component files
        fs.unlinkSync(bundledCssPath);
        console.log(`[css-colocate] Removed bundled ${path.relative(distDir, bundledCssPath)}`);
      }
    },
  };
};

/**
 * Extract class name mappings from the CSS module JS file
 */
function extractClassMapFromJs(jsContent: string): Record<string, string> {
  const classMap: Record<string, string> = {};

  // Match patterns like: "button": "_2ZuB7dbB" or button = "_2ZuB7dbB"
  const patterns = [
    /"([^"]+)":\s*"([^"]+)"/g, // "key": "value"
    /["']?(\w[\w-]*)["']?:\s*["']([^"']+)["']/g, // key: "value" or 'key': 'value'
    /(?:const|var|let)\s+(\w+)\s*=\s*["']([^"']+)["']/g, // const key = "value"
  ];

  for (const pattern of patterns) {
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(jsContent)) !== null) {
      const [, key, value] = match;
      // Only include if value looks like a hashed class name (starts with letter or underscore)
      if (value && /^[_a-zA-Z][\w-]*$/.test(value) && value.length <= 12) {
        classMap[key] = value;
      }
    }
  }

  return classMap;
}

/**
 * Extract CSS rules that use the given class names
 */
function extractComponentCss(bundledCss: string, hashedClassNames: string[]): string {
  if (hashedClassNames.length === 0) {
    return '';
  }

  const rules: string[] = [];

  // Find keyframes used by our components
  const usedKeyframes = new Set<string>();
  for (const className of hashedClassNames) {
    const classRuleRegex = new RegExp(
      `\\.${escapeRegex(className)}[^{]*\\{([^}]*)\\}`,
      'g'
    );
    let match: RegExpExecArray | null;
    while ((match = classRuleRegex.exec(bundledCss)) !== null) {
      const animationMatch = match[1].match(/animation(?:-name)?:\s*([\w-]+)/);
      if (animationMatch) {
        usedKeyframes.add(animationMatch[1]);
      }
    }
  }

  // Parse CSS and extract relevant rules
  const cssTokens = tokenizeCss(bundledCss);

  for (const rule of cssTokens) {
    // Check if this rule contains any of our class names
    const containsOurClass = hashedClassNames.some(cn => {
      const classPattern = new RegExp(`\\.${escapeRegex(cn)}(?:[^\\w-]|$)`);
      return classPattern.test(rule.selector || '');
    });

    // Check if this is a @keyframes we use
    const keyframesMatch = rule.selector?.match(/@keyframes\s+([\w-]+)/);
    const isUsedKeyframes = keyframesMatch && usedKeyframes.has(keyframesMatch[1]);

    // Check if this is a @media query containing our classes
    const isMediaWithOurClass =
      rule.selector?.startsWith('@media') &&
      hashedClassNames.some(cn => rule.content?.includes(`.${cn}`));

    if (containsOurClass || isUsedKeyframes || isMediaWithOurClass) {
      rules.push(rule.raw);
    }
  }

  return rules.join('\n\n');
}

interface CssRule {
  selector?: string;
  content?: string;
  raw: string;
}

/**
 * Simple CSS tokenizer that handles nested braces
 */
function tokenizeCss(css: string): CssRule[] {
  const rules: CssRule[] = [];
  let i = 0;
  const len = css.length;

  while (i < len) {
    // Skip whitespace
    while (i < len && /\s/.test(css[i])) i++;
    if (i >= len) break;

    // Skip comments
    if (css.slice(i, i + 2) === '/*') {
      const endComment = css.indexOf('*/', i + 2);
      i = endComment === -1 ? len : endComment + 2;
      continue;
    }

    // Find the start of a rule
    const selectorStart = i;
    let braceCount = 0;
    let selectorEnd = i;

    // Read until we find the first {
    while (i < len && css[i] !== '{') i++;
    if (i >= len) break;

    selectorEnd = i;
    const selector = css.slice(selectorStart, selectorEnd).trim();

    // Now read the content including nested braces
    const contentStart = i;
    braceCount = 0;

    do {
      if (css[i] === '{') braceCount++;
      else if (css[i] === '}') braceCount--;
      i++;
    } while (i < len && braceCount > 0);

    const raw = css.slice(selectorStart, i).trim();
    const content = css.slice(contentStart + 1, i - 1).trim();

    rules.push({ selector, content, raw });
  }

  return rules;
}

/**
 * Inject CSS import at the top of a JS file
 */
function injectCssImport(
  jsFilePath: string,
  cssFileName: string,
  format: 'esm' | 'cjs'
): void {
  let content = fs.readFileSync(jsFilePath, 'utf-8');

  const importStatement =
    format === 'esm' ? `import "./${cssFileName}";\n` : `require("./${cssFileName}");\n`;

  // Check if import already exists
  if (content.includes(cssFileName)) {
    return;
  }

  // Add import after 'use client' if present, otherwise at top
  if (content.startsWith("'use client'")) {
    content = content.replace("'use client';", `'use client';\n${importStatement}`);
  } else {
    content = importStatement + content;
  }

  fs.writeFileSync(jsFilePath, content);
}

/**
 * Replace /* empty css *\/ comment with actual CSS import.
 * Vite outputs these placeholders when CSS is bundled.
 */
function replaceEmptyCssComment(
  jsFilePath: string,
  cssRelativePath: string,
  format: 'esm' | 'cjs'
): void {
  let content = fs.readFileSync(jsFilePath, 'utf-8');

  // Normalize path separators for the import
  const normalizedPath = cssRelativePath.replace(/\\/g, '/');
  const importPath = normalizedPath.startsWith('.') ? normalizedPath : `./${normalizedPath}`;

  const importStatement =
    format === 'esm' ? `import "${importPath}"` : `require("${importPath}")`;

  // Replace first /* empty css */ comment (with variable whitespace) with actual import
  const emptyCssRegex = /\/\*\s*empty css\s*\*\//;
  if (emptyCssRegex.test(content)) {
    content = content.replace(emptyCssRegex, importStatement);
    fs.writeFileSync(jsFilePath, content);
  }
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Recursively find files matching a pattern
 */
function findFiles(dir: string, pattern: RegExp): string[] {
  const results: string[] = [];

  function walk(currentDir: string) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && pattern.test(entry.name)) {
        results.push(fullPath);
      }
    }
  }

  if (fs.existsSync(dir)) {
    walk(dir);
  }

  return results;
}

export default cssColocatePlugin;
