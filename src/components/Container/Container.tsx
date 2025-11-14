import { ElementType, forwardRef } from "react";
import clsx from "clsx";
import { capitalize } from "@/utils/capitalize";
import { Orientation } from "@/components/types";
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicProps,
  PolymorphicRef,
} from "@/utils/polymorphic";
import styles from "./Container.module.scss";

type AlignItemsOptions = "start" | "center" | "end" | "stretch";
export type GapOptions = "none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
type GrowShrinkOptions = "0" | "1" | "2" | "3" | "4" | "5" | "6";
type JustifyContentOptions =
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "start"
  | "end"
  | "left"
  | "right";
export type PaddingOptions = "none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
type WrapOptions = "nowrap" | "wrap" | "wrap-reverse";

export interface ContainerProps<
  T extends ElementType = "div",
> extends PolymorphicComponentProps<T> {
  alignItems?: AlignItemsOptions;
  /** The content to display inside the container */
  children?: React.ReactNode;
  /** Whether the container should fill the full width of its parent */
  fillWidth?: boolean;
  /** The gap between child elements */
  gap?: GapOptions;
  /** Flex grow value */
  grow?: GrowShrinkOptions;
  /** Flex shrink value */
  shrink?: GrowShrinkOptions;
  /** Whether the container should stack vertically on smaller screens */
  isResponsive?: boolean;
  /** Alignment of items along the main axis */
  justifyContent?: JustifyContentOptions;
  /** Maximum width of the container */
  maxWidth?: string;
  /** Minimum width of the container */
  minWidth?: string;
  /** The direction of content flow - horizontal or vertical */
  orientation?: Orientation;
  /** The padding inside the container */
  padding?: PaddingOptions;
  /** How flex items should wrap */
  wrap?: WrapOptions;
  /** Whether the container should fill the full height of its parent */
  fillHeight?: boolean;
  /** Maximum height of the container */
  maxHeight?: string;
  /** Minimum height of the container */
  minHeight?: string;
  /** CSS overflow behavior */
  overflow?: string;
}

const _Container = <T extends ElementType = "div">(
  {
    component,
    alignItems,
    children,
    fillWidth = true,
    gap = "none",
    grow,
    shrink,
    isResponsive,
    justifyContent = "start",
    maxWidth,
    minWidth,
    orientation = "horizontal",
    padding = "none",
    wrap = "nowrap",
    fillHeight,
    maxHeight,
    minHeight,
    overflow,
    className,
    ...props
  }: PolymorphicProps<T, ContainerProps<T>>,
  ref: PolymorphicRef<T>
) => {
  const Component = component ?? "div";
  const defaultAlignItems =
    alignItems ?? (orientation === "vertical" ? "start" : "center");

  const orientationClass = `cuiOrientation${capitalize(orientation)}`;
  const alignClass = `cuiAlign${capitalize(defaultAlignItems)}`;
  const justifyClass = `cuiJustify${capitalize(justifyContent)}`;
  const wrapClass = `cuiWrap${capitalize(wrap)}`;
  const gapClass = `cuiGap${capitalize(gap)}`;
  const paddingClass = `cuiPadding${capitalize(padding)}`;
  const growClass = grow ? `cuiGrow${grow}` : undefined;
  const shrinkClass = shrink ? `cuiShrink${shrink}` : undefined;

  const containerClasses = clsx(
    styles.cuiContainer,
    styles[orientationClass],
    styles[alignClass],
    styles[justifyClass],
    styles[wrapClass],
    styles[gapClass],
    styles[paddingClass],
    {
      [styles.cuiFillWidth]: fillWidth,
      [styles.cuiAutoWidth]: !fillWidth,
      [styles.cuiFillHeight]: fillHeight,
      [styles.cuiResponsive]: isResponsive,
      [styles[growClass!]]: growClass,
      [styles[shrinkClass!]]: shrinkClass,
    },
    className
  );

  const inlineStyles = {
    maxWidth: maxWidth ?? undefined,
    minWidth: minWidth ?? undefined,
    maxHeight: maxHeight ?? undefined,
    minHeight: minHeight ?? undefined,
    overflow: overflow ?? undefined,
    ...props.style,
  };

  return (
    <Component
      ref={ref}
      className={containerClasses}
      style={inlineStyles}
      data-testid="container"
      data-cui-orientation={orientation}
      data-cui-align={defaultAlignItems}
      data-cui-justify={justifyContent}
      data-cui-wrap={wrap}
      data-cui-gap={gap}
      data-cui-padding={padding}
      data-cui-grow={grow}
      data-cui-shrink={shrink}
      {...props}
    >
      {children}
    </Component>
  );
};

export const Container: PolymorphicComponent<ContainerProps> = forwardRef(_Container);
