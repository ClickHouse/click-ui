import fs from 'fs-extra';
import MagicString from 'magic-string';
import path from 'path';
import { glob } from 'glob';
import { createImportStatement, fileExists } from './utils';

export async function injectComponentCss(
  distDir: string,
  format: 'esm' | 'cjs',
  ext: string
): Promise<void> {
  const files = await glob(`**/index.${ext}`, { cwd: distDir, absolute: true });

  for (const jsFile of files) {
    const dir = path.dirname(jsFile);
    const component = path.basename(dir);
    const cssFile = path.join(dir, `${component}.css`);

    if (!(await fileExists(cssFile))) continue;

    const content = await fs.readFile(jsFile, 'utf-8');
    if (content.includes(`${component}.css`)) continue;

    const importStmt = createImportStatement(`./${component}.css`, format) + '\n';
    const ms = new MagicString(content);

    if (content.startsWith("'use client'")) {
      const pos = content.indexOf(';', content.indexOf("'use client'")) + 1;
      ms.appendLeft(pos, '\n' + importStmt);
    } else {
      ms.prepend(importStmt);
    }

    await fs.writeFile(jsFile, ms.toString());
  }
}
