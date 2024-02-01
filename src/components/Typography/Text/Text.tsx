import {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
  forwardRef,
} from "react";
import styled from "styled-components";

export type TextAlignment = "left" | "center" | "right";
export type TextColor = "default" | "muted";
export type TextSize = "xs" | "sm" | "md" | "lg";
export type TextWeight = "normal" | "medium" | "semibold" | "bold" | "mono";

export interface TextProps<T extends ElementType | undefined> {
  align?: TextAlignment;
  color?: TextColor;
  size?: TextSize;
  weight?: TextWeight;
  className?: string;
  component?: T;
}

type TextType = <T extends ElementType = "div">(
  props: Omit<ComponentPropsWithoutRef<T>, keyof TextProps<T>> & TextProps<T>
) => ReactNode;

/** Component for writing blocks of body copy */
const Text: TextType = forwardRef(
  <T extends ElementType = "p">(
    {
      align,
      color,
      size,
      weight,
      className,
      children,
      component,
      ...props
    }: TextProps<T> & ComponentPropsWithoutRef<T>,
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
  )
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

Text.displayName = "Text";

export { Text };
