import { ElementType, ReactEventHandler, forwardRef } from "react";
import { Icon, IconName } from "@/components";
import { styled } from "styled-components";
import { linkStyles } from "./common";
import { TextSize, TextWeight } from "../commonTypes";
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicProps,
  PolymorphicRef,
} from "@/utils/polymorphic";

export interface LinkProps<T extends ElementType = "a">
  extends PolymorphicComponentProps<T> {
  /** The font size of the link text */
  size?: TextSize;
  /** The font weight of the link text */
  weight?: TextWeight;
  /** Click event handler */
  onClick?: ReactEventHandler;
  /** The content to display inside the link */
  children?: React.ReactNode;
  /** Optional icon to display after the link text */
  icon?: IconName;
}

const CuiLink = styled.a<{ $size: TextSize; $weight: TextWeight }>`
  ${linkStyles}
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
const _Link = <T extends ElementType = "a">(
  {
    size = "md",
    weight = "normal",
    onClick,
    icon,
    children,
    component,
    ...props
  }: PolymorphicProps<T, LinkProps<T>>,
  ref: PolymorphicRef<T>
) => (
  <CuiLink
    ref={ref}
    $size={size}
    $weight={weight}
    as={component ?? "a"}
    onClick={onClick}
    {...props}
  >
    {children}
    {icon && (
      <IconWrapper $size={size}>
        <Icon
          name={icon}
          className="external-icon"
          data-testid={icon}
        />
      </IconWrapper>
    )}
  </CuiLink>
);
export const Link: PolymorphicComponent<LinkProps, "a"> = forwardRef(_Link);
