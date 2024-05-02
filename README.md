# Click UI

The home of the ClickHouse design system and component library. Click UI is in very early development and subject to change, we do not recommend using it for production purposes.

### Using Click UI in an external app

Click UI has been tested in NextJS, Gatsby, and Vite. If you run into problems using it in your app, please create an issue and our team will try to answer.
1. Navigate to your app's route and run
   `npm i @clickhouse/click-ui`
   or
   `yarn add @clickhouse/click-ui`
2. Make sure to wrap your application in the Click UI `ClickUIProvider`, without doing this, you may run into issues with styled-components. Once thats done, you'll be able to import the individual components that you want to use on each page. Here's an example an `App.tsx` in NextJS.

```ts
import { ClickUIProvider, Text, ThemeName, Title, Switch } from '@clickhouse/click-ui'

function App() {
  const [theme, setTheme] = useState<ThemeName>('dark')

  const toggleTheme = () => {
    theme === 'dark' ? setTheme('light') : setTheme('dark')
  }

  return (
    <ClickUIProvider theme={theme} config={{tooltip:{ delayDuration: 0 }}}>
      <Switch checked={theme === 'dark'} onClick={() => toggleTheme() } />

      <Title type='h1'>Click UI Example</Title>
      <Text>Welcome to Click UI. Get started here.</Text>
    </ClickUIProvider>
  )
}

export default App
```

### To develop this library locally 🚀

1. Clone this repo, cd into the `click-ui` directory
2. To install dependencies, run `npm i`
3. To build the latest styles, run `npm run generate-tokens`
4. To run ClickUI locally, run `npm run dev` and navigate to http://localhost:5173
5. To run Storybook locally, run `npm run storybook` and navigate to https://localhost:6006

Enjoy!

### Creating a release after merging your changes in
1. Go to /releases, then click the `Draft a new release` button
   <img width="1624" alt="1" src="https://github.com/ClickHouse/click-ui/assets/146112/0c21a07e-6b26-4446-8c0a-e393a9beb139">
1. Click the `Choose a new tag` button, then add the next sequential tag. E.g. if the current tag is `0.0.137`, the next tag should be `0.0.138`
   <img width="1624" alt="2" src="https://github.com/ClickHouse/click-ui/assets/146112/9a206bc8-8585-438f-b23e-9887f7d5d2e5">
1. Click the `Generate release notes` button.
   <img width="1624" alt="3" src="https://github.com/ClickHouse/click-ui/assets/146112/03c69dcb-310e-479d-8f72-22a69f3c23c7">
1. Click the `Publish release` button.
   <img width="1624" alt="4" src="https://github.com/ClickHouse/click-ui/assets/146112/3e358410-66ce-448e-81f2-72d39920f4ef">
1. When the [npm library](https://www.npmjs.com/package/@clickhouse/click-ui) shows the correct version in the top left corner, the relase has successfully been published.
