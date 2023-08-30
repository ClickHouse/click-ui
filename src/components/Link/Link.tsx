import { ComponentPropsWithoutRef, ElementType, ReactEventHandler } from "react";
import { Icon } from "@/components";
import styled from "styled-components";

type TextSize = "xs" | "sm" | "md" | "lg";
type TextWeight = "normal" | "medium" | "semibold" | "bold";

export interface LinkProps<T extends ElementType> {
  size?: TextSize;
  weight?: TextWeight;
  className?: string;
  href?: string;
  onClick?: ReactEventHandler;
  target?: string;
  hasIcon?: boolean;
  rel?: string;
  children?: React.ReactNode;
  component?: T;
}

const CuiLink = styled.a<{ $size: TextSize; $weight: TextWeight }>`
  font: ${({ $size, $weight = "normal", theme }) =>
    theme.typography.styles.product.text[$weight][$size]};
  color: ${({ theme }) => theme.click.global.color.text.link.default};
  margin: 0;
  text-decoration: none;
  display: inline-flex;
  gap: ${({ $size, theme }) =>
    $size === "xs" || $size === "sm"
      ? theme.click.link.space.sm.gap
      : theme.click.link.space.md.gap};
  margin-right: ${({ $size, theme }) =>
    $size === "xs" || $size === "sm"
      ? theme.click.link.space.sm.gap
      : theme.click.link.space.md.gap};
  align-items: center;

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.click.global.color.text.link.hover};
    transition: ${({ theme }) => theme.transition.default};
    text-decoration: underline;
    cursor: pointer;
  }
`;

const IconWrapper = styled.span<{ $size: TextSize }>`
  .external-icon {
    height: ${({ $size, theme }) =>
      $size === "xs" || $size === "sm"
        ? theme.click.link.icon.size.sm.height
        : theme.click.link.icon.size.md.height};
    width: ${({ $size, theme }) =>
      $size === "xs" || $size === "sm"
        ? theme.click.link.icon.size.sm.width
        : theme.click.link.icon.size.md.width};
  }
`;

/** Component for linking to other pages or sections from with body text */
export const Link = <T extends React.ElementType = "a">({
  size = "md",
  weight = "normal",
  className,
  href,
  onClick,
  target,
  rel,
  hasIcon = false,
  children,
  component,
  ...props
}: LinkProps<T> & ComponentPropsWithoutRef<T>) => (
  <CuiLink
    $size={size}
    $weight={weight}
    className={className}
    as={component ?? "a"}
    href={href}
    onClick={onClick}
    rel={rel}
    target={target}
    {...props}
  >
    {children}
    {hasIcon && (
      <IconWrapper $size={size}>
        <Icon
          name="popout"
          className="external-icon"
          data-testid="external-icon"
        />
      </IconWrapper>
    )}
  </CuiLink>
);
