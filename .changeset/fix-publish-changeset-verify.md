---
"@clickhouse/click-ui": patch
---

Fix `Publish to npm with OIDC` failing because the `prepare` lifecycle script ran `yarn changeset:verify`. Removed `yarn changeset:verify` from the `prepare` script so `npm publish` no longer aborts with "Couldn't locate any changeset."
