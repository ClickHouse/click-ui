/** @vitest-environment node */
import {
  getRootElement,
  removeRootThemeAttribute,
  setRootThemeAttribute,
} from '@/utils/dom';

describe('dom helpers without a document (SSR)', () => {
  it('getRootElement returns null', () => {
    expect(getRootElement()).toBeNull();
  });

  it('theme attribute helpers do not throw', () => {
    expect(() => setRootThemeAttribute('dark')).not.toThrow();
    expect(() => removeRootThemeAttribute()).not.toThrow();
  });
});
