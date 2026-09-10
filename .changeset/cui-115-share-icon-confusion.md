---
"@clickhouse/click-ui": minor
---

**Breaking:** collapse the duplicate share icons down to one (CUI-115).

The old `share` glyph was visually indistinguishable from `popout` — both a
rounded square with an arrow leaving the top-right corner — so it read as
"opens in a new tab" wherever it was used as a share affordance. It has been
removed.

`share` now refers to the forward-arrow glyph that was previously registered as
`share-arrow`. `share-network` is unchanged.

Migration:

- **If you used `share` for a link that opens in a new tab, switch to `popout`.**
  This is the case that will not fail loudly: `Icon`'s `name` prop resolves
  through a `Record<string, string>` alias map, so an existing `name="share"`
  keeps compiling and silently renders the new forward-arrow glyph.
- If you used `share` as a genuine "share with someone" affordance, no change
  is needed — you now get the forward arrow.
- If you used `share-arrow`, rename it to `share`. `share-arrow` is aliased to
  `share` so it still renders at runtime, but it is no longer a member of the
  exported `IconName` union, so strictly-typed props (`Button.iconLeft`,
  `Link.icon`, `Dropdown.Item.icon`, …) will fail typecheck until updated.

Also fixes a latent bug in the asset codegen: `getComponentFiles` matched every
`.tsx` file in the asset directories, so colocated `*.stories.tsx` files were
being registered as assets. Regenerating produced a `loaders.stories` icon and
invalid TypeScript. Storybook and test files are now excluded.
