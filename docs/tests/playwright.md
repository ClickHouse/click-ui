# Playwright

Playwright provide us the ability to do end-to-end testing, headless browser testing, amongst others; local visual regression testing as an alternative to Chromatic's cloud-based approach.

Use Playwright when you need to:

- Faster feedback loops during active development
- Full control over test execution and baselines, e.g. snapshots or screenshots
- OS specific visual testing

> [!TIP]
> Use Playwright for rapid local development, (e.g. if you need fast feedback loop) and Chromatic for team reviews and CI/CD.

## Visual regression testing locally

Visual regression tests are operating system dependent.

Screenshots generated on macOS will differ from Linux or Windows due to font rendering, anti-aliasing, and browser engine differences.

For this reason at time of writing, the following snaptshots are ignored:

```sh
# The snapshots which are generally persisted for comparison
**.ts-snapshots

# These are generated during test runner, generally ignored
tests/**/*-actual.png
tests/**/*-diff.png
test-results
```

### Generating snapshots for comparison

You MUST generate the snapshots you want to compare against. At time of writing, the team's using Chromatic for visual regression testing.

> [!WARNING]
> If you are reading this document, you should be aware that this provides you with custom control for advanced needs only! It does not provide you with the setup for cross-operating system, e.g. docker linux.
> This workflow does NOT expect you to store your favourite OS image/snapshots in the repository, it's for your own usage, or fast feedback loop only!

To generate snapshots, you'll have to manually checkout/switch to the target commit in history and run the `test:visual` to generate it and return back to your ongoing feature branch. Alternatively, you can store snapshots separatily and place them at your need.

Hypothetically, you could use the following workflow to facilitate:

```sh
# Switch to a target/stable version of your liking
git checkout <COMMIT-STABLE-VERSION>
# Generate the snapshots against your target version
yarn test:visual
# Check if snapshots generated?
find ./tests -type f -name '**.ts-snapshots*'
# Once happy return to feature branch
git checkout <FEATURE-BRANCH>
# Run the tests
yarn test:visual
```

When intentional visual changes are made, update baselines:

> [!WARNING]
> Only update baselines when visual changes are intentional and reviewed.

```sh
yarn test:visual:update
```

### Running tests locally

Execute all visual regression tests by running:

```sh
yarn test:visual
```

Alternatively, launch UI mode for a browser like experience with timeline, console logs, etc.

```sh
yarn test:visual:ui
```

### Run specific test files

```sh
yarn test:visual tests/buttons/overview.spec.ts
```

### Show report

To review test reports as HTML run:

```sh
yarn test:visual:report
```

### Configuration

The Playwright configuration file contains default configuration values, which you can extend, modify or personalize.

For example, you can modify the default number of workers:

```sh
  ...

  workers: process.env.CI ? 4 : undefined,
```

## Learn more

- [Test snapshots](https://playwright.dev/docs/test-snapshots)
- [Best practices](https://playwright.dev/docs/best-practices)
