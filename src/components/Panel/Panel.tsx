import { CursorOptions, Orientation } from "@/components";
import { HTMLAttributes } from "react";
import { styled } from "styled-components";

export type PanelPadding = "none" | "xs" | "sm" | "md" | "lg" | "xl";
export type PanelColor = "default" | "muted" | "transparent";
export type PanelRadii = "none" | "sm" | "md" | "lg";
type AlignItemsOption = "start" | "center" | "end";

export interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  alignItems?: AlignItemsOption;
  children?: React.ReactNode;
  color?: PanelColor;
  cursor?: CursorOptions;
  fillHeight?: boolean;
  fillWidth?: boolean;
  gap?: PanelPadding;
  hasBorder?: boolean;
  hasShadow?: boolean;
  height?: string;
  orientation?: Orientation;
  padding?: PanelPadding;
  radii?: PanelRadii;
  width?: string;
}

export const Panel = ({
  alignItems = "center",
  children,
  color,
  cursor,
  fillHeight,
  fillWidth,
  gap,
  hasBorder,
  hasShadow,
  height,
  orientation = "horizontal",
  padding,
  radii = "sm",
  width,
  ...props
}: PanelProps) => (
  <Wrapper
    $alignItems={alignItems}
    $color={color}
    $cursor={cursor}
    $fillHeight={fillHeight}
    $fillWidth={fillWidth}
    $gap={gap}
    $hasBorder={hasBorder}
    $hasShadow={hasShadow}
    $height={height}
    $orientation={orientation}
    $padding={padding}
    $radii={radii}
    $width={width}
    {...props}
  >
    {children}
  </Wrapper>
);

const Wrapper = styled.div<{
  $alignItems?: AlignItemsOption;
  $color?: PanelColor;
  $cursor?: CursorOptions;
  $fillHeight?: boolean;
  $fillWidth?: boolean;
  $gap?: PanelPadding;
  $hasBorder?: boolean;
  $hasShadow?: boolean;
  $height?: string;
  $orientation?: Orientation;
  $padding?: PanelPadding;
  $radii?: PanelRadii;
  $width?: string;
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
  border-radius: ${({ $radii = "sm", theme }) => theme.click.panel.radii[$radii]};
  padding: ${({ $padding = "md", theme }) => theme.click.panel.space.y[$padding]};
  border: ${({ $hasBorder, theme }) =>
    $hasBorder ? `1px solid ${theme.click.global.color.stroke.default}` : "none"};
  box-shadow: ${({ $hasShadow, theme }) => ($hasShadow ? theme.shadow[1] : "none")};
  gap: ${({ $gap = "sm", theme }) => theme.click.panel.space.gap[$gap]};
  ${({ $cursor }) => $cursor && `cursor: ${$cursor}`};
`;
