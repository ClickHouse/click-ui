<p align="center">
  <a href="https://clickhouse.com" target="_blank">
    <img
      alt="Clickhouse logo"
      src="../../.repo/images/banner.jpg?202601211122"
    />
  </a>
</p>

# Click UI (Core)

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-blue.svg)](https://conventionalcommits.org)

Click UI is the ClickHouse Design System's Component Library. Our aim with Click UI is to provide an accessible, theme-able, modern, and attractive interface with which to experience the speed and power of ClickHouse.

You can find the official docs for the Click UI design system and component library at [clickhouse.design/click-ui](https://clickhouse.design/click-ui).

## Overview

* [Requirements](#requirements)
* [Quick Start](#quick-start)
* [Development](#development)
  - [Generating design tokens](#generating-design-tokens)
  - [Local development](#local-development)
  - [Circular dependency check](#circular-dependency-check)
* [Tests](#Tests)
  - [Functional tests](#functional-tests)
  - [Visual regression tests](#visual-regression-tests)
* [Storybook](#storybook)
  - [Stories development server](#stories-development-server)
  - [Public static site](#public-static-site)
* [Distribution](#distribution)
  - [Build](#build)
  - [Use Click UI](#use-click-ui)
  - [Component-level imports](#component-level-imports)
  - [Public API](#public-api)
  - [Examples](#examples)
* [Themes](#themes)
  - [Prevent theme flash](#prevent-theme-flash)
  - [Theme Persistence](#theme-persistence)
  - [Custom styling with CSS](#custom-styling-with-css)
* [Assets Management](#assets-management)
  - [Convert SVG to React Component](#convert-svg-to-react-component)
* [Changesets](#changesets)
  - [Add a new changeset](#add-a-new-changeset)
  - [Checking the changeset status](#checking-the-changeset-status)
  - [Create a new version and changelogs](#create-a-new-version-and-changelogs)
* [Release](#release)

## Requirements

- Nodejs (>= 22.12.x) as runtime
- Yarn (>= 4.5.3) for development, any other package manager in a host project

## Quick Start

Install the package via npm or your favourite package manager:

```sh
npm i @clickhouse/click-ui@latest
```

To use Click UI, you must wrap your application in the provider. This ensures styles and themes are applied correctly across all components.

```ts
import { ClickUIProvider, Title, Text } from '@clickhouse/click-ui'

function App() {
  return (
    <ClickUIProvider theme="dark">
      <Title type="h1">Hello ClickHouse</Title>
      <Text>Start building today!</Text>
    </ClickUIProvider>
  )
}
```

For more examples, including theme switching and configuration, see the [How to](#how-to-use) use section, or explore our design system at [clickhouse.design/click-ui](https://clickhouse.design/click-ui).

## Development

The project uses yarn package manager for development.

After cloning the repository change to the work directory and install the dependencies:

```sh
yarn
```

### Circular dependency check

Check for circular dependencies that can cause build and runtime issues:

```sh
yarn circular-dependency:check
```

If circular dependencies are found it'll exit with a report showing the affeced files which require your attention.

### Generating design tokens

Tokens are provided by a style directionary sourced from [tokens-studio](https://tokens.studio/).

It's expected to have theme tokens provided externally, e.g. Figma tokens-studio output is stored in the repository and a PR's opened. The assets are stored in the directory [./tokens/themes].

Once [./tokens/themes] files are updated or provided from exernal source, e.g. Figma, we must regenerate the tokens for consumption in the project.

Run the command to generate tokens in the path `./src/theme/tokens/`:

```sh
yarn generate:tokens
```

Once done, you must commit the changes.

Learn more about tokens-studio [here](https://documentation.tokens.studio/).

### Local development

We leverage Storybook as our primary development environment and documentation, see [Storybook](#storybook).

You can start the Storybook development server by:

```sh
yarn dev
```


We do NOT maintain a separate development environment; our Storybook stories serve as the source of truth for component implementation.

> [!IMPORTANT]
> We operate collaboratively with the Product Design team. While stories reflect the current implementation (live), Figma files remain the source of truth for design research and decision-making. Changes are typically finalized in Figma before being implemented in code to ensure design-sync.

By avoiding local preview files, we ensure that component experimentation happens in isolation; free from application side effects and providing a live look at component interfaces and usage examples at time of writing.

> [!NOTE]
> To ensure stability, we utilize Visual Regression and Unit Testing, see [tests](#tests). When contributing features or tweaks, you're expected to include or update the relevant tests to maintain stability, e.g. remember the components are consumed by a number of applications.

To get started with the development playground, refer to the Storybook section [here](#storybook).

## Tests

### Functional tests

The package uses [vitest](https://vitest.dev/) and [react testing library](https://testing-library.com) for tests, e.g. functional tests.

```sh
yarn test
```

### Visual regression tests

The project uses [Chromatic](https://www.chromatic.com/) for visual regression testing of UI components.

It captures screenshots of Storybook and compares them across builds to detect unintended visual changes by:

- Automated visual testing in GitHub CI/CD pipeline, e.g. storybook publish, UI tests
- Leveraging storybook stories
- Provides visual diff reviews and approval workflows
- Helps catch UI bugs

To setup, you must get a team member project token.

Add the token as an environment variable to your environment preference or profile, e.g. `~/.zshrc`:

```sh
export CHROMATIC_PROJECT_TOKEN=<YOUR-TOKEN-HERE>
```

Once ready, you can run tests by:

```sh
yarn test:chromatic
```
> [!NOTE]
> Chromatic does NOT generate a report in the terminal due to its cloud nature, which only outputs:
> - Build status, e.g. uploading or testing
> - Link to the cloud runner or dashboard
> - Exit code

If you need quicker iteration feedback, or more testing control during local development, read [here](./docs/tests/playwright.md)

## Storybook

The component library provides a collection of ready-to-use components. We use [Storybook](#storybook) to showcase and document our components.

### Stories development server

Start the storybook development server:

```sh
yarn storybook
```

It'll default to the location [http://localhost:6006](http://localhost:6006), if port available.

### Build static site

To build a static version:

```sh
yarn storybook:build
```

Once built, you can serve the static files by:

```sh
yarn storybook:serve
```

### Public Static Site

The latest static version's built and deployed automatically when contributing to `main` of [Click UI](https://github.com/ClickHouse/click-ui).

Once deployed it's available publicly at [clickhouse.design/click-ui](https://clickhouse.design/click-ui).

## Changeset

Learn to manage the versioning of changelog entries.

The following is a brief description of available commands to allow a person making a contribution make key decisions about their changes.

It'll generate a changeset, which is effectively two key bits of information:

- A version type which follows [semver](https://semver.org/)
- Change information placed in a changelog

Make good use of this simple workflow to help us release new package versions more confidently.

### Add a new changeset

When contributing, declare an intent or describe the changes you're making or adding to a release by executing the `changeset:add` command.

The wizard will ask a few questions and generate a changelog entry for you:

```sh
yarn changeset:add
```

The changesets tool keeps track of all declared changes in the `.changeset` directory.

Once completed, you must commit the changeset!

### Checking the changeset status

To check if your branch contains a changeset:

```sh
yarn changeset:status
```

### Create a new version and changelogs

To consume all changesets, and update to the most appropriate semver version and write a friendly changelog based on those changesets, the following command is available:

> [!IMPORTANT]
> Consuming changesets is done automatically in the CI/CD environment. For this reason, you don't have to execute the command, as a contributor your single concern should be adding changesets to any relevant changes.

```sh
yarn changeset:version
```

## Distribution

The package is distributed as ESM.

### Build

To build the distribution version of the package run:

```sh
yarn build
```

> [!NOTE]
> Optimizations are responsability of consumer or host apps, e.g. they can't remove unused code if already minified it! We ship unminified code so their build tools can: analyse and remove what they don't need or dead code, debug more easily, compress everything together in one go instead of handling conflicting compression algorithms, etc.

### Use Click UI

Navigate to your app's work directory and add the package.

Here, we use `yarn` but you can use your favorite package manager, e.g. pnpm.

```sh
yarn add @clickhouse/click-ui
```
> [!NOTE]
> Click UI should be supported by react frameworks.
> If you run into any issues consuming it in your react app, report it [here](https://github.com/ClickHouse/click-ui/issues/new). Provide all important details, including information on how to replicate the issue!

Once installed, wrap the application with Click UI provider:

```js
import { ClickUIProvider } from '@clickhouse/click-ui'

export default () => {
  return (
    <ClickUIProvider theme='light'>
      <p>Hello world!</p>
    </ClickUIProvider>
  );
}
```

After, you are able to import your favorite [Click UI components](https://clickhouse.design/click-ui).

```js
import { ClickUIProvider, Title } from '@clickhouse/click-ui'

export default () => {
  return (
    <ClickUIProvider theme='light'>
      <Title type='h1'>Click UI Example</Title>
    </ClickUIProvider>
  );
}
```

To learn more about individual components, visit [Click UI components](https://clickhouse.design/click-ui).

### Component-level imports

Components can be imported directly by name, providing a succinct import syntax.

```ts
import { Button } from '@clickhouse/click-ui/Button';
```

The exports map is auto-generated from the public API defined in `src/index.ts`, learn to manage by reading the [Public API](#public-api) section.

> [!WARNING]
> Some components depend on the theme provider. These will fail if used outside of `ClickUIProvider`. In next versions, this will change and consumer apps will have the ability to use them without the provider wrapping.

### Public API

The public API is controlled through the main barrel file at `src/index.ts`. This file serves as the single source of truth for all components, types, and utilities exported by the package.

> [!NOTE]
> The `generate:exports` script uses the TypeScript Compiler API to parse `src/index.ts` directly and extract only the components that are explicitly exported. This ensures that only public API components get subpath exports in `package.json`, while internal components remain inaccessible via direct imports.

Maintainers can add or remove components from the public API by updating the exports in this file. Each export should include both the component and its associated types to ensure consumers have full type support.

Here's an example of `src/index.ts`:

```ts
// Adding a new component to the public API
export { Button } from './components/Button';
export type { ButtonProps } from './components/Button';

// Removing a component (simply delete)
```

After, you must run the `generate:exports` to update the component-level exports in the package.json file:

```sh
yarn generate:exports
```

Once complete, commit your changes.

#### Breaking change support

When introducing breaking changes or deprecating types, maintainers can provide retroactive support by creating custom type aliases. This allows consumers to migrate gradually while maintaining backwards compatibility.

```ts
// Backwards compatibility: export legacy type name
// that maps to the new type
export type { NewComponentProps as LegacyComponentProps } from './components/NewComponent';

// Or create a custom type for transition periods
export type DeprecatedProps = NewProps & {
  /** @deprecated Use `newProp` instead */
  oldProp?: string;
};
```

> [!NOTE]
> When deprecating types or components, consider adding JSDoc `@deprecated` annotations to guide consumers towards the updated API. This provides clear migration paths and IDE warnings.

### Examples

Here's a quick copy and paste NextJS example with interactive components you can play:

```ts
import { ClickUIProvider, Text, ThemeName, Title, Switch } from '@clickhouse/click-ui'
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

## Themes

Theming allows the end-user to select its preferred colour theme. You are responsible for managing your own theme state. Use your preferred state management solution (React state, Zustand, Redux, Context, etc.) and pass the current theme to the provider.

> [!NOTE]
> Currently, styling is done with css-in-js which might cause some flash since it has to compute the theme and apply it. We'll be moving from styled-components and this shall be changed and improved.

### Prevent theme flash

To prevent flash of incorrect theme, import the `InitCUIThemeScript` component and place it in the `<head>` of your HTML.

The script reads the theme from localStorage and applies it immediately before React hydration to prevent flashing.

```ts
import { InitCUIThemeScript } from '@clickhouse/click-ui';
```

Simple usage (no props needed):

```jsx
<html>
  <head>
    <InitCUIThemeScript />
  </head>
  <body>
    <ClickUIProvider theme={theme} persistTheme>
      {children}
    </ClickUIProvider>
  </body>
</html>
```

> [!NOTE]
> On initial load, the component `InitCUIThemeScript` reads localStorage and applies the theme immediately before React hydration. When the theme changes the ClickUIProvider stores the new theme to localStorage (persistTheme must be enabled). Finally, when page loads/refreshes the process reads from the stored theme from localStorage.

The process will check localStorage for a theme, e.g. in the key `cui-theme` and apply it immediately preventing flashing. Otherwise, if nothing's stored it'll fallback to the default value `light`.

> [!IMPORTANT]
> If you'd like to override the theme fallback when localStorage is empty, you can do it by setting a value for property `defaultTheme`, e.g. `dark`.

### Theme Persistence

To enable theme persistence across page reloads, enable `persistTheme` (default: `true`). The provider will automatically save theme changes to localStorage.

Notice that we manage theme state in the consumer side:

```tsx
import { ClickUIProvider } from '@clickhouse/click-ui';
import { useState } from 'react';

export const App = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  return (
    <ClickUIProvider 
      theme={theme}
      persistTheme
    >
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
      </button>
    </ClickUIProvider>
  );
};
```

> [!TIP]
> An example of NextJS with Server Side Rendering (SSR) is available [here](/docs/examples/nextjs-app-router-with-ssr.md), where you can see how the root `data-cui-theme` is handled.

### Custom Styling with CSS

The `InitCUIThemeScript` applies a `data-cui-theme` attribute to the root `<html>` element, allowing you to style custom elements with vanilla CSS.

For example, edit your consumer app `stylesheet` and introduce custom styles as follows:

```css
[data-cui-theme="light"] {
  --my-app-bg: #ffffff;
  --my-app-text: #1a1a1a;
}

[data-cui-theme="dark"] {
  --my-app-bg: #0a0a0a;
  --my-app-text: #f5f5f5;
}

.my-custom-component {
  background: var(--my-app-bg);
  color: var(--my-app-text);
}
```

## Assets management

The Click UI has image asset files, such as Flags, Icons, Logos and Payments.

Files are originally curated in the context of the design system Figma project. Once exported/sourced from the Figma project file these have to be transformed into the Click UI desired format, e.g. an SVG as a React Component.

### Convert SVG to React Component

We provide an automated tool to convert SVG files to React components for Flags, Icons, Logos and Payments.

Let's assume that you want to add a new logo. You are a macOS user and have stored the logo SVG file in your home **Downloads** directory, e.g. **/Users/MyUsername/Downloads**.

In the root of Click UI repository, you'd run:

```sh
yarn convert:logo ~/Downloads/click-ui.svg
```

Or provide explicit component name:

```sh
yarn convert:logo ~/Downloads/click-ui.svg Click_UI
```

Alternatively, you can replace `logo` in the command by the remaining assets types, e.g. `convert:flag` or `convert:icon`.

For more detailed instructions, see [converting SVG to React Components](./docs/converting-svg-to-react-components).

## Release

Releases are automated via GitHub Actions. A workflow creates a PR with version bumps and changelogs for review. Once merged, the package is published to npm and a GitHub release is created.

Use the [Create a new release Pull Request](./docs/package-release.md#create-a-new-release-pull-request) for a quick automated process.

See [Package Release](./docs/package-release.md) for detailed instructions, including use-cases.
