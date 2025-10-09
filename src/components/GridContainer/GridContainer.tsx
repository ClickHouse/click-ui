import {
  ComponentProps,
  ComponentPropsWithRef,
  ElementType,
  forwardRef,
  ReactNode,
} from "react";
import clsx from "clsx";
import styles from "./GridContainer.module.scss";

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

export interface GridContainerProps<T extends ElementType = "div"> {
  component?: T;
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

type GridContainerPolymorphicComponent = <T extends ElementType = "div">(
  props: Omit<ComponentProps<T>, keyof T> & GridContainerProps<T>
) => ReactNode;

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
    ...props
  }: Omit<ComponentProps<T>, keyof T> & GridContainerProps<T>,
  ref: ComponentPropsWithRef<T>["ref"]
) => {
  const Component = component ?? "div";

  const containerClassName = clsx(styles.cuiGridContainer, {
    [styles.cuiInline]: inline,
    [styles.cuiFillWidth]: fillWidth,
    [styles.cuiWidthAuto]: !fillWidth,
    [styles.cuiResponsive]: isResponsive,
    [styles[`cuiAlignItems${alignItems.charAt(0).toUpperCase() + alignItems.slice(1)}`]]:
      alignItems !== "stretch",
    [styles[
      `cuiAlignContent${alignContent.charAt(0).toUpperCase() + alignContent.slice(1)}`
    ]]: alignContent !== "stretch",
    [styles[
      `cuiJustifyContent${justifyContent.charAt(0).toUpperCase() + justifyContent.slice(1)}`
    ]]: justifyContent !== "stretch",
    [styles[
      `cuiJustifyItems${justifyItems.charAt(0).toUpperCase() + justifyItems.slice(1)}`
    ]]: justifyItems !== "stretch",
    [styles[`cuiGap${gap ? gap.charAt(0).toUpperCase() + gap.slice(1) : ""}`]]: gap,
    [styles[
      `cuiColumnGap${columnGap ? columnGap.charAt(0).toUpperCase() + columnGap.slice(1) : ""}`
    ]]: columnGap,
    [styles[
      `cuiRowGap${rowGap ? rowGap.charAt(0).toUpperCase() + rowGap.slice(1) : ""}`
    ]]: rowGap,
  });

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
  };

  return (
    <Component
      className={containerClassName}
      style={containerStyle}
      data-testid="grid-container"
      ref={ref}
      {...props}
    >
      {children}
    </Component>
  );
};

export const GridContainer: GridContainerPolymorphicComponent =
  forwardRef(_GridContainer);
