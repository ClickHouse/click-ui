# Click UI Bundler Plugins

Universal configuration plugins for **Vite**, **Webpack**, **Rollup**, and **Next.js**.

> **See Also:**
> - [Main README](../README.md) - Quick start guide
> - [Build-Time Configuration](../BUILD_TIME_CONFIG_CLICK_UI.md) - Build-time optimization details
> - [Theme System](../src/theme/index.md) - Theme configuration and usage

## Features

✅ **Auto-discovery** - Automatically finds `click-ui.config.ts` in your project root
✅ **Zero dependencies** - No external plugin frameworks required
✅ **Multi-bundler support** - Works with Vite, Webpack, Rollup, and Next.js
✅ **Type-safe** - Full TypeScript support
✅ **Optional** - Works perfectly without a config file (uses defaults)
✅ **Hot reload** - Config changes reload automatically in dev mode
✅ **CSS generation** - Generates theme CSS variables at build time

## Installation

```bash
npm install @clickhouse/click-ui
```

## Quick Start

### 1. Create config file (optional)

```bash
npx @clickhouse/click-ui init
```

This creates `click-ui.config.ts` in your project root:

```typescript
// click-ui.config.ts
import type { ThemeConfig } from '@clickhouse/click-ui/theme';

const config: ThemeConfig = {
  cssPrefix: '--click',
  // Light mode theme (default)
  theme: {
    global: {
      color: {
        brand: '#FFCC00',
        background: { default: '#FFFFFF' }
      }
    }
  },
  // Dark mode overrides - if not defined, theme values are used for dark mode too
  dark: {
    global: {
      color: {
        background: { default: '#0D1117' },
        text: { default: '#F0F6FC' }
      }
    }
  }
};

export default config;
```

### 2. Add plugin to your bundler

#### Vite

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { clickUIConfig } from '@clickhouse/click-ui/config';

export default defineConfig({
  plugins: [
    react(),
    clickUIConfig(), // ← Automatically discovers click-ui.config.ts
  ],
});
```

#### Webpack

```typescript
// webpack.config.js
const { webpackClickUIConfig } = require('@clickhouse/click-ui/config');

module.exports = {
  // ... your webpack config
  plugins: [
    webpackClickUIConfig(), // ← Automatically discovers click-ui.config.ts
  ],
};
```

#### Rollup

```typescript
// rollup.config.js
import { rollupClickUIConfig } from '@clickhouse/click-ui/config';

export default {
  // ... your rollup config
  plugins: [
    rollupClickUIConfig(), // ← Automatically discovers click-ui.config.ts
  ],
};
```

#### Next.js

```typescript
// next.config.js
const { nextClickUIConfig } = require('@clickhouse/click-ui/config');

const nextConfig = {
  // ... your Next.js config
};

module.exports = nextClickUIConfig()(nextConfig);
```

### 3. Use in your app

```typescript
// App.tsx
import { ClickUIProvider, Button } from '@clickhouse/click-ui';
import '@clickhouse/click-ui/style.css';

function App() {
  return (
    <ClickUIProvider>
      <Button type="primary">Hello World</Button>
    </ClickUIProvider>
  );
}
```

## Plugin Options

All plugins accept the same options:

```typescript
interface PluginOptions {
  /**
   * Path to config file (relative to project root)
   * @default 'click-ui.config.ts'
   */
  configPath?: string;

  /**
   * Custom CSS output filename
   * @default 'theme-vars.css'
   */
  cssOutput?: string;

  /**
   * Enable verbose logging
   * @default false
   */
  verbose?: boolean;

  /**
   * Skip config file discovery (use defaults only)
   * @default false
   */
  skipConfigDiscovery?: boolean;
}
```

### Examples

```typescript
// Custom config path
clickUIConfig({ configPath: './themes/my-theme.ts' })

// Custom CSS output filename
clickUIConfig({ cssOutput: 'custom-theme.css' })

// Enable verbose logging
clickUIConfig({ verbose: true })

// Skip config discovery (use defaults)
clickUIConfig({ skipConfigDiscovery: true })
```

## How It Works

### 1. **Config Discovery**

The plugin automatically searches for these files in your project root:

- `click-ui.config.ts`
- `click-ui.config.mts`
- `click-ui.config.cts`
- `click-ui.config.js`
- `click-ui.config.mjs`
- `click-ui.config.cjs`

### 2. **Build-Time Processing**

- Loads your config file
- Merges with default theme
- Generates CSS variables
- Injects config as build-time constants

### 3. **CSS Generation**

Generates CSS file with theme variables:

```css
/* Light Theme */
@media (prefers-color-scheme: light) {
  :root {
    --click-global-color-brand: #FFCC00;
    --click-global-color-background-default: #FFFFFF;
  }
}

:root[data-theme="light"] {
  --click-global-color-background-default: #FFFFFF;
}

/* Dark Theme */
@media (prefers-color-scheme: dark) {
  :root {
    --click-global-color-background-default: #0D1117;
    --click-global-color-text-default: #F0F6FC;
  }
}

:root[data-theme="dark"] {
  --click-global-color-background-default: #0D1117;
}
```

## Plugin and Config File Are Both Optional

### **When Do You Need Them?**

Both the plugin and config file are **optional**:

```typescript
// Option 1: No plugin, no config - Uses defaults
export default defineConfig({
  plugins: [react()],  // No clickUIConfig needed!
});

// App.tsx
<ClickUIProvider>
  <Button>Uses default theme</Button>
</ClickUIProvider>
```

```typescript
// Option 2: With plugin + config - Custom theme
// 1. Create config: npx @clickhouse/click-ui init
// 2. Add plugin:

import { clickUIConfig } from '@clickhouse/click-ui/config';

export default defineConfig({
  plugins: [
    react(),
    clickUIConfig(), // ← Loads your click-ui.config.ts
  ],
});

// App.tsx
<ClickUIProvider>
  <Button>Uses your custom theme</Button>
</ClickUIProvider>
```

### Summary

| Setup | Result | Use Case |
|-------|--------|----------|
| ✅ No plugin + No config | Works! (defaults) | Quick start, no customization |
| ✅ Plugin + Config file | Works! (custom theme) | **Production with custom theme** |
| ⚠️ Plugin only (no config) | Works (defaults) | Prepared for future config |
| ⚠️ Config only (no plugin) | Works (config ignored) | Misconfiguration |

**Only need plugin + config if you want to customize the theme.**

## TypeScript Support

Full TypeScript support with autocompletion:

```typescript
import type { ThemeConfig } from '@clickhouse/click-ui/theme';

const config: ThemeConfig = {
  // ← Full autocomplete here!
  theme: {
    button: {
      // ← Autocomplete for all theme tokens
    }
  }
};
```

## Architecture

The plugins use a **shared core** architecture:

```
config/
├── core.ts       # Shared logic (90% of code)
├── vite.ts       # Vite-specific wrapper (~50 lines)
├── webpack.ts    # Webpack-specific wrapper (~100 lines)
├── rollup.ts     # Rollup-specific wrapper (~70 lines)
├── next.ts       # Next.js-specific wrapper (~80 lines)
└── index.ts      # Exports
```

**Benefits:**
- ✅ Zero external dependencies
- ✅ ~90% code reuse across bundlers
- ✅ Maximum flexibility per bundler
- ✅ Easy to maintain

## Comparison with Alternatives

| Approach | Size | Multi-bundler | Maintenance |
|----------|------|---------------|-------------|
| **Click UI Config** | 0 KB deps | ✅ Vite, Webpack, Rollup, Next.js | ✅ Easy (shared core) |
| `unplugin` | 134 KB | ✅ All bundlers | ✅ Easy (unified API) |
| Manual per-bundler | 0 KB | ⚠️ Manual setup | ❌ Hard (code duplication) |

## Troubleshooting

### Config file not found

```bash
ℹ️  No click-ui config found, using defaults
```

**Solution:** This is normal if you haven't created a config file. The plugin will use defaults.

To create a config file:
```bash
npx @clickhouse/click-ui init
```

### Config not loading

**Check:**
1. Config file is in project root
2. Config file exports default: `export default config;`
3. Enable verbose logging: `clickUIConfig({ verbose: true })`

### Hot reload not working (Vite)

The plugin automatically watches your config file. If changes aren't picked up:

1. Check that the file path matches
2. Restart dev server
3. Clear Vite cache: `rm -rf node_modules/.vite`

## Migration Guide

If you're currently using Click UI without customization and want to add a custom theme:

**Step 1: Create config**
```bash
npx @clickhouse/click-ui init
```

**Step 2: Add plugin to your bundler**
```typescript
// vite.config.ts
import { clickUIConfig } from '@clickhouse/click-ui/config';

export default defineConfig({
  plugins: [
    react(),
    clickUIConfig(), // ← Loads your click-ui.config.ts
  ],
});
```

**Step 3: Customize theme**
Edit `click-ui.config.ts` to your liking. The plugin will automatically load and apply your changes at build time.

## Examples

See the `/examples` directory for complete examples:

- [Vite example](../examples/vite-example.ts)
- [Webpack example](../examples/webpack-example.ts)
- [Rollup example](../examples/rollup-example.ts)
- [Next.js example](../examples/next-example.ts)

## License

Apache-2.0
