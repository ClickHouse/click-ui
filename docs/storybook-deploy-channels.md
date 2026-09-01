# Storybook deploy channels

Storybook is deployed by [`.github/workflows/storybook-vercel.yml`](../.github/workflows/storybook-vercel.yml) to three channels.

| Channel     | Vercel project                | URL                                | When                                                    |
| ----------- | ----------------------------- | ---------------------------------- | ------------------------------------------------------- |
| **preview** | release project (preview env) | throwaway per-deployment URL       | every PR from a branch in this repo                     |
| **canary**  | canary project (production)   | canary project's production domain | every merge to `main`                                   |
| **release** | release project (production)  | the stable Storybook domain        | every published GitHub Release that is not a prerelease |

Fork PRs get no preview deploy — they cannot read repo secrets. Fork contributors get a hosted Storybook via Chromatic instead.

## Decision table

The channel decision lives in [`.scripts/bash/storybook-deploy-channels`](../.scripts/bash/storybook-deploy-channels) and is pinned by [`.scripts/bash/storybook-deploy-channels-test`](../.scripts/bash/storybook-deploy-channels-test) (`yarn verify:deploy-channels`, also run in CI).

| Event                                      | preview | canary | release |
| ------------------------------------------ | ------- | ------ | ------- |
| `pull_request`                              | ✅      | –      | –       |
| `push` to `main`, ordinary commit           | –       | ✅     | –       |
| `push` to `main`, changesets release commit | –       | ✅     | ✅      |
| `push` to any other branch                  | –       | –      | –       |
| `release` published, full release           | –       | –      | ✅      |
| `release` published, prerelease (rc)        | –       | –      | –       |
| `workflow_dispatch`, `deploy_production=false` | –    | –      | –       |
| `workflow_dispatch`, `deploy_production=true`  | –    | –      | ✅      |

Every run writes the decision **and the reason for each skip** to the job summary. A skipped deploy must never be silent.

## Why two `release` paths

There are two ways a release happens, and they emit different events:

- **Manual (current)** — a maintainer publishes a GitHub Release tagged `vX.Y.Z`. This fires `release: published`, which is the primary trigger for the release channel.
- **Changesets chain** — `create-release.yml` → `release-publisher.yml` creates the release with a bot token, and GitHub's recursion guard means **no `release:` event is emitted**. For that path the only signal is the squash-merge commit message on `main`, checked by [`.scripts/bash/verify-release-commit`](../.scripts/bash/verify-release-commit).

Both paths are covered. The release channel was previously gated on the commit message alone, so manual releases — the ones actually used — never deployed it, and the skip was silent.

> [!IMPORTANT]
> The changesets path depends on **squash merges**: the PR title becomes the commit message on `main`. Do not change that repo setting.

## Prereleases

Manual `rc` releases are marked as prereleases on GitHub. They **do** publish to npm (under the `beta` npm tag) but they **do not** deploy the release channel — rc content must not overwrite the stable Storybook.

## Setup

Two Vercel projects, same team:

- the release project — already connected, provides `VERCEL_PROJECT_ID`
- the canary project — **no git connection**, CLI deploys only, provides `VERCEL_PROJECT_ID_CANARY`

Both are targeted headlessly with `VERCEL_ORG_ID` + `VERCEL_PROJECT_ID` env vars, which take precedence over anything in `.vercel/`. The workflow hand-builds `.vercel/output` (Build Output API v3, static), so there is no `vercel pull` / `vercel build` step.

Do not deploy the canary channel as a *preview* deployment of the release project: Vercel Deployment Protection is on by default and login-gates non-production URLs. A second project's production domain is public on every plan.

## Dry run

```bash
gh workflow run storybook-vercel.yml -f deploy_production=true
```

Builds Storybook and deploys the release channel without needing a release. Omit the flag for build-only.
