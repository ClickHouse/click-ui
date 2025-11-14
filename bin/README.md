# Click UI CLI

This directory contains the Click UI command-line interface for theme customization.

## Quick Start

```bash
# Initialize a config file
npx click-ui init

# Generate custom theme CSS
npx click-ui generate

# Get help
npx click-ui --help
```

## Commands

### `click-ui init`

Creates a `click-ui.config.ts` file in your project root with default configuration.

**Options:**
- `-f, --format <format>` - Config format: `js` or `ts` (default: `ts`)
- `--force` - Overwrite existing config file
- `-h, --help` - Display help

**Example:**
```bash
npx click-ui init
npx click-ui init --format js
npx click-ui init --force
```

### `click-ui generate`

Generates custom theme CSS from your `click-ui.config.ts` file.

**Options:**
- `-o, --output <path>` - Output file path (default: `public/cui-custom-theme.css`)
- `-v, --verbose` - Show detailed output
- `-w, --watch` - Watch for config changes and regenerate
- `-h, --help` - Display help

**Example:**
```bash
npx click-ui generate
npx click-ui generate --output src/theme.css
npx click-ui generate --watch
```

## Configuration

See [click-ui.config.example.ts](./click-ui.config.example.ts) for a complete example configuration.

### Basic Structure

```typescript
import type { ThemeConfig } from '@clickhouse/click-ui/theme';

const config: ThemeConfig = {
  // Light mode theme
  theme: {
    global: {
      color: {
        brand: '#FF6B6B',
      }
    }
  },

  // Dark mode overrides
  dark: {
    global: {
      color: {
        brand: '#FF8A80',
      }
    }
  },

  // Runtime configuration
  storageKey: 'my-app-theme',
};

export default config;
```

## Workflow

1. **Create config:**
   ```bash
   npx click-ui init
   ```

2. **Customize theme** in `click-ui.config.ts`:
   ```typescript
   theme: {
     button: {
       primary: {
         background: { default: '#FF6B6B' }
       }
     }
   }
   ```

3. **Generate CSS:**
   ```bash
   npx click-ui generate
   ```

4. **Import in your app:**
   ```typescript
   import '@clickhouse/click-ui/cui.css';
   import './public/cui-custom-theme.css'; // Your custom theme
   import { ClickUIProvider } from '@clickhouse/click-ui';
   // OR for simple setup without custom theme:
   // import '@clickhouse/click-ui/cui.css';

   function App() {
     return (
       <ClickUIProvider>
         {/* Your app */}
       </ClickUIProvider>
     );
   }
   ```

## File Structure

```
bin/
├── click-ui.js                    # CLI entry point
├── click-ui.config.example.ts     # Example configuration
├── commands/
│   ├── init.js                    # Creates config file
│   ├── generate.js                # Generates theme CSS
│   └── build-default-theme.ts     # Internal: builds library's default theme
└── utils/
    └── css-generator.js           # CSS generation utilities
```

## TypeScript Support

Full TypeScript support with autocomplete for theme configuration:

```typescript
import type { ThemeConfig } from '@clickhouse/click-ui/theme';

const config: ThemeConfig = {
  theme: {
    // TypeScript autocomplete works here! ✨
  }
};
```

## CSS Output

The CLI generates CSS using `light-dark()` functions for automatic theme switching:

```css
:root {
  color-scheme: light dark;
  --click-button-color-primary-background-default: light-dark(#FF6B6B, #FF8A80);
}
```

This allows the browser to automatically switch between light and dark values based on the user's system preference or your theme setting.

## Documentation

For more information:
- [Main README](../README.md) - Getting started
- [Theme Documentation](../src/theme/index.md) - Theme configuration guide
- [GitHub Repository](https://github.com/ClickHouse/click-ui)

## License

Apache-2.0
