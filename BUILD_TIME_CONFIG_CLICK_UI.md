# Click-UI Build-Time Configuration API

**Theme Configuration Reference** - Complete API documentation for `click-ui.config.ts` theme configuration.

> **See Also:**
> - [Quick Start](README.md) - Installation and basic setup
> - [Bundler Plugins](config/README.md) - Plugin setup for Vite, Webpack, Rollup, Next.js
> - [Configuration Architecture](CONFIG_ARCHITECTURE.md) - Design philosophy and scenarios
> - [Theme System](src/theme/index.md) - Runtime theming and CSS variables

## Overview

This document is the **authoritative reference** for the theme configuration API used in `click-ui.config.ts`. For plugin setup instructions, see [Bundler Plugins](config/README.md).

## Complete Configuration Example

```typescript
// click-ui.config.ts
import type { ThemeConfig } from '@clickhouse/click-ui/theme';

const config: ThemeConfig = {
  // Local storage key for theme persistence (optional)
  storageKey: 'my-app-theme',

  // Light mode theme (base configuration)
  theme: {
    global: {
      color: {
        brand: '#FF6B6B',
        background: { default: '#FFFFFF' },
        text: { default: '#1A1A1A' }
      }
    },
    button: {
      space: {
        x: '1.5rem',
        y: '0.75rem'
      },
      radii: {
        all: '0.5rem'
      },
      primary: {
        background: {
          default: '#FF6B6B',
          hover: '#FF5252'
        }
      }
    }
  },

  // Dark mode overrides
  // If not defined, theme values are used for dark mode too
  dark: {
    global: {
      color: {
        background: { default: '#0D1117' },
        text: { default: '#F0F6FC' }
      }
    },
    button: {
      primary: {
        background: {
          default: '#FF8A80',
          hover: '#FF7043'
        }
      }
    }
  },

  // Optional: Tooltip configuration
  tooltipConfig: {
    delayDuration: 100,
    skipDelayDuration: 300,
    disableHoverableContent: false
  },

  // Optional: Toast configuration
  toastConfig: {
    duration: 4000,
    swipeDirection: 'right',
    swipeThreshold: 50
  }
};

export default config;
```

## Configuration Properties

### `storageKey` (optional)
- **Type**: `string`
- **Default**: `'click-ui-theme'`
- **Description**: Local storage key for persisting theme selection

### `theme` (optional)
- **Type**: `Partial theme object`
- **Description**: Base theme configuration (used for light mode)
- **Supports**: Partial overrides - only specify what you want to change
- **Default**: Built-in ClickHouse theme if not specified

### `dark` (optional)
- **Type**: `Partial theme object`
- **Description**: Dark mode specific overrides, merged with base `theme`
- **Behavior**: If omitted, `theme` values are used for both light and dark modes

### `tooltipConfig` (optional)
- **Type**: `object`
- **Properties**:
  - `delayDuration`: Delay before tooltip appears (ms)
  - `skipDelayDuration`: Skip delay when moving between tooltips (ms)
  - `disableHoverableContent`: Disable hovering over tooltip content

### `toastConfig` (optional)
- **Type**: `object`
- **Properties**:
  - `duration`: Auto-dismiss duration (ms)
  - `swipeDirection`: Swipe direction to dismiss (`'right'` | `'left'` | `'up'` | `'down'`)
  - `swipeThreshold`: Swipe distance threshold (px)

## Dark Mode Configuration

### Approach 1: Full Dark Theme
Specify complete dark theme overrides:

```typescript
const config: ThemeConfig = {
  theme: {
    global: { color: { brand: '#FF6B6B' } }
  },
  dark: {
    global: {
      color: {
        brand: '#FF8989',  // Lighter brand color for dark mode
        background: { default: '#0D1117' },
        text: { default: '#F0F6FC' }
      }
    }
  }
};
```

### Approach 2: No Dark Overrides
Use the same theme for both modes:

```typescript
const config: ThemeConfig = {
  theme: {
    global: { color: { brand: '#FF6B6B' } }
  }
  // No dark property - theme values used for both light and dark
};
```

### Approach 3: Minimal Dark Overrides
Only override specific dark mode values:

```typescript
const config: ThemeConfig = {
  theme: {
    global: {
      color: {
        brand: '#FF6B6B',
        background: { default: '#FFFFFF' }
      }
    }
  },
  dark: {
    global: {
      color: {
        // Only override background, inherit brand from theme
        background: { default: '#0D1117' }
      }
    }
  }
};
```

## CSS Variables Output

The bundler plugin generates CSS variables at build time using the `--click` prefix:

```css
/* Light mode (from theme property) */
@media (prefers-color-scheme: light) {
  :root {
    --click-global-color-brand: #FF6B6B;
    --click-global-color-background-default: #FFFFFF;
    --click-button-primary-background-default: #FF6B6B;
    --click-button-primary-background-hover: #FF5252;
  }
}

:root[data-theme="light"] {
  --click-global-color-background-default: #FFFFFF;
}

/* Dark mode (from dark property merged with theme) */
@media (prefers-color-scheme: dark) {
  :root {
    --click-global-color-brand: #FF6B6B;
    --click-global-color-background-default: #0D1117;
    --click-global-color-text-default: #F0F6FC;
    --click-button-primary-background-default: #FF8A80;
    --click-button-primary-background-hover: #FF7043;
  }
}

:root[data-theme="dark"] {
  --click-global-color-background-default: #0D1117;
}
```

## Theme Token Structure

The theme configuration is a nested object structure. You can override any part of the theme.

### Example Token Paths

```typescript
theme: {
  global: {
    color: {
      brand: '#FF6B6B',
      background: { default: '#FFFFFF' },
      text: { default: '#1A1A1A' }
    }
  },
  button: {
    space: {
      x: '1.5rem',   // horizontal padding
      y: '0.75rem'   // vertical padding
    },
    radii: {
      all: '0.5rem'  // border radius
    },
    primary: {
      background: {
        default: '#FF6B6B',
        hover: '#FF5252'
      },
      text: { default: '#FFFFFF' }
    }
  },
  input: {
    color: {
      background: { default: '#FFFFFF' },
      border: { default: '#D1D5DB' }
    }
  }
}
```

### TypeScript Support

For full autocomplete and type safety, import the ThemeConfig type:

```typescript
import type { ThemeConfig } from '@clickhouse/click-ui/theme';

const config: ThemeConfig = {
  theme: {
    // Full autocomplete available here
  }
};
```

**Note:** The theme object supports arbitrary nested properties. You only need to specify the tokens you want to override - all other values will use the built-in ClickHouse theme defaults.

## Usage in Application

Once configured with a bundler plugin (see [Bundler Plugins](config/README.md)), the config is automatically available:

```tsx
import { ClickUIProvider } from '@clickhouse/click-ui';
import '@clickhouse/click-ui/style.css';

function App() {
  return (
    <ClickUIProvider>
      {/* Config loaded automatically from click-ui.config.ts */}
      <YourApp />
    </ClickUIProvider>
  );
}
```

For runtime theme configuration and theming hooks, see [Theme System](src/theme/index.md).