import { ClickUIProvider, Button, Text, Title } from '@clickhouse/click-ui';

/**
 * Example App using Click UI with auto-loaded config
 *
 * Setup:
 * 1. Run: npx @clickhouse/click-ui init
 * 2. Add Vite alias (see vite.config.example.ts)
 * 3. Customize click-ui.config.ts as needed
 * 4. Use ClickUIProvider - config auto-loads!
 */

function App() {
  return (
    <ClickUIProvider>
      <div style={{ padding: '2rem' }}>
        <Title type="h1">Click UI Example</Title>
        <Text>
          Your custom theme configuration is automatically loaded from click-ui.config.ts!
        </Text>
        <Button>Click me</Button>
      </div>
    </ClickUIProvider>
  );
}

export default App;
