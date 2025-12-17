import { styled } from "styled-components";
import { ElementType, forwardRef } from "react";
import { Orientation } from "@/components";
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicProps,
  PolymorphicRef,
} from "@/utils/polymorphic";

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

export interface ContainerProps<T extends ElementType = "div">
  extends PolymorphicComponentProps<T> {
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
  }: PolymorphicProps<T, ContainerProps<T>>,
  ref: PolymorphicRef<T>
) => {
  return (
    <Wrapper
      ref={ref}
      as={component ?? "div"}
      $alignItems={alignItems ?? (orientation === "vertical" ? "start" : "center")}
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

export const Container: PolymorphicComponent<ContainerProps> = forwardRef(_Container);
