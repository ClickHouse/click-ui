---
"@clickhouse/click-ui": patch
---

Improved how the `CardHorizontal` component handles external links to keep end-users safe.

### What's changed
- **Link validation**: Only secure web links (starting with `http://` or `https://`) can be opened. This blocks potentially harmful links like `javascript:` or `data:` URIs that could be used in attacks.

- **Safer tab opening**: When a link opens in a new tab, it now uses `noopener,noreferrer` to prevent the new page from accessing information about your application. See [MDN: Window.open() - Security considerations](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#security_considerations) for more details.
