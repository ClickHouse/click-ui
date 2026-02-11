<p align="center">
  <a href="https://clickhouse.com" target="_blank">
    <img
      alt="Clickhouse logo"
      src="./.repo/images/banner.jpg?202601211122"
    />
  </a>
</p>

# Click UI

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-blue.svg)](https://conventionalcommits.org)

Click UI is the ClickHouse design system and component library. Our aim with Click UI is to provide an accessible, theme-able, modern, and attractive interface with which to experience the speed and power of ClickHouse.

You can find the official docs for the Click UI design system and component library at [clickhouse.design/click-ui](https://clickhouse.design/click-ui).

## Overview

* [Requirements](#requirements)
* [Development](#development)
  - [Generating design tokens](#generating-design-tokens)
  - [Local development server](#local-development-server)
* [Tests](#Tests)
* [Storybook](#storybook)
  - [Stories development server](#stories-development-server)
  - [Public static site](#public-static-site)
* [Distribution](#distribution)
  - [Build](#build)
  - [Use Click UI](#use-click-ui)
  - [Deep imports support](#deep-imports-support)
  - [Examples](#examples)
* [Assets Management](#assets-management)
  - [Add a new SVG logo or icon](#add-new-svg-logo-or-icon)
* [Releases and Versions](#releases-and-versions)

## Requirements

- Nodejs (>= 22.12.x) as runtime
- Yarn (>= 4.5.3) for development, any other package manager in a host project

## Development

The project uses yarn package manager for development.

After cloning the repository change to the work directory and install the dependencies:

```sh
yarn
```

### Generating design tokens

Tokens are provided by a style directionary sourced from [tokens-studio](https://tokens.studio/).

It's expected to have theme tokens provided externally, e.g. Figma tokens-studio output is stored in the repository and a PR's opened. The assets are stored in the directory [./tokens/themes].

Once [./tokens/themes] files are updated, we must regenerate the tokens:

```sh
yarn generate:tokens
```

Learn more about tokens-studio [here](https://documentation.tokens.studio/).

### Local development server

To run the Click UI development execute the command:

```sh
yarn dev
```

It'll default to the location [http://localhost:5173](http://localhost:5173), if port available.

## Tests

The package uses [vitest](https://vitest.dev/) and [react testing library](https://testing-library.com) for tests, e.g. functional tests.

```sh
yarn test
```

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

### Public static version

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

### Deep imports support

Deep imports are supported, you can import directly from path.

> [!WARNING]
> At time of writing, there are components that consume from theme provider, which means that these will fail when unwrapped. This will change in future versions.

```ts
import { Button } from '@clickhouse/click-ui/Button';
```

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

## Assets management

The Click UI has image asset files, such as icons or logos.

Files are originally curated in the context of the design system Figma project. Once exported/sourced from the Figma project file these have to be transformed into the Click UI desired format, e.g. an SVG as a React Component.

### Add new SVG logo or icon

Here are some steps, to help you transform the Figma asset into a React Component:

1) In Figma project, select and export the target image/icon, e.g. these are generally contained in a square container (64x64)
2) Store the file in your local file system in a memorable location
3) Use a tool to transform SVG to React JSX, e.g. [react-svgr](https://react-svgr.com/playground/)
4) Create a new file in `src/components/Logos`, e.g. name it by the company name
5) Modify the `<svg>` node, it should set the size to 64x64 as the original Figma container:

> [!NOTE]
> Notice the viewBox values, it should contain the same values from the sourced file 64x64, e.g. "0 0 64 64", if it hasn't make sure you are exporting it correctly, or the original file has the correct container width and height

```tsx
<svg
  width="64"
  height="64"
  viewBox="0 0 64 64"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  {...props}
>
```

6) Declare the new logo/icon in the Logos dark and light exporte files, e.g. `src/components/Logos/LogosDark.ts` and `src/components/Logos/LogosLight.ts`
7) Finally, introduce the new icon/logo name in the types file located at `src/components/Logos/types.ts`

## Releases and Versions

New versions and release notes are available at [GitHub Releases](https://github.com/ClickHouse/click-ui/releases).

To create a new release and publish a new version, follow the instructions in [publish.md](./docs/publish.md).

## Conventional commits

We prefer to commit our work following [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0) conventions. Conventional Commits are a simple way to write commit messages that both people and computers can understand. It help us keep track fo changes in a consistent manner, making it easier to see what was added, changed, or fixed in each commit or update.

The commit messages are formatted as **[type]/[scope]**
The **type** is a short descriptor indicating the nature of the work (e.g., feat, fix, docs, style, refactor, test, chore). This follows the conventional commit types.

The **scope** is a more detailed description of the feature or fix. This could be the component or part of the codebase affected by the change.

Here's an example of different conventional commits messages that you must follow:

```txt
test: 💍 Adding missing tests
feat: 🎸 A new feature
fix: 🐛 A bug fix
chore: 🤖 Build process or auxiliary tool changes
docs: 📝 Documentation only changes
refactor: 💡 A code change that neither fixes a bug or adds a feature
style: 💄 Markup, white-space, formatting, missing semi-colons...
```
