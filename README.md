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
* [Quick Start](#quick-start)
* [Development](#development)
  - [Generating design tokens](#generating-design-tokens)
  - [Local development](#local-development)
* [Tests](#Tests)
  - [Functional tests](#functional-tests)
  - [Visual regression tests](#visual-regression-tests)
* [Storybook](#storybook)
  - [Stories development server](#stories-development-server)
  - [Public static site](#public-static-site)
* [Distribution](#distribution)
  - [Build](#build)
  - [Use Click UI](#use-click-ui)
  - [Deep imports support](#deep-imports-support)
  - [Examples](#examples)
* [Assets Management](#assets-management)
  - [Convert SVG to React Component](#convert-svg-to-react-component)
* [Changesets](#changesets)
  - [Add a new changeset](#add-a-new-changeset)
  - [Checking the changeset status](#checking-the-changeset-status)
  - [Create a new version and changelogs](#create-a-new-version-and-changelogs)
* [Release](#release)
  - [Required admin permissions](#required-admin-permissions)
  - [Create a new release pull request](#create-a-new-release-pull-request)
* [Contributing](#contributing)
  - [Conventional commits](#conventional-commits)

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

### Generating design tokens

Tokens are provided by a style directionary sourced from [tokens-studio](https://tokens.studio/).

It's expected to have theme tokens provided externally, e.g. Figma tokens-studio output is stored in the repository and a PR's opened. The assets are stored in the directory [./tokens/themes].

Once [./tokens/themes] files are updated, we must regenerate the tokens:

```sh
yarn generate:tokens
```

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

**TLDR;** Use the [Create a new release Pull Request](#create-a-new-release-pull-request) for automated process.

You're expected to [create a new version](#create-a-new-version-and-changelogs), which will consume all changesets, and update to the most appropriate semantic version (semver) based on those changesets; which also writes changelog entries for each consumed changeset file content.

Once the artifacts and version bump is completed, the package can be published to npm. Doing all of this manually can be tedious and prone to mistakes, as such, we have a GitHub action that creates a Pull request containing all of this for team review; And once approved, another GitHub action that publishes the package to npm and creates a GitHub release.

### Required admin permissions

The repository administrator has to set correct permissions for changeset workflow to work, namely: GitHub repository workflow permissons and add GitHub ascitons as a trusted publisher in NPM package settings.

#### GitHub Workflow permissons

Set the [workflow permissions](https://github.com/Clickhouse/click-ui/settings/actions) as:
- Select "Read and write" and "Read repository contents"
- Check the box "Allow GitHub actions to create and approve pull requests"

#### NPM Trusted publisher

Add GitHub actions as a trusted publisher on [NPM package settings](https://www.npmjs.com/package/@clickhouse/click-ui). Make sure you select the provider "GitHub Actions", enter the repository "Clickhouse/click-ui" and finally the workflow name as "release-publisher.yml".

### Create a new release Pull Request

Consuming changesets is done automatically in the CI/CD environmment.

To create a new release, locate the [create release](https://github.com/ClickHouse/click-ui/actions/workflows/create-release.yml) and use the interface to select the release type, e.g. release candidate (rc), testing, or latest.

It'll create a new Pull request for review, e.g. changelog, version bump, etc. There, you have the opportunity to make any further tweaks, refinements and check if everything's correct.

You can find the pull requests in the GitHub tab [Pull Request](https://github.com/ClickHouse/click-ui/pulls). E.g. let's say you're about to release v0.1.0-rc.1, you'd find `chore: 🤖 release v0.1.0-rc.1 (rc)`.

> [!WARNING]
> Only choose "latest" if you're certain that your package release is stable, e.g. you've tested and gathered feedback from other user or consumers.

### Publish

Assuming that you have reviewed both the changelog entries, the version changes, adddressed any [Pull Request](#create-a-new-release-pull-request) comments and suggestions; and you're confident that all these are correct, and have made any necessary tweaks to changelogs, you can go ahead and squash and merge the pull request.

After the pull request is merged to main, the [release publisher](https://github.com/ClickHouse/click-ui/actions/workflows/release-publisher.yml) should be triggered automatically and publish the package to npm.

If successful, you should see the new package version listed in npm [@clickhouse/click-ui](https://www.npmjs.com/package/@clickhouse/click-ui?activeTab=versions) versions tab.

Consequently, a new [GitHub release](https://github.com/ClickHouse/click-ui/releases) should exist containing all the generated release assets.

## Contributing

### Conventional commits

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
