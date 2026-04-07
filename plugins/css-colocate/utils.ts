import fs from 'fs-extra';
import { glob } from 'glob';
import path from 'path';

/**
 * Shared CSS modules scoped name pattern.
 * Used by both Vite config and CSS preprocessing to ensure consistency.
 */
export const generateScopedName = '[local]__[hash:base64:5]';

export const fileExists = async (filePath: string): Promise<boolean> => {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};

export const findFiles = async (dir: string, pattern: string): Promise<string[]> => {
  return glob(pattern, { cwd: dir, absolute: true });
};

export const getTempDir = (rootDir: string): string => {
  return path.join(rootDir, '.css-modules-temp');
};

export const createImportStatement = (
  importPath: string,
  format: 'esm' | 'cjs'
): string => {
  return format === 'esm' ? `import "${importPath}";` : `require("${importPath}");`;
};

export const copyCssFiles = async (rootDir: string, distDir: string): Promise<void> => {
  const tempDir = getTempDir(rootDir);
  const srcDir = path.join(rootDir, 'src');

  // Track processed CSS files to detect naming collisions with regular CSS
  const copiedFromTemp = new Set<string>();

  // Copy processed CSS from temp (generated from .module.css files)
  // These are processed through postcss-modules with hashed class names
  const tempFiles = await findFiles(tempDir, '**/*.css');
  await Promise.all(
    tempFiles.map(async file => {
      const dest = path.join(distDir, path.relative(tempDir, file));
      await fs.ensureDir(path.dirname(dest));
      await fs.copy(file, dest, { overwrite: true });
      copiedFromTemp.add(dest);
    })
  );

  // Copy regular CSS from src (non-module CSS files)
  // Throws if there's a naming collision with processed CSS files
  const srcFiles = await findFiles(srcDir, '**/*.css');
  await Promise.all(
    srcFiles.map(async file => {
      if (file.endsWith('.module.css')) return;
      const dest = path.join(distDir, path.relative(srcDir, file));

      // Check for naming collision with processed CSS
      if (copiedFromTemp.has(dest)) {
        const relativePath = path.relative(distDir, dest);
        throw new Error(
          `CSS naming collision detected: "${relativePath}" exists as both a processed .module.css file and a regular .css file. ` +
            `Please rename one of them to avoid ambiguity.`
        );
      }

      await fs.ensureDir(path.dirname(dest));
      await fs.copy(file, dest, { overwrite: true });
    })
  );
};
