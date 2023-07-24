import React from "react";
import styled from "styled-components";
export type TitleColor = "default" | "muted";
export type TitleSize = "xs" | "sm" | "md" | "lg" | "xl";
export type TitleFamily = "product" | "brand";
export type TitleType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface TitleProps {
  color?: TitleColor;
  size?: TitleSize;
  family?: TitleFamily;
  type: TitleType;
  children?: React.ReactNode;
}

/** The `title` component doesn't include an HTML H1 value by default to allow for maximum flexibility.
 * Please remember to wrap your title text in an H tag to ensure correct HTML is being observed. */
export const Title = ({ size, family, type, color, children }: TitleProps) => (
  <CuiTitle
    color={color}
    size={size}
    family={family}
    as={type}
  >
    {children}
  </CuiTitle>
);

const CuiTitle = styled.div<Omit<TitleProps, "type">>`
  font: ${({ size = "md", family = "product", theme }) =>
    theme.typography.styles[family].titles[size]};
  color: ${({ color = "default", theme }) => theme.click.global.color.text[color]};
  margin: 0;
  padding: 0;
  font-weight: inherit;
  font-style: inherit;
  font-size: 100%;
  line-height: 1;
`;
