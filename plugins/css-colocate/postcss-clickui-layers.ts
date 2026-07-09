import { AtRule, type ChildNode, type Plugin } from 'postcss';

/**
 * PostCSS plugin: wrap every click-ui component rule in a single `clickui`
 * cascade layer, so consumer overrides are predictable.
 *
 *   @layer clickui {
 *     .alert { … }
 *     .alert__icon { … }
 *     .alert_type_default { … }
 *   }
 *
 * Cascade-layer precedence is `unlayered > last-declared layer > … >
 * first-declared`, and specificity only matters *within* a layer. Wrapping all
 * of click-ui in one `clickui` layer buys the guarantee we actually need:
 *
 *   Any unlayered consumer style — a plain app rule, a CSS Module class, or a
 *   `styled(Component)` override — beats every click-ui style, regardless of
 *   stylesheet order or selector specificity, with zero configuration.
 *
 * Inside the layer, precedence is ordinary CSS (specificity + source order) —
 * exactly the cascade click-ui already ships today. So for click-ui's own
 * rendering this transform changes nothing; it only draws the boundary that
 * lets consumers win. Conflicts *between* click-ui components are resolved the
 * normal way, with specific-enough selectors, not by layer tricks.
 *
 * `@keyframes` (and any other non-conditional at-rule) is left unlayered: it
 * doesn't participate in the property cascade, and hoisting it out keeps its
 * behavior identical to today. `@media`/`@supports`/`@container` wrap rules
 * that do cascade, so they go inside the layer.
 *
 * Runs BEFORE CSS-Modules name scoping in both pipelines (dev/Storybook/the
 * visual-regression suite via `css.postcss`, and per-component dist CSS via
 * css-preprocess.ts), so the cascade that ships is exactly the one the
 * visual-regression suite validates.
 *
 * Scope is component CSS Modules ONLY. Vite's `css.postcss` runs on every
 * stylesheet, including global files like the `theme/styles/tokens-*.css`
 * imported by ThemeProvider — those must stay unlayered (they carry the design
 * tokens, not component styles, and `copyCssFiles` ships them to dist verbatim,
 * so layering them would make the combined `click-ui.css` disagree with the
 * per-module dist). We gate on the `.module.css` suffix to match
 * css-preprocess.ts, which only ever feeds it `*.module.css`.
 */

const LAYER = 'clickui';

/** Conditional group at-rules whose children participate in the cascade. */
const CONDITIONAL_AT_RULES = new Set(['media', 'supports', 'container']);

/** True for a node that belongs inside the layer (a rule, or a conditional group). */
function isLayerable(node: ChildNode): boolean {
  if (node.type === 'rule') return true;
  if (node.type === 'atrule') {
    return CONDITIONAL_AT_RULES.has((node as AtRule).name.toLowerCase());
  }
  // Comments and declarations ride along with whatever surrounds them; they are
  // handled by the grouping pass below, not classified here.
  return false;
}

export function wrapInClickuiLayers(): Plugin {
  return {
    postcssPlugin: 'postcss-clickui-layers',
    Once(root) {
      // Only layer component CSS Modules. Skip any stylesheet we can positively
      // identify as non-module (e.g. the global theme token files); a file with
      // no known name — inline processing, unit tests — is still processed.
      const file = root.source?.input.file;
      if (file && !file.endsWith('.module.css')) return;

      const nodes = root.nodes as ChildNode[];
      if (nodes.length === 0) return;

      // Idempotency guard: source component CSS never hand-writes `@layer`, so a
      // top-level `@layer clickui` means we already processed this root (the
      // plugin can see a file more than once — e.g. HMR). Leave it alone.
      const alreadyWrapped = nodes.some(
        node =>
          node.type === 'atrule' &&
          (node as AtRule).name === 'layer' &&
          (node as AtRule).params === LAYER
      );
      if (alreadyWrapped) return;

      // Partition top-level nodes, preserving source order within each group.
      // A comment is kept with the node it precedes so annotations travel with
      // their rule.
      const unlayered: ChildNode[] = [];
      const layered: ChildNode[] = [];
      let pending: ChildNode[] = [];

      for (const node of nodes) {
        if (node.type === 'comment') {
          pending.push(node);
          continue;
        }
        const target = isLayerable(node) ? layered : unlayered;
        target.push(...pending);
        pending = [];
        target.push(node);
      }
      // Trailing comments stay unlayered (no rule follows them).
      unlayered.push(...pending);

      // Nothing to layer (e.g. a keyframes-only file) — leave the file untouched.
      if (layered.length === 0) return;

      root.removeAll();
      // Unlayered nodes first (respects @import/@charset-must-be-first, and
      // keyframes don't cascade against rules, so position is irrelevant).
      for (const node of unlayered) root.append(node);

      const layer = new AtRule({ name: 'layer', params: LAYER });
      for (const node of layered) layer.append(node);
      root.append(layer);
    },
  };
}

wrapInClickuiLayers.postcss = true;

export default wrapInClickuiLayers;
