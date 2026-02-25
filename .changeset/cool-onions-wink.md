---
'@clickhouse/click-ui': minor
---

Removed StyledLinkProps and linkStyles from the public API to prevent leaking styled-components implementation details, e.g. $size and $weight transient props in the Public API

## How to migrate?

The Link component already:
- Accepts a component prop to render as any element type
- Accepts size and weight props
- Passes through all other props, e.g. onClick, etc.

The consumer apps can migrate by:
- Removing StyledLinkProps and linkStyles imports
- Removing the CuiStyledLink styled component definition
- Using <Link component={RouterLink} size="md" weight="normal" ...> directly

Current common consumer pattern uses leaked internal styling APIs:

```tsx
import { Link } from 'react-router-dom';
import { linkStyles, StyledLinkProps } from '@clickhouse/click-ui';

const CuiStyledLink = styled(Link)<StyledLinkProps>`
  ${linkStyles}
`;

<CuiStyledLink $size="md" $weight="normal"
  to="/path">text</CuiStyledLink>
```

Recommended Pattern:

```tsx
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@clickhouse/click-ui';

<Link component={RouterLink} size="md" weight="normal"
to="/path">text</Link>
```
