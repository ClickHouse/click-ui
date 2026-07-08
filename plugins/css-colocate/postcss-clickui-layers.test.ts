import { describe, expect, it } from 'vitest';
import postcss from 'postcss';
import { wrapInClickuiLayers } from './postcss-clickui-layers';

const run = async (css: string): Promise<string> => {
  const result = await postcss([wrapInClickuiLayers()]).process(css, { from: undefined });
  return result.css;
};

const ORDER = '@layer clickui.block, clickui.elem, clickui.mod;';

describe('wrapInClickuiLayers', () => {
  it('prepends the sub-layer order declaration exactly once', async () => {
    const out = await run('.alert { color: red; }');
    expect(out.startsWith(ORDER)).toBe(true);
    expect(out.match(/@layer clickui\.block, clickui\.elem, clickui\.mod;/g)).toHaveLength(1);
  });

  it('routes a block rule to clickui.block', async () => {
    const out = await run('.alert { color: red; }');
    expect(out).toMatch(/@layer clickui\.block\s*{\s*\.alert\s*{\s*color: red;\s*}\s*}/);
  });

  it('routes an element rule to clickui.elem', async () => {
    const out = await run('.alert__icon { width: 1rem; }');
    expect(out).toMatch(/@layer clickui\.elem\s*{\s*\.alert__icon/);
  });

  it('routes a modifier rule to clickui.mod', async () => {
    const out = await run('.alert_type_default { color: blue; }');
    expect(out).toMatch(/@layer clickui\.mod\s*{\s*\.alert_type_default/);
  });

  it('routes an element+modifier rule to clickui.mod', async () => {
    const out = await run('.alert__icon_size_lg { width: 2rem; }');
    expect(out).toMatch(/@layer clickui\.mod\s*{\s*\.alert__icon_size_lg/);
  });

  it('routes to mod if any token in a compound selector is a modifier', async () => {
    const out = await run('.wrapper.wrapper_selectable { cursor: pointer; }');
    expect(out).toMatch(/@layer clickui\.mod\s*{[^}]*\.wrapper\.wrapper_selectable/);
  });

  it('keeps a pseudo-state on a block with its block', async () => {
    const out = await run('.link:hover { color: green; }');
    expect(out).toMatch(/@layer clickui\.block\s*{\s*\.link:hover/);
  });

  it('classifies a state via a modifier token inside :not() as mod', async () => {
    const out = await run('.label:not(.label_error):hover { color: red; }');
    expect(out).toMatch(/@layer clickui\.mod\s*{[^}]*\.label:not\(\.label_error\):hover/);
  });

  it('splits a grouped selector that mixes roles into separate layers', async () => {
    const out = await run('.link, .link_size_xs { color: red; }');
    expect(out).toMatch(/@layer clickui\.block\s*{\s*\.link\s*{/);
    expect(out).toMatch(/@layer clickui\.mod\s*{\s*\.link_size_xs\s*{/);
  });

  it('splits a @media block by the role of its inner rules', async () => {
    const out = await run(
      '@media (max-width: 768px) { .container { width: 100%; } .container_responsive { flex-direction: column; } }'
    );
    // block-role inner rule under clickui.block, modifier under clickui.mod
    expect(out).toMatch(/@layer clickui\.block\s*{\s*@media[^{]*{\s*\.container\s*{/);
    expect(out).toMatch(/@layer clickui\.mod\s*{\s*@media[^{]*{\s*\.container_responsive\s*{/);
  });

  it('leaves @keyframes unlayered', async () => {
    const out = await run('@keyframes spin { from { transform: rotate(0); } to { transform: rotate(360deg); } }');
    expect(out).toContain('@keyframes spin');
    // keyframes must not be nested inside a clickui.* layer
    expect(out).not.toMatch(/@layer clickui\.[a-z]+\s*{\s*@keyframes/);
  });

  it('leaves a classless global rule unlayered', async () => {
    const out = await run('.form-root { width: 100%; }\nsvg { fill: currentColor; }');
    // .form-root (has a class) is layered; bare svg is not
    expect(out).toMatch(/@layer clickui\.block\s*{\s*\.form-root/);
    expect(out).not.toMatch(/@layer clickui\.[a-z]+\s*{[^}]*svg\s*{\s*fill/);
  });

  it('is idempotent — running twice does not double-wrap', async () => {
    const once = await run('.alert { color: red; }');
    const twice = await run(once);
    expect(twice).toBe(once);
  });
});
