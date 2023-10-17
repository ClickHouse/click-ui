import { HTMLAttributes } from "react";
import styled from "styled-components";
export type TitleColor = "default" | "muted";
export type TitleSize = "xs" | "sm" | "md" | "lg" | "xl";
export type TitleFamily = "product" | "brand";
export type TitleType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  color?: TitleColor;
  size?: TitleSize;
  family?: TitleFamily;
  type: TitleType;
}

/** The `title` component allows you to easily add headings to your pages. They do not include built in margins. */
export const Title = ({ size, family, type, color, children, ...props }: TitleProps) => (
  <CuiTitle
    $color={color}
    $size={size}
    $family={family}
    as={type}
    {...props}
  >
    {children}
  </CuiTitle>
);

const CuiTitle = styled.div<{
  $color?: TitleColor;
  $size?: TitleSize;
  $family?: TitleFamily;
}>`
  font: ${({ $size = "md", $family = "product", theme }) =>
    theme.typography.styles[$family].titles[$size]};
  color: ${({ $color = "default", theme }) => theme.click.global.color.text[$color]};
  margin: 0;
  padding: 0;
  font-style: inherit;
  line-height: 1;
`;
