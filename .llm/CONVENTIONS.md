# Click UI Conventions

Component library for ClickHouse. React + TypeScript + styled-components.

## Architecture

- **Framework**: React 18+ with TypeScript 5+
- **Styling**: styled-components with design tokens from `theme.click.*`
- **Testing**: vitest + react-testing-library, visual regression via Chromatic
- **Bundle**: ESM + CJS dual exports, tree-shakeable

## Component Patterns

### Required Props Interface

```typescript
export interface ComponentProps extends React.HTMLAttributes<HTMLElement> {
  // Always extend native HTML attributes for the root element
  // Use descriptive JSDoc comments for each prop
}
```

### Styling Rules

- **ALWAYS** use theme tokens: `theme.click.component.token.path`
- **NEVER** hardcode colors, sizes, or spacing
- Use transient props (prefixed with `$`) for styled-component internal state
- Use `data-*` attributes for styling hooks instead of generated class names

### CSS Modules (Standard BEM Naming)

When using CSS Modules (migration in progress from styled-components):

- **Follow standard BEM naming convention** (https://en.bem.info/methodology/naming-convention/):
  - `.button` - Block (component root)
  - `.button__icon` - Element (child of block, use double underscore `__`)
  - `.button_primary` - Modifier (variant/state, use single underscore `_`)
  - `.button_align-center` - Modifier with hyphenated value
  - `.button_primary:hover` - Pseudo-classes on modifiers
  - `.button_primary.button_loading` - Multiple modifiers on same element

- **Example structure**:
  ```css
  .button { /* base styles */ }
  .button__icon { /* icon element */ }
  .button_primary { /* primary variant */ }
  .button_primary:focus-visible { /* keyboard focus state */ }
  ```
- Use CSS custom properties from theme tokens: `var(--click-button-basic-color-primary-background-default)`
- Always include `:focus-visible` styles for keyboard accessibility, never use `outline: none` without replacement

### Cascade Layers & Composition Discipline

All click-ui CSS — component rules and the theme design tokens alike — is wrapped in a single `clickui` [cascade layer](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) at build time (a PostCSS plugin, `plugins/css-colocate/postcss-clickui-layers.ts`, runs in the Vite `css.postcss` pipeline, the per-component `css-preprocess.ts`, and the `copyCssFiles` pass for standalone globals). Do **not** write `@layer` by hand — the plugin owns it.

What the layer does and does not do:

- **Consumer overridability is solved by the layer, full stop.** Any unlayered consumer style (a plain rule, a CSS Module class, a `styled(...)` override) beats every click-ui style, regardless of import order or specificity. That is the entire public contract; everything else here is an internal detail.
- **The layer does nothing for conflicts _between_ click-ui components.** Inside the `clickui` layer, precedence is ordinary CSS: specificity + source order. Layers do not buy us an easier life here — writing CSS still takes the same discipline it always has. Don't reach for layer tricks (sub-layers, `:where()` to zero out specificity, doubled classes) to resolve internal conflicts; write a selector that is specific enough to win on its own.

Resolving internal conflicts:

- **Conflicts come from composition, and composition is deterministic.** When component A composes component B (via `as={B}`, `styled(B)`, or rendering `<B className="a__elem" />`), A knows exactly how it uses B. So it is **A's responsibility** to write selectors that win where they should — e.g. `.a .a__elem { … }` (specificity `(0,2,0)`) naturally beats B's own `.b_size_md` `(0,1,0)`.
- **A component may know what it composes; it must never guess how it will be composed.** It is fine for A to target B because A controls that relationship. It is not fine for B to add specificity hacks defending against hypothetical consumers — B cannot know who wraps it, and unlayered consumer styles win anyway. Prefer more specific classes over `:where()`.

### Accessibility (Mandatory)

- Interactive elements need `role`, `aria-label`, `aria-describedby`
- Disabled states need both `disabled` prop AND `aria-disabled="true"`
- Icons must have `aria-hidden` unless they're the only content
- Keyboard navigation: focus management, Escape handling, tab order
- Respect `prefers-reduced-motion` for animations

### Composability

- Accept and forward `className` prop
- Use `...delegated` or `...props` rest spread for HTML attributes
- Polymorphic components via `as` or `asChild` props

## Code Style (ESLint Enforced)

- **Quotes**: Single quotes, avoid escape
- **Functions**: Arrow functions preferred, implicit return for simple expressions
- **Braces**: Always use curly braces (`curly: all`)
- **Imports**: No barrel imports from `@/components` or `@/index` internally

## Testing Requirements

- Co-locate tests: `Component.test.tsx` adjacent to `Component.tsx`
- Use `renderCUI()` wrapper from `@/utils/test-utils`
- Test behavioral states: disabled, loading, error
- Verify accessibility attributes exist

## Changesets

Run `yarn changeset:add` before PR if changing public API. Follow semver: patch (fix), minor (feature), major (breaking).

**Good changesets include:**
- **What changed?** - Technical summary of the modification
- **How to use?** - Code examples for new features or migration path for breaking changes

**Suggest improvements when missing details for:**
- New features (minor) - need usage examples
- Breaking changes (major) - need migration guide
- Complex changes - need explanation of what/why

Simple fixes (patch) like bug fixes or adding icons can be brief.

## File Organization

```
src/components/
├── Button/
│   ├── Button.tsx          # Main component implementation
│   ├── Button.types.ts     # Type definitions (interfaces, types)
│   ├── Button.module.css   # CSS Modules styles
│   ├── Button.test.tsx     # Unit tests
│   ├── Button.stories.tsx  # Storybook documentation
│   └── index.ts            # Public exports
│   ...
└── index.ts                # Components barrel export
```

## Critical Review Checklist

1. **API Stability**: No breaking changes to exported props/types without migration note
2. **Type Safety**: All public APIs fully typed, no `any`
3. **Theme Compliance**: All visual values from `theme.click.*` tokens
4. **Bundle Impact**: New deps must be tree-shakeable or justified
5. **Documentation**: Storybook stories for all component states

## Anti-Patterns

- Hardcoded colors/sizes in styled-components
- Missing `aria-*` on interactive elements
- `React.FC` or explicit `children` in props (use `React.ReactNode`)
- Circular imports via barrel files
- Untyped event handlers
