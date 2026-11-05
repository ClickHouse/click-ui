import { createElement } from 'react';
import { hasRenderableContent } from './hasRenderableContent';

describe('hasRenderableContent', () => {
  it.each([
    ['undefined', undefined],
    ['null', null],
    ['false', false],
    ['an empty string', ''],
    ['a blank string', '  '],
    ['an empty array', []],
  ])('is false for %s', (_, node) => {
    expect(hasRenderableContent(node)).toBe(false);
  });

  it.each([
    ['the number 0', 0],
    ['text', 'a'],
    ['an element', createElement('span')],
  ])('is true for %s', (_, node) => {
    expect(hasRenderableContent(node)).toBe(true);
  });
});
