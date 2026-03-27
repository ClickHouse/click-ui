---
'@clickhouse/click-ui': minor
---

Ship pre-compiled CSS alongside components via CSS Modules.

Components now import their own Web Standard CSS files (.css) directly. When you import a component, whether from the barrel export (`@clickhouse/click-ui`) or a per-component path (`@clickhouse/click-ui/Button`), your bundler (webpack, Vite, etc.) will discover the CSS import and emit it into your application's CSS output automatically.

**What this means for your app:**

- **Bundler-managed CSS**: The CSS that was previously injected at runtime by styled-components is now delivered as standard `.css` files; Only applies for components which have migrated out from Styled Components as there's a transition period. Your bundler handles concatenation, minification, and ordering.
- **Tree-shaking works**: Components you don't import won't have their CSS included. The `sideEffects: ["**/*.css"]` declaration in `package.json` ensures bundlers keep CSS for the components you do use.
- **No config changes needed**: Per-component CSS is additive, unused components produce no extra CSS.
- **CSS Modules under the hood**: Class names are scoped and hashed to avoid collisions. You don't need to change anything; the public component API is unchanged.

**Migration:**

None required! Install the update and your bundler will handle the rest.
