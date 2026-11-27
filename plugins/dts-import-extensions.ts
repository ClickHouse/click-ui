import fs from 'node:fs';
import path from 'node:path';

const RELATIVE_SPECIFIER =
  /(\bfrom\s+|\bimport\s*\(\s*|\bimport\s+)(['"])(\.\.?\/[^'"]+)\2/g;

const existsWithAny = (base: string, suffixes: string[]) =>
  suffixes.some(suffix => fs.existsSync(base + suffix));

// The package is `"type": "module"`, so under `moduleResolution: node16/nodenext`
// TypeScript reads every emitted `.d.ts` as ESM and only resolves relative
// specifiers with a full path. `sourceDir` is the `src/` directory the declaration
// was generated from; it tells `./Foo` (-> `./Foo.js`) from `./Foo/` (-> `./Foo/index.js`).
export const addDtsImportExtensions = (content: string, sourceDir: string): string =>
  content.replace(RELATIVE_SPECIFIER, (match, keyword, quote, specifier) => {
    const target = path.resolve(sourceDir, specifier);

    if (existsWithAny(target, ['.ts', '.tsx'])) {
      return `${keyword}${quote}${specifier}.js${quote}`;
    }

    if (existsWithAny(target, ['/index.ts', '/index.tsx'])) {
      return `${keyword}${quote}${specifier}/index.js${quote}`;
    }

    return match;
  });
