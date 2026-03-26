## Changeset

We use [Changesets](https://github.com/changesets/changesets) to manage versioning and changelogs.

### Add a new changeset

When contributing, declare an intent or describe the changes you're making by executing the `changeset:add` command.

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

To consume all changesets, and update to the most appropriate semver version and write a friendly changelog based on those changes:

> [!IMPORTANT]
> Consuming changesets is done automatically in the CI/CD environment. For this reason, you don't have to execute the command, as a contributor your single concern should be adding changesets to any relevant changes.

```sh
yarn changeset:version
```

## Release

See [Package Release](./packages/click-ui/docs/package-release.md) for detailed release instructions for Click UI.

For releasing supporting monorepo packages (e.g. `design-tokens`), see the [Monorepo Package Release](./packages/click-ui/docs/package-release.md#monorepo-package-release) section.
