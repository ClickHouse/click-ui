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

  // Copy processed CSS from temp
  const tempFiles = await findFiles(tempDir, '**/*.css');
  await Promise.all(
    tempFiles.map(async file => {
      const dest = path.join(distDir, path.relative(tempDir, file));
      await fs.ensureDir(path.dirname(dest));
      await fs.copy(file, dest, { overwrite: true });
    })
  );

  // Copy regular CSS from src
  const srcFiles = await findFiles(srcDir, '**/*.css');
  await Promise.all(
    srcFiles.map(async file => {
      if (file.endsWith('.module.css')) return;
      const dest = path.join(distDir, path.relative(srcDir, file));
      await fs.ensureDir(path.dirname(dest));
      await fs.copy(file, dest, { overwrite: true });
    })
  );
};
