# ClickUIProvider SSR/RSC Guide

The ClickUIProvider supports both Server-Side Rendering (SSR) and React Server Components (RSC) with some considerations.

## 🟢 Recommended: Use ServerClickUIProvider for SSR/RSC

For optimal SSR/RSC support, use `ServerClickUIProvider`:

### Next.js App Router (RSC)
```tsx
// app/layout.tsx
import { ServerClickUIProvider } from '@clickhouse/click-ui';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ServerClickUIProvider
          theme="light"
          enableSystemMode={true}
          config={themeConfig}
          tooltipConfig={{ delayDuration: 100 }}
          toastConfig={{ duration: 3000 }}
        >
          {children}
        </ServerClickUIProvider>
      </body>
    </html>
  );
}
```

### Next.js Pages Router (SSR)
```tsx
// pages/_app.tsx
import { ServerClickUIProvider } from '@clickhouse/click-ui';

export default function App({ Component, pageProps }) {
  return (
    <ServerClickUIProvider
      theme="system"
      enableSystemMode={true}
    >
      <Component {...pageProps} />
    </ServerClickUIProvider>
  );
}
```

## 🟡 Alternative: Enhanced ClickUIProvider with SSR Support

The regular ClickUIProvider now has improved SSR compatibility:

```tsx
// For cases where you need client-side theme switching
import { ClickUIProvider } from '@clickhouse/click-ui';

export default function App({ children }) {
  return (
    <ClickUIProvider
      theme="system"
      suppressHydrationWarning={true} // Prevents hydration warnings
      storageKey="my-theme"
    >
      {children}
    </ClickUIProvider>
  );
}
```

## Key Differences

| Feature | ServerClickUIProvider | ClickUIProvider |
|---------|----------------------|-----------------|
| **SSR Support** | ✅ Perfect | 🟡 Good with suppressHydrationWarning |
| **RSC Support** | ✅ Perfect | 🟡 Limited |
| **Theme Switching** | ❌ Static | ✅ Dynamic |
| **LocalStorage** | ❌ No | ✅ Yes |
| **System Theme** | ✅ CSS Media Queries | ✅ JavaScript Detection |
| **Hydration** | ✅ No Issues | 🟡 May need suppressHydrationWarning |

## SSR Safety Features

The enhanced ClickUIProvider includes:

1. **Hydration Safety**: Prevents mismatches between server and client rendering
2. **Progressive Enhancement**: Works without JavaScript, enhances with it
3. **Theme Persistence**: localStorage integration that doesn't break SSR
4. **System Theme Support**: CSS-based system theme detection for SSR

## Usage Recommendations

### ✅ Use ServerClickUIProvider when:
- Building static sites
- Using React Server Components
- Theme doesn't need to change dynamically
- Want perfect SSR with no hydration issues

### ✅ Use ClickUIProvider when:
- Need dynamic theme switching
- Building SPAs or client-heavy apps
- Need localStorage theme persistence
- Want full client-side theme control

## Build-Time Configuration

Both providers support build-time configuration via Vite plugin:

```ts
// vite.config.ts
import { clickUI } from '@clickhouse/click-ui/vite-plugin';

export default defineConfig({
  plugins: [
    clickUI({
      configPath: 'theme.config.ts'
    })
  ]
});
```

```ts
// theme.config.ts
export default {
  theme: {
    global: {
      color: {
        primary: '#007acc'
      }
    }
  },
  systemModeOverrides: {
    dark: {
      global: {
        color: {
          primary: '#66b3ff'
        }
      }
    }
  }
};
```