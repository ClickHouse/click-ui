# Click UI Configuration Architecture

**Design Philosophy** - Understanding the mental model and design decisions behind the configuration system.

> **See Also:**
> - [Quick Start](README.md) - Installation and basic usage
> - [Bundler Plugins](config/README.md) - Plugin setup instructions
> - [Build-Time Configuration](BUILD_TIME_CONFIG_CLICK_UI.md) - Config API reference
> - [Theme System](src/theme/index.md) - Runtime theming

## Philosophy

**Simple and explicit:** Plugin + config file for customization, or use defaults.

## Config Loading Flow

### ✅ Scenario 1: No Plugin, No Config (Default Usage)
```typescript
// vite.config.ts - NO plugin needed
export default defineConfig({
  plugins: [react()],
});

// App.tsx
<ClickUIProvider>  {/* Uses default theme */}
  <Button>Hello</Button>
</ClickUIProvider>
```
**Result:** ✅ Works! Uses default ClickHouse theme.

---

### ✅ Scenario 2: With Plugin + With Config (Custom Theme)
```bash
# 1. Create config
npx @clickhouse/click-ui init
```

```typescript
// click-ui.config.ts
export default {
  theme: {
    global: {
      color: { brand: '#FF0000' }
    }
  }
};
```

```typescript
// vite.config.ts - Add plugin
import { clickUIConfig } from '@clickhouse/click-ui/config';

export default defineConfig({
  plugins: [
    react(),
    clickUIConfig(), // ← Discovers and loads click-ui.config.ts
  ],
});
```

```typescript
// App.tsx
<ClickUIProvider>  {/* Uses custom theme from config */}
  <Button>Hello</Button>
</ClickUIProvider>
```
**Result:** ✅ Works! Uses your custom theme with build-time optimization.

---

### ❌ Scenario 3: With Config, No Plugin (MISCONFIGURED)
```typescript
// click-ui.config.ts exists
export default { theme: { /* ... */ } };

// vite.config.ts - NO plugin
export default defineConfig({
  plugins: [react()],  // ← Missing clickUIConfig()
});
```
**Result:** ❌ Config file is ignored! Uses default theme.

**Why:** Without the plugin, there's no mechanism to load the config file at build time.

---

## How It Works

### Build-Time (with plugin)
1. Plugin discovers `click-ui.config.ts`
2. Loads and parses config
3. Injects as `__CLICK_UI_CONFIG__` global constant
4. Generates CSS variables

### Runtime (in app)
```typescript
// src/theme/config.ts
export const getThemeConfig = () => {
  // Check if plugin injected config at build time
  if (typeof __CLICK_UI_CONFIG__ !== "undefined") {
    return __CLICK_UI_CONFIG__;  // ← From plugin
  }

  // Use defaults
  return {};
};
```

---

## Key Changes from Old Pattern

### Before (COMPLEX - with dynamic import)
```typescript
// ❌ Old: Tried to dynamically import 'click-ui-config'
const config = await import('click-ui-config');  // Caused bundler issues
```

### After (SIMPLE - build-time only)
```typescript
// ✅ New: Only checks build-time injected config
if (typeof __CLICK_UI_CONFIG__ !== "undefined") {
  return __CLICK_UI_CONFIG__;  // Set by plugin at build time
}
return {};  // Defaults
```

**Why this is better:**
- ✅ No dynamic imports → no bundler resolution issues
- ✅ Plugin is optional when using defaults
- ✅ Clear separation: config file = plugin required
- ✅ Simpler mental model
- ✅ One way to do it (no confusion)

---

## Bundler Support

All bundlers work the same way:

| Bundler | Plugin | Config Injection | CSS Generation |
|---------|--------|------------------|----------------|
| Vite | `clickUIConfig()` | DefinePlugin | ✅ |
| Webpack | `webpackClickUIConfig()` | DefinePlugin | ✅ |
| Rollup | `rollupClickUIConfig()` | Transform | ✅ |
| Next.js | `nextClickUIConfig()()` | DefinePlugin | ✅ (to public/) |

---

## Summary Table

| Setup | Plugin? | Config File? | Result | Use Case |
|-------|---------|--------------|--------|----------|
| None | ❌ No | ❌ No | ✅ Works (defaults) | Quick start, no customization |
| Plugin only | ✅ Yes | ❌ No | ℹ️ Works (defaults) | Prepared for future config |
| Config only | ❌ No | ✅ Yes | ⚠️ Ignored (defaults) | Misconfiguration |
| Both | ✅ Yes | ✅ Yes | ✅ Custom theme | **Production use** |

---

## Benefits of This Architecture

1. **Simple:** No plugin needed for default theme
2. **Explicit:** Config file = must add plugin
3. **No magic:** No dynamic imports, no module resolution tricks
4. **Fast:** Build-time config injection
5. **One way:** Single clear path to customization

---

## Quick Reference

### Using Defaults (No Config)
See [Quick Start Guide](README.md)

### Customizing Theme
1. See [Bundler Plugins](config/README.md) for plugin setup
2. See [Build-Time Configuration](BUILD_TIME_CONFIG_CLICK_UI.md) for config API
3. See [Theme System](src/theme/index.md) for runtime usage

### Key Takeaway

Two simple paths:
- **Want defaults?** Just use the components
- **Want customization?** Add plugin + create config file

No complexity, no confusion, no runtime overrides needed.
