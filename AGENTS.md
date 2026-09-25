# AGENTS.md

Instructions for AI coding agents working in this repository. Read the whole file before
changing code. Humans: see [README.md](./README.md). Policy on AI use: [AI_POLICY.md](./AI_POLICY.md).

## 1. What this repository is

`@clickhouse/click-ui` is ClickHouse's React component library (design system).

- It is **public on GitHub** and used by many ClickHouse apps. A change to a prop, a style,
  or an ARIA attribute ships to all of them.
- Stack: React 18+, TypeScript 5+ (`strict`), CSS Modules, `cva` + `clsx`, Vite, Storybook,
  vitest + Testing Library, Playwright (visual tests, local + CI), Chromatic (visual, CI).
- Tooling: Yarn 4 through corepack (`packageManager` in `package.json`), Node `>=22.12.0`.
- Output: unbundled ESM + CJS with one `.module.css` per component. Consumers bundle it.
  Keep exports tree-shakeable: no side effects at module top level.
- `styled-components` was removed. Do not add it back. A few files still have `$`-prefixed
  internal props left over from that migration. Do not copy that naming into new code.

## 2. Commands

```sh
yarn                            # install
yarn dev                        # Storybook on http://localhost:6006 — the only dev playground
yarn test                       # vitest; filter by name: yarn test Button
yarn typecheck                  # tsc --noEmit
yarn lint                       # eslint (src, plugins) + stylelint (src/**/*.css); yarn lint:fix
yarn format                     # prettier check; yarn format:fix writes
yarn lint:code --prune-suppressions  # after fixing a frozen jsx-a11y violation (see section 7)
yarn circular-dependency:check
yarn build                      # .scripts/bash/build_pkg_dist -> dist/
yarn storybook:build            # static Storybook -> .storybook/out (what CI deploys)
yarn test:visual <Name>         # Playwright visual tests in Docker (Linux); needs Docker running
yarn test:visual:update <Name>  # regenerate snapshots — only when the visual change is intended
yarn test:visual names          # list names you can pass to the two commands above
yarn changeset:add              # interactive wizard; see section 9 for writing the file by hand
```

CI runs these as separate checks: `typecheck`, `lint`, `format`, `circular-dependency:check`,
`test`, `build` + `build:health_check`, visual regression (only specs whose `@covers` line
matches the diff), Chromatic, and a PR-title check (Conventional Commits).

Before you open a PR, run all of this and make it pass:

```sh
yarn typecheck && yarn lint && yarn format && yarn circular-dependency:check && yarn test && yarn build && yarn storybook:build
```

## 3. Repository map

```
src/
  components/<Name>/
    <Name>.tsx            # implementation
    <Name>.types.ts       # exported prop types
    <Name>.module.css     # styles (BEM class names, tokens as CSS variables)
    <Name>.test.tsx       # vitest + Testing Library
    <Name>.stories.tsx    # Storybook — the usage documentation
    index.ts              # public exports of this component
  index.ts                # public barrel — never import from it inside the library
  theme/                  # tokens in theme/tokens/*.ts and theme/styles/tokens-*.css
  lib/cva.ts              # exports `cva` (class-variance-authority) and `cn` (clsx)
  utils/test-utils.tsx    # exports `renderCUI()` — use it in every unit test
  hooks/ providers/ types/ assets/
tests/<family>/<name>.spec.ts   # Playwright visual specs, grouped by family (buttons, cards, forms, overlays, display, ...)
tests/utils/                    # shared test helpers only (getStoryUrl). Never put specs here.
tokens/themes/                  # tokens-studio input; `yarn generate:tokens` regenerates src/theme/tokens
plugins/css-colocate/           # Vite + PostCSS plugins: CSS colocation and the `clickui` cascade layer
.changeset/                     # pending changesets
.claude/skills/                 # step-by-step procedures (see section 11)
```

## 4. Rules that must not be broken

1. **Never weaken a check to make CI green.** Do not relax assertions, delete or skip tests,
   grow `eslint-suppressions.json`, or regenerate visual snapshots unless the visual change is
   confirmed intended. A lint or type disable always carries a reason:
   `// eslint-disable-next-line <rule> -- <reason>`.
2. **No new runtime dependency** without a written reason in the PR. Look in `src/utils` and
   `src/lib` first.
3. **Public API changes need a changeset** (new component, prop, variant, changed default,
   removed anything). Until v1.0.0 the bump is `patch` or `minor`, never `major`; a breaking
   change is a `minor` with a migration note. A new component starts with a Component RFC:
   `gh pr create --template component_rfc.md`.
4. **This repo is public.** Never put internal links (Linear, Notion, internal Slack, etc.)
   in code, comments, commits, changesets, or PR text. A bare ticket ID such as `CUI-123` is fine.
5. **Keep refactors pure.** A styling or structural refactor must not change behavior, DOM
   attributes, or accessibility. Put those improvements in a separate follow-up PR.
6. **Security.** No `dangerouslySetInnerHTML` with user content. No `eval()` or
   `new Function()` with dynamic content. Validate external URLs before using them in `href`
   or `src`. React escapes JSX text; do not bypass it.
7. **Do not use `any`.** The codebase has zero `any`. Type every event handler, for example
   `(event: React.MouseEvent<HTMLButtonElement>) => void`.

## 5. Building or changing a component

Copy an existing component instead of inventing structure:

- Simple component: `src/components/Button/`.
- Polymorphic component (renders as different elements): `src/components/Container/`.
  Copy its typing exactly (generic `<T extends ElementType>`, `forwardRef` cast to a
  polymorphic signature). Do not invent a looser `as?: ElementType` prop.
- Component built on a Radix primitive: pass `asChild` to the Radix part instead of adding
  your own polymorphism. `src/components/Dropdown/Dropdown.tsx` shows the pattern.

### Component skeleton

```tsx
import { cn, cva } from '@/lib/cva';
import { forwardRef } from 'react';
import styles from './Badge.module.css';
import { BadgeProps } from './Badge.types';

const badgeVariants = cva(styles.badge, {          // base class is ALWAYS the first argument
  variants: {
    variant: { default: styles.badge_default, danger: styles.badge_danger },
    size: { sm: styles.badge_size_sm, md: styles.badge_size_md },
  },
  defaultVariants: { variant: 'default', size: 'md' },
});

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', size = 'md', className, children, ...delegated }, ref) => (
    <span
      ref={ref}
      data-size={size}                               // 1. hardcoded attributes
      {...delegated}                                 // 2. consumer props (can override 1)
      className={cn(badgeVariants({ variant, size }), className)} // 3. className last
    >
      {children}
    </span>
  )
);
Badge.displayName = 'Badge';
```

- Destructure `className` and every prop you use, spread the rest after the hardcoded
  attributes so consumers can override them, and put `className={cn(...)}` last. A spread
  placed after `className` without destructuring it silently replaces your classes.
- Use `forwardRef` and set `displayName`. Keep both when editing. Do not use `React.FC`.

### Props (`<Name>.types.ts`)

```ts
export type BadgeVariant = 'default' | 'danger';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  /** Defaults to `md`. */
  size?: 'sm' | 'md';
}
```

- Extend the native attributes of the root element (`HTMLAttributes<HTMLSpanElement>`,
  `ButtonHTMLAttributes<HTMLButtonElement>`, ...). Export variant unions as named types.
- JSDoc a prop only when its name and type leave something out: placement, format, units,
  behavior or a default. One line, ending with a period.
- Do not name a prop like a native attribute it would hide (`type`, `size` on inputs,
  `title`). `Button`'s `type` prop is a known mistake kept for compatibility. Do not copy it.
- Do not declare `children` when the interface extends `HTMLAttributes` (it is already
  there). Otherwise type it as `React.ReactNode` and give it a JSDoc: Storybook drops an
  undocumented `children` from its prop table.

### Imports and code style

- Import sibling components from their leaf path: `import { Icon } from '@/components/Icon';`
  Never from `@/components` or `@/index` inside the library (ESLint error, and it creates
  circular imports).
- Prettier and ESLint own code style: single quotes, arrow functions, braces always.
  Run `yarn lint:fix && yarn format:fix` instead of fixing by hand.

## 6. Styling (CSS Modules)

### Class names: BEM

`stylelint` enforces this pattern (`selector-class-pattern` in `stylelint.config.js`):

```css
.badge { }                 /* block: the component root, base styles      */
.badge__icon { }           /* element: a child, double underscore         */
.badge_danger { }          /* modifier: variant or state, single underscore */
.badge_size_sm { }         /* modifier with value: block_modifier_value   */
.badge_fill-width { }      /* hyphens are allowed inside a name part      */
```

In TSX always go through the module object: `styles.badge`, `styles['badge_fill-width']`.
A string literal like `cn('badge')` is an unscoped global class that matches nothing. Every
block and element needs a base class, passed as `cva`'s first argument. If the base has no
styles, keep it empty and mark it with
`/* stylelint-disable-next-line block-no-empty -- base element required by BEM */`.

### Tokens and states

- Colors, spacing, radii, typography and shadows come from theme tokens as CSS variables:
  `background-color: var(--click-badge-color-background-danger);`. Find the names in
  `src/theme/styles/tokens-light.css`. Never write literal colors, pixel sizes or font values.
  Structural values like `0`, `100%`, `1px solid transparent` are fine.
- Style states with, in this order of preference: native pseudo-classes (`:hover`,
  `:disabled`, `:focus-visible`); `data-*` attributes emitted by Radix (`[data-state='checked']`,
  `[data-disabled]`, `[data-side='top']`); a BEM modifier class set through `cva`. Never select
  on a third-party library's generated class names or on a child component's tag names.
- Every interactive element has a `:focus-visible` style. Never `outline: none` without a
  visible replacement.
- Every major transition or animation is disabled or reduced inside
  `@media (prefers-reduced-motion: reduce)`.
- Property order is enforced by stylelint. `yarn lint:css:fix` fixes most of it.

### Inline CSS custom properties

When a prop reaches CSS through an inline `style` custom property
(`style={{ '--badge-width': width }}`), build the `style` object with `useMemo` keyed on the
prop values and the incoming `style`; a new object every render re-renders consumers. Custom
properties inherit, so a property set only when the prop is passed leaks into nested
instances. Reset it in the base class and give the `var()` a fallback:

```css
.container {
  --container-height: initial;
  height: var(--container-height, auto);
}
```

### The `clickui` cascade layer

At build time every click-ui stylesheet, tokens included, is wrapped in one CSS cascade layer
named `clickui` by `plugins/css-colocate/postcss-clickui-layers.ts`. **Never write `@layer`
yourself.**

- Consumers can override anything: any unlayered style in the consumer app beats every
  click-ui style, whatever its specificity or import order. Never make a selector "stronger
  for consumers"; it is not needed.
- The layer does **not** help with conflicts between two click-ui components. Inside it,
  normal CSS applies: specificity first, then source order.
- If component A renders component B (`<B className={styles.a__item} />` or `as={B}`), A is
  responsible for winning: `.a .a__item { }` (two classes) beats B's `.b_size_md` (one class).
  B must never add specificity to defend against unknown wrappers; it cannot know who wraps it.
- Do not use `:where()`, `!important` or sub-layers for internal conflicts. Use a more
  specific class path. Doubling a class (`.a.a`) is a last resort, only on the conflicting
  declarations, when A renders `as` a classed target and bundle order decides the winner.

## 7. Accessibility

**Priority ladder.** When you need focus, keyboard or ARIA behavior, take the first rung that
fits:

1. An existing Click UI component or a Radix primitive. Check Radix before hand-rolling any
   focus, keyboard or ARIA behavior.
2. A semantic HTML element: `<button>`, `<a href>`, `<input>`, `<label>`, `<dialog>`.
3. Semantic HTML plus minimal ARIA.
4. A full WAI-ARIA APG pattern. Name the pattern in a code comment.

Never a `<div>` with an `onClick`.

### MUST

- Every interactive element is a `<button>`, `<a href>` or a form control. It works with the
  keyboard and has an accessible name that includes the visible label. Icon-only controls
  take `aria-label` (`IconButton` accepts it).
- Dialog, Menu, Popover: move focus in on open, trap focus while open (Dialog only), restore
  focus to the trigger on close, `Escape` closes.
- Composite widgets (Tabs, Menu, Select, Grid) use ONE Tab stop and arrow keys, through
  roving `tabindex` or `aria-activedescendant`.
- Text color comes from design tokens. Contrast is verified: 4.5:1 for text, 3:1 for large
  text, UI parts and focus rings.
- Announce async results and errors: `aria-describedby` for field errors, a live region for
  toasts and status.
- Disabled native controls set both `disabled` and `aria-disabled="true"`. Elements that cannot
  take `disabled` (`<a>`, `role="tab"`) or must stay focusable use `aria-disabled="true"` alone.
- Decorative icons have `aria-hidden="true"`. An icon that is the only content needs a label.
- Respect `prefers-reduced-motion` (section 6).
- Spread rest props and forward `ref` onto the focusable element (the `<button>`, `<input>`,
  `<a>`), never onto a wrapper `<div>`. A consumer's `aria-label`, `aria-describedby`, `id`
  and `data-testid` must land on the control.
- Honor consumer `aria-label`, `aria-labelledby` and `aria-describedby`. Never overwrite them
  with an internal value. Merge ids when both exist.
- A `label` prop that accepts `ReactNode` is wired with `<label htmlFor>` or
  `aria-labelledby`. Never stringify it into `aria-label`.
- Every interactive component ships stories for focus-visible, disabled and error states,
  plus one `play` function that drives it with the keyboard (skeleton in section 8).

### MUST NOT

- Positive `tabindex`.
- `aria-hidden` on a focusable element.
- `outline: none` without a `:focus-visible` replacement.
- Placeholder as the only label.
- `role="menu"` for navigation.
- ARIA that duplicates native semantics (`role="button"` on `<button>`).
- `<label htmlFor>` pointing at a non-labelable element (`div`, `span`). Use `aria-labelledby`.
- Radix `asChild` onto a non-focusable element.

### Before you declare done

- Open the story in Storybook (`yarn dev`); the Accessibility panel (axe, from
  `@storybook/addon-a11y`) must report zero violations. There is no automated axe run in CI yet.
- `yarn lint` runs `eslint-plugin-jsx-a11y` (recommended plus two rules, see `eslint.config.js`)
  at `error`. Violations that existed when it was switched on are frozen in
  `eslint-suppressions.json`, counted per file per rule. A new one fails CI unless that file is
  already frozen for the same rule and the count does not rise, so read the JSX of frozen files
  by hand. Fixed a frozen one? Run `yarn lint:code --prune-suppressions` in the same PR. The
  file is the counter; the lint work is done when it is empty. Never run `--suppress-all` again.
  `--suppress-rule` re-freezes a rule in every file: use it only with a maintainer sign-off and
  check the diff. Never add `--pass-on-unpruned-suppressions`; never turn a rule off. An inline
  `eslint-disable jsx-a11y/*` carries a reason (section 4, rule 1).
- Do a manual keyboard pass: Tab, Shift+Tab, Enter, Space, Escape, and arrow keys where they apply.
- In the PR, state what you tested and what you did not. Never claim "fully accessible"; list
  the WCAG 2.2 criteria you checked, for example 1.4.3 Contrast, 2.1.1 Keyboard,
  2.4.7 Focus Visible, 4.1.2 Name, Role, Value.

### Escalate to a human

Do not implement these alone: data grids, tree views, drag-and-drop, rich text editors,
toasts and live regions. Describe the approach in the PR or issue first and wait for a reply.

## 8. Tests

### Unit tests (`<Name>.test.tsx`, next to the component)

```tsx
import { Badge } from '@/components/Badge';
import { renderCUI } from '@/utils/test-utils';

describe('Badge', () => {
  it('renders children', () => {
    const { getByText } = renderCUI(<Badge>Hi</Badge>);
    expect(getByText('Hi')).toBeInTheDocument();
  });
});
```

- Always render with `renderCUI()`; it provides the theme.
- Cover: default render, each behavioral state (disabled, loading, error), event handlers,
  and the ARIA attributes the component promises. Query by role or text, not by class name.

### Visual tests (`tests/<family>/<name>.spec.ts`)

```ts
// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/Badge
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';
```

- The `@covers` line is mandatory; CI throws without it. One line per component the spec
  screenshots.
- Story ids are `<title-kebab>--<story-kebab>`: title `Buttons/Button`, story `Primary` gives
  `buttons-button--primary`. Test both themes: `getStoryUrl(id, 'light')` and `'dark'`.
- Locate with `page.getByRole(...)`, not CSS selectors. Before pressing `Tab`, call
  `page.locator('body').click()` so focus starts inside the page.
- Snapshots are generated in Docker and end in `-chromium-linux.png`. Never copy PNG
  snapshots from another branch; regenerate with `yarn test:visual:update <Name>`. Never
  regenerate to hide a diff: fix the CSS, or confirm the change is intended and say so in the PR.

### Stories (`<Name>.stories.tsx`)

- `title: '<Family>/<Name>'`, `tags: ['autodocs']`, a `Playground` story with all args, then
  one story per variant and state (disabled, loading, error, sizes).
- Stories render the real component through `args` or `render`. Never render a wrapper
  component such as `<FooHarness />` inside `render`; Storybook's "Show code" would copy the
  wrapper. Padding, backdrops and test ids go into `decorators`.
- Interactive components also ship a focus-visible story
  (`parameters: { pseudo: { focusVisible: true } }`, from the installed pseudo-states addon)
  and one `play` function that drives the component with the keyboard, using `storybook/test`:

```tsx
import { expect, userEvent, within } from 'storybook/test';

export const Keyboard: Story = {
  args: { label: 'Press me' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await expect(canvas.getByRole('button', { name: 'Press me' })).toHaveFocus();
    await userEvent.keyboard('{Enter}');
  },
};
```

## 9. Changesets, commits, pull requests

### Changesets

Any change a consumer can notice needs a file in `.changeset/`. `yarn changeset:add` runs an
interactive wizard and names the file after the branch. If you cannot answer prompts, write
the file yourself as `.changeset/<branch-name-with-dashes>.md`.

Until v1.0.0 there are two bump types. Never use `major`.

- `patch`: bug fix, new icon, styling refactor with no visible change. One or two sentences.
- `minor`: new component, prop, variant or changed default. Say what changed. If anything
  looks different, describe the visual change.
- `minor` that is also breaking: start with **Breaking:**. Say what changed, describe any
  visual change, and add a **Migration** note with before and after.

Keep every changeset concise and human-readable. It is copied into `CHANGELOG.md` for
consumers. No file lists, no implementation details.

`patch`:

```md
---
'@clickhouse/click-ui': patch
---

Prevent Pagination from calling `onChange` with `NaN` when its page input is cleared.
```

Breaking `minor`, same frontmatter with `minor` (format example, not a real change):

```md
**Breaking:** `Select` now calls `onChange` with the selected value instead of the DOM event.

Visual: unchanged.

Migration: `onChange={(e) => setValue(e.target.value)}` becomes `onChange={setValue}`.
```

Do not add a changeset for internal-only changes: tests, CI, Storybook stories or config,
lint rules, tooling, docs.

### Commits and PR title

Conventional Commits. CI verifies the PR title.

```
feat(Badge): add size prop
fix(Select): keep focus on Escape
chore(css-modules): migrate Badge
test(Button): cover loading state
```

### Pull request

- Fill every section of the PR template: Description, Links and tickets (public links only),
  Checklist, Contribution and Accessibility (skip Accessibility only when the template says so).
- One concern per PR. Split unrelated improvements into follow-ups.
- Humans answer reviewers. Do not auto-generate replies to review comments.

## 10. Before you open a PR

- [ ] The pre-PR command from section 2 passes.
- [ ] Visual specs for touched components pass with zero snapshot regenerations, or the
      regeneration is intended and explained in the PR.
- [ ] A changeset exists for every consumer-visible change; breaking changes carry a
      migration note.
- [ ] No `any`; all exported APIs fully typed. All visual values come from `var(--click-*)`.
- [ ] Stories cover every new variant and state; interactive components also have
      focus-visible, disabled and error stories and a keyboard `play`.
- [ ] Unit tests cover the new behavior and its ARIA attributes.
- [ ] Accessibility checks from section 7 done; the PR says what was not tested.
- [ ] `eslint-suppressions.json` did not grow.
- [ ] No new dependency, or the PR explains why. No internal links anywhere.
- [ ] PR title follows Conventional Commits; template filled in.

## 11. Where the details live

- `README.md` — setup, consuming the library, theming, release process.
- `ACCESSIBILITY.md` — the accessibility policy: target, severity, definition of done, debt tracking.
- `docs/tests/playwright.md` — visual tests in Docker, single-component runs, reports.
- `docs/package-release.md`, `docs/publish.md` — releases.
- `docs/converting-svg-to-react-components.md` — adding icons, logos, flags.
- `.claude/skills/component-css-modules-migration/SKILL.md` — a worked, two-commit procedure
  for pure styling refactors. Its pitfalls list applies to any component change.
- `.github/instructions/` — path-scoped rules for GitHub Copilot review.
- `.github/workflows/llm-code-review.yml` — the `@claude review` PR reviewer; it follows this file.

## 12. Housekeeping for this file

This file is loaded into every agent session, so every line costs context on every task.
Budget: 450 to 500 lines (`wc -l AGENTS.md`).

Whenever you edit this file, sweep the whole file, not just your change:

1. Verify every path, script name, version and tool claim against the repo. Fix or delete
   what is stale.
2. Delete rules that tooling now enforces (ESLint, stylelint, Prettier, `tsc`, CI). Point at
   the tool instead.
3. State each rule once, in the section it belongs to. Replace repeats with "see section N".
   Prefer pointing at a real file over pasting a long example.
4. Keep section numbers and cross-references in sync. If a rule changes what reviewers check,
   update `.github/workflows/llm-code-review.yml` too. Section 7 has condensed copies that must
   follow it: `.github/instructions/a11y.instructions.md`, `ACCESSIBILITY.md`,
   `.github/pull_request_template.md`.
5. If the file is over 500 lines after your change, list the cuts you propose in the PR
   description and wait for a maintainer. Never drop a rule silently to make room.
