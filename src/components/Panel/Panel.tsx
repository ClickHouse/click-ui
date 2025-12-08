import { CursorOptions, Orientation } from "@/components";
import { HTMLAttributes, CSSProperties } from "react";
import clsx from "clsx";
import { capitalize } from "@/utils/capitalize";
import styles from "./Panel.module.scss";

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
