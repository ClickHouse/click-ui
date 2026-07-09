import {
  AtRule,
  Comment,
  Rule,
  type ChildNode,
  type Container,
  type Plugin,
} from 'postcss';

/**
 * PostCSS plugin: wrap every click-ui component rule in a nested set of BEM
 * cascade layers so overrides are predictable without specificity hacks.
 *
 *   @layer clickui.block, clickui.elem, clickui.mod, clickui.override;
 *   @layer clickui.block { .alert { … } }
 *   @layer clickui.elem  { .alert__icon { … } }
 *   @layer clickui.mod   { .alert_type_default { … } }
 *
 * Layer precedence is `unlayered > last-declared layer > … > first-declared`,
 * and specificity only matters *within* a layer. Ordering the sub-layers
 * `block → elem → mod` (mod last = highest) buys two guarantees:
 *
 *  1. A modifier always resolves above the block/element it modifies — from
 *     layer order, not specificity — so internal specificity hacks (`:where()`
 *     bases, doubled classes, `:not()` chains) are no longer needed.
 *  2. Any unlayered consumer style (an app rule, or a `styled(Component)`
 *     override) beats every `clickui.*` layer, with zero configuration.
 *
 * The highest sub-layer, `clickui.override`, is not derived from a class name;
 * a rule opts in with a `/* @clickui-layer override *​/` comment. It is for the
 * rare case where one click-ui component composes another and must override the
 * composed component's own block/elem/mod rules on the same node (which the
 * block/elem/mod order alone can't express). It still sits below unlayered
 * styles, so consumer overrides keep winning.
 *
 * The public contract is just the top-level `clickui` layer; the sub-layers are
 * an internal implementation detail.
 *
 * Must run BEFORE CSS-Modules name scoping so it classifies the original BEM
 * class names (in both pipelines it is ordered ahead of postcss-modules).
 */

const TOP_LAYER = 'clickui';
// Name-based classification yields block | elem | mod. `override` is the
// highest internal sub-layer and is reachable ONLY via an explicit
// `/* @clickui-layer override */` annotation — for a click-ui rule that
// intentionally overrides a DIFFERENT click-ui component composed on the same
// node (e.g. Flyout.Body overriding Container's width, DatePicker overriding a
// Panel modifier). The block/elem/mod order can't express that cross-component
// precedence, but `override` still sits below any unlayered consumer style, so
// consumer overrides keep winning.
const SUBLAYERS = ['block', 'elem', 'mod', 'override'] as const;
type Layer = (typeof SUBLAYERS)[number];

/** The order declaration that fixes sub-layer precedence, emitted once per file. */
const ORDER_PARAMS = SUBLAYERS.map(l => `${TOP_LAYER}.${l}`).join(', ');

/** `/* @clickui-layer <layer> *​/` forces the next rule into that sub-layer. */
const LAYER_ANNOTATION = /@clickui-layer\s+(block|elem|mod|override)\b/;

const annotatedLayer = (comments: Comment[]): Layer | null => {
  for (const comment of comments) {
    const match = comment.text.match(LAYER_ANNOTATION);
    if (match) return match[1] as Layer;
  }
  return null;
};

/**
 * Classify a single BEM local class name.
 *
 * click-ui naming uses three separators: `__` = element, single `_` =
 * modifier (`_key_value`), `-` = word within a name. So after neutralizing the
 * element separators, a remaining `_` means "modifier"; otherwise the presence
 * of `__` means "element"; otherwise it is a block. (The stylelint
 * `selector-class-pattern` rule enforces that `_` is only ever a modifier
 * separator, which is what makes this heuristic reliable.)
 */
function classRole(local: string): Layer {
  const noElemSep = local.split('__').join('·');
  if (noElemSep.includes('_')) return 'mod';
  return local.includes('__') ? 'elem' : 'block';
}

/** Extract the `.class` tokens from a selector (ignores elements/pseudos/attrs). */
function classTokens(selector: string): string[] {
  return (selector.match(/\.[a-zA-Z0-9_-]+/g) ?? []).map((token: string) =>
    token.slice(1)
  );
}

/**
 * Role for one comma-free selector: `mod` if ANY class token is a modifier,
 * else `elem` if any targets an element, else `block`. Returns null when the
 * selector has no class token at all (global/element rule → left unlayered).
 */
function selectorRole(selector: string): Layer | null {
  const roles = classTokens(selector).map(classRole);
  if (roles.length === 0) return null;
  if (roles.includes('mod')) return 'mod';
  if (roles.includes('elem')) return 'elem';
  return 'block';
}

/** Split a selector list on top-level commas (commas inside `:not(…)` are kept). */
function splitSelectorList(selector: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = '';
  for (const char of selector) {
    if (char === '(') depth++;
    else if (char === ')') depth--;
    if (char === ',' && depth === 0) {
      parts.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  parts.push(current);
  return parts.map(part => part.trim()).filter(Boolean);
}

/** Conditional group at-rules whose children participate in the cascade. */
const CONDITIONAL_AT_RULES = new Set(['media', 'supports', 'container']);

type Bucket = Layer | 'unlayered';
type Buckets = Record<Bucket, ChildNode[]>;

// block → elem → mod → override → unlayered; drives both split order and output.
const BUCKET_ORDER: Bucket[] = ['block', 'elem', 'mod', 'override', 'unlayered'];

const emptyBuckets = (): Buckets => ({
  block: [],
  elem: [],
  mod: [],
  override: [],
  unlayered: [],
});

/**
 * Sort the children of a container into block/elem/mod/unlayered buckets.
 * Leading comments travel with the next rule they annotate.
 */
function bucketize(nodes: ChildNode[]): Buckets {
  const buckets = emptyBuckets();
  let pendingComments: Comment[] = [];

  const flushInto = (target: ChildNode[]) => {
    target.push(...pendingComments.map(comment => comment.clone()));
    pendingComments = [];
  };

  for (const node of nodes) {
    if (node.type === 'comment') {
      pendingComments.push(node as Comment);
      continue;
    }

    if (node.type === 'rule') {
      const rule = node as Rule;

      // An explicit annotation forces the whole rule into one sub-layer,
      // overriding name-based classification (used for cross-component
      // overrides the block/elem/mod order can't express).
      const forced = annotatedLayer(pendingComments);
      if (forced) {
        flushInto(buckets[forced]);
        buckets[forced].push(rule.clone());
        continue;
      }

      // Group this rule's selectors by role, splitting a mixed-role list so
      // each part lands in its own layer (`.link, .link_size_xs` → two rules).
      const byRole = new Map<Bucket, string[]>();
      for (const selector of splitSelectorList(rule.selector)) {
        const role = selectorRole(selector) ?? 'unlayered';
        const list = byRole.get(role) ?? [];
        list.push(selector);
        byRole.set(role, list);
      }

      let first = true;
      // Deterministic order so a split rule reads block → elem → mod.
      for (const role of BUCKET_ORDER) {
        const selectors = byRole.get(role);
        if (!selectors) continue;
        const clone = rule.clone();
        clone.selector = selectors.join(',\n');
        const target = buckets[role];
        if (first) flushInto(target);
        target.push(clone);
        first = false;
      }
      continue;
    }

    if (node.type === 'atrule') {
      const atRule = node as AtRule;
      if (CONDITIONAL_AT_RULES.has(atRule.name.toLowerCase())) {
        // Classify by inner rules; a conditional block may appear in several
        // layers, each carrying only the children of that role.
        const inner = bucketize((atRule.nodes ?? []) as ChildNode[]);
        let first = true;
        for (const role of BUCKET_ORDER) {
          if (inner[role].length === 0) continue;
          const clone = atRule.clone();
          clone.removeAll();
          clone.append(...inner[role]);
          const target = buckets[role];
          if (first) flushInto(target);
          target.push(clone);
          first = false;
        }
      } else {
        // @keyframes / @font-face / @property / etc. — not class rules, leave
        // them unlayered so their behavior is untouched.
        flushInto(buckets.unlayered);
        buckets.unlayered.push(atRule.clone());
      }
      continue;
    }

    // Anything else (bare declarations, etc.) — keep unlayered.
    flushInto(buckets.unlayered);
    buckets.unlayered.push(node.clone());
  }

  // Trailing comments with no following rule.
  flushInto(buckets.unlayered);
  return buckets;
}

export function wrapInClickuiLayers(): Plugin {
  return {
    postcssPlugin: 'postcss-clickui-layers',
    Once(root) {
      // Idempotency guard: skip a root that is already layered.
      const firstAtRule = root.first;
      if (
        firstAtRule?.type === 'atrule' &&
        (firstAtRule as AtRule).name === 'layer' &&
        (firstAtRule as AtRule).params === ORDER_PARAMS
      ) {
        return;
      }

      const buckets = bucketize(root.nodes as ChildNode[]);
      root.removeAll();

      // 1. Order declaration first — fixes sub-layer precedence by first mention,
      //    idempotent across the many files concatenated into click-ui.css.
      root.append(new AtRule({ name: 'layer', params: ORDER_PARAMS }));

      // 2. Unlayered nodes (keyframes, globals) — order among these is preserved.
      const appendInto = (container: Container, nodes: ChildNode[]) => {
        for (const node of nodes) container.append(node);
      };
      appendInto(root, buckets.unlayered);

      // 3. One `@layer clickui.<layer> { … }` block per non-empty sub-layer.
      for (const layer of SUBLAYERS) {
        if (buckets[layer].length === 0) continue;
        const layerNode = new AtRule({ name: 'layer', params: `${TOP_LAYER}.${layer}` });
        appendInto(layerNode, buckets[layer]);
        root.append(layerNode);
      }
    },
  };
}

wrapInClickuiLayers.postcss = true;

export default wrapInClickuiLayers;
