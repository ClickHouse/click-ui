# How to create new release and publish a new Click-UI package version to NPM

> [!WARNING]
> The npm dist-tag is derived from the version in the tag (`.scripts/bash/npm-dist-tag-for-version`):
> `vX.Y.Z` publishes to `latest` and must be newer than the current `latest` on npm;
> `vX.Y.Z-rc1` (or `-rc.1`, `-beta1`) publishes to `rc`; `-alpha1` to `alpha`.
> Any other suffix (`-next1`, `-test1`, ...) fails the workflow before anything is built; nothing falls back to `latest`.
> Tick "Set as a pre-release" for rc/alpha versions and leave it unticked for `latest`. The workflow fails when the checkbox and the version disagree.

> [!NOTE]
> The `beta` dist-tag is retired: this workflow never writes it again, and a maintainer removes it from npm (pointing `rc` at the newest release candidate) when this change lands. Consumers on `@beta` should switch to `@rc`.
> `-canary.*` tags are rejected: canaries are published automatically, see [Canary releases](#canary-releases).

1. Navigate to the [Release page](https://github.com/ClickHouse/click-ui/releases) and check the latest release. It might already contain the changes you need, making a new version unnecessary.
2. Draft a [new release](https://github.com/ClickHouse/click-ui/releases/new).
3. Create a tag for the release. The new version should be an increment from the latest released version. Use `vX.Y.Z` for a release or `vX.Y.Z-rc1` for a release candidate. ![Create tag instruction](./images/publish1.png)
4. Generate release notes. ![Release notes instruction](./images/publish2.png)
5. Publish the release. ![Release](./images/publish3.png)
6. Wait until the [GitHub Actions](https://github.com/ClickHouse/click-ui/actions) complete. A rejected release shows the reason in the run summary.
7. Verify that the new version is published on [npm](https://www.npmjs.com/package/@clickhouse/click-ui).

## Canary releases

Every push to `main` publishes a canary to the npm dist-tag `canary`:

```sh
npm i @clickhouse/click-ui@canary
```

- The version is `<next>-canary.g<sha>.0`, for example `0.14.0-canary.g1979c25d.0`. `<next>` is the version the pending changesets would release: below 1.0.0 a major bump counts as minor, and no changesets means the next patch. `<sha>` is the first 8 characters of the commit.
- The version is set inside the workflow only. `package.json` in the repository does not change, and no git tag is created. The canary Storybook shows the same version.
- Only the tip of `main` gets a canary. A run for an older commit, or for a version already on npm (a re-run), is skipped.
- A release's version bump commit carries `[skip ci]`, so it publishes no canary.

## Known limitations

- `latest` only moves forward. A patch for an older release line (for example `v0.10.1` after `v0.11.0`) is refused. There is no override yet; add one to the workflow when it is first needed.
- Releases run one at a time. If a third release is published while another is still waiting, GitHub cancels the waiting one; re-run it from the Actions tab. Canaries queue separately and never cancel a release.
- A release fails before anything is published if its branch moves while it runs. A release that failed before **Publish to npm with OIDC** is retried with **Re-run all jobs**: re-running only the failed job reuses the old build, which fails again if the branch moved and is gone after a day. A release that failed after it is already on npm: push the version bump commit (and, for a manual dispatch, the tag) by hand.
- A release with the wrong "pre-release" checkbox cannot be re-run with the fix: delete the release and re-create it for the same tag.
