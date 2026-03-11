import fs from 'fs-extra';
import { glob } from 'glob';
import path from 'path';

export const fileExists = (p: string) =>
  fs
    .access(p)
    .then(() => true)
    .catch(() => false);

export const findFiles = async (dir: string, pattern: string): Promise<string[]> =>
  glob(pattern, { cwd: dir, absolute: true });

export const getTempDir = (rootDir: string) => path.join(rootDir, '.css-modules-temp');

export const createImportStatement = (importPath: string, format: 'esm' | 'cjs') =>
  format === 'esm' ? `import "${importPath}";` : `require("${importPath}");`;
