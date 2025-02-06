import { HTMLAttributes, forwardRef } from "react";
import { styled } from "styled-components";

export type TitleAlignment = "left" | "center" | "right";
export type TitleColor = "default" | "muted";
export type TitleSize = "xs" | "sm" | "md" | "lg" | "xl";
export type TitleFamily = "product" | "brand";
export type TitleType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type TitleWeight = "1" | "2" | "3" | "4";

export interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  align?: TitleAlignment;
  color?: TitleColor;
  size?: TitleSize;
  family?: TitleFamily;
  type: TitleType;
  weight?: TitleWeight;
}

/** The `title` component allows you to easily add headings to your pages. They do not include built in margins. */
export const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  ({ align, size, family, type, color, weight, children, ...props }, ref) => (
    <CuiTitle
      ref={ref}
      $align={align}
      $color={color}
      $size={size}
      $family={family}
      $weight={weight}
      as={type}
      {...props}
    >
      {children}
    </CuiTitle>
  )
);

const CuiTitle = styled.div<{
  $align?: TitleAlignment;
  $color?: TitleColor;
  $size?: TitleSize;
  $family?: TitleFamily;
  $weight?: TitleWeight;
}>`
  font: ${({ $size = "md", $family = "product", theme }) =>
    theme.typography.styles[$family].titles[$size]};
  color: ${({ $color = "default", theme }) => theme.click.global.color.title[$color]};
  margin: 0;
  padding: 0;
  font-style: inherit;
  text-align: ${({ $align = "left" }) => $align};
  font-weight: ${({ $weight, theme }) => $weight ? theme.typography.font.weights[$weight] : "inherit"};

  a,
  a:visited {
    color: ${({ $color = "default", theme }) => theme.click.global.color.title[$color]};
    cursor: pointer;
  }

  a:hover {
    color: ${({ theme }) => theme.click.global.color.title.muted};
  }
`;
