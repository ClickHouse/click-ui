# Playwright

Playwright provides local visual regression testing as an alternative to Chromatic's cloud-based approach. Use Playwright when you need:

- Faster feedback loops during active development
- Full control over test execution and baselines
- OS-specific visual testing

## Running visual tests locally

Execute all visual regression tests by running:

```sh
yarn test:visual
```

## Run specific test files

```sh
yarn test:visual tests/buttons/overview.spec.ts
```
