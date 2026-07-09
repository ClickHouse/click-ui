import { AtRule, type ChildNode, type Plugin } from 'postcss';

/**
 * PostCSS plugin: wrap a stylesheet's contents in a single `clickui` cascade
 * layer.
 *
 *   @layer clickui {
 *     .alert { … }
 *   }
 *
 * Cascade-layer precedence is `unlayered > layered`, so any style a consumer
 * writes outside a layer — or in a layer they declare after `clickui` — beats
 * every click-ui style regardless of stylesheet order or specificity. Inside
 * the layer, precedence is ordinary CSS (specificity + source order).
 *
 * Everything is wrapped, including the theme token files, so the whole library
 * sits behind the one boundary consumers override. Only the at-rules CSS
 * forbids inside `@layer` are hoisted out above it; `@keyframes`, `@font-face`
 * and `@property` are valid inside a layer and stay wrapped.
 *
 * Runs in both build pipelines: Vite's `css.postcss` (dev, Storybook, the
 * visual-regression suite, the bundled `dist` CSS) and, for the standalone
 * `dist` stylesheets, `copyCssFiles`.
 */

const LAYER = 'clickui';

/** At-rules CSS forbids inside `@layer` — they must sit at the stylesheet top level. */
const HOIST_AT_RULES = new Set(['charset', 'import', 'namespace']);

const isHoisted = (node: ChildNode): boolean =>
  node.type === 'atrule' && HOIST_AT_RULES.has((node as AtRule).name.toLowerCase());

export function wrapInClickuiLayers(): Plugin {
  return {
    postcssPlugin: 'postcss-clickui-layers',
    Once(root) {
      const nodes = root.nodes as ChildNode[];
      if (nodes.length === 0) return;

      // Idempotency guard: a top-level `@layer clickui { … }` block means we
      // already wrapped this root (the plugin can see a file more than once —
      // e.g. HMR). Require the block form: a bare `@layer clickui;` order
      // statement (postcss `nodes === undefined`) declares the layer but wraps
      // nothing, so it is not proof of wrapping and must not short-circuit.
      const alreadyWrapped = nodes.some(
        node =>
          node.type === 'atrule' &&
          (node as AtRule).name === 'layer' &&
          (node as AtRule).params === LAYER &&
          (node as AtRule).nodes !== undefined
      );
      if (alreadyWrapped) return;

      const hoisted = nodes.filter(isHoisted);
      const layered = nodes.filter(node => !isHoisted(node));
      if (layered.length === 0) return;

      root.removeAll();
      // Hoisted at-rules stay at the top; everything else moves into the layer
      // in source order (so comments stay next to the rules they annotate).
      for (const node of hoisted) root.append(node);
      const layer = new AtRule({ name: 'layer', params: LAYER });
      for (const node of layered) layer.append(node);
      root.append(layer);
    },
  };
}

wrapInClickuiLayers.postcss = true;

export default wrapInClickuiLayers;
