# ClickUI Theme System

**Runtime Theme Usage** - Theme switching, hooks, CSS variables, and runtime configuration.

> **See Also:**
> - [Build-Time Configuration](../BUILD_TIME_CONFIG_CLICK_UI.md) - Theme config API reference for `click-ui.config.ts`
> - [Bundler Plugins](../config/README.md) - Plugin setup for Vite, Webpack, Rollup, Next.js
> - [Provider Guide](./docs/provider.md) - SSR/RSC usage with ServerClickUIProvider
> - [Usage Guide](./docs/usage.md) - Advanced features and patterns

## Features

- 🎨 **Theme Switching**: Programmatic theme switching with hooks
- 📱 **System Theme Detection**: Automatic light/dark mode based on OS preferences
- 🎯 **TypeScript Support**: Full type safety with intelligent autocomplete
- 🔄 **Theme Persistence**: Automatic theme persistence in local storage
- 🌐 **SSR Compatible**: Works with Next.js, Remix, and other SSR frameworks
- ⚡ **Performance**: Lazy loading and optimized bundle size

## Quick Start

```tsx
import { ClickUIProvider } from '@clickhouse/click-ui';
import '@clickhouse/click-ui/style.css';

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

## Troubleshooting

**Hydration Issues?**
- Use `ServerClickUIProvider` for SSR/RSC
- Or add `suppressHydrationWarning={true}` to `ClickUIProvider`

**Bundle Too Large?**
- Ensure tree-shaking is enabled
- Import only the components you need

**Theme Not Loading?**
- Check that `ClickUIProvider` wraps your app
- Verify CSS is imported: `import '@clickhouse/click-ui/style.css'`

---

For complete documentation, see the [Usage Guide](./docs/usage.md) and [Provider Guide](./docs/provider.md).
