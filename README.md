# Click UI

You can find the official docs for the Click UI design system and component library at [clickhouse.design/click-ui](https://clickhouse.design/click-ui).

## Using Click UI in an external app

Click UI has been tested in NextJS, Gatsby, and Vite. If you run into problems using it in your app, please create an issue and our team will try to answer.

### Quick Start

1. **Install Click UI**
   ```bash
   npm install @clickhouse/click-ui
   ```

2. **Import the required styles**

   Add these imports at the top of your main application file (before other styles):

   **Option A: Simple (Recommended for most projects)**
   ```typescript
   // All-in-one: Includes both component styles and default theme
   import '@clickhouse/click-ui/cui.css';
   ```

   **Option B: Granular (For custom theming)**
   ```typescript
   // Component styles only
   import '@clickhouse/click-ui/cui-components.css';

   // Default theme (light + dark with automatic switching)
   import '@clickhouse/click-ui/cui-default-theme.css';

   // OR import your custom theme instead:
   // import './my-custom-theme.css';
   ```

   **Where to import:**
   - **Next.js App Router**: Add to your root `layout.tsx`
   - **Next.js Pages Router**: Add to `pages/_app.tsx`
   - **Gatsby**: Add to `gatsby-browser.js`
   - **Vite/React**: Add to `main.tsx` or `App.tsx`

3. **Wrap your app with ClickUIProvider**

   ```typescript
   import '@clickhouse/click-ui/cui.css';
   import { ClickUIProvider, Text, Title } from '@clickhouse/click-ui'

   function App() {
     return (
       <ClickUIProvider>
         <Title type='h1'>Click UI Example</Title>
         <Text>Welcome to Click UI!</Text>
       </ClickUIProvider>
     )
   }

   export default App
   ```

### Customizing Your Theme

Click UI supports extensive theming through a CLI-based approach:

#### Step 1: Create a config file

```bash
npx click-ui init
```

This creates a `click-ui.config.ts` file in your project root.

#### Step 2: Customize your theme

```typescript
// click-ui.config.ts
export default {
  // Light mode theme tokens
  theme: {
    button: {
      color: {
        primary: {
          'background-default': '#FF6B00',
          'background-hover': '#FF8533',
        }
      }
    }
  },

  // Dark mode overrides
  dark: {
    button: {
      color: {
        primary: {
          'background-default': '#FF8533',
          'background-hover': '#FFA366',
        }
      }
    }
  },

  // Runtime configuration (optional)
  storageKey: 'my-app-theme',
  tooltipConfig: { delayDuration: 200 }
}
```

#### Step 3: Generate your custom theme CSS

```bash
npx click-ui generate
```

This creates `cui-custom-theme.css` in your `public/` folder.

#### Step 4: Import your custom theme instead of the default

```typescript
import '@clickhouse/click-ui/cui-components.css'; // Component styles only
import './public/cui-custom-theme.css'; // Your custom theme
import { ClickUIProvider } from '@clickhouse/click-ui'
```

**Resources:**
- **[CLI Theme Generation](CLI_THEME_GENERATION.md)** - Complete CLI documentation
- **[Theme System](src/theme/index.md)** - Runtime theming, hooks, and theme switching
- **[Build-Time Configuration](BUILD_TIME_CONFIG_CLICK_UI.md)** - Theme config API reference

---

## How It Works

Click UI uses a **pre-built CSS approach** for optimal performance:

1. **CSS Files Generated at Build Time**
   - Default theme included in the library (~10 KB)
   - Custom themes generated via CLI
   - Uses CSS `light-dark()` function for automatic theme switching

2. **Minimal Runtime JavaScript**
   - Provider only sets `data-theme` attribute (~600 bytes)
   - Zero runtime CSS generation
   - Instant theme switching via CSS attributes

3. **Perfect Tree-Shaking**
   - Import only the components you use
   - Unused CSS automatically eliminated by your bundler
   - Optimal bundle size

### Theme Switching

Themes are controlled via HTML attributes and CSS custom properties:

```html
<!-- Light mode -->
<html data-theme="light">

<!-- Dark mode -->
<html data-theme="dark">

<!-- System preference mode (automatic) -->
<html data-theme="system">
```

All theme tokens are available as CSS variables with the `--click` prefix:

```css
.my-component {
  background: var(--click-global-color-background-default);
  color: var(--click-global-color-text-default);
}
```

The provider automatically sets the theme attribute based on user preference and system settings.

---

## To develop this library locally 🚀

1. Clone this repo, cd into the `click-ui` directory
2. To install dependencies, run `npm i`
3. To build the latest styles, run `npm run generate-tokens`
4. To run ClickUI locally, run `npm run dev` and navigate to http://localhost:5173
5. To run Storybook locally, run `npm run storybook` and navigate to http://localhost:6006

Enjoy!

## Releases and Versions

New versions and release notes are available at [GitHub Releases](https://github.com/ClickHouse/click-ui/releases).

To create a new release and publish a new version, follow the instructions in [publish.md](./docs/publish.md).
