# Perfect ClickUIProvider Usage Guide

The enhanced ClickUIProvider is now a **comprehensive, production-ready theme system** with enterprise-grade features.

## 🚀 Basic Usage

```tsx
import { ClickUIProvider, useCUITheme } from '@clickhouse/click-ui';

function App() {
  return (
    <ClickUIProvider theme="system">
      <YourApp />
    </ClickUIProvider>
  );
}

function ThemeToggle() {
  const { themeName, toggleTheme, utils } = useCUITheme();

  return (
    <button onClick={toggleTheme}>
      Current: {themeName} ({utils.isDark ? '🌙' : '☀️'})
    </button>
  );
}
```

## ⚡ Advanced Features

### 1. **Auto Theme (Time-based)**
```tsx
<ClickUIProvider
  theme="auto"
  enableDevTools={true}
>
  <App />
</ClickUIProvider>
```
- Automatically switches to dark mode from 7 PM to 6 AM
- Light mode during daytime hours
- Perfect for productivity apps

### 2. **Theme Transitions**
```tsx
<ClickUIProvider
  theme="system"
  enableTransitions={true}
  transitionDuration={300}
>
  <App />
</ClickUIProvider>
```
- Smooth theme transitions
- Configurable duration
- CSS-based animations

### 3. **Performance Optimization**
```tsx
<ClickUIProvider
  theme="system"
  enableMemoization={true}
  debounceDelay={150}
  config={{
    preloadThemes: ['light', 'dark']
  }}
>
  <App />
</ClickUIProvider>
```

### 4. **Development Tools**
```tsx
<ClickUIProvider
  theme="system"
  enableDevTools={true}
  config={{
    logThemeChanges: true
  }}
>
  <App />
</ClickUIProvider>
```

Access dev tools in browser console:
```javascript
window.clickUITheme.current      // Current theme state
window.clickUITheme.config       // Configuration
window.clickUITheme.debug        // Debug information
```

## 🎨 Enhanced Hook Usage

```tsx
function ThemeControls() {
  const {
    // Core state
    themeName,
    resolvedTheme,
    isSystemTheme,

    // Actions
    updateTheme,
    toggleTheme,
    resetTheme,

    // Data
    theme,
    breakpoints,
    sizes,

    // Utilities
    utils: { isDark, isLight, getThemeValue },

    // State
    isLoading,
    isHydrated,
    availableThemes
  } = useCUITheme();

  return (
    <div>
      <h3>Theme: {themeName} → {resolvedTheme}</h3>

      {/* Theme Selector */}
      <div>
        {availableThemes.map(theme => (
          <button
            key={theme}
            onClick={() => updateTheme(theme)}
            disabled={!isHydrated || isLoading}
          >
            {theme}
          </button>
        ))}
      </div>

      {/* Quick Actions */}
      <button onClick={toggleTheme}>Toggle Theme</button>
      <button onClick={resetTheme}>Reset to Default</button>

      {/* Theme Info */}
      <div>
        <p>Is Dark: {isDark ? 'Yes' : 'No'}</p>
        <p>System Theme: {isSystemTheme ? 'Yes' : 'No'}</p>
        <p>Primary Color: {getThemeValue('global.color.primary')}</p>
      </div>

      {/* Loading States */}
      {isLoading && <div>Loading theme...</div>}
      {!isHydrated && <div>Hydrating...</div>}
    </div>
  );
}
```

## 🔧 Configuration Examples

### Build-time Configuration
```typescript
// click-ui.config.ts
export default {
  // Core settings
  defaultTheme: 'system',
  storageKey: 'my-app-theme',

  // Custom theme
  theme: {
    global: {
      color: {
        primary: '#007acc',
        secondary: '#ff6b35'
      }
    }
  },

  // System overrides
  systemModeOverrides: {
    light: {
      global: { color: { primary: '#0066cc' } }
    },
    dark: {
      global: { color: { primary: '#66b3ff' } }
    }
  },

  // Advanced features
  enableTransitions: true,
  transitionDuration: 250,
  preloadThemes: ['light', 'dark'],

  // Performance
  enableMemoization: true,
  debounceDelay: 100,

  // UI Providers
  tooltipConfig: { delayDuration: 200 },
  toastConfig: { duration: 5000 }
};
```

### Runtime Configuration
```tsx
<ClickUIProvider
  theme="system"
  storageKey="myapp-theme"
  enableTransitions={true}
  transitionDuration={200}
  fallbackTheme="light"
  config={{
    tooltip: { delayDuration: 100 },
    toast: { duration: 3000 }
  }}
>
  <App />
</ClickUIProvider>
```

## 📱 Responsive Theme Usage

```tsx
function ResponsiveComponent() {
  const { breakpoints, sizes, utils } = useCUITheme();

  const styles = {
    container: {
      padding: sizes.medium || '16px',
      maxWidth: breakpoints.desktop || '1200px',
      backgroundColor: utils.isDark
        ? 'var(--cui-global-color-background-dark)'
        : 'var(--cui-global-color-background-light)'
    }
  };

  return <div style={styles.container}>Responsive Content</div>;
}
```

## 🔐 TypeScript Support

```tsx
import {
  ClickUIProvider,
  useCUITheme,
  ThemeName,
  ThemeContextValue
} from '@clickhouse/click-ui';

// Custom hook with specific theme handling
function useAppTheme() {
  const theme = useCUITheme();

  return {
    ...theme,
    // Custom theme logic
    isHighContrast: theme.themeName === 'dark',
    toggleHighContrast: () => theme.updateTheme('dark')
  };
}

// Theme-aware component
interface ThemedButtonProps {
  variant?: 'primary' | 'secondary';
  theme?: Partial<ThemeContextValue>;
}

const ThemedButton: React.FC<ThemedButtonProps> = ({
  variant = 'primary',
  children
}) => {
  const { utils, theme } = useCUITheme();

  return (
    <button
      style={{
        backgroundColor: utils.isDark ? '#333' : '#fff',
        color: theme.global?.color?.text || '#000'
      }}
    >
      {children}
    </button>
  );
};
```

## 🚀 SSR/RSC Support

### Next.js App Router
```tsx
// app/layout.tsx
import { ClickUIProvider } from '@clickhouse/click-ui';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ClickUIProvider
          theme="system"
          suppressHydrationWarning={true}
          fallbackTheme="light"
        >
          {children}
        </ClickUIProvider>
      </body>
    </html>
  );
}
```

### Next.js Pages Router
```tsx
// pages/_app.tsx
export default function App({ Component, pageProps }) {
  return (
    <ClickUIProvider theme="system">
      <Component {...pageProps} />
    </ClickUIProvider>
  );
}
```

## 📊 Performance Features

1. **Memoization**: Prevents unnecessary re-renders
2. **Debouncing**: Batches rapid theme changes
3. **Theme Preloading**: Loads themes in background
4. **Lazy Loading**: Suspense-based loading states
5. **Error Boundaries**: Graceful error handling

## 🛠 Development Features

1. **Dev Tools**: Browser console debugging
2. **Change Logging**: Theme change tracking
3. **Error Reporting**: Detailed error messages
4. **Hot Reloading**: Development-friendly
5. **Type Safety**: Full TypeScript support

## 🎯 Migration Guide

### From Old ClickUIProvider:
```tsx
// Before
<ClickUIProvider theme="light" config={{ tooltip: {...} }}>

// After (fully backward compatible)
<ClickUIProvider theme="light" config={{ tooltip: {...} }}>
```

### From Legacy ThemeProvider:
```tsx
// Before (legacy - removed)
// <ThemeProvider defaultTheme="system" storageKey="theme">

// After (enhanced)
<ClickUIProvider theme="system" storageKey="theme">
```

The new ClickUIProvider is **100% backward compatible** while adding powerful new features!