---
name: 🎁 Component RFC
about: Propose a new component or significant change to an existing one
title: '[RFC] '
labels: 'rfc'
assignees: ''
---

# Component RFC — [Component Name]

> Use this template when proposing a **new component** or a **significant change** to an existing one.
> Fill in every section and check each box as you go. The checklist acts as the acceptance criteria for the proposal.

---

## Summary

_One or two sentences describing the component or change. Link to the relevant Figma frame if available._

**Component name:** `ComponentName`
**Type:** New Component | Component Change | Component Deprecation

## Motivation

_Why is this component needed, or why does the existing one need to change?_

- Problem / gap in the current library:
- User or product need it addresses:

## Design reference

- [ ] Figma link provided: [Figma frame](paste-figma-url-here)
- [ ] Design reviewed and approved by the design team
- [ ] All component states are covered in the design (default, hover, active, focus, disabled, error, loading)

## Proposed API

_Show the intended public API with usage examples._

```tsx
<ComponentName
  variant="primary"
  size="md"
  disabled={false}
  onChange={handleChange}
/>
```

- [ ] Props are consistent with existing component conventions in click-ui
- [ ] Component supports `className` and `ref` forwarding
- [ ] Default prop values are documented

## Variants & states

List the variants and states the component should support:

- [ ] Variants defined (e.g., primary, secondary, outline)
- [ ] Sizes defined (e.g., sm, md, lg) — or N/A
- [ ] States handled: default, hover, active, focus, disabled
- [ ] Error / validation state — or N/A
- [ ] Loading state — or N/A

## Accessibility

- [ ] Correct semantic HTML elements used
- [ ] ARIA attributes added where needed
- [ ] Keyboard navigation works (Tab, Enter, Escape, Arrow keys as applicable)
- [ ] Screen reader tested or reviewed
- [ ] Focus management is correct (focus ring visible, focus trap if modal)
- [ ] Color contrast meets WCAG AA (4.5:1 text, 3:1 UI)

## Theming

- [ ] Component works with the **light** theme
- [ ] Component works with the **dark** theme
- [ ] Uses design tokens from `src/theme/tokens` (no hardcoded colors, spacing, or font sizes)

## Implementation checklist

- [ ] Component file created: `src/components/ComponentName/ComponentName.tsx`
- [ ] Exports added to `src/components/index.ts`
- [ ] Styled with `styled-components` using theme tokens
- [ ] TypeScript types/interfaces exported
- [ ] No `any` types used

## Testing

- [ ] Unit tests added: `ComponentName.test.tsx`
- [ ] All variants and states have test coverage
- [ ] Accessibility checks included in tests (e.g., `toHaveAccessibleName`)
- [ ] Edge cases covered (empty state, overflow, long text, etc.)
- [ ] Storybook story added: `ComponentName.stories.tsx`
- [ ] Visual regression covered (Chromatic snapshot via Storybook)

## Documentation

- [ ] Storybook story includes all variants, sizes, and states
- [ ] Props table is auto-generated or manually documented in the story
- [ ] Usage guidelines / do's and don'ts added (if applicable)

## Changeset

- [ ] `yarn changeset:add` has been run and the changeset file is included
- [ ] Change type is correct (`minor` for new components, `patch` for changes/fixes)

## Security checklist

- [ ] All user inputs are validated and sanitized
- [ ] No usage of `dangerouslySetInnerHTML`
- [ ] Sensitive data has been identified and is being protected properly
- [ ] Build output contains no secrets or API keys

## Rollout & migration (for component changes only)

> Skip this section for brand-new components.

- [ ] Breaking changes are documented
- [ ] Migration guide provided for consumers
- [ ] Deprecated props/components marked with `@deprecated` JSDoc
- [ ] Backward compatibility maintained or major version bump planned

## Open questions

_List any unresolved decisions or areas where you'd like reviewer feedback._

1.
2.

## Preview

_Link to a deployed Storybook preview or attach screenshots._
