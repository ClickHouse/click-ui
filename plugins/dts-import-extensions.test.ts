import path from 'path';
import { describe, expect, it } from 'vitest';
import { addDtsImportExtensions } from './dts-import-extensions';

const srcDir = path.resolve(__dirname, '../src');

describe('addDtsImportExtensions', () => {
  it('adds `.js` to a specifier that points at a file', () => {
    const out = addDtsImportExtensions(
      "export { Button } from './Button';\nexport type { ButtonProps } from './Button.types';",
      path.join(srcDir, 'components/Button')
    );
    expect(out).toBe(
      "export { Button } from './Button.js';\nexport type { ButtonProps } from './Button.types.js';"
    );
  });

  it('adds `/index.js` to a specifier that points at a directory', () => {
    const out = addDtsImportExtensions(
      "export { Accordion } from './components/Accordion';",
      srcDir
    );
    expect(out).toBe("export { Accordion } from './components/Accordion/index.js';");
  });

  it('rewrites `import()` types and parent-directory specifiers', () => {
    const out = addDtsImportExtensions(
      "type T = import('../Button').ButtonProps;",
      path.join(srcDir, 'components/ButtonGroup')
    );
    expect(out).toBe("type T = import('../Button/index.js').ButtonProps;");
  });

  it('leaves package and already-resolved specifiers alone', () => {
    const input =
      "import { FC } from 'react';\nexport { Button } from './Button.js';\nimport './missing';";
    expect(addDtsImportExtensions(input, path.join(srcDir, 'components/Button'))).toBe(
      input
    );
  });
});
