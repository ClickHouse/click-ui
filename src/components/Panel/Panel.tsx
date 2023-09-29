import { Orientation } from "@/components";
import { HTMLAttributes } from "react";
import styled from "styled-components";

export type PanelPadding = "none" | "xs" | "sm" | "md" | "lg" | "xl";
export type PanelColor = "default" | "muted" | "transparent";
type AlignItemsOption = "start" | "center" | "end";

export interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  hasBorder?: boolean;
  hasShadow?: boolean;
  color?: PanelColor;
  padding?: PanelPadding;
  children?: React.ReactNode;
  orientation?: Orientation;
  width?: string;
  fillWidth?: boolean;
  height?: string;
  fillHeight?: boolean;
  alignItems?: AlignItemsOption;
}

export const Panel = ({
  hasBorder,
  hasShadow,
  color,
  padding,
  children,
  orientation = "horizontal",
  width,
  fillWidth,
  height,
  fillHeight,
  alignItems = "center",
  ...props
}: PanelProps) => (
  <Wrapper
    $hasBorder={hasBorder}
    $hasShadow={hasShadow}
    $color={color}
    $padding={padding}
    $width={width}
    $orientation={orientation}
    $fillWidth={fillWidth}
    $height={height}
    $fillHeight={fillHeight}
    $alignItems={alignItems}
    {...props}
  >
    {children}
  </Wrapper>
);

const Wrapper = styled.div<{
  $hasBorder?: boolean;
  $hasShadow?: boolean;
  $color?: PanelColor;
  $padding?: PanelPadding;
  $width?: string;
  $fillWidth?: boolean;
  $height?: string;
  $fillHeight?: boolean;
  $orientation?: Orientation;
  $alignItems?: AlignItemsOption;
}>`
  display: flex;
  flex-flow: ${({ $orientation = "horizontal" }) =>
    $orientation === "horizontal" ? "row wrap" : "column"};
  align-items: ${({ $alignItems = "center" }) =>
    $alignItems === "center" ? "center" : `flex-${$alignItems}`};
  width: ${({ $width, $fillWidth }) => ($fillWidth ? "100%" : $width)};
  height: ${({ $height, $fillHeight }) => ($fillHeight ? "100%" : $height)};
  background-color: ${({ $color = "default", theme }) =>
    theme.click.panel.color.background[$color]};
  border-radius: ${({ theme }) => theme.click.panel.radii.all};
  padding: ${({ $padding = "md", theme }) => theme.click.panel.space.y[$padding]};
  border: ${({ $hasBorder, theme }) =>
    $hasBorder ? `1px solid ${theme.click.global.color.stroke.default}` : "none"};
  box-shadow: ${({ $hasShadow, theme }) => ($hasShadow ? theme.shadow[1] : "none")};
  gap: 0.625rem;
`;
