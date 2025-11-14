import { ElementType, forwardRef } from "react";
import clsx from "clsx";
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicProps,
  PolymorphicRef,
} from "@/utils/polymorphic";
import styles from "./GridContainer.module.scss";
import { capitalize } from "@/utils/capitalize";

export type FlowOptions = "row" | "column" | "row-dense" | "column-dense";
type GapOptions = "none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "unset";
type ItemsOptions = "start" | "center" | "end" | "stretch";
type ContentOptions =
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "start"
  | "stretch"
  | "end"
  | "left"
  | "right";

export interface GridContainerProps<
  T extends ElementType = "div",
> extends PolymorphicComponentProps<T> {
  alignItems?: ItemsOptions;
  /** Alignment of content along the block axis */
  alignContent?: ContentOptions;
  /** The content to display inside the grid container */
  children?: React.ReactNode;
  /** Gap between columns */
  columnGap?: GapOptions;
  /** Gap between rows and columns */
  gap?: GapOptions;
  /** Size of implicitly-created grid columns */
  gridAutoColumns?: string;
  /** How auto-placed items flow into the grid */
  gridAutoFlow?: FlowOptions;
  /** Size of implicitly-created grid rows */
  gridAutoRows?: string;
  /** Named grid areas */
  gridTemplateAreas?: string;
  /** Column track sizes */
  gridTemplateColumns?: string;
  /** Row track sizes */
  gridTemplateRows?: string;
  /** Shorthand for grid-template-rows, grid-template-columns, and grid-template-areas */
  gridTemplate?: string;
  /** Whether to use inline-grid instead of grid */
  inline?: boolean;
  /** Whether to collapse to single column on smaller screens */
  isResponsive?: boolean;
  /** Alignment of content along the inline axis */
  justifyContent?: ContentOptions;
  /** Alignment of items along the inline axis */
  justifyItems?: ItemsOptions;
  /** Gap between rows */
  rowGap?: GapOptions;
  /** Height of the container */
  height?: string;
  /** Maximum height of the container */
  maxHeight?: string;
  /** Minimum height of the container */
  minHeight?: string;
  /** Whether the container should fill the full width of its parent */
  fillWidth?: boolean;
  /** Maximum width of the container */
  maxWidth?: string;
  /** Minimum width of the container */
  minWidth?: string;
  /** CSS overflow behavior */
  overflow?: string;
}

const _GridContainer = <T extends ElementType = "div">(
  {
    alignItems = "stretch",
    alignContent = "stretch",
    children,
    columnGap,
    gap,
    gridAutoColumns,
    gridAutoFlow,
    gridAutoRows,
    gridTemplateAreas,
    gridTemplateColumns,
    gridTemplateRows,
    gridTemplate,
    inline = false,
    isResponsive = true,
    justifyContent = "stretch",
    justifyItems = "stretch",
    rowGap,
    height,
    maxHeight,
    minHeight,
    fillWidth = true,
    maxWidth,
    minWidth,
    overflow,
    component,
    className,
    ...props
  }: PolymorphicProps<T, GridContainerProps<T>>,
  ref: PolymorphicRef<T>
) => {
  const Component = component ?? "div";

  const containerClassName = clsx(
    styles.cuiGridContainer,
    {
      [styles.cuiInline]: inline,
      [styles.cuiFillWidth]: fillWidth,
      [styles.cuiWidthAuto]: !fillWidth,
      [styles.cuiResponsive]: isResponsive,
      [styles[`cuiAlignItems${capitalize(alignItems)}`]]: alignItems !== "stretch",
      [styles[`cuiAlignContent${capitalize(alignContent)}`]]: alignContent !== "stretch",
      [styles[`cuiJustifyContent${capitalize(justifyContent)}`]]:
        justifyContent !== "stretch",
      [styles[`cuiJustifyItems${capitalize(justifyItems)}`]]: justifyItems !== "stretch",
      [styles[`cuiGap${gap ? capitalize(gap) : ""}`]]: gap,
      [styles[`cuiColumnGap${columnGap ? capitalize(columnGap) : ""}`]]: columnGap,
      [styles[`cuiRowGap${rowGap ? capitalize(rowGap) : ""}`]]: rowGap,
    },
    className
  );

  const containerStyle: React.CSSProperties = {
    ...(gridAutoColumns && { gridAutoColumns }),
    ...(gridAutoFlow && { gridAutoFlow }),
    ...(gridAutoRows && { gridAutoRows }),
    ...(gridTemplateAreas && { gridTemplateAreas }),
    ...(gridTemplateColumns && { gridTemplateColumns }),
    ...(gridTemplateRows && { gridTemplateRows }),
    ...(gridTemplate && { gridTemplate }),
    ...(height && { height }),
    ...(maxHeight && { maxHeight }),
    ...(minHeight && { minHeight }),
    ...(maxWidth && { maxWidth }),
    ...(minWidth && { minWidth }),
    ...(overflow && { overflow }),
    ...props.style,
  };

  return (
    <Component
      {...props}
      className={containerClassName}
      style={containerStyle}
      data-testid="grid-container"
      ref={ref}
    >
      {children}
    </Component>
  );
};

export const GridContainer: PolymorphicComponent<GridContainerProps> =
  forwardRef(_GridContainer);
