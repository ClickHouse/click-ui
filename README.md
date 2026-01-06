# Click UI

You can find the official docs for the Click IU design system and component library at [clickhouse.design/click-ui](https://clickhouse.design/click-ui).

## Using Click UI in an external app

Click UI has been tested in NextJS, Gatsby, and Vite. If you run into problems using it in your app, please create an issue and our team will try to answer.

1. Navigate to your app's route and run
   `npm i @clickhouse/click-ui`
   or
   `yarn add @clickhouse/click-ui`
2. Make sure to wrap your application in the Click UI `ClickUIProvider`, without doing this, you may run into issues with styled-components. Once thats done, you'll be able to import the individual components that you want to use on each page. Here's an example an `App.tsx` in NextJS.

```typescript
import { ClickUIProvider, Text, ThemeName, Title, Switch } from '@clickhouse/click-ui'
import '@clickhouse/click-ui/cui.css' // Required for styled-components (legacy components)
import { useState } from 'react'

function App() {
  const [theme, setTheme] = useState<ThemeName>('dark')

  const toggleTheme = () => {
    theme === 'dark' ? setTheme('light') : setTheme('dark')
  }

  return (
    <ClickUIProvider theme={theme} config={{tooltip:{ delayDuration: 0 }}}>
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={() => toggleTheme()}
        label="Dark mode"
      />

      <Title type='h1'>Click UI Example</Title>
      <Text>Welcome to Click UI. Get started here.</Text>
    </ClickUIProvider>
  )
}

export default App
```

**Note:** Some components (Separator, Spacer) have been migrated to SCSS modules and no longer require the CSS import. Their styles are automatically included when you import the component. As more components are migrated, the CSS import will eventually become optional.

## To develop this library locally 🚀

1. Clone this repo, cd into the `click-ui` directory
2. To install dependencies, run `npm i`
3. To build the latest styles, run `npm run generate-tokens`
4. To run ClickUI locally, run `npm run dev` and navigate to http://localhost:5173
5. To run Storybook locally, run `npm run storybook` and navigate to https://localhost:6006

Enjoy!

## Releases and Versions

New versions and release notes are available at [GitHub Releases](https://github.com/ClickHouse/click-ui/releases).

To create a new release and publish a new version, follow the instructions in [publish.md](./docs/publish.md).
