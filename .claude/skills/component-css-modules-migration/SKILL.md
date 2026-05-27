---
name: component-css-modules-migration
description: Migrate a click-ui component from styled-components to CSS Modules with byte-for-byte visual regression coverage. Use whenever a component still uses styled-components and is on the CSS Modules migration list.
---

# Component CSS Modules Migration

A repeatable procedure for migrating one click-ui component at a time from `styled-components` to CSS Modules + `cva` / `cn`. The pattern was first executed end-to-end in PR #1034 (ButtonGroup), which is the canonical reference if anything here is ambiguous.

The procedure is built around a strong, single claim: **the migration commit changes nothing visible**. Visual regression tests captured against the styled-components rendering must pass byte-for-byte against the CSS Modules rendering. No tolerance for "looks the same"; the snapshots either pass or they don't.

## Scope rule (hard line)

The migration PR is a **pure styling refactor**. Everything below is **out of scope** even when tempting:

- ARIA refinements (adding `aria-disabled`, removing redundant `role="button"`, plumbing `aria-label`)
- Adding HTML attributes (`type="button"`, etc.)
- CSS correctness fixes (`:hover:not(:disabled)`, `:focus-visible` outlines, explicit disabled+active rules that the original didn't have)
- Consumer updates (e.g. adding `aria-label="..."` to existing consumers)
- New props or JSDoc

If the original styled-components has a bug (hover firing on disabled, missing focus ring, wrong disabled+active color), the migration **preserves the bug**. Fix it in a separate PR *after* the migration lands.

The reason this rule exists: the visual regression test is credible *only* because the migration commit changed nothing visible. If you bundle in a "small" a11y improvement, snapshots regenerate, and the "byte-for-byte" guarantee evaporates. The rule also makes the migration mechanical — there are no judgment calls about which improvements to include.

The only collateral change you may need: a narrow TypeScript widening (e.g. `HTMLAttributes<HTMLButtonElement>` → `ButtonHTMLAttributes<HTMLButtonElement>`) when the new test stories need a prop like `disabled` to typecheck. That's pure TS, no runtime effect — include it in the baseline commit and call it out.

## Prerequisites

1. The component still uses `styled-components` (check `src/components/<Name>/<Name>.tsx`).
2. The component's design tokens already exist as CSS variables in `packages/design-tokens/dist/tokens.css` (search for `--click-<component-name>-*`).
3. The `Button` precedent is readable: `src/components/Button/Button.tsx` and `src/components/Button/Button.module.css`.
4. `yarn test:visual` and `yarn test:visual:update` work (they invoke `.scripts/bash/playwright-docker`, which runs Playwright inside a Linux container). If they don't work, **fix the tooling first as its own commit** — don't work around it locally.

## Commit structure

Two commits. Each must leave `main` green on its own.

| # | Subject | One-line purpose |
|---|---|---|
| 1 | `test(<Name>): add visual regression baseline before CSS Modules migration` | Capture the current styled-components rendering as snapshots. |
| 2 | `chore(<Name>): migrate styling from styled-components to CSS Modules` | Replace styled-components with `.module.css` + `cva`/`cn`. Snapshots from #1 still pass byte-for-byte. |

If you need to fix repo tooling (broken script, version mismatch) to even run `yarn test:visual`, that goes in its own prep commit *before* commit 1 — e.g. `chore(test:visual): <description>`. Don't bundle tooling fixes into the migration.

## Commit 1 — Visual regression baseline

### Files

- `src/components/<Name>/<Name>.stories.tsx` — Extend the existing stories. There must be exactly one named story per visual variant the spec wants to screenshot. Reuse the structure from `src/components/ButtonGroup/ButtonGroup.stories.tsx`. Required scenarios: each `type` variant, selected/active state, disabled state (including disabled+active if applicable), fill-width / size variants, multi-select if applicable.
- `tests/<area>/<name>.spec.ts` — New Playwright spec. Pick `<area>` carefully:
  - **Never put component specs under `tests/utils/`.** That folder is reserved for shared test helpers like `getStoryUrl` (`tests/utils/index.ts`). Mixing specs and helpers there confuses both human readers and Copilot reviewers.
  - Use an existing component-family folder if the component fits one (e.g. `tests/buttons/`, `tests/cards/`).
  - For primitives that just display content (Spacer, Separator, Text, Title, Label, GenericLabel, Icon, etc.), use **`tests/display/`**.
  - Establish a new folder only when the component genuinely starts a new family. Name it for the family (e.g. `tests/forms/`, `tests/overlays/`), not the component.

  Mirror the structure from `tests/buttons/button.spec.ts` or `tests/buttons/buttongroup.spec.ts`. Cover:
  - Light + dark theme via `getStoryUrl(storyId, theme)` from `tests/utils/index.ts` (imported as `from '../utils'` from a sibling test folder)
  - Each variant story → snapshot
  - Interactive states (hover, focus) — call `page.locator('body').click()` before `Tab` to anchor focus into page content (not browser chrome — known flakiness fix)
  - Keyboard activation if relevant (Space, Enter) — works on native `<button>` regardless of styling
  - Any ARIA assertions the existing component already supports
  - Use `page.getByRole(...)` matchers, not CSS attribute selectors like `[role="button"]:nth-child(N)`
- `tests/<area>/<name>.spec.ts-snapshots/*.png` — Generated, not committed by hand. See below.
- `src/components/<Name>/<Name>.types.ts` — Only touch this if the new stories don't typecheck. The acceptable change is widening (e.g. `HTMLAttributes` → `ButtonHTMLAttributes`). Anything more is scope creep.

### Files NOT touched in this commit

- `<Name>.tsx` — the component stays on styled-components.
- `<Name>.test.tsx` — unit tests untouched.
- Any consumer file.
- Any other `tests/**/*.spec.ts` file unless the new stories *forced* an incidental change (rare; if so, put it in its own commit before this one).

### Snapshot generation rules

**Always** generate snapshots fresh via:

```
yarn test:visual:update tests/<area>/<name>.spec.ts
```

This runs Playwright inside the Linux Docker container (`.scripts/bash/playwright-docker`), so snapshots are named `-chromium-linux.png` and match what CI generates on `ubuntu-latest`. The same snapshots work on any host OS because the runtime is normalized via Docker; you do not need platform-agnostic snapshots.

**Never** cherry-pick PNG baselines from another branch or PR. They were captured against a different point in time and may hide drift that landed on `main` since.

After generating, run `yarn test:visual tests/<area>/<name>.spec.ts` to confirm green, then `git add` everything together (stories + spec + snapshots) and commit.

### Acceptance

- `yarn test:visual tests/<area>/<name>.spec.ts` — all green.
- `yarn test <Name>` — unit tests pass (nothing changed for them).
- `yarn build` — succeeds.

## Commit 2 — CSS Modules migration

### Files

- `src/components/<Name>/<Name>.module.css` — **New file.** Translates the styled-components rules into CSS. Concrete rules:
  - **One CSS variable per `theme.click.*` reference.** Find each `${({ theme }) => theme.click.x.y.z}` in the styled-components source and replace with `var(--click-x-y-z)`. The token names already exist in `packages/design-tokens/dist/tokens.css`.
  - **Match the existing selectors exactly.** If the source has `&:hover` (no `:not(:disabled)` qualifier), write `.component:hover` — do NOT "improve" it to `.component:hover:not(:disabled)`. If the source has no `:focus-visible` rule, don't add one. Preserving wrong behavior is the price of byte-for-byte verification.
  - **Match cascade order.** styled-components emits rules in source order. If the original has `&[aria-pressed='true']` defined twice (once before `:disabled`, once after), the second appearance is doing real work via cascade — replicate that ordering.
  - **Use BEM naming** per the regex in `stylelint.config.js`: `block`, `block__element`, `block_modifier`, `block_modifier_value`. Modifier values use underscores, not dashes.
  - **Property order** follows the logical grouping rule in `stylelint.config.js` (display → position → box-model → flexbox → border → background → typography → ...). `yarn lint:css` is the source of truth.
  - **Alias global tokens to local custom properties when a color/theme variant crosses many states.** When the styled-components source dispatches on a variant prop (e.g. `$color`) to pick from a token tree like `theme.click.card.horizontal[$color].color.background[$state]`, do *not* write a separate `:hover` / `:active` / `:disabled` rule per variant. Instead, in each variant block (`.wrapper_color_default`, `.wrapper_color_muted`, …), declare local custom properties (`--card-bg-default`, `--card-bg-hover`, …) pointing at the long global tokens. Then write the state rules **once** on the base class using the short local names (`background-color: var(--card-bg-hover)`). The cascade picks the right value because the local var is set by whichever color modifier is on the element. Concretely, for `M` color variants × `N` states × `P` properties, this is `M × N × P` long token references collapsed into `M × N × P` local-var declarations plus `N × P` state rules — same token count, but the state rules deduplicate across variants. See `src/components/CardHorizontal/CardHorizontal.module.css` for the canonical example (`.wrapper_color_default` / `.wrapper_color_muted` define `--card-bg-*`, `--card-title-*`, `--card-stroke-*`, `--card-desc-*`; the `:hover`, `:active`, `.wrapper_disabled` rules below reference the short names). Skip the indirection when there is only one variant on the axis — the savings don't justify the extra layer.
- `src/components/<Name>/<Name>.tsx` — Replace styled-components with `cva` + `cn`:
  ```ts
  import { cn, cva } from '@/lib/cva';
  import styles from './<Name>.module.css';

  const wrapperVariants = cva(styles.<root>, {
    variants: { /* one per styled-components transient prop */ },
    defaultVariants: { /* match the component's defaults */ },
  });
  ```
  Render the wrapper with `className={cn(wrapperVariants({ ... }), className)}`. The DOM tree must be byte-identical to before:
  - **Preserve every existing attribute.** If the styled component had `role="button"` on a `<button>` (redundant but present), keep `role="button"` on the migrated `<button>`. If it had `role="group"` on a `<div>`, keep it. Don't add new attributes (no `aria-disabled`, no `type="button"`).
  - **Drop the transient props** (`$active`, `$fillWidth`, `$type`, etc.) — they were styled-components plumbing and never appeared in the DOM.
  - **Preserve `className` passthrough on both levels.** Destructure `className` from the component's own props and pass through `cn(wrapperVariants(...), className)`. For each child element that accepts consumer props (e.g. `options.map(({ value, label, ...buttonProps })`), also destructure its `className` (e.g. `className: optionClassName`) and merge via `cn(buttonVariants(...), optionClassName)`. **Do not** rely on `{...spread}` after `className=` — the spread will silently override your variants. (styled-components handled this implicitly; `cn()` makes it explicit.)
  - **Preserve `{...props}` spread position relative to hardcoded attributes.** If the original styled-components JSX placed `{...props}` *after* attributes like `aria-disabled`, `tabIndex`, or `onClick`, the migration must do the same. Reversing the order (spreading `{...props}` first, then writing hardcoded attributes) silently strips consumer overrides — e.g. a consumer passing `tabIndex={-1}` to remove keyboard focus will be quietly overridden by the component's hardcoded `tabIndex={0}`. `CardPrimaryProps extends HTMLAttributes<HTMLDivElement>` and similar bases admit those attributes via the type, so the bug is invisible to TypeScript. The safe rewrite is: hardcoded attributes first, then `{...props}`, then `className={cn(...)}` last (because `className` is destructured separately so the spread can't undo it).
  - **Preserve `forwardRef` if the original had it.** Wrap the new component in `forwardRef<HTMLElementType, Props>(...)`, accept `ref` as the second arg, and pass it to the wrapper element. Keep the `Component.displayName = '<Name>'` line if it was there.
  - **Preserve comments** that explain non-obvious behavior (e.g. controlled vs uncontrolled selection patterns).
- `src/components/<Name>/<Name>.types.ts` — Don't change unless commit 1 already had to.
- `src/components/<Name>/<Name>.test.tsx` — Don't change. If the unit tests passed before commit 2, they pass after.
- `.changeset/migrate-<name>-to-css-modules.md` — **Exact format**:

  ````markdown
  ---
  '@clickhouse/click-ui': patch
  ---

  Migrate <Name> from styled-components to css modules with no change in behavior
  ````

  `patch` bump (no behavior change → not even minor). Do not pad the body with extra prose, lists of preserved attributes, or migration notes — the terse phrasing is intentional and scales across dozens of migration PRs.

### Files NOT touched in this commit

- Stories, spec, and snapshots from commit 1 — they must not change.
- Unit tests.
- Any consumer file.
- `<Name>.types.ts` (unless commit 1 already touched it for typecheck reasons).

### The byte-for-byte rule

Run `yarn test:visual tests/<area>/<name>.spec.ts`. **Every snapshot must pass with zero regenerations.** If even one fails:

1. The CSS doesn't match the styled-components rendering.
2. Open the failing snapshot side-by-side (`yarn test:visual:report`) and diff the actual vs expected.
3. Fix the CSS to match. Common culprits:
   - Wrong cascade order on conflicting rules → reorder.
   - Missing `:disabled[aria-pressed='true']` (or similar) compound selector → add it back.
   - Token name typo → grep `tokens.css` for the correct CSS variable name.
4. **Never** regenerate the snapshot to make a "small" difference go away. That breaks the byte-for-byte guarantee and silently lets the migration drift visually.

The only legitimate reason to regenerate is if the snapshot in commit 1 itself was wrong (e.g. captured a flaky animation frame) — and in that case, you go back and fix commit 1, not roll the difference into commit 2.

### Acceptance

- `yarn test:visual tests/<area>/<name>.spec.ts` — all green, **zero snapshot changes**.
- `yarn test <Name>` — unit tests pass unchanged.
- `yarn lint:css` and `yarn lint:code` — pass with no new errors.
- `yarn build` — succeeds.
- `grep -r 'styled-components' src/components/<Name>/` — empty.
- Manual storybook side-by-side against the previous commit confirms visual parity.

## Common pitfalls (from PR #1034)

- **Scope creep in the CSS module file.** Drafts from prior split PRs may include `:hover:not(:disabled)`, `:focus-visible:not(:disabled)`, or `color: disabled-active` rules. Audit every selector against the original styled-components and drop the additions.
- **Wrong default mode for `--update-snapshots`.** Playwright 1.50+ requires an explicit mode. `yarn test:visual:update` already passes `--update-snapshots=all`; if you call playwright directly, you need to pass it yourself.
- **Class-name collisions via `{...spread}`.** Spreading consumer props after setting `className=` silently overrides the variants. Always destructure `className` (and `className: optionClassName` for child elements) and merge with `cn()`.
- **Prop spread order reversal silently kills consumer overrides.** If the styled-components JSX had `{...props}` last (after `aria-disabled`, `tabIndex`, `onClick`, etc.), the migration must keep it last. Spreading `{...props}` *before* the hardcoded attributes flips the precedence and consumer-passed values are silently ignored — TypeScript won't catch it because `HTMLAttributes<...>` admits those props. Caught post-merge on CardPrimary (#1038) and CardHorizontal (#1039).
- **Forgetting `forwardRef`.** If the component on `main` has been wrapped in `forwardRef` (look for `displayName`), the migration must preserve it. Wrap the new arrow function in `forwardRef<HTMLElementType, Props>(...)`, take `ref` as the second arg, pass it to the root element, and keep the `.displayName` line.
- **Cherry-picking PNG baselines.** Snapshots from a prior draft PR were captured against a different point in time. Always regenerate fresh.
- **Pinning down instead of bumping up.** If the playwright version in the Dockerfile mismatches `@playwright/test`, bump both to the latest and update everywhere it's referenced — don't pin the Dockerfile back to match an older `yarn.lock`.

## Checklist

Before marking the PR ready:

- [ ] Branch is rebased on the latest `main` (a fresh `forwardRef` or unrelated commit may have landed during the work).
- [ ] Commit 1 contains only stories, spec, snapshots, and possibly a narrow TS widening — nothing else.
- [ ] Commit 2 changes only `<Name>.tsx`, `<Name>.module.css`, and the changeset.
- [ ] Changeset is `patch` and reads exactly `Migrate <Name> from styled-components to css modules with no change in behavior`
- [ ] `yarn test:visual tests/<area>/<name>.spec.ts` is green with zero snapshot regenerations between the two commits.
- [ ] No `styled-components` imports remain in `src/components/<Name>/`.
- [ ] No internal links (Linear, Notion, internal Slack/Grafana) anywhere in PR text, commit messages, the changeset, or this skill's adjacent files — click-ui is a public repo.
- [ ] Any bundled a11y / type / consumer improvements have been split out into follow-up PR drafts to land *after* this one.
