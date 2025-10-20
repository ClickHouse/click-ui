# Click UI

You can find the official docs for the Click UI design system and component library at [clickhouse.design/click-ui](https://clickhouse.design/click-ui).

## Using Click UI in an external app

Click UI has been tested in NextJS, Gatsby, and Vite. If you run into problems using it in your app, please create an issue and our team will try to answer.

### Quick Start

1. **Install Click UI**
   ```bash
   npm install @clickhouse/click-ui
   ```

2. **Import the styles**

   Add this import at the top of your main application file (before other styles):

   ```typescript
   import '@clickhouse/click-ui/style.css';
   ```

   **Where to import:**
   - **Next.js App Router**: Add to your root `layout.tsx`
   - **Next.js Pages Router**: Add to `pages/_app.tsx`
   - **Gatsby**: Add to `gatsby-browser.js`
   - **Vite/React**: Add to `main.tsx` or `App.tsx`

3. **Wrap your app with ClickUIProvider**

   ```typescript
   import '@clickhouse/click-ui/style.css';
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

Click UI supports extensive theming and configuration options:

- **[Theme System](src/theme/index.md)** - Runtime theming, hooks, CSS variables, and theme switching
- **[Build-Time Configuration](BUILD_TIME_CONFIG_CLICK_UI.md)** - Theme config API reference and optimization
- **[Bundler Plugins](config/README.md)** - Setup guides for Vite, Webpack, Rollup, and Next.js
- **[Configuration Architecture](CONFIG_ARCHITECTURE.md)** - Design philosophy and decision rationale

For step-by-step customization instructions, see the [Theme System documentation](src/theme/index.md).

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
