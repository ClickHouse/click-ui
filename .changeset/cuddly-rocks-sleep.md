---
'@clickhouse/click-ui': minor
---

A version maintenance branch strategy enables the Click UI team to support older versions simultaneously, which is important since consumer applications, e.g. control plane or hyperdx might depend on stable versions and cannot immediately upgrade to the latest release.

The introduction of this branching strategy conceptually and in the release workflow, practically, allows the team to support active development, incentivise experimentation, change, improvements, iteration, etc while shipping critical bug fixes or security patches to older versions (as long as compatible). This ensures that "stable" versions still receive necessary fixes without forcing potential breaking changes or showing new untested features.

In the release workflow, implemented automation for it by handling the tedious parts to help reduce human errors and ensure a consistent release flow; But also for our own sanity, as otherwise it'd cause overwhelming version/release management.
