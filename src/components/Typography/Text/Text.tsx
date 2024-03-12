import {
  ComponentProps,
  ComponentPropsWithRef,
  ElementType,
  ReactNode,
  forwardRef,
} from "react";
import styled from "styled-components";

export type TextAlignment = "left" | "center" | "right";
export type TextColor = "default" | "muted" | "danger";
export type TextSize = "xs" | "sm" | "md" | "lg";
export type TextWeight = "normal" | "medium" | "semibold" | "bold" | "mono";
export type TextType = "regular" | "mono";

export interface TextProps<T extends ElementType = "p"> {
  children: ReactNode;
  align?: TextAlignment;
  color?: TextColor;
  size?: TextSize;
  type?: TextType;
  weight?: TextWeight;
  className?: string;
  component?: T;
}

type TextPolymorphicComponent = <T extends ElementType = "p">(
  props: Omit<ComponentProps<T>, keyof T> & TextProps<T>
) => ReactNode;

const _Text = <T extends ElementType = "p">(
  {
    align,
    color,
    size,
    type,
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
    $type={type}
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
  $type?: TextType;
  $weight?: TextWeight;
}>`
  font: ${({ $size = "md", $weight = "normal", theme }) =>
    theme.typography.styles.product.text[$weight][$size]} !important;
  color: ${({ $color = "default", theme }) => theme.click.global.color.text[$color]};
  text-align: ${({ $align = "left" }) => $align};
  margin: 0;
`;

_Text.displayName = "Text";

const Text: TextPolymorphicComponent = forwardRef(_Text);
export { Text };
