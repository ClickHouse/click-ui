<p align="center">
  <a href="https://clickhouse.com" target="_blank">
    <img
      alt="Clickhouse logo"
      src="./.repo/images/banner.jpg"
    />
  </a>
</p>

# Click UI (Monorepo)

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-blue.svg)](https://conventionalcommits.org)

This is the official monorepo for Click UI, the ClickHouse Design System's Component Library.

You can find the official docs for the Click UI design system and component library at [clickhouse.design/click-ui](https://clickhouse.design/click-ui).

## Overview

* [Requirements](#requirements)
* [Project Structure](#project-structure)
* [Packages](#packages)
* [Quick Start](#quick-start)
  - [Development](#development)
  - [Consumer apps](#consumer-apps)
* [Monorepo Architecture](#monorepo-architecture)
* [Contributing](#contributing)
  - [Component RFC](#component-rfc)
  - [Conventional Commits](#conventional-commits)

## Requirements

- Nodejs (>= 22.12.x) as runtime
- Yarn (>= 4.5.3) for development, any other package manager in a consumer app project

## Project Structure

```
click-ui/
├── libs/
│   └── click-ui/   # Main component library
└── packages/
   └── icons/
```

## Packages

| Package | Description | Path |
|---------|-------------|------|
| `@clickhouse/click-ui` | Component library | [libs/click-ui](./libs/click-ui) |
| `icons` | Internal icon generation tooling | [packages/icons](./packages/icons) |

## Quick Start

### Development

The project uses yarn package manager for development.

After cloning the repository change to the work directory and install the dependencies:

```sh
yarn
```

For detailed development instructions, see [libs/click-ui/README.md](./libs/click-ui/README.md#development).

### Consumer Apps

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

For more examples, including theme switching and configuration, see [libs/click-ui/README.md](./libs/click-ui/README.md#quick-start).

## Monorepo Architecture

This monorepo uses a two-directory structure to semantically distinguish between the core component library and supporting packages, or tooling:

| Directory | Purpose | Published |
|-----------|---------|-----------|
| `libs/` | Core libraries for external consumption | Yes |
| `packages/` | tools and utilities | Yes |

### Creating a New Internal Package

1. Create the package directory under `packages/`
2. Initialize with a `package.json` (no npm scope needed)
3. Add internal documentation as needed
4. Reference from the consuming library's build scripts

## Contributing

### Component RFC

To propose a new component, open an RFC using the [Component RFC template](https://github.com/ClickHouse/click-ui/compare/main...branchName?template=component_rfc.md).

> [!NOTE]
> Replace the <branchName> in the Component RFC template URL by your branch name.

For example, to open a Component RFC for branch name `feat/slider`, you'd open the URL:

```sh
https://github.com/ClickHouse/click-ui/compare/main...feat/slider?template=component_rfc.md
```

For GitHub CLI users:

```sh
gh pr create --template component_rfc.md
```

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
