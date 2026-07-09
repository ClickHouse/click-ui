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

  it('keeps @keyframes inside the layer (a uniquely-named keyframes resolves the same either way)', async () => {
    const out = await run(
      '.spinner { animation: spin 1s; }\n@keyframes spin { from { transform: rotate(0); } to { transform: rotate(360deg); } }'
    );
    expect(out.match(/@layer clickui\s*{/g)).toHaveLength(1);
    expect(out).toMatch(/@layer clickui\s*{[^]*@keyframes spin/);
  });

  it('wraps a global theme-token stylesheet (:root / [data-cui-theme]) too', async () => {
    const out = await run(
      ':root, [data-cui-theme="light"] { --click-x: 1rem; }',
      '/x/theme/styles/tokens-light.css'
    );
    expect(out).toMatch(/@layer clickui\s*{\s*:root, \[data-cui-theme="light"\]/);
  });

  it('hoists @import/@charset above the layer (CSS forbids them inside @layer)', async () => {
    const out = await run('@import "reset.css";\n.alert { color: red; }');
    // @import must precede the layer block…
    expect(out.indexOf('@import')).toBeLessThan(out.indexOf('@layer clickui'));
    // …and the rule is still wrapped.
    expect(out).toMatch(/@layer clickui\s*{\s*\.alert/);
  });

  it('keeps a leading comment with the rule it annotates, inside the layer', async () => {
    const out = await run('/* base */\n.alert { color: red; }');
    expect(out).toMatch(/@layer clickui\s*{\s*\/\* base \*\/\s*\.alert/);
  });

  it('is idempotent — running twice does not double-wrap', async () => {
    const once = await run('.alert { color: red; }\n@keyframes spin { from {} to {} }');
    const twice = await run(once);
    expect(twice).toBe(once);
    expect(twice.match(/@layer clickui\s*{/g)).toHaveLength(1);
  });
});
