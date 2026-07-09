import { describe, expect, it } from 'vitest';
import postcss from 'postcss';
import { wrapInClickuiLayers } from './postcss-clickui-layers';

const run = async (css: string, from?: string): Promise<string> => {
  const result = await postcss([wrapInClickuiLayers()]).process(css, { from });
  return result.css;
};

describe('wrapInClickuiLayers', () => {
  it('wraps a rule in a single `clickui` layer', async () => {
    const out = await run('.alert { color: red; }');
    expect(out).toMatch(/@layer clickui\s*{\s*\.alert\s*{\s*color: red;\s*}\s*}/);
  });

  it('wraps element and modifier rules in the same layer, preserving order', async () => {
    const out = await run(
      '.alert { color: red; }\n.alert__icon { width: 1rem; }\n.alert_type_danger { color: blue; }'
    );
    // Exactly one clickui layer, holding all three rules in source order.
    expect(out.match(/@layer clickui\s*{/g)).toHaveLength(1);
    const inner = out.slice(out.indexOf('{') + 1);
    expect(inner.indexOf('.alert ')).toBeLessThan(inner.indexOf('.alert__icon'));
    expect(inner.indexOf('.alert__icon')).toBeLessThan(
      inner.indexOf('.alert_type_danger')
    );
  });

  it('keeps a @media block inside the layer', async () => {
    const out = await run('@media (max-width: 768px) { .container { width: 100%; } }');
    expect(out).toMatch(/@layer clickui\s*{\s*@media[^{]*{\s*\.container\s*{/);
  });

  it('leaves @keyframes unlayered', async () => {
    const out = await run(
      '.spinner { animation: spin 1s; }\n@keyframes spin { from { transform: rotate(0); } to { transform: rotate(360deg); } }'
    );
    expect(out).toContain('@keyframes spin');
    // keyframes must NOT be nested inside the clickui layer
    expect(out).not.toMatch(/@layer clickui\s*{[^]*@keyframes/);
    // the rule still gets layered
    expect(out).toMatch(/@layer clickui\s*{\s*\.spinner/);
  });

  it('leaves a file untouched when it has nothing layerable', async () => {
    const css = '@keyframes spin { from { opacity: 0; } to { opacity: 1; } }';
    const out = await run(css);
    expect(out).not.toContain('@layer');
    expect(out).toContain('@keyframes spin');
  });

  it('keeps a leading comment with the rule it annotates, inside the layer', async () => {
    const out = await run('/* base */\n.alert { color: red; }');
    expect(out).toMatch(/@layer clickui\s*{\s*\/\* base \*\/\s*\.alert/);
  });

  it('wraps a component CSS Module file', async () => {
    const out = await run('.alert { color: red; }', '/x/Alert/Alert.module.css');
    expect(out).toMatch(/@layer clickui\s*{\s*\.alert/);
  });

  it('leaves a non-module global stylesheet (e.g. theme tokens) unlayered', async () => {
    const css = ':root { --click-x: 1rem; }';
    const out = await run(css, '/x/theme/styles/tokens-light.css');
    expect(out).not.toContain('@layer');
    expect(out).toBe(css);
  });

  it('is idempotent — running twice does not double-wrap', async () => {
    const once = await run('.alert { color: red; }\n@keyframes spin { from {} to {} }');
    const twice = await run(once);
    expect(twice).toBe(once);
    expect(twice.match(/@layer clickui\s*{/g)).toHaveLength(1);
  });
});
