import fs from 'fs-extra';
import path from 'path';
import { findFiles, getTempDir } from './utils';

export async function copyCssFiles(
  config: { root: string },
  format: 'esm' | 'cjs'
): Promise<void> {
  const distDir = path.join(config.root, 'dist', format);
  const tempDir = getTempDir(config.root);
  const srcDir = path.join(config.root, 'src');

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
}
