import {
  ComponentProps,
  ComponentPropsWithRef,
  ElementType,
  ReactNode,
  forwardRef,
} from "react";
import { styled } from "styled-components";

export type TextAlignment = "left" | "center" | "right";
export type TextColor = "default" | "muted" | "danger";
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
  fillWidth?: boolean;
}

type TextPolymorphicComponent = <T extends ElementType = "p">(
  props: Omit<ComponentProps<T>, keyof T> & TextProps<T>
) => ReactNode;

const _Text = <T extends ElementType = "p">(
  {
    align,
    color,
    size,
    weight,
    className,
    children,
    component,
    fillWidth,
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
    $fillWidth={fillWidth}
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
  $fillWidth?: boolean;
}>`
  font: ${({ $size = "md", $weight = "normal", theme }) =>
    theme.typography.styles.product.text[$weight][$size]};
  color: ${({ $color = "default", theme }) => theme.click.global.color.text[$color]};
  text-align: ${({ $align = "left" }) => $align};
  margin: 0;
  ${({ $fillWidth }) => $fillWidth && "width: 100%"};
`;

_Text.displayName = "Text";

const Text: TextPolymorphicComponent = forwardRef(_Text);
export { Text };
