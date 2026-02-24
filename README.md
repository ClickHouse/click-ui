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
  - [Publish](#publish)
  - [Maintaining Multiple Versions](#maintaining-multiple-versions)
  - [Release Cycle](#release-cycle)
  - [Applying Fixes to Stable Versions](#applying-fixes-to-stable-versions)
  - [Switching Release Modes](#switching-release-modes)
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

#### GitHub Workflow Permissions

This workflow requires permissions to "Create pull requests", which can be configured in [workflow permissions](https://github.com/Clickhouse/click-ui/settings/actions).

If you don't have permission to change these settings, you can use workflow authentication to generate a GitHub token as described [here](https://github.com/apps/workflow-authentication-public). This will generate a short-lived access token that grants the workflow "create pull requests" permission.

For more detailed information about `actions/create-github-app-token`, see the documentation [here](https://github.com/actions/create-github-app-token).

#### NPM Trusted publisher

Add GitHub actions as a trusted publisher on [NPM package settings](https://www.npmjs.com/package/@clickhouse/click-ui). Make sure you select the provider "GitHub Actions", enter the repository "Clickhouse/click-ui" and finally the workflow name as "release-publisher.yml".

### Create a new release Pull Request

Consuming changesets is done automatically in the CI/CD environmment.

To create a new release, locate the [create release](https://github.com/ClickHouse/click-ui/actions/workflows/create-release.yml) and use the interface to select the release type, e.g. release candidate (rc), testing, stable or latest.

It'll create a new Pull request for review, e.g. changelog, version bump, etc. There, you have the opportunity to make any further tweaks, refinements and check if everything's correct.

You can find the pull requests in the GitHub tab [Pull Request](https://github.com/ClickHouse/click-ui/pulls). E.g. let's say you're about to release v0.1.0-rc.1, you'd find `chore: 🤖 release v0.1.0-rc.1 (rc)`.

> [!WARNING]
> Releasing a "stable" or "latest" version requires that you have previously published a pre-release version (e.g. test or rc / release candidate). This process exists to help us maintain quality standards.
> Only promote a release to "stable" or "latest" when you are confident it is production-ready, e.g., after thorough testing and gathering feedback from users or consumers. Take extra caution with "latest" in particular, as it becomes the default version installed by users.

Once the pull request is approved and merged, it'll trigger the release of a new version to [npm registry](https://www.npmjs.com/package/@clickhouse/click-ui?activeTab=versions).

The process will also create a branch for long lived version maintenance support, e.g. `chore/v0.5.0-rc.1`.

### Publish

Once you've reviewed the changelog entries and version changes, addressed all [Pull Request](#create-a-new-release-pull-request) comments and suggestions, and are confident everything looks correct, go ahead and **squash and merge** the pull request.

Merging to `main` will automatically trigger the [release publisher](https://github.com/ClickHouse/click-ui/actions/workflows/release-publisher.yml), which will publish the package to npm. If successful, the new version will appear under the [@clickhouse/click-ui](https://www.npmjs.com/package/@clickhouse/click-ui?activeTab=versions) versions tab on npm, and a new [GitHub release](https://github.com/ClickHouse/click-ui/releases) will be created containing all generated release assets.

### Maintaining Multiple Versions

We maintain long-lived branches for each version, so you can get fixes without upgrading:

```sh
main → active development (latest features)
├── chore/v2.2.x → maintenance for v2.2.x releases
├── chore/v1.x.x → maintenance for v1.x.x releases
└── chore/v0.5.x → maintenance for v0.5.x releases
```

Here's how it works:

New features and improvements land in main, while critical bugs and security fixes are backported to the relevant maintenance branch. We recommend tracking changes against a base minor branch (e.g. chore/v1.1.x rather than chore/v1.1.1) so that all patches within a minor version are consolidated in one place. Note that the branch naming convention may change in the future (e.g. to v1 or v1.x), but this is the current approach at the time of writing.

> [!NOTE]
> While some changes might only make sense for a specific version, it's best practice to source fixes from `main` whenever possible. This keeps versions aligned and reduces diversion over time. Otherwise, you must make sure that your changes are put in the main development branch.

Let's say that you need something specific for an older version, you can work in version isolation without pulling in changes from active development.

Each release gets tagged and lives on its own version branch, e.g. `v1.5.0` making it easy to apply patches without forcing you to upgrade to the latest version.

#### Release Cycle

Our releases start from the `main` branch and go through a simple two-step process to help ensure quality:

**Pre-release (test/rc)**

1. Create a pre-release pull request, e.g. a test or release candidate (rc)
2. The team reviews and provides feedback
3. Once approved and merged, our release publisher pushes it to npm, e.g. `1.2.5-test.1`
4. You can find all pre-release versions in the [npm package versions tab](https://www.npmjs.com/package/@clickhouse/click-ui?activeTab=versions)

**Production release (latest)**

1. Once a pre-release has been tested and available on stage, you can promote it to production
2. Create a "latest" release PR for team review
3. After approval and merge, the publisher strips the pre-release suffix and publishes the final version, e.g. `1.2.5-test.1` becomes `1.2.5`

This workflow lets us test changes at any time before they reach production while keeping the process simple, inclusive and collaborative!

#### Applying Fixes to Stable Versions

To keep active development moving while ensuring you can apply critical fixes when needed, the Click UI team recommends the following approach:

1. Choose the version needing a fix (e.g. `chore/v0.5.0`)
2. Apply your changes, like backporting a security fix or updating a design token
3. Create a new release from that branch

This lets us experiment and iterate freely on Click UI while giving you or your team a quick path to deploy urgent fixes without waiting for the next major release cycle.

> [!WARNING]
> Always use `chore/vX.X.X` branches for maintenance work, not `changeset-release/v*` branches. The `changeset-release` branches are auto-generated during publishing, e.g. `changeset-release/v0.2.0-test.0`) and not meant for direct updates. All version-specific changes should go through `chore/vX.X.X` branches where the full commit history is tracked.

#### Switching Release Modes

A new changeset is required before switching between release modes.

Changesets are how the release pipeline determines whether anything has actually changed between versions. Without one, promoting a release from one mode to another (for example, from `test` to `rc`) would produce a package that is identical in content but with a different version label, which is meaningless and potentially confusing.

Here's what changes in package.json:

```sh
{
  "name": "@clickhouse/click-ui",
-  "version": "1.1.0-test.1",
+  "version": "1.1.0-rc.1",
  ...
}
```
Always include a changeset to ensure each promotion reflects real, trackable changes.

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
