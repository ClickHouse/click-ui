# ClickUI Theme System

A powerful, flexible theming system for React applications with full TypeScript support, SSR compatibility, and modern CSS-in-JS capabilities.

## Features

- 🎨 **Flexible Theming**: Light, dark themes with custom theme support
- 🚀 **Performance Optimized**: Lazy loading, CSS variable generation, and tree-shaking
- 🌐 **SSR Compatible**: Works with Next.js, Remix, and other SSR frameworks
- 📱 **System Theme Detection**: Automatic light/dark mode based on user preferences
- 🎯 **TypeScript First**: Full type safety with intelligent autocomplete
- 🔄 **Theme Switching**: Smooth transitions between themes with persistence
- 🛠️ **Developer Tools**: Built-in debugging and development utilities

## Installation

```bash
npm install @clickhouse/click-ui
# or
yarn add @clickhouse/click-ui
# or
pnpm add @clickhouse/click-ui
```

## Quick Start

### 1. Basic Setup

```tsx
import { ClickUIProvider } from '@clickhouse/click-ui';
import '@clickhouse/click-ui/dist/styles.css'; // Import base styles

function App() {
  return (
    <ClickUIProvider theme="system">
      <YourApp />
    </ClickUIProvider>
  );
}
```

### 2. Theme Hook Usage

```tsx
import { useCUITheme } from '@clickhouse/click-ui';

function ThemeToggle() {
  const { themeName, toggleTheme, utils } = useCUITheme();

  return (
    <button onClick={toggleTheme}>
      Switch to {utils.isDark ? 'Light' : 'Dark'} Theme
    </button>
  );
}
```

### 3. CSS Variables Usage

```css
.my-component {
  background-color: var(--click-global-color-background-default);
  color: var(--click-global-color-text-default);
  border: 1px solid var(--click-global-color-stroke-default);
  transition: var(--click-theme-transition, all 200ms ease);
}
```

## Configuration

### Theme Configuration

Create a configuration object to customize your theme:

```tsx
import { ThemeConfig } from '@clickhouse/click-ui';

const themeConfig: ThemeConfig = {
  // Storage settings
  storageKey: "my-app-theme",

  // Custom theme overrides - partial configuration supported!
  theme: {
    click: {
      button: {
        basic: {
          color: {
            primary: {
              background: {
                default: "#6366f1", // Your brand color
                hover: "#5855eb"
              }
            }
          }
        }
      },
      global: {
        color: {
          primary: "#6366f1",
          background: {
            default: "#ffffff",
            muted: "#f8fafc"
          }
        }
      }
    }
  },

  // System theme support
  enableSystemMode: true,

  // System-specific overrides
  systemModeOverrides: {
    light: {
      click: {
        global: {
          color: {
            background: {
              default: "#ffffff"
            }
          }
        }
      }
    },
    dark: {
      click: {
        global: {
          color: {
            background: {
              default: "#0f172a"
            }
          }
        }
      }
    }
  }
};

function App() {
  return (
    <ClickUIProvider
      theme="system"
      config={themeConfig}
    >
      <YourApp />
    </ClickUIProvider>
  );
}
```

### Provider Props

```tsx
interface ClickUIProviderProps {
  children: ReactNode;

  // Theme settings
  theme?: "light" | "dark" | "system";
  storageKey?: string;
  fallbackTheme?: "light" | "dark";

  // Configuration
  config?: ThemeConfig;

  // UI component settings
  config?: {
    tooltip?: TooltipProviderProps;
    toast?: ToastProviderProps;
  };

  // Advanced options
  enableTransitions?: boolean;
  transitionDuration?: number;
  suppressHydrationWarning?: boolean;

  // Performance
  enableMemoization?: boolean;
  debounceDelay?: number;

  // Development
  enableDevTools?: boolean;
}
```

## Theme Hook API

The `useCUITheme()` hook provides comprehensive theme management:

```tsx
const {
  // Current theme state
  themeName,          // "light" | "dark" | "system"
  resolvedTheme,      // Actual theme being used
  isSystemTheme,      // Boolean: using system detection

  // Theme data
  theme,              // Current theme object
  breakpoints,        // Responsive breakpoints
  sizes,              // Size tokens

  // Theme management
  updateTheme,        // (theme: ThemeName) => void
  toggleTheme,        // () => void - toggles between light/dark
  resetTheme,         // () => void - resets to default

  // Utilities
  utils: {
    isDark,           // Boolean: current theme is dark
    isLight,          // Boolean: current theme is light
    getThemeValue,    // (path: string) => unknown
    setThemeValue,    // (path: string, value: unknown) => void
  },

  // State indicators
  isLoading,          // Boolean: theme is loading
  isHydrated,         // Boolean: client has hydrated
  availableThemes,    // Array of available theme names
} = useCUITheme();
```

## Build Configuration

### Vite Plugin Setup

For optimal performance and build-time theme configuration:

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import { clickUIPlugin } from '@clickhouse/click-ui/vite-plugin';

export default defineConfig({
  plugins: [
    clickUIPlugin({
      // Build-time theme configuration
      theme: {
        click: {
          global: {
            color: {
              primary: "#your-brand-color"
            }
          }
        }
      }
    })
  ]
});
```

### Next.js Configuration

```js
// next.config.js
const { withClickUI } = require('@clickhouse/click-ui/next');

module.exports = withClickUI({
  // Your Next.js config
  experimental: {
    appDir: true, // For App Router
  }
});
```

### Build-time Configuration File

Create a `click-ui.config.js` file in your project root:

```js
// click-ui.config.js
module.exports = {
  theme: {
    click: {
      global: {
        color: {
          primary: "#6366f1",
          background: {
            default: "#ffffff",
            muted: "#f8fafc"
          }
        }
      }
    }
  },
  enableSystemMode: true
};
```

## Usage Examples

### Basic Theme Switching

```tsx
function ThemeSelector() {
  const { themeName, updateTheme, availableThemes } = useCUITheme();

  return (
    <select
      value={themeName}
      onChange={(e) => updateTheme(e.target.value)}
    >
      {availableThemes.map(theme => (
        <option key={theme} value={theme}>
          {theme.charAt(0).toUpperCase() + theme.slice(1)}
        </option>
      ))}
    </select>
  );
}
```

### Loading States

```tsx
function ThemeAwareComponent() {
  const { isLoading, isHydrated, themeName } = useCUITheme();

  if (isLoading || !isHydrated) {
    return <div>Loading theme...</div>;
  }

  return (
    <div className={`theme-${themeName}`}>
      Content with theme applied
    </div>
  );
}
```

### Custom Theme Values

```tsx
function CustomStyledComponent() {
  const { utils } = useCUITheme();

  const primaryColor = utils.getThemeValue('global.color.primary');

  return (
    <div style={{
      backgroundColor: primaryColor as string,
      padding: '16px',
      color: utils.isDark ? 'white' : 'black'
    }}>
      Themed content
    </div>
  );
}
```

### SSR-Safe Theme Usage

```tsx
function SSRCompatibleComponent() {
  const { isHydrated, themeName } = useCUITheme();

  // Prevent hydration mismatches
  const displayTheme = isHydrated ? themeName : 'light';

  return (
    <div data-theme={displayTheme}>
      <style jsx>{`
        div[data-theme="dark"] {
          background: #000;
          color: #fff;
        }
        div[data-theme="light"] {
          background: #fff;
          color: #000;
        }
      `}</style>
      SSR-safe themed content
    </div>
  );
}
```

## Advanced Usage

### Multiple Theme Configurations

```tsx
// Different configurations for different use cases
const configs = {
  // Minimal branding
  minimal: {
    theme: {
      click: {
        global: {
          color: {
            primary: "#ff6b35"
          }
        }
      }
    }
  } satisfies ThemeConfig,

  // Corporate theme
  corporate: {
    theme: {
      click: {
        global: {
          color: {
            primary: "#003366",
            background: {
              default: "#f5f5f5"
            }
          }
        }
      }
    },
    enableSystemMode: false
  } satisfies ThemeConfig,

  // Full customization
  custom: {
    storageKey: "corporate-theme",
    theme: {
      click: {
        button: {
          basic: {
            color: {
              primary: {
                background: {
                  default: "#1e40af",
                  hover: "#1d4ed8"
                }
              }
            }
          }
        }
      }
    },
    systemModeOverrides: {
      dark: {
        click: {
          global: {
            color: {
              background: {
                default: "#0f172a"
              }
            }
          }
        }
      }
    }
  } satisfies ThemeConfig
};
```

### Theme Transitions

```tsx
function AnimatedThemeProvider({ children }) {
  return (
    <ClickUIProvider
      theme="system"
      enableTransitions={true}
      transitionDuration={300}
    >
      {children}
    </ClickUIProvider>
  );
}
```

### Development Tools

```tsx
function AppWithDevTools() {
  return (
    <ClickUIProvider
      theme="system"
      enableDevTools={process.env.NODE_ENV === 'development'}
    >
      <App />
    </ClickUIProvider>
  );
}
```

## CSS Variables Reference

The theme system generates CSS variables following this pattern:
- `--click-{component}-{property}-{variant}`
- `--global-{category}-{property}`

### Common Variables

```css
/* Colors */
--click-global-color-primary: #007acc;
--click-global-color-background-default: #ffffff;
--click-global-color-background-muted: #f8fafc;
--click-global-color-text-default: #1f2937;
--click-global-color-text-muted: #6b7280;
--click-global-color-stroke-default: #e5e7eb;

/* Spacing */
--click-global-space-1: 4px;
--click-global-space-2: 8px;
--click-global-space-3: 12px;
--click-global-space-4: 16px;

/* Typography */
--click-global-font-size-sm: 14px;
--click-global-font-size-base: 16px;
--click-global-font-size-lg: 18px;

/* Borders */
--click-global-border-radius-sm: 4px;
--click-global-border-radius-md: 6px;
--click-global-border-radius-lg: 8px;

/* Theme transition */
--click-theme-transition: all 200ms ease-in-out;
```

## Troubleshooting

### Common Issues

**Hydration mismatches:**
```tsx
// ❌ Wrong
function Component() {
  const { themeName } = useCUITheme();
  return <div>Theme: {themeName}</div>; // Will cause hydration mismatch
}

// ✅ Correct
function Component() {
  const { themeName, isHydrated } = useCUITheme();
  if (!isHydrated) return <div>Loading...</div>;
  return <div>Theme: {themeName}</div>;
}
```

**CSS variables not working:**
- Ensure you've imported the base styles: `import '@clickhouse/click-ui/dist/styles.css'`
- Check that the ClickUIProvider wraps your components
- Verify the CSS variable names match the generated ones

**Theme not persisting:**
- Check localStorage permissions
- Verify the `storageKey` is unique in your app
- Ensure you're not calling `resetTheme()` unintentionally

**Performance issues:**
- Enable memoization: `enableMemoization={true}`
- Increase debounce delay: `debounceDelay={300}`
- Disable transitions in production if needed

## TypeScript Support

The theme system provides full TypeScript support:

```tsx
import {
  ClickUIProvider,
  useCUITheme,
  type ThemeConfig,
  type ThemeName,
  type BaseThemeName,
  type Theme,
  type DeepPartial
} from '@clickhouse/click-ui';

// Type-safe theme configuration
const config: ThemeConfig = {
  theme: {
    click: {
      // Full autocomplete and type checking
      global: {
        color: {
          primary: "#6366f1" // TypeScript validates this structure
        }
      }
    }
  }
};

// Hook returns are fully typed
const { themeName, updateTheme, utils } = useCUITheme();
// themeName: ThemeName
// updateTheme: (theme: ThemeName) => void
// utils.isDark: boolean
```

## Performance Tips

1. **Use system theme when possible**: `theme="system"` provides the best UX
2. **Enable memoization**: `enableMemoization={true}` for complex themes
3. **Debounce rapid changes**: Set `debounceDelay={100}` or higher
4. **Preload themes**: The system automatically preloads common themes
5. **Use CSS variables**: More performant than JavaScript style changes
6. **Minimize custom overrides**: Smaller theme objects = better performance

## Migration Guide

### From styled-components

If migrating from a styled-components setup:

```tsx
// Before (styled-components)
const Button = styled.button`
  background-color: ${props => props.theme.colors.primary};
`;

// After (ClickUI)
const Button = () => (
  <button style={{
    backgroundColor: 'var(--click-global-color-primary)'
  }}>
    Click me
  </button>
);

// Or with hook
const Button = () => {
  const { utils } = useCUITheme();
  return (
    <button style={{
      backgroundColor: utils.getThemeValue('global.color.primary')
    }}>
      Click me
    </button>
  );
};
```

## Contributing

When contributing to the theme system:

1. **Maintain TypeScript compatibility**: All changes must be fully typed
2. **Test SSR scenarios**: Ensure server-side rendering works
3. **Validate CSS generation**: Check that variables are generated correctly
4. **Performance impact**: Consider bundle size and runtime performance
5. **Backward compatibility**: Don't break existing APIs without major version bump

## License

Apache-2.0 - see LICENSE file for details.
