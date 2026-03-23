---
'@clickhouse/click-ui': minor
---

A version maintenance branch strategy enables the Click UI team to support older versions simultaneously, which is important since consumer applications, e.g. control plane or hyperdx might depend on stable versions and cannot immediately upgrade to the latest release.

The introduction of this branching strategy conceptually and in the release workflow, practically, allows the team to support active development, incentivise experimentation, change, improvements, iteration, etc while shipping critical bug fixes or security patches to older versions (as long as compatible). This ensures that "stable" versions still receive necessary fixes without forcing potential breaking changes or showing new untested features.

In the release workflow, implemented automation for it by handling the tedious parts to help reduce human errors and ensure a consistent release flow; But also for our own sanity, as otherwise it'd cause overwhelming version/release management.

## How to use?

To create a new release, locate the [create release](https://github.com/ClickHouse/click-ui/actions/workflows/create-release.yml) and use the interface to select the release type, e.g. release candidate (rc), testing, stable or latest.

It'll create a new Pull request for review, e.g. changelog, version bump, etc. There, you have the opportunity to make any further tweaks, refinements and check if everything's correct.

You can find the pull requests in the GitHub tab [Pull Request](https://github.com/ClickHouse/click-ui/pulls). E.g. let's say you're about to release v0.1.0-rc.1, you'd find `chore: 🤖 release v0.1.0-rc.1 (rc)`.

To learn more read the [release](https://github.com/ClickHouse/click-ui/tree/chore/init-version-maintenance-branch-strategy?tab=readme-ov-file#release) worfklow documentation.
