---
'@clickhouse/click-ui': minor
---

Resolve component path redundancy and allow public API encapsulation.

As work progressed on reducing import path verbosity, several deeper issues surfaced that were addressed as part of this PR. Component import statements previously required the component name twice, e.g. clickhouse/click-ui/components/EllipsisContent/EllipsisContent, which was unnecessary. Beyond that, the original version inadvertently exposed internal implementation details, allowing consumers to directly access and depend on third-party APIs such as Radix UI components and types. This has led to applications incorrectly coupling themselves to these internals rather than the library's intended public API, a problem that now requires careful, incremental cleanup using @deprecated warnings.

While addressing the above, circular dependencies were discovered throughout the source code. These were not anticipated but were resolved as part of this PR, and new ESLint rules have been introduced to prevent them from reappearing as the library grows.

Finally, after #773 (distribute unbundled) was merged, which solved critical distribution size issues, could now confirm that tree-shaking works correctly under the revised conditions and both import strategies, e.g. top-package level and component-level.

### API improvements

1. Elegant import statements with zero performance cost, e.g. gets rid of redundant component name on import, such as `@clickhouse/click-ui/components/EllipsisContent/EllipsisContent`

```tsx
import { EllipsisContent } from '@clickhouse/click-ui/EllipsisContent';
```

2. Decoupling consumers from the underlying implementation and improving the long-term maintainability of the library, e.g. The original version exposes internal implementation details, allowing consumers to directly access and depend on third-party APIs such as Radix UI elements/types. This has led to applications incorrectly coupling themselves to these internals rather than the library's intended public API, which now requires a lot of unwanted work as we have to rely on `@deprecated` warnings to remove them gradually! The PR addresses this by encapsulating these details, ensuring only the deliberate public API surface is accessible.

### Build output size improvements

The [original production version](https://www.npmjs.com/package/@clickhouse/click-ui/v/0.0.250) of the Click UI library had a critical bundling issue, producing a build output of 1,216.21 kB with chunks exceeding the 500 kB threshold after minification.
To benchmark the improvements, a baseline Vite app without Click UI was measured at 193.30 kB. After integrating the updated PR version of Click UI, the results were as follows:

Importing a component via the main barrel file / public API produced a build output of 223.70 kB, an overhead of just ~30 kB over the baseline. Importing directly from the component-specific export path (e.g. @clickhouse/click-ui/Button) brought this down marginally further to 223.09 kB.

Both approaches represent a dramatic reduction from the original, with the PR version adding less than 30 kB over a bare Vite app regardless of import strategy.

This is made possible by several changes to resolve component paths and, of course, by the introduction of #773, which makes the package distribution unbundled and moves optimisation responsibility to the consumer side. Before, the consumer always had an unscalable bundled/unoptimizable package of 1,216.21 kB.
