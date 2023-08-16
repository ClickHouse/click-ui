import { ElementType, ReactEventHandler } from "react";
import { Icon } from "@/components";
import styled from "styled-components";

type TextSize = "xs" | "sm" | "md" | "lg";
type TextWeight = "normal" | "medium" | "semibold" | "bold";

export type LinkProps = {
  size?: TextSize;
  weight?: TextWeight;
  className?: string;
  href?: string;
  onClick?: ReactEventHandler;
  target?: string;
  hasIcon?: boolean;
  rel?: string;
  children?: React.ReactNode;
  component?: "a" | ElementType;
};

const CuiLink = styled.a<{ size: TextSize; weight: TextWeight }>`
  font: ${({ size, weight = "normal", theme }) =>
    theme.typography.styles.product.text[weight][size]};
  color: ${({ theme }) => theme.click.global.color.text.link.default};
  margin: 0;
  text-decoration: none;
  display: inline-flex;
  gap: ${({ size, theme }) =>
    size === "xs" || size === "sm"
      ? theme.click.link.space.sm.gap
      : theme.click.link.space.md.gap};
  margin-right: ${({ size, theme }) =>
    size === "xs" || size === "sm"
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

const IconWrapper = styled.span<{ size: TextSize }>`
  .external-icon {
    height: ${({ size, theme }) =>
      size === "xs" || size === "sm"
        ? theme.click.link.icon.size.sm.height
        : theme.click.link.icon.size.md.height};
    width: ${({ size, theme }) =>
      size === "xs" || size === "sm"
        ? theme.click.link.icon.size.sm.width
        : theme.click.link.icon.size.md.width};
  }
`;

/** Component for linking to other pages or sections from with body text */
export const Link = ({
  size = "md",
  weight = "normal",
  className,
  href,
  onClick,
  target,
  rel,
  hasIcon = false,
  children,
  component = "a",
}: LinkProps) => (
  <CuiLink
    size={size}
    weight={weight}
    className={className}
    as={component}
    href={href}
    onClick={onClick}
    rel={rel}
    target={target}
  >
    {children}
    {hasIcon && (
      <IconWrapper size={size}>
        <Icon
          name="popout"
          className="external-icon"
          data-testid="external-icon"
        />
      </IconWrapper>
    )}
  </CuiLink>
);
