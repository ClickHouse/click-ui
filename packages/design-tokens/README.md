# Design Tokens

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-blue.svg)](https://conventionalcommits.org)

ClickHouse Design System token definitions for colors, spacing, typography and more, following the DTCG standard.

## Quick Start

Install dependencies:

```sh
yarn
```

Build tokens for consumer apps:

```sh
yarn tokens:build
```

Optionaly, use "watch" mode for automatic builds on file changes:

```sh
yarn tokens:build:watch
```

## CSS Variable Prefix

All generated CSS variables use the `--cui-` prefix (Click UI). This prefix is defined in `config.js` to ensure consistent namespace variable names across all consumer client applications.

```css
--cui-color-background-base
--cui-space-100
--cui-radius-50
```

To customize the prefix, modify `CSS_VAR_PREFIX` in `config.js` and rebuild.

## Dark Mode

Semantic color tokens support light and dark mode variants. The build outputs CSS that applies:

- **Light mode**: `:root` and `[data-theme='light']`
- **Dark mode**: `@media (prefers-color-scheme: dark)` and `[data-theme='dark']`

Dark mode activates automatically via OS preference (no JS required), or explicitly via attribute:

```html
<html data-theme="dark"></html>
```

The `data-theme` attribute takes precedence, allowing users to override their OS preference.

## Token Specification

This package follows the [DTCG (Design Tokens Community Group)](https://www.designtokens.org) standard. The specification defines naming conventions, token categories, and metadata strategies for consistent design token usage across Figma and code.

### Token Categories

| Category       | Naming Convention                                                                                    | Example                                                         |
| -------------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| **Color**      | Primitives: `color/{palette}/{step}`, Semantic: `color/{category}/{subcategory}/{hierarchy}/{state}` | `color/gray/50`, `color/background/interactive/primary/default` |
| **Spacing**    | Percentage-based with 8px base unit                                                                  | `space/100` (8px), `space/200` (16px)                           |
| **Radius**     | Percentage-based scale                                                                               | `radius/50` (4px), `radius/100` (8px)                           |
| **Sizing**     | T-shirt sizes by type                                                                                | `sizing/icon/md` (20px), `sizing/component/lg` (48px)           |
| **Typography** | `font/{property}/{scale}`                                                                            | `font/size/lg` (16px), `font/weight/semibold` (600)            |

### Usage Examples

```css
/* Semantic color tokens */
.button {
  background: var(--cui-color-background-interactive-primary-default);
  color: var(--cui-color-foreground-default);
}

/* Spacing tokens */
.card {
  padding: var(--cui-space-200); /* 16px */
  gap: var(--cui-space-100); /* 8px */
}

/* Sizing tokens */
.icon {
  width: var(--cui-sizing-icon-md); /* 20px */
}
```

### Lint Rules

To prevent inappropriate use of tokens (e.g., using primitives directly in component styles), configure lint rules:

**Stylelint**

Warn on primitive token usage:

```json
{
  "rules": {
    "declaration-property-value-disallowed-list": {
      "/color|background|border/": [
        "/--cui-color-(white|black|gray|blue|green|red|yellow|orange)-/"
      ]
    }
  }
}
```

**ESLint**

For CSS-in-JS (e.g., styled-components):

```json
{
  "rules": {
    "no-restricted-syntax": [
      "warn",
      {
        "selector": "Literal[value=/--cui-color-(white|black|gray|blue|green|red|yellow|orange)-/]",
        "message": "Use semantic tokens instead of primitive color tokens"
      }
    ]
  }
}
```

**Guideline**

> [!WARNING]
> Components should use semantic tokens (`--cui-color-background-*`). Primitives (`--cui-color-gray-*`) are exposed for theming and debugging but should not appear in component styles.

For complete details on naming conventions, metadata strategies, and implementation guidelines, see [SPECIFICATION.md](./SPECIFICATION.md).

# References

- [DTCG](https://www.designtokens.org)
- [Design Tokens Technical Reports 2025.10](https://www.designtokens.org/tr/2025.10/)
