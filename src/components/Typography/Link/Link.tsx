import { ReactEventHandler } from "react";
import { Icon } from "@/components/Icon/Icon";
import styled from "styled-components";

export type TextColor = "default" | "muted";
export type TextSize = "xs" | "sm" | "md" | "lg";
export type TextWeight = "normal" | "medium" | "semibold" | "bold";

export interface LinkProps {
  color?: TextColor;
  size?: TextSize;
  weight?: TextWeight;
  href?: string;
  onClick?: ReactEventHandler;
  className?: string;
  children?: React.ReactNode;
  isExternal?: boolean;
}

/** Component for linking to other pages or sections from with body text */
export const Link = ({
  size,
  weight,
  className,
  href,
  onClick,
  isExternal,
  children,
}: LinkProps) => (
  <CuiLink
    weight={weight}
    className={className}
    onClick={onClick}
    size={size}
    href={href}
    target={isExternal ? "_blank" : undefined}
  >
    {children}
    {isExternal && (
      <StyledIcon
        name="popout"
        size={size}
      />
    )}
  </CuiLink>
);

const CuiLink = styled.a<Pick<LinkProps, "size" | "weight">>`
  font: ${({ size = "md", weight = "normal", theme }) =>
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
    text-decoration: underline;
    cursor: pointer;
  }
`;

const StyledIcon = styled(Icon)<Pick<LinkProps, "size">>`
  height: ${({ size, theme }) =>
    size === "xs" || size === "sm"
      ? theme.click.link.icon.size.sm.height
      : theme.click.link.icon.size.md.height};
  width: ${({ size, theme }) =>
    size === "xs" || size === "sm"
      ? theme.click.link.icon.size.sm.width
      : theme.click.link.icon.size.md.width};
`;
