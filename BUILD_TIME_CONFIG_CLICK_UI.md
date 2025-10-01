# Click-UI Build-Time Configuration System

This document describes the build-time configuration system for `@clickhouse/click-ui` that enables optimal bundle sizes, better performance, and build-time CSS generation.

## Overview

The build-time configuration system moves theme configuration from runtime to build-time, providing several advantages:

- **Better performance**: CSS variables generated at build time, no runtime processing overhead
- **Automatic tree-shaking**: Existing component structure already supports optimal tree-shaking
- **Build-time optimization**: Theme configurations are resolved during the build process
- **Backward compatibility**: Works alongside existing runtime configuration

## Architecture

### 1. Vite Plugin (`vite-plugin.ts`)

The Vite plugin for click-ui:
- Loads user configuration at build time from `click-ui.config.ts`
- Generates CSS variables from theme config
- Injects config as global constants (`__CLICK_UI_CONFIG__`, `__CLICK_UI_PREFIX__`)
- Emits CSS files with theme variables

### 2. Build-Time Configuration (`src/theme/config.ts`)

Runtime config getter that uses build-time injected values:
- `getThemeConfig()` - Returns build-time injected configuration with fallback to window.clickUIConfig
- `getCSSPrefix()` - Returns CSS prefix from build-time config (defaults to '--click')

### 3. Enhanced ClickUIProvider

The existing ClickUIProvider now supports both configurations:
- **Build-time config**: Uses injected configuration when available (priority)
- **Runtime config**: Falls back to existing click-ui-config.js/window.clickUIConfig system
- **Seamless integration**: No breaking changes to existing usage

## Usage

### 1. Install Click-UI

```bash
npm install @clickhouse/click-ui
```

### 2. Configure Vite (For Build-Time Configuration)

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { clickUI } from '@clickhouse/click-ui/vite-plugin';

export default defineConfig({
  plugins: [
    react(),
    clickUI({
      configPath: './click-ui.config.ts', // defaults to 'click-ui.config.ts'
    })
  ]
});
```

### 3. Create Theme Configuration (Build-Time)

```typescript
// click-ui.config.ts
import type { ThemeConfig } from '@clickhouse/click-ui/theme';

const config: ThemeConfig = {
  cssPrefix: '--app',
  storageKey: 'app-theme',

  theme: {
    global: {
      color: {
        brand: '#FF6B6B',
        background: { default: '#FAFAFA' }
      }
    },
    button: {
      basic: {
        color: {
          primary: {
            background: {
              default: '#FF6B6B',
              hover: '#FF5252'
            }
          }
        }
      }
    }
  },

  systemModeOverrides: {
    light: {
      global: {
        color: { background: { default: '#FFFFFF' } }
      }
    },
    dark: {
      global: {
        color: {
          background: { default: '#0D1117' },
          text: { default: '#F0F6FC' }
        }
      }
    }
  }
};

export default config;
```

### 4. Use in Your App

```tsx
// App.tsx
import { ClickUIProvider, Button, Text } from '@clickhouse/click-ui';

function App() {
  return (
    <ClickUIProvider> {/* Config loaded at build time automatically! */}
      <div>
        <h1>My App</h1>
        <Button type="primary">
          Click me - styled with build-time config!
        </Button>
        <Text>This uses the build-time theme configuration</Text>
        {/* Components not imported are automatically tree-shaken */}
      </div>
    </ClickUIProvider>
  );
}
```

## Tree-Shaking Support

Click-UI already has excellent tree-shaking support:

### Current Export Structure
```typescript
// All components are individually exported (src/components/index.ts)
export { Button } from "@/components/Button/Button";
export { Text } from "@/components/Typography/Text/Text";
export { Badge } from "@/components/Badge/Badge";
// ... and so on
```

### Usage Examples
```typescript
// Import only what you need - unused components are tree-shaken
import { ClickUIProvider, Button, Text } from '@clickhouse/click-ui';
// Badge, Tooltip, etc. are NOT imported and will be tree-shaken out

// Or import specific components
import { Button } from '@clickhouse/click-ui';
import { Text } from '@clickhouse/click-ui';
```

## Configuration Priority

The system uses the following priority order:

1. **Build-time config** (highest priority) - from `click-ui.config.ts` via Vite plugin
2. **Runtime config** (medium priority) - from `window.clickUIConfig`
3. **Default config** (fallback) - built-in defaults

## CSS Variables Generation

The system automatically generates CSS variables from your config:

```css
/* Generated at build time from click-ui.config.ts */
:root {
  --app-global-color-brand: #FF6B6B;
  --app-button-basic-color-primary-background-default: #FF6B6B;
  --app-button-basic-color-primary-background-hover: #FF5252;
}

/* System mode overrides */
@media (prefers-color-scheme: light) {
  :root {
    --app-global-color-background-default: #FFFFFF;
  }
}

@media (prefers-color-scheme: dark) {
  :root {
    --app-global-color-background-default: #0D1117;
    --app-global-color-text-default: #F0F6FC;
  }
}

/* Explicit theme overrides */
:root[data-theme="light"] {
  --app-global-color-background-default: #FFFFFF;
}

:root[data-theme="dark"] {
  --app-global-color-background-default: #0D1117;
}
```

## Migration Path

### From Runtime Configuration
If you're currently using runtime configuration:

```typescript
// Before (runtime config)
<ClickUIProvider config={{ theme: myTheme }}>
  {children}
</ClickUIProvider>
```

```typescript
// After (build-time config) - move config to click-ui.config.ts
<ClickUIProvider> {/* Config loaded at build time */}
  {children}
</ClickUIProvider>
```

### Gradual Migration
You can use both systems during migration:
1. Keep existing runtime config working
2. Add Vite plugin and `click-ui.config.ts`
3. Build-time config will take priority automatically
4. Remove runtime config when ready

## Available Package Exports

```typescript
// Main library (includes Vite plugin)
import { ClickUIProvider, Button, Text } from '@clickhouse/click-ui';

// Vite plugin
import { clickUI } from '@clickhouse/click-ui/vite-plugin';

// Types
import type { ThemeConfig } from '@clickhouse/click-ui';
```

## Build Configuration

### Package.json Updates
```json
{
  "scripts": {
    "build": "tsc && vite build && yarn build:bundled && yarn build:plugin"
  },
  "exports": {
    "./vite-plugin": {
      "types": "./vite-plugin.d.ts",
      "import": "./vite-plugin.js"
    }
  },
  "files": [
    "dist",
    "vite-plugin.js",
    "vite-plugin.d.ts"
  ]
}
```

## Benefits

1. **Performance**: CSS generated at build time eliminates runtime overhead
2. **Bundle Optimization**: Automatic tree-shaking of unused components
3. **Developer Experience**: Type-safe configurations with build-time validation
4. **Flexibility**: Supports both build-time and runtime configurations
5. **Backward Compatibility**: No breaking changes to existing usage
6. **Modern Tooling**: Leverages Vite's powerful build system

## Example Build Output

With build-time configuration, your final bundle will include:
- Only the components you actually import and use
- Pre-generated CSS variables for your specific theme
- No runtime configuration processing overhead
- Optimized theme switching logic

This can result in significantly smaller bundle sizes compared to including all components and processing themes at runtime.

## Troubleshooting

### Build-Time Config Not Loading
1. Ensure `click-ui.config.ts` is in your project root
2. Verify the Vite plugin is configured correctly
3. Check that the file exports a default configuration object

### Fallback to Runtime Config
If build-time config fails, the system automatically falls back to:
1. `window.clickUIConfig` (if available)
2. Default built-in configuration

This ensures your application always has working themes.