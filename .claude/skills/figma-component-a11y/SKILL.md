---
name: figma-component-a11y
description: Create or change a component page in the Click UI v2 Figma file with accessibility built in - Semantic tokens only, a dark mode preview, and the WCAG check that draws the Accessibility block (contrast, focus, target size, library links) and compares with the repo. Use when a designer asks to create a component page, fix a component's tokens, add a dark preview, check or fix a11y/contrast in Figma, update the foundation pages after a token change, or export tokens as DTCG.
---

# Figma components with accessibility built in

Every component page in the [Click UI v2 Figma file](https://www.figma.com/design/ek6PdO13m1lwcDjuX7sd1K/Click-UI-v2) has:

- A light frame named after the component, bound only to local **Semantic** variables, text styles and shadow styles.
- A `<Name> (dark)` frame to its right: the same page with Semantic set to Dark, showing **instances**.
- An **Accessibility** block (layer `A11y`) on both frames, drawn by `scripts/figma-a11y-audit.js`, with a "Repo today" section from `scripts/repo-contrast.mjs`.

Setup for people is in [docs/figma.md](../../../docs/figma.md).

## Before you start

1. Figma desktop with the v2 file open, the **figma-console** MCP connected and the Desktop Bridge plugin running. Check with `figma_get_status`; if another file is active, `figma_navigate` to the v2 URL with `lock: true`.
2. Scripts run through `figma_execute`: read the file, edit its `CONFIG` block, pass the whole contents as `code` (top-level `await` and `return` work). Calls time out at 30 s; scripts that can run long take a narrower `CONFIG`.
3. Screenshots: `figma_capture_screenshot` with `scale` 0.5 or more. Look at every result before reporting.
4. Find frames by page name, then `scripts/figma-inspect-page.js`. Node IDs change when a dark frame is rebuilt; don't hard-code them.

## Rules

- Components bind **Semantic** color tokens only (`color/*`, `utility/*`). No raw hex and no Primitives (`palette/*`), except logo, flag and payment artwork and the Spacer canvas marker.
- Text uses the local product styles, which match the repo's `--typography-styles-product-*` and `field-md`: `Title/xs`–`2xl`, `Body/*` (400), `Body-medium/*` (500), `Body-strong/*` (600), `Body-bold/*` (700), each `xs`–`lg`, `Field/md`, `Code/xs`–`lg`. Documentation headings in Basier Square are plain text.
- Radius, spacing, icon size and stroke bind Semantic `radius/*`, `space/*`, `sizing/icon/*`, `sizing/stroke/*`.
- Shadows use the local effect styles, which copy the repo:

  | Style | Repo | Used by |
  |---|---|---|
  | `Shadow/default` | `--shadow-1` | cards, dialogs, menus, panels, popovers, toasts |
  | `Shadow/inset` | `--shadow-2` | nothing yet |
  | `Shadow/flyout` | `--shadow-3` | flyout on the right edge |
  | `Shadow/flyout-reverse` | `--shadow-4` | flyout on the left edge |
  | `Shadow/subtle` | `--shadow-5` | nothing yet |

- Nothing links to another library: no remote instances, styles, variables or variable modes. The audit warns when it finds any.
- **Repo names are the source of truth.** Component, property and variant names follow `src/components/<Name>` props. Known differences: repo `danger` is `error` in Semantic feedback tokens (`Danger` in variant names); `button-basic-color-empty-*` is Button `Type=Link`; `iconButton-color-primary-*` (transparent) is Icon Button `Type=Primary`, `secondary` (filled) is `Type=Secondary`.
- **Ask first** before adding a Semantic token, changing an existing token's value, or adding a text style. Changing a value restyles every component using it: find those first and say which change.
- Floating surfaces (popover, menus, flyout) use `color/background/raised`; hover on them `color/background/raised-hover`. Dialog and Panel stay on `color/background/base`. Field format hints use `color/foreground/subtle`.

## Workflow: new component

1. Read the repo component: props in `src/components/<Name>/`, its CSS module, and its tokens (`rg "click-<name>" src/theme/styles/tokens-light.css`). If there's no repo component yet, open a [component RFC](../../../.github/PULL_REQUEST_TEMPLATE/component_rfc.md) with the Figma link.
2. Run `scripts/figma-new-component-page.js` with `NAME` (the repo name) and `DESCRIPTION`. It creates the page and a light frame with the local Doc Header and a "Components" area. A component set with the same name already on the page is moved into the frame.
3. Build the component set with the designer, following the Rules. Variant properties are the repo props. Interactive components need `Default`, `Hover`, `Active`, `Focus` and `Disabled` states; Focus must look different from Default (a focus ring from `color/border/interactive/*` or a 2px stroke), and targets are 24x24 or more (or spaced 24px apart).
4. Continue with "Dark preview", "Check" and "Report" below.

## Workflow: changed component

1. `scripts/figma-inspect-page.js` with `FRAME_ID` set to the light frame. It lists every binding (flagging `[remote]` and `RAW` colors) and the component sets with their variant properties. Screenshot the frame.
2. Rebind with `scripts/figma-remap-variables.js`: fill `MAP` (old variable name to new), `DRY = true`, check `changed` and `notSemantic`, then `DRY = false`. Use `byVariant` when one variable must map to different tokens per state.
3. When no token fits: add a **generic interactive group** (like `color/background/interactive/neutral/{default,hover,active}` with `color/foreground/interactive/on-neutral`), not a component-named token. New values alias Primitive palette steps: pick the step closest to the repo value; if it fails contrast, move one step darker (Light) or lighter (Dark). Composite translucent repo colors over the page background (`#ffffff` Light, `#1f1f1c` Dark) before matching. A new Primitive gets `scopes = []` so it stays out of the pickers (Figma defaults to All scopes). Ask first.

## Dark preview

Run `scripts/figma-dark-preview.js` with `LIGHT_FRAME_ID`. It clones the light frame to the right, replaces every component set with a frame of instances (never leave cloned components), sets Semantic to Dark and retitles the headers "<Title> (light)" and "<Title> (dark)". Rerunning replaces the dark frame. Alert and Button dark frames were built by hand; don't rebuild them unless asked.

## Check

1. Repo contrast: `node .claude/skills/figma-component-a11y/scripts/repo-contrast.mjs . --failures`. It resolves every color in `src/theme/styles/tokens-{light,dark}.css` and prints failing pairs as JSON. For a new component, add `add(...)` lines: Figma set name, a regex for its variant names (`null` if Figma has no such variant), and the repo text and background variables.
2. `scripts/figma-a11y-audit.js` with `FRAME_IDS` (light and dark frames), `REPO_FAILURES` (the JSON above) and `DRY = true`. Fix and repeat until clean, then `DRY = false` to draw the block. It checks every non-disabled variant, in the frame's mode:
   - Text 4.5:1 (3:1 at 24px, or 18.66px bold); icon glyphs 3:1.
   - Borders of controls (sets matching `CONTROL`: fields, checkbox, radio, switch, select...) 3:1 against the background when the border is what shows the edge; focus strokes and focus-ring effects 3:1 (WCAG 1.4.11).
   - Sets with Hover or Active variants have a Focus variant that differs from its Default twin (2.4.7). Parts of other controls (`NOT_FOCUSABLE`) are skipped.
   - Targets under 24x24 are listed for review, not failed (2.5.8 allows spacing).
   - Links to another library.
   - A "Check by hand" list: state not by color alone, names for icon-only controls, keyboard behavior.

   Exempt: disabled variants, separators, logos, flags and payment marks, and icon shapes filled with a `color/background/*` or `utility/color/scrim/*` token. "Repo today" statuses: **Fixed in Figma**, **Still fails in Figma**, **Not in Figma** (needs a repo fix).
3. Rerun the audit on every page whose tokens changed, not just the one you were asked about.

## Foundations and tokens

These pages are drawn from the variables and styles; rerun the script after changing what it shows:

| Page | Script |
|---|---|
| Color | `scripts/figma-color-page.js` (set `PARTS` to redraw single blocks if a run times out) |
| Typography | `scripts/figma-typography-page.js` |
| Radii, Shadow | `scripts/figma-foundation-lists.js` |
| Foundations overview | `scripts/figma-foundations-page.js` |
| Start here (guide for designers; keep in step with `docs/figma.md`) | `scripts/figma-start-here-page.js` |

Tokens must export as valid DTCG (format 2025.10): run `scripts/figma-export-dtcg.js`, then `node scripts/validate-dtcg.mjs <result>`. Add a prefix to `TYPE_BY_PREFIX` for a new number or text group. Rules Figma doesn't enforce:

- No `.`, `{`, `}` or leading `$` in a name segment, and no name that is both a token and a group.
- Font weights use DTCG names (`medium` 500, `semi-bold` 600, `bold` 700, `extra-bold` 800).
- Dimensions are px; don't add `em` or `%` variables.
- Text variables only for `font/family-*` (CSS stack) and `motion/easing-*` (`cubic-bezier()`).
- Text styles bind `fontSize` to a `font/size-*` variable (xs 10 to 3xl 32) and use a percent line height.

The export is not written to the repo; `tokens/themes/*.json` is still Tokens Studio format. Don't edit it unless asked.

## Report

Screenshot each changed frame. Report which token values changed (Light and Dark, with palette steps), which components that affects, the audit result before and after, and what's left. Figma changes are not in the repo: say so.

## Figma plugin API gotchas

- Dynamic page loading: use `getNodeByIdAsync`, `figma.variables.getVariableByIdAsync`, `getLocalVariablesAsync`, `getMainComponentAsync()`, `setTextStyleIdAsync`, `setEffectStyleIdAsync`, and `figma.loadAllPagesAsync()` before searching other pages.
- Bind colors with `figma.variables.setBoundVariableForPaint(paint, 'color', variable)` and reassign the whole `fills`/`strokes` array. Alias with `figma.variables.createVariableAlias(variable)`.
- `appendChild` and `insertChild` return nothing. Returning `figma.mixed` fails ("Cannot unwrap symbol").
- Load a text node's fonts before changing `characters`. Basier Square has no "→" glyph.
- Text with a link or a second color reports `fills === figma.mixed`: read it with `getStyledTextSegments(['fills'])`. A stale layer-level fill binding stays after the ranges change: set `fills` to one range's paints, then `setRangeFills` per range.
- Detaching a text style keeps its variable bindings (`fontSize`); unbind them if the variable will change.
- A nested instance inside an instance ignores `setBoundVariable`; unbinding works. Changing a main rebuilds its instances' layers, so rerun scripts that touch both.
- Exported PNGs of transparent sets show transparency as black; judge colors on a page frame screenshot. Stacked translucent fills double up; remove the inner one.
