import {
  ComponentProps,
  ComponentPropsWithRef,
  ElementType,
  ReactNode,
  forwardRef,
} from "react";
import clsx from "clsx";
import { Orientation } from "@/components/types";
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

export interface ContainerProps<T extends ElementType = "div"> {
  /** Custom component to render as */
  component?: T;
  /** Alignment of items along the cross axis */
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

type ContainerPolymorphicComponent = <T extends ElementType = "div">(
  props: Omit<ComponentProps<T>, keyof T> & ContainerProps<T>
) => ReactNode;

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
    ...props
  }: Omit<ComponentProps<T>, keyof T> & ContainerProps<T>,
  ref: ComponentPropsWithRef<T>["ref"]
) => {
  const Component = component ?? "div";
  const defaultAlignItems =
    alignItems ?? (orientation === "vertical" ? "start" : "center");

  const containerClasses = clsx({
    [styles.cuiContainer]: true,
    [styles.cuiHorizontal]: orientation === "horizontal",
    [styles.cuiVertical]: orientation === "vertical",
    [styles.cuiAlignStart]: defaultAlignItems === "start",
    [styles.cuiAlignCenter]: defaultAlignItems === "center",
    [styles.cuiAlignEnd]: defaultAlignItems === "end",
    [styles.cuiAlignStretch]: defaultAlignItems === "stretch",
    [styles.cuiJustifyStart]: justifyContent === "start",
    [styles.cuiJustifyCenter]: justifyContent === "center",
    [styles.cuiJustifyEnd]: justifyContent === "end",
    [styles.cuiJustifySpaceBetween]: justifyContent === "space-between",
    [styles.cuiJustifySpaceAround]: justifyContent === "space-around",
    [styles.cuiJustifySpaceEvenly]: justifyContent === "space-evenly",
    [styles.cuiJustifyLeft]: justifyContent === "left",
    [styles.cuiJustifyRight]: justifyContent === "right",
    [styles.cuiFillWidth]: fillWidth,
    [styles.cuiAutoWidth]: !fillWidth,
    [styles.cuiFillHeight]: fillHeight,
    [styles.cuiGrow0]: grow === "0",
    [styles.cuiGrow1]: grow === "1",
    [styles.cuiGrow2]: grow === "2",
    [styles.cuiGrow3]: grow === "3",
    [styles.cuiGrow4]: grow === "4",
    [styles.cuiGrow5]: grow === "5",
    [styles.cuiGrow6]: grow === "6",
    [styles.cuiShrink0]: shrink === "0",
    [styles.cuiShrink1]: shrink === "1",
    [styles.cuiShrink2]: shrink === "2",
    [styles.cuiShrink3]: shrink === "3",
    [styles.cuiShrink4]: shrink === "4",
    [styles.cuiShrink5]: shrink === "5",
    [styles.cuiShrink6]: shrink === "6",
    [styles.cuiWrapNowrap]: wrap === "nowrap",
    [styles.cuiWrapWrap]: wrap === "wrap",
    [styles.cuiWrapReverse]: wrap === "wrap-reverse",
    [styles.cuiGapNone]: gap === "none",
    [styles.cuiGapXxs]: gap === "xxs",
    [styles.cuiGapXs]: gap === "xs",
    [styles.cuiGapSm]: gap === "sm",
    [styles.cuiGapMd]: gap === "md",
    [styles.cuiGapLg]: gap === "lg",
    [styles.cuiGapXl]: gap === "xl",
    [styles.cuiGapXxl]: gap === "xxl",
    [styles.cuiPaddingNone]: padding === "none",
    [styles.cuiPaddingXxs]: padding === "xxs",
    [styles.cuiPaddingXs]: padding === "xs",
    [styles.cuiPaddingSm]: padding === "sm",
    [styles.cuiPaddingMd]: padding === "md",
    [styles.cuiPaddingLg]: padding === "lg",
    [styles.cuiPaddingXl]: padding === "xl",
    [styles.cuiPaddingXxl]: padding === "xxl",
    [styles.cuiResponsive]: isResponsive,
  });

  const inlineStyles = {
    maxWidth: maxWidth ?? undefined,
    minWidth: minWidth ?? undefined,
    maxHeight: maxHeight ?? undefined,
    minHeight: minHeight ?? undefined,
    overflow: overflow ?? undefined,
  };

  return (
    <Component
      ref={ref}
      className={containerClasses}
      style={inlineStyles}
      data-testid="container"
      {...props}
    >
      {children}
    </Component>
  );
};

export const Container: ContainerPolymorphicComponent = forwardRef(_Container);
