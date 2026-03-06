---
'@clickhouse/click-ui': patch
---

Deprecated StyledLinkProps and linkStyles in the public API. These will be removed in a future release to prevent leaking styled-components implementation details, e.g. $size and $weight transient props in the Public API

## Migration Guide (Recommended)

The Link component already:
- Accepts a component prop to render as any element type
- Accepts size and weight props
- Passes through all other props, e.g. onClick, etc.

We recommend migrating away from the deprecated APIs:
- Replace StyledLinkProps and linkStyles usage
- Remove the CuiStyledLink styled component definition
- Use `<Link component={RouterLink} size="md" weight="normal" ...>` directly

Current common consumer pattern uses the deprecated internal styling APIs:

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

**Note:** These deprecated APIs will be removed in a future major release. Please migrate before then to avoid breaking changes.
