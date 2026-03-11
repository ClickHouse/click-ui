import fs from 'fs-extra';
import path from 'path';
import postcss from 'postcss';
import postcssModules from 'postcss-modules';
import { getTempDir, findFiles } from './utils';

const generateScopedName = '[hash:base64:8]_[local]';

export async function preprocessCssModules(rootDir: string): Promise<void> {
  const srcDir = path.join(rootDir, 'src');
  const tempDir = getTempDir(rootDir);

  // Clean and recreate temp directory
  await fs.remove(tempDir);
  await fs.ensureDir(tempDir);

  const files = await findFiles(srcDir, '**/*.module.css');

  if (files.length === 0) {
    console.log('\nℹ️  No CSS module files to pre-process\n');
    return;
  }

  console.log(`\n🔧 Pre-processing ${files.length} CSS module file(s)...\n`);

  let totalClasses = 0;

  for (const file of files) {
    const css = await fs.readFile(file, 'utf-8');
    const relative = path.relative(srcDir, file);
    let classMapping: Record<string, string> = {};

    const result = await postcss([
      postcssModules({
        generateScopedName,
        getJSON: (_, json) => {
          classMapping = json as Record<string, string>;
        },
      }),
    ]).process(css, { from: file });

    const tempPath = path.join(tempDir, relative.replace('.module.css', ''));
    await fs.ensureDir(path.dirname(tempPath));

    await fs.writeFile(`${tempPath}.css`, result.css);
    await fs.writeJson(`${tempPath}.module.json`, classMapping, { spaces: 2 });

    totalClasses += Object.keys(classMapping).length;
    console.log(`  ✓ ${relative}`);
  }

  console.log(
    `\n✅ Pre-processing complete: ${files.length} file(s), ${totalClasses} class(es)\n`
  );
}
