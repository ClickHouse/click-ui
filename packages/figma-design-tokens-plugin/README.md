# Figma Design Tokens Plugin

Figma plugin for importing and exporting DTCG (Design Tokens Community Group) format design tokens as Figma Variables.

## Features

- **Import**: Upload DTCG JSON files to create/update Figma Variable collections
- **Export**: Export existing Figma Variables back to DTCG JSON format
- **Scope inference**: Automatically assigns Figma scopes based on token naming patterns
- **Theme support**: Light/Dark modes via Figma Variable modes
- **Cross-collection aliases**: Semantic tokens can reference primitives across collections

## Build

```bash
yarn install          # install dependencies
yarn build            # build to dist/
yarn dev              # build in watch mode
```

The build produces three files in `dist/`:
- `code.js` — Plugin main thread (IIFE)
- `import.html` — Import UI (single-file)
- `export.html` — Export UI (single-file)

## Usage

1. Build the plugin: `yarn build`
2. In Figma, go to **Plugins → Development → Import plugin from manifest...**
3. Select `manifest.json` from this package

## Token Files

The plugin expects DTCG JSON files. Token source files live in the sibling package [`@clickhouse/design-tokens`](../design-tokens/).

## Import Order

1. Import **primitives** first (e.g., `primitives.dtcg.json`)
2. Then import **semantic** tokens (e.g., `semantic.dtcg.json`) — these reference primitives
3. Then import **spacing**, **radius**, **sizing** tokens
