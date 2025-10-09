/**
 * Link styles for styled-components compatibility
 *
 * This file provides backward compatibility for consumers using styled-components
 * to wrap the Link component.
 *
 * @example Function-based approach (current)
 * ```typescript
 * import styled from 'styled-components';
 * import { Link, linkStyles, StyledLinkProps } from '@clickhouse/click-ui';
 *
 * const CuiStyledLink = styled(Link)<StyledLinkProps>`
 *   ${props => linkStyles(props)}
 * `;
 *
 * <CuiStyledLink $size="md" $weight="semibold">My Link</CuiStyledLink>
 * ```
 *
 * @example CSS classes approach (recommended for new code)
 * ```typescript
 * import { Link, linkClasses } from '@clickhouse/click-ui';
 *
 * <Link className={linkClasses({ size: 'md', weight: 'semibold' })}>My Link</Link>
 * ```
 */

export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';

/**
 * Props for styled-components wrapper
 * @deprecated Use LinkStyleProps with linkClasses instead
 */
export interface StyledLinkProps {
  $size?: TextSize;
  $weight?: TextWeight;
}

/**
 * Props for CSS classes approach
 */
export interface LinkStyleProps {
  size?: TextSize;
  weight?: TextWeight;
  className?: string;
}

/**
 * Function-based link styles for styled-components
 *
 * Returns a CSS string with the appropriate CSS variables based on size and weight.
 *
 * @param props - Style props with $size and $weight
 * @returns CSS string with Click UI link styles
 *
 * @deprecated This function-based approach is maintained for backward compatibility.
 * For new code, use `linkClasses()` instead which doesn't require styled-components.
 *
 * @example
 * ```typescript
 * const StyledLink = styled(Link)<StyledLinkProps>`
 *   ${props => linkStyles(props)}
 * `;
 * ```
 */
export const linkStyles = (props: StyledLinkProps = {}): string => {
  const size = props.$size || 'md';
  const weight = props.$weight || 'normal';
  const isSmall = size === 'xs' || size === 'sm';
  const gapSize = isSmall ? 'sm' : 'md';

  return `
    margin: 0;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    color: var(--click-global-color-text-link-default);
    font: var(--typography-styles-product-text-${weight}-${size});
    gap: var(--click-link-space-${gapSize}-gap);
    margin-right: var(--click-link-space-${gapSize}-gap);

    &:hover,
    &:focus {
      color: var(--click-global-color-text-link-hover);
      transition: var(--transition-default);
      text-decoration: underline;
      cursor: pointer;
    }

    &:visited {
      color: var(--click-global-color-text-link-default);
    }
  `;
};

/**
 * CSS class names helper for Link component styling
 *
 * Use these classes to apply Click UI link styles to custom components without
 * requiring styled-components.
 *
 * @param options - Size, weight, and additional className
 * @returns Combined class name string
 *
 * @example With React Router
 * ```typescript
 * import { Link as RouterLink } from 'react-router-dom';
 * import { linkClasses } from '@clickhouse/click-ui';
 *
 * <RouterLink
 *   to="/dashboard"
 *   className={linkClasses({ size: 'md', weight: 'semibold' })}
 * >
 *   Go to Dashboard
 * </RouterLink>
 * ```
 *
 * @example With Next.js Link
 * ```typescript
 * import Link from 'next/link';
 * import { linkClasses } from '@clickhouse/click-ui';
 *
 * <Link href="/about" className={linkClasses({ size: 'lg', weight: 'bold' })}>
 *   About
 * </Link>
 * ```
 */
export function linkClasses({ size = 'md', weight = 'normal', className }: LinkStyleProps = {}): string {
  const classes = ['cui-link'];

  // Size classes
  classes.push(`cui-link-${size}`);

  // Weight classes (only add if not normal)
  if (weight !== 'normal') {
    classes.push(`cui-link-weight-${weight}`);
  }

  // Additional custom classes
  if (className) {
    classes.push(className);
  }

  return classes.join(' ');
}

/**
 * CSS class name constants for granular control
 *
 * Use these constants when you need more control over which classes to apply.
 *
 * @example
 * ```typescript
 * import { LINK_CLASSES } from '@clickhouse/click-ui';
 * import clsx from 'clsx';
 *
 * <a
 *   href="/home"
 *   className={clsx(
 *     LINK_CLASSES.base,
 *     LINK_CLASSES.size.lg,
 *     LINK_CLASSES.weight.bold,
 *     'my-custom-class'
 *   )}
 * >
 *   Home
 * </a>
 * ```
 */
export const LINK_CLASSES = {
  base: 'cui-link',
  size: {
    xs: 'cui-link-xs',
    sm: 'cui-link-sm',
    md: 'cui-link-md',
    lg: 'cui-link-lg',
    xl: 'cui-link-xl',
  },
  weight: {
    normal: '',
    medium: 'cui-link-weight-medium',
    semibold: 'cui-link-weight-semibold',
    bold: 'cui-link-weight-bold',
  },
} as const;
