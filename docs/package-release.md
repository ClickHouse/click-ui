# Package Release

## Overview

* [Overview](#package-release)
* [Required Admin Permissions](#required-admin-permissions)
  - [GitHub Workflow Permissions](#github-workflow-permissions)
  - [NPM Trusted Publisher](#npm-trusted-publisher)
* [Create a New Release Pull Request](#create-a-new-release-pull-request)
* [Publish](#publish)
* [Maintaining Multiple Versions](#maintaining-multiple-versions)
  - [Release Cycle](#release-cycle)
  - [Applying Fixes to Stable Versions](#applying-fixes-to-stable-versions)
  - [Switching Release Modes](#switching-release-modes)
* [Use-Cases](#use-cases)
  - [Create a new release](#create-a-new-release)
  - [Updating a pending release version](#updating-a-pending-release-version)
  - [Promoting to stable release](#promoting-to-stable-release)

**TLDR;** Use the [Create a new release Pull Request](#create-a-new-release-pull-request) for automated process.

You're expected to [create a new version](#create-a-new-version-and-changelogs), which will consume all changesets, and update to the most appropriate semantic version (semver) based on those changesets; which also writes changelog entries for each consumed changeset file content.

Once the artifacts and version bump is completed, the package can be published to npm. Doing all of this manually can be tedious and prone to mistakes, as such, we have a GitHub action that creates a Pull request containing all of this for team review; And once approved, another GitHub action that publishes the package to npm and creates a GitHub release.

> [!NOTE]
> **Version Format Handling:** The `v` prefix is cosmetic only and appears only in display contexts.
> - Commit messages include it for readability (e.g., `chore: 🤖 release v1.2.3 (latest)`)
> - Version extraction removes it (output is `1.2.3` or `1.2.3-rc.1`)
> - CHANGELOG.md headers never include it (e.g., `## 1.2.3`)
> - The prefix is used cosmetically in git tags (`v1.2.3`), branch names (`chore/v1.2.0`), and GitHub releases

### Required admin permissions

The repository administrator has to set correct permissions for changeset workflow to work, namely: GitHub repository workflow permissons and add GitHub actions as a trusted publisher in NPM package settings.

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

## Use-Cases

### Create a new release

Follow these steps to create a new release:

1. Go to [Actions > Create Release](https://github.com/ClickHouse/click-ui/actions/workflows/create-release.yml)
2. Click **Run workflow**
3. Select the target branch (usually `main`)
4. Choose the release type (`test`, `rc`, `stable`, or `latest`)
5. Type the release type to confirm (e.g., `test`)
6. For `stable` or `latest`, also type the branch name to confirm
7. Click **Run workflow**
8. Wait for the workflow to create a Pull Request
9. Review the PR (version bump, changelog entries)
10. Address any feedback or make necessary tweaks
11. **Squash and merge** when ready
12. The [release publisher](https://github.com/ClickHouse/click-ui/actions/workflows/release-publisher.yml) will automatically publish to [npm](https://www.npmjs.com/package/@clickhouse/click-ui?activeTab=versions)

### Updating a pending release version

When a maintenance branch already exists for a version, the workflow will fail with:

```
⚠️ WARNING: Maintenance branch 'chore/vX.X.X' already exists for version X.X.X.
💡 Please checkout the branch chore/vX.X.X and create the release from there to ensure proper version line maintenance.
```

Or, some cases like:

```
🔍 Checking if @clickhouse/click-ui@0.1.0-rc.70 already exists on NPM...
0.1.0-rc.70
👹 Oops! Version 0.1.0-rc.70 of @clickhouse/click-ui is already published on NPM!
💡 This typically means the release was already published, or a previous workflow run completed it. It may also occur if you're trying to promote a pre-release without any actual changes, e.g., promoting 2.0.1-test.0 (test) → 2.0.1-test.0 (rc) without a version bump which would make 2.0.1-rc.1 (rc). If that's the case, make sure to include a new changeset before retrying.
Error: Process completed with exit code 1.
```

This happens when a pre-release (e.g., `v1.0.0-test.1`) was created but not yet promoted to `stable` or `latest`, and you need to include additional changes.

Follow these steps:

1. Checkout the corresponding maintenance branch:

```sh
git checkout chore/v1.0.0
git pull origin chore/v1.0.0
```

2. Cherry-pick or merge the desired changes from `main`:

```sh
# Cherry-pick specific commits
git cherry-pick <commit-sha>

# Or merge a branch, e.g. main
git merge origin/main --no-commit
```

3. Resolve any conflicts and commit

4. Push the updated branch:

```sh
git push origin chore/v1.0.0
```

5. Create a Pull Request with **base branch set to `chore/v1.0.0`** (not `main`)

6. Once reviewed and merged, run the [Create Release](https://github.com/ClickHouse/click-ui/actions/workflows/create-release.yml) workflow from the `chore/v1.0.0` branch

> [!NOTE]
> This workflow ensures version consistency. Changes to a pending release go through the maintenance branch, keeping `main` free for new development.

### Promoting to stable release

Stable releases are created from `chore/v*` branches. Once a stable release is published, the pre-release mode is switched off and `main` must be updated to reflect the version bump and exit from pre-release mode.

Follow these steps:

1. Ensure your pre-release has been tested and is ready for production

2. Run the [Create Release](https://github.com/ClickHouse/click-ui/actions/workflows/create-release.yml) workflow from the `chore/v*` branch:
   - Select the maintenance branch (e.g., `chore/v1.0.0`)
   - Choose `stable` as the release type
   - Confirm the release type and branch name

3. Review and merge the release PR into the maintenance branch

4. After the stable version is published, sync the changes back to `main`:

```sh
git checkout main
git pull origin main
git checkout -b chore/sync-v1.0.0-changes-back-to-main
git merge origin/chore/v1.0.0
```

> [!IMPORTANT]
> You'll have to create a pull request, get it approved to merge these to the main branch.

5. Resolve any conflicts, paying attention to:
   - `package.json` version bump
   - `.changeset/pre.json` removal (pre-release mode off)
   - `CHANGELOG.md` entries

6. Commit and push:

```sh
git add .
git commit -m "chore: 🤖 sync stable release v1.0.0 to main"
git push origin chore/sync-v1.0.0-changes-back-to-main
```

> [!IMPORTANT]
> This step is critical. The `main` branch must reflect the stable release state to ensure future pre-releases start from the correct version baseline.
