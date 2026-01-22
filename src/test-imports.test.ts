// src/test-imports.test.ts
import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';

describe('Import tracing - isolated', () => {
  it('find forwardRef files', () => {
    const result = execSync(
      'grep -r "forwardRef" src/components --include="*.tsx" -l',
      { encoding: 'utf-8' }
    );
    console.log('Files using forwardRef:\n', result);
    expect(true).toBe(true);
  });
});
