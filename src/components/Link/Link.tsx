import {
  ComponentProps,
  ComponentPropsWithRef,
  ElementType,
  ReactEventHandler,
  ReactNode,
  forwardRef,
} from "react";
import { Icon, IconName } from "@/components";
import { styled } from "styled-components";
import { linkStyles } from "./common";
import { TextSize, TextWeight } from "../commonTypes";

export interface LinkProps<T extends ElementType = "a"> {
  size?: TextSize;
  weight?: TextWeight;
  onClick?: ReactEventHandler;
  children?: React.ReactNode;
  icon?: IconName;
  component?: T;
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

type LinkPolymorphicComponent = <T extends ElementType = "a">(
  props: Omit<ComponentProps<T>, keyof T> & LinkProps<T>
) => ReactNode;

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
  }: Omit<ComponentProps<T>, keyof T> & LinkProps<T>,
  ref: ComponentPropsWithRef<T>["ref"]
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
export const Link: LinkPolymorphicComponent = forwardRef(_Link);
