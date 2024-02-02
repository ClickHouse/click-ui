import {
  ComponentProps,
  ComponentPropsWithRef,
  ElementType,
  ReactNode,
  forwardRef,
} from "react";
import styled from "styled-components";

export type TextAlignment = "left" | "center" | "right";
export type TextColor = "default" | "muted";
export type TextSize = "xs" | "sm" | "md" | "lg";
export type TextWeight = "normal" | "medium" | "semibold" | "bold" | "mono";

export interface TextProps<T extends ElementType = "p"> {
  children: ReactNode;
  align?: TextAlignment;
  color?: TextColor;
  size?: TextSize;
  weight?: TextWeight;
  className?: string;
  component?: T;
}

/** Component for writing blocks of body copy */
const _Text = <T extends ElementType = "p">(
  {
    align,
    color,
    size,
    weight,
    className,
    children,
    component,
    ...props
  }: Omit<ComponentProps<T>, keyof T> & TextProps<T>,
  ref: ComponentPropsWithRef<T>["ref"]
) => (
  <CuiText
    as={component ?? "p"}
    ref={ref}
    $align={align}
    $color={color}
    $size={size}
    $weight={weight}
    className={className}
    {...props}
  >
    {children}
  </CuiText>
);

const CuiText = styled.p<{
  $align?: TextAlignment;
  $color?: TextColor;
  $size?: TextSize;
  $weight?: TextWeight;
}>`
  font: ${({ $size = "md", $weight = "normal", theme }) =>
    theme.typography.styles.product.text[$weight][$size]};
  color: ${({ $color = "default", theme }) => theme.click.global.color.text[$color]};
  text-align: ${({ $align = "left" }) => $align};
  margin: 0;
`;

_Text.displayName = "Text";

const Text = forwardRef(_Text) as typeof _Text;
export { Text };
