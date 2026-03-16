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

### CSS Modules (BEM Naming)

When using CSS Modules (migration in progress from styled-components):

- **Follow BEM naming convention**:
  - `.button` - Block (component root)
  - `.button__icon` - Element (child of block, use double underscore)
  - `.button--primary` - Modifier (variant/state, use double dash)
  - `.button--primary:hover` - State pseudo-classes
- **Example structure**:
  ```css
  .button { /* base styles */ }
  .button__icon { /* icon element */ }
  .button--primary { /* primary variant */ }
  .button--primary:focus-visible { /* keyboard focus state */ }
  ```
- Use CSS custom properties from theme tokens: `var(--click-button-basic-color-primary-background-default)`
- Always include `:focus-visible` styles for keyboard accessibility, never use `outline: none` without replacement

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
│   ├── Button.styles.ts    # Styled-components
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
