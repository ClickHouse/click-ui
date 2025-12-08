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

export interface GridContainerProps<T extends ElementType = "div">
  extends PolymorphicComponentProps<T> {
  alignItems?: ItemsOptions;
  alignContent?: ContentOptions;
  children?: React.ReactNode;
  columnGap?: GapOptions;
  gap?: GapOptions;
  gridAutoColumns?: string;
  gridAutoFlow?: FlowOptions;
  gridAutoRows?: string;
  gridTemplateAreas?: string;
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gridTemplate?: string;
  inline?: boolean;
  isResponsive?: boolean;
  justifyContent?: ContentOptions;
  justifyItems?: ItemsOptions;
  rowGap?: GapOptions;
  height?: string;
  maxHeight?: string;
  minHeight?: string;
  fillWidth?: boolean;
  maxWidth?: string;
  minWidth?: string;
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
