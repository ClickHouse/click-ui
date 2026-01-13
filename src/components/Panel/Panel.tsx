import { CursorOptions, Orientation } from "@/components";
import { ComponentPropsWithoutRef, CSSProperties } from "react";
import clsx from "clsx";
import { capitalize } from "@/utils/capitalize";
import styles from "./Panel.module.scss";

export type PanelPadding = "none" | "xs" | "sm" | "md" | "lg" | "xl";
export type PanelColor = "default" | "muted" | "transparent";
export type PanelRadii = "none" | "sm" | "md" | "lg";
type AlignItemsOption = "start" | "center" | "end";

export interface PanelProps extends ComponentPropsWithoutRef<"div"> {
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
  className: propsClassName,
  ...props
}: PanelProps) => {
  const inlineStyles: CSSProperties = {};

  if (width && !fillWidth) {
    inlineStyles.width = width;
  }

  if (height && !fillHeight) {
    inlineStyles.height = height;
  }

  const orientationClass = `cuiOrientation${capitalize(orientation)}`;
  const alignClass = `cuiAlign${capitalize(alignItems)}`;
  const colorClass = `cuiColor${capitalize(color)}`;
  const radiiClass = `cuiRadii${capitalize(radii)}`;
  const paddingClass = `cuiPadding${capitalize(padding)}`;
  const gapClass = `cuiGap${capitalize(gap)}`;
  const cursorClass = cursor ? `cuiCursor${capitalize(cursor)}` : undefined;

  const className = clsx(
    styles.cuiPanel,
    styles[orientationClass],
    styles[alignClass],
    styles[colorClass],
    styles[radiiClass],
    styles[paddingClass],
    styles[gapClass],
    {
      // Size
      [styles.cuiFillWidth]: fillWidth,
      [styles.cuiFillHeight]: fillHeight,
      [styles.cuiCustomWidth]: width && !fillWidth,
      [styles.cuiCustomHeight]: height && !fillHeight,

      // Border
      [styles.cuiHasBorder]: hasBorder,
      [styles.cuiNoBorder]: !hasBorder,

      // Shadow
      [styles.cuiHasShadow]: hasShadow,
      [styles.cuiNoShadow]: !hasShadow,

      // Cursor
      [styles[cursorClass!]]: cursorClass,
    },
    propsClassName
  );

  return (
    <div
      style={inlineStyles}
      className={className}
      data-cui-orientation={orientation}
      data-cui-align={alignItems}
      data-cui-color={color}
      data-cui-radii={radii}
      data-cui-padding={padding}
      data-cui-gap={gap}
      data-cui-cursor={cursor}
      {...props}
    >
      {children}
    </div>
  );
};
