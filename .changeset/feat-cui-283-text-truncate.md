---
'@clickhouse/click-ui': minor
---

Add `TextTruncate`, which truncates a single line of text with an ellipsis at the end or in the middle (`ellipsisPosition="middle"` keeps file extensions and ID suffixes visible). While the text is cut off, the full text shows in a tooltip on hover, and the text becomes a tab stop that shows it on keyboard focus. Inside a button, link, tab, menu item or option it adds no tab stop, so the tooltip is hover-only there. Supports `maxWidth`, `showTooltip={false}` for large lists, a custom `tooltipContent`, and a polymorphic `component`. It warns in the console when `children` holds a link or button and no `tooltipContent` is given.

Add the `useIsTruncated` hook, which tells whether an element's single line of text is cut off and re-measures on resize and content changes.

`EllipsisContent` and `EllipsisContentProps` are deprecated in favor of `TextTruncate`. They keep working unchanged. The internal `MiddleTruncator` behind `Table`'s `overflowMode="truncate-middle"` and the `FileUpload` file name is deprecated too; both keep their current look and behavior for now.
