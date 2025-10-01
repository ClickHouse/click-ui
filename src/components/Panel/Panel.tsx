import { CursorOptions, Orientation } from "@/components";
import { HTMLAttributes, CSSProperties } from "react";
import clsx from "clsx";
import styles from "./Panel.module.scss";

export type PanelPadding = "none" | "xs" | "sm" | "md" | "lg" | "xl";
export type PanelColor = "default" | "muted" | "transparent";
export type PanelRadii = "none" | "sm" | "md" | "lg";
type AlignItemsOption = "start" | "center" | "end";

export interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  /** Alignment of items along the cross axis */
  alignItems?: AlignItemsOption;
  /** The content to display inside the panel */
  children?: React.ReactNode;
  /** The background color variant of the panel */
  color?: PanelColor;
  /** The cursor style when hovering over the panel */
  cursor?: CursorOptions;
  /** Whether the panel should fill the full height of its container */
  fillHeight?: boolean;
  /** Whether the panel should fill the full width of its container */
  fillWidth?: boolean;
  /** The gap between child elements */
  gap?: PanelPadding;
  /** Whether to show a border around the panel */
  hasBorder?: boolean;
  /** Whether to show a shadow on the panel */
  hasShadow?: boolean;
  /** Fixed height of the panel */
  height?: string;
  /** The orientation of content flow - horizontal or vertical */
  orientation?: Orientation;
  /** The padding inside the panel */
  padding?: PanelPadding;
  /** The border radius of the panel corners */
  radii?: PanelRadii;
  /** Fixed width of the panel */
  width?: string;
}

export const Panel = ({
  alignItems = "center",
  children,
  color = "default",
  cursor,
  fillHeight,
  fillWidth,
  gap = "sm",
  hasBorder,
  hasShadow,
  height,
  orientation = "horizontal",
  padding = "md",
  radii = "sm",
  width,
  ...props
}: PanelProps) => {
  const inlineStyles: CSSProperties = {};

  if (width && !fillWidth) {
    inlineStyles.width = width;
  }

  if (height && !fillHeight) {
    inlineStyles.height = height;
  }

  const className = clsx(styles.cuiPanel, {
    // Orientation
    [styles.cuiHorizontal]: orientation === "horizontal",
    [styles.cuiVertical]: orientation === "vertical",

    // Alignment
    [styles.cuiAlignStart]: alignItems === "start",
    [styles.cuiAlignCenter]: alignItems === "center",
    [styles.cuiAlignEnd]: alignItems === "end",

    // Size
    [styles.cuiFillWidth]: fillWidth,
    [styles.cuiFillHeight]: fillHeight,
    [styles.cuiCustomWidth]: width && !fillWidth,
    [styles.cuiCustomHeight]: height && !fillHeight,

    // Color
    [styles.cuiColorDefault]: color === "default",
    [styles.cuiColorMuted]: color === "muted",
    [styles.cuiColorTransparent]: color === "transparent",

    // Border radius
    [styles.cuiRadiiNone]: radii === "none",
    [styles.cuiRadiiSm]: radii === "sm",
    [styles.cuiRadiiMd]: radii === "md",
    [styles.cuiRadiiLg]: radii === "lg",

    // Padding
    [styles.cuiPaddingNone]: padding === "none",
    [styles.cuiPaddingXs]: padding === "xs",
    [styles.cuiPaddingSm]: padding === "sm",
    [styles.cuiPaddingMd]: padding === "md",
    [styles.cuiPaddingLg]: padding === "lg",
    [styles.cuiPaddingXl]: padding === "xl",

    // Gap
    [styles.cuiGapNone]: gap === "none",
    [styles.cuiGapXs]: gap === "xs",
    [styles.cuiGapSm]: gap === "sm",
    [styles.cuiGapMd]: gap === "md",
    [styles.cuiGapLg]: gap === "lg",
    [styles.cuiGapXl]: gap === "xl",

    // Border
    [styles.cuiHasBorder]: hasBorder,
    [styles.cuiNoBorder]: !hasBorder,

    // Shadow
    [styles.cuiHasShadow]: hasShadow,
    [styles.cuiNoShadow]: !hasShadow,

    // Cursor
    [styles.cuiCursorAuto]: cursor === "auto",
    [styles.cuiCursorDefault]: cursor === "default",
    [styles.cuiCursorNone]: cursor === "none",
    [styles.cuiCursorContextMenu]: cursor === "context-menu",
    [styles.cuiCursorHelp]: cursor === "help",
    [styles.cuiCursorPointer]: cursor === "pointer",
    [styles.cuiCursorProgress]: cursor === "progress",
    [styles.cuiCursorWait]: cursor === "wait",
    [styles.cuiCursorCell]: cursor === "cell",
    [styles.cuiCursorCrosshair]: cursor === "crosshair",
    [styles.cuiCursorText]: cursor === "text",
    [styles.cuiCursorVerticalText]: cursor === "vertical-text",
    [styles.cuiCursorAlias]: cursor === "alias",
    [styles.cuiCursorCopy]: cursor === "copy",
    [styles.cuiCursorMove]: cursor === "move",
    [styles.cuiCursorNoDrop]: cursor === "no-drop",
    [styles.cuiCursorNotAllowed]: cursor === "not-allowed",
    [styles.cuiCursorGrab]: cursor === "grab",
    [styles.cuiCursorGrabbing]: cursor === "grabbing",
    [styles.cuiCursorEResize]: cursor === "e-resize",
    [styles.cuiCursorNResize]: cursor === "n-resize",
    [styles.cuiCursorNeResize]: cursor === "ne-resize",
    [styles.cuiCursorNwResize]: cursor === "nw-resize",
    [styles.cuiCursorSResize]: cursor === "s-resize",
    [styles.cuiCursorSeResize]: cursor === "se-resize",
    [styles.cuiCursorSwResize]: cursor === "sw-resize",
    [styles.cuiCursorWResize]: cursor === "w-resize",
    [styles.cuiCursorEwResize]: cursor === "ew-resize",
    [styles.cuiCursorNsResize]: cursor === "ns-resize",
    [styles.cuiCursorNeswResize]: cursor === "nesw-resize",
    [styles.cuiCursorNwseResize]: cursor === "nwse-resize",
    [styles.cuiCursorColResize]: cursor === "col-resize",
    [styles.cuiCursorRowResize]: cursor === "row-resize",
    [styles.cuiCursorAllScroll]: cursor === "all-scroll",
    [styles.cuiCursorZoomIn]: cursor === "zoom-in",
    [styles.cuiCursorZoomOut]: cursor === "zoom-out",
  });

  return (
    <div
      className={className}
      style={inlineStyles}
      {...props}
    >
      {children}
    </div>
  );
};
