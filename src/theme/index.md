# ClickUI Theme System

**CSS Variable-Based Theming** - High performance theming with native CSS custom properties.

> **See Also:**
> - [Build-Time Configuration](../BUILD_TIME_CONFIG_CLICK_UI.md) - Theme config API reference for `click-ui.config.ts`
> - [Bundler Plugins](../config/README.md) - Plugin setup for Vite, Webpack, Rollup, Next.js
> - [Provider Guide](./docs/provider.md) - SSR/RSC usage with ServerClickUIProvider
> - [Usage Guide](./docs/usage.md) - Advanced features and patterns

## Features

- 🎨 **CSS Variables**: Native CSS custom properties for theming
- 🚀 **Intelligent Loading**: Auto-detects build-time CSS vs runtime generation
- 📦 **Optimized Bundle**: Minimal JavaScript footprint for theme switching
- 🎯 **TypeScript Support**: Full type safety with intelligent autocomplete
- 📱 **System Theme**: Automatic light/dark mode via `prefers-color-scheme`
- 🔄 **Theme Persistence**: localStorage with SSR-safe hydration
- 🌐 **SSR/SSG Ready**: Perfect hydration, works with all frameworks
- ⚡ **Performance**: Build-time CSS compilation or runtime fallback

## Quick Start

```tsx
import { ClickUIProvider } from '@clickhouse/click-ui';
import '@clickhouse/click-ui/cui.css';

function App() {
  return (
    <ClickUIProvider theme="system">
      <YourApp />
    </ClickUIProvider>
  );
}
```

### Theme Hook

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

### CSS Variables

```css
.my-component {
  background-color: var(--click-global-color-background-default);
  color: var(--click-global-color-text-default);
  border: 1px solid var(--click-global-color-stroke-default);
}
```

## Runtime Theme Configuration

Pass configuration directly to the provider for runtime theming:

```tsx
<ClickUIProvider
  theme="system"  // 'light' | 'dark' | 'system' | 'auto'
  config={{
    storageKey: "my-app-theme"  // Custom storage key
  }}
>
  <YourApp />
</ClickUIProvider>
```

For build-time theme configuration (colors, spacing, component tokens), see [Build-Time Configuration](../BUILD_TIME_CONFIG_CLICK_UI.md).

## Common Use Cases

### Basic Theme Switching

```tsx
function ThemeSelector() {
  const { themeName, updateTheme, availableThemes } = useCUITheme();

  return (
    <select value={themeName} onChange={(e) => updateTheme(e.target.value)}>
      {availableThemes.map(theme => (
        <option key={theme} value={theme}>{theme}</option>
      ))}
    </select>
  );
}
```

### SSR/RSC (Next.js)

```tsx
// app/layout.tsx
import { ServerClickUIProvider } from '@clickhouse/click-ui';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ServerClickUIProvider theme="light">
          {children}
        </ServerClickUIProvider>
      </body>
    </html>
  );
}
```

### Custom Theme Values

```tsx
function CustomComponent() {
  const { utils } = useCUITheme();
  const primaryColor = utils.getThemeValue('global.color.primary');

  return (
    <div style={{
      backgroundColor: primaryColor as string,
      color: utils.isDark ? 'white' : 'black'
    }}>
      Themed content
    </div>
  );
}
```

## How Theme Switching Works

The theme system operates in two modes depending on your build configuration:

### Runtime Mode (Automatic Fallback)
```typescript
// CSS generated at runtime
// - Works without any build configuration
// - Automatic backwards compatibility
// - Generates CSS variables on initialization
```

### Build-Time Mode (Recommended)
```typescript
// CSS pre-compiled at build time
// - Theme CSS loaded from static files
// - Instant theme switching via HTML attributes
// - Minimal runtime JavaScript
// - Optimal performance and caching
```

The system automatically detects available CSS and selects the appropriate mode.

### Component Styling

Components use CSS modules with CSS variables for theming:

```tsx
// Component implementation
import styles from './Button.module.scss';

function Button() {
  return <button className={styles.button}>Click me</button>;
}
```

```scss
// Button.module.scss
.button {
  background: var(--click-button-primary-background-default);
  color: var(--click-button-primary-text-default);

  &:hover {
    background: var(--click-button-primary-background-hover);
  }
}
```

## Troubleshooting

**Hydration Issues?**
- Use `ServerClickUIProvider` for SSR/RSC
- Or add `suppressHydrationWarning={true}` to `ClickUIProvider`

**Want Build-Time CSS?**
- Add bundler plugin (see [config/README.md](../config/README.md))
- Create `click-ui.config.ts` in your project root
- Theme CSS will be compiled at build time

**Theme Not Loading?**
- Check that `ClickUIProvider` wraps your app
- Verify CSS is imported: `import '@clickhouse/click-ui/cui.css'`
- Check browser console for mode: "Using build-time CSS" or "Using runtime CSS generation"

---

For complete documentation, see the [Usage Guide](./docs/usage.md) and [Provider Guide](./docs/provider.md).
