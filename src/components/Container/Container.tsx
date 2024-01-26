import styled from "styled-components";
import {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  ElementType,
  forwardRef,
} from "react";
import { Orientation } from "@/components";

type AlignItemsOptions = "start" | "center" | "end" | "stretch";
type GapOptions = "none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
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
type PaddingOptions = "none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
type WrapOptions = "nowrap" | "wrap" | "wrap-reverse";

export interface ContainerProps<T extends ElementType> {
  component?: T;
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
  height?: string;
  maxHeight?: string;
  minHeight?: string;
  overflow?: string;
  flex?: GrowShrinkOptions;
}

const Container = forwardRef(
  <T extends ElementType = "div">(
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
      height,
      maxHeight,
      minHeight,
      overflow,
      flex,
      ...props
    }: ContainerProps<T> & ComponentPropsWithoutRef<T>,
    ref: ComponentPropsWithRef<T>["ref"]
  ) => {
    return (
      <Wrapper
        ref={ref}
        as={component ?? "div"}
        $alignItems={alignItems ?? orientation === "vertical" ? "start" : "center"}
        $fillWidth={fillWidth}
        $gapSize={gap}
        $flex={flex}
        $grow={grow}
        $shrink={shrink}
        $isResponsive={isResponsive}
        $justifyContent={justifyContent}
        $maxWidth={maxWidth}
        $minWidth={minWidth}
        $orientation={orientation}
        $paddingSize={padding}
        $wrap={wrap}
        $height={height}
        $maxHeight={maxHeight}
        $minHeight={minHeight}
        $overflow={overflow}
        data-testid="container"
        {...props}
      >
        {children}
      </Wrapper>
    );
  }
);

const Wrapper = styled.div<{
  $alignItems: AlignItemsOptions;
  $fillWidth?: boolean;
  $gapSize: GapOptions;
  $flex?: GrowShrinkOptions;
  $grow?: GrowShrinkOptions;
  $shrink?: GrowShrinkOptions;
  $isResponsive?: boolean;
  $justifyContent: JustifyContentOptions;
  $maxWidth?: string;
  $minWidth?: string;
  $orientation: Orientation;
  $paddingSize: PaddingOptions;
  $wrap: WrapOptions;
  $height?: string;
  $minHeight?: string;
  $maxHeight?: string;
  $overflow?: string;
}>`
  display: flex;
  ${({ $flex, $grow, $shrink }) => `
    ${typeof $flex === "string" ? `flex: ${$flex};` : ""}
    ${typeof $grow === "string" ? `flex-grow: ${$grow};` : ""}
    ${typeof $shrink === "string" ? `flex-shrink: ${$shrink};` : ""}
  `}
  ${({ $height, $maxHeight, $minHeight }) => `
    ${typeof $height === "string" ? `height: ${$height};` : ""}
    ${typeof $maxHeight === "string" ? `max-height: ${$maxHeight};` : ""}
    ${typeof $minHeight === "string" ? `min-height: ${$minHeight};` : ""}
  `}
  ${({ $overflow }) => `
    ${typeof $overflow === "string" ? `overflow: ${$overflow};` : ""}
  `}
  flex-wrap: ${({ $wrap = "nowrap" }) => $wrap};
  gap: ${({ theme, $gapSize }) => theme.click.container.gap[$gapSize]};
  max-width: ${({ $maxWidth }) => $maxWidth ?? "none"};
  min-width: ${({ $minWidth }) => $minWidth ?? "none"};
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

export { Container };
