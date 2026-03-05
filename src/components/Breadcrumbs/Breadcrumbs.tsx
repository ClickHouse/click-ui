import { styled } from 'styled-components';
import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { Icon } from '@/components/Icon/Icon';
import type { IconName } from '@/components/Icon/types';

export interface BreadcrumbItemProps extends HTMLAttributes<HTMLLIElement> {
  /** The text label of the breadcrumb */
  children: ReactNode;
  /** Optional icon displayed before the label */
  icon?: IconName;
  /** Whether this is the current/active page (last item) */
  active?: boolean;
  /** Optional href — when provided, the item renders as a link */
  href?: string;
}

export interface BreadcrumbsProps extends HTMLAttributes<HTMLElement> {
  /** Breadcrumb items to render */
  children: ReactNode;
}

const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

const List = styled.ol`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Separator = styled.li`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.click.global.color.text.muted};
`;

const ItemWrapper = styled.li<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;

  ${({ $active, theme }) => `
    font: ${
      $active
        ? theme.click.docs.typography.breadcrumbs.active
        : theme.click.docs.typography.breadcrumbs.default
    };
    color: ${
      $active
        ? theme.click.global.color.text.default
        : theme.click.global.color.text.muted
    };
  `}
`;

const StyledLink = styled.a`
  && {
    text-decoration: none;
    color: ${({ theme }) => theme.click.global.color.text.muted};
    cursor: pointer;
  }

  &&:hover {
    text-decoration: underline;
  }
`;

const ItemIcon = styled(Icon)`
  flex-shrink: 0;
`;

const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ children, icon, active = false, href, ...props }, ref) => (
    <ItemWrapper
      ref={ref}
      $active={active}
      aria-current={active ? 'page' : undefined}
      {...props}
    >
      {icon && (
        <ItemIcon
          name={icon}
          size="xs"
          aria-hidden
        />
      )}
      {href && !active ? (
        <StyledLink href={href}>{children}</StyledLink>
      ) : (
        <span>{children}</span>
      )}
    </ItemWrapper>
  )
);

BreadcrumbItem.displayName = 'Breadcrumbs.Item';

const BreadcrumbSeparator = () => (
  <Separator
    role="presentation"
    aria-hidden
  >
    <Icon
      name="chevron-right"
      size="sm"
    />
  </Separator>
);

export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ children, ...props }, ref) => (
    <Nav
      ref={ref}
      aria-label="Breadcrumb"
      {...props}
    >
      <List>{children}</List>
    </Nav>
  )
);

Breadcrumbs.displayName = 'Breadcrumbs';

export { BreadcrumbItem, BreadcrumbSeparator };
