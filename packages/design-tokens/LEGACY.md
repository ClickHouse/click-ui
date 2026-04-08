# Legacy Support (Deprecated)

> [!WARNING]
> These exports are **deprecated** and will be removed in a future major version.
> They are provided only for backward compatibility while migrating consumer apps to CSS variables.

## Quick Start

The host app must have the peer dependency [Styled Components](https://www.npmjs.com/package/styled-components):

```bash
yarn add styled-components
```

> [!IMPORTANT]
> The `useCUITheme` hook **requires** `styled-components` and must be called within a `ThemeProvider`. If used outside a `ThemeProvider`, it will throw a runtime error with a helpful message. Ensure your application is wrapped in a `ThemeProvider` from `styled-components` before using this hook.

## Usage

Replace imports from `@clickhouse/click-ui` with explicit legacy paths.

Before (from @clickhouse/click-ui - deprecated):

```tsx
import { useCUITheme } from "@clickhouse/click-ui";
```

After (explicit legacy import)

```tsx
import { useCUITheme } from "@clickhouse/design-tokens/legacy/hooks";
```

## Import Paths

| Import     | Path            | Exports                                  |
| ---------- | --------------- | ---------------------------------------- |
| Everything | `/legacy`       | Hooks, themes, utils, types              |
| Hooks only | `/legacy/hooks` | `useCUITheme`, `useInitialTheme`         |
| Theme only | `/legacy/theme` | `THEMES`, `themes`, `InitCUIThemeScript` |
| Utils only | `/legacy/utils` | `CUI_THEME_STORAGE_KEY`, DOM helpers     |

### Main Entry (`/legacy`)

```tsx
import {
  // Theme
  THEMES,
  themes,
  InitCUIThemeScript,
  // Hooks
  useCUITheme,
  useInitialTheme,
  // Utils
  CUI_THEME_STORAGE_KEY,
  THEME_ATTRIBUTE,
} from "@clickhouse/design-tokens/legacy";
```

### Hooks (`/legacy/hooks`)

```tsx
import { useCUITheme, useInitialTheme } from "@clickhouse/design-tokens/legacy/hooks";
import type {
  CUIThemeType,
  UseThemeParams,
} from "@clickhouse/design-tokens/legacy/hooks";
```

### Theme (`/legacy/theme`)

```tsx
import {
  THEMES,
  themes,
  InitCUIThemeScript,
  isValidThemeName,
} from "@clickhouse/design-tokens/legacy/theme";
import type {
  ThemeName,
  Theme,
  InitCUIThemeScriptProps,
} from "@clickhouse/design-tokens/legacy/theme";
```

### Utils (`/legacy/utils`)

```tsx
import {
  CUI_THEME_STORAGE_KEY,
  THEME_ATTRIBUTE,
  getRootElement,
} from "@clickhouse/design-tokens/legacy/utils";
```

## Migration Example

**Before (legacy styled-components theme):**

```tsx
import { theme } from "primitives";
import { useCUITheme } from "@clickhouse/click-ui";

function ThemeProvider({ children }) {
  const cuiTheme = useCUITheme();
  return (
    <EmotionThemeProvider theme={{ ...theme.lightTheme, ...cuiTheme }}>
      {children}
    </EmotionThemeProvider>
  );
}
```

**After (CSS variables):**

Example, no JS theme import using CSS variables directly in your styles:

```tsx
function Component() {
  return <div style={{ color: "var(--cui-color-foreground-default)" }}>Content</div>;
}
```

## CSS Variable Migration Guide

Replace theme object access with CSS variables (for intent token role, consult the product design team):

| Legacy (JS)                             | New (CSS)                                        |
| --------------------------------------- | ------------------------------------------------ |
| `theme.global.color.text.default`       | `var(--cui-color-foreground-default)`            |
| `theme.global.color.background.default` | `var(--cui-color-background-default)`            |
| `theme.sizes.100`                       | `var(--cui-space-100)`                           |
| `theme.breakpoint`                      | Use media queries with `var(--cui-breakpoint-*)` |

For complete CSS variable reference, see the main [README.md](./README.md).
