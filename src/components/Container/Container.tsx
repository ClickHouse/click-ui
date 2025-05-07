import { styled } from "styled-components";
import {
  ComponentProps,
  ComponentPropsWithRef,
  ElementType,
  ReactNode,
  forwardRef,
} from "react";
import { Orientation } from "@/components";

type AlignItemsOptions = "start" | "center" | "end" | "stretch";
type BorderColor = "default" | "intense" | "muted";
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
  component?: T;
  border?: BorderColor;
  alignItems?: AlignItemsOptions;
  children?: React.ReactNode;
  fillWidth?: boolean;
  gap?: GapOptions;
  grow?: GrowShrinkOptions;
  shrink?: GrowShrinkOptions;
  isResponsive?: boolean;
  justifyContent?: JustifyContentOptions;
  maxWidth?: string;
  minWidth?: string;
  orientation?: Orientation;
  padding?: PaddingOptions;
  wrap?: WrapOptions;
  fillHeight?: boolean;
  maxHeight?: string;
  minHeight?: string;
  overflow?: string;
}

type ContainerPolymorphicComponent = <T extends ElementType = "div">(
  props: Omit<ComponentProps<T>, keyof T> & ContainerProps<T>
) => ReactNode;

const _Container = <T extends ElementType = "div">(
  {
    component,
    border,
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
  return (
    <Wrapper
      ref={ref}
      as={component ?? "div"}
      $alignItems={alignItems ?? (orientation === "vertical" ? "start" : "center")}
      $border={border}
      $fillWidth={fillWidth}
      $gapSize={gap}
      $grow={grow}
      $shrink={shrink}
      $isResponsive={isResponsive}
      $justifyContent={justifyContent}
      $maxWidth={maxWidth}
      $minWidth={minWidth}
      $orientation={orientation}
      $paddingSize={padding}
      $wrap={wrap}
      $fillHeight={fillHeight}
      $maxHeight={maxHeight}
      $minHeight={minHeight}
      $overflow={overflow}
      data-testid="container"
      {...props}
    >
      {children}
    </Wrapper>
  );
};
const Wrapper = styled.div<{
  $alignItems: AlignItemsOptions;
  $border?: BorderColor;
  $fillWidth?: boolean;
  $gapSize: GapOptions;
  $grow?: GrowShrinkOptions;
  $shrink?: GrowShrinkOptions;
  $isResponsive?: boolean;
  $justifyContent: JustifyContentOptions;
  $maxWidth?: string;
  $minWidth?: string;
  $orientation: Orientation;
  $paddingSize: PaddingOptions;
  $wrap: WrapOptions;
  $fillHeight?: boolean;
  $minHeight?: string;
  $maxHeight?: string;
  $overflow?: string;
}>`
  display: flex;
  ${({ $grow, $shrink }) => `
    ${$grow && `flex: ${$grow}`};
    ${$shrink && `flex-shrink: ${$shrink}`};
  `}
  ${({ $fillHeight, $maxHeight, $minHeight }) => `
    ${$fillHeight && "height: 100%"};
    ${$maxHeight && `max-height: ${$maxHeight}`};
    ${$minHeight && `min-height: ${$minHeight}`};
  `}
  ${({ $overflow }) => `
    ${$overflow && `overflow: ${$overflow}`};
  `}
  ${({ $border, theme }) =>
    $border ? `border: 1px solid ${theme.click.global.color.stroke[$border]};` : ""}
  flex-wrap: ${({ $wrap = "nowrap" }) => $wrap};
  gap: ${({ theme, $gapSize }) => theme.click.container.gap[$gapSize]};
  max-width: ${({ $maxWidth }) => $maxWidth ?? "none"};
  min-width: ${({ $minWidth }) => $minWidth ?? "auto"};
  padding: ${({ theme, $paddingSize }) => theme.click.container.space[$paddingSize]};
  width: ${({ $fillWidth = true }) => ($fillWidth === true ? "100%" : "auto")};
  flex-direction: ${({ $orientation = "horizontal" }) =>
    $orientation === "horizontal" ? "row" : "column"};
  align-items: ${({ $alignItems = "center" }) => $alignItems};
  justify-content: ${({ $justifyContent = "left" }) =>
    $justifyContent === "start" ? "start" : `${$justifyContent}`};

  @media (max-width: ${({ theme }) => theme.breakpoint.sizes.md}) {
    width: ${({ $isResponsive = true, $fillWidth = true }) =>
      $isResponsive === true ? "100%" : $fillWidth === true ? "100%" : "auto"};
    max-width: ${({ $isResponsive = true }) =>
      $isResponsive === true ? "none" : "auto"};
    flex-direction: ${({ $isResponsive = true }) =>
      $isResponsive === true ? "column" : "auto"};
  }
`;

export const Container: ContainerPolymorphicComponent = forwardRef(_Container);
