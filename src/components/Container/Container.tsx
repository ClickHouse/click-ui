import styled from "styled-components";
import { HTMLAttributes } from "react";
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

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
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
}

const Container = ({
  alignItems = "center",
  children,
  fillWidth = false,
  gap = "none",
  grow = "0",
  shrink = "0",
  isResponsive,
  justifyContent = "start",
  maxWidth,
  minWidth,
  orientation = "horizontal",
  padding = "none",
  wrap = "nowrap",
  ...props
}: ContainerProps) => {
  return (
    <Wrapper
      $alignItems={alignItems}
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
  $grow: GrowShrinkOptions;
  $shrink: GrowShrinkOptions;
  $isResponsive?: boolean;
  $justifyContent: JustifyContentOptions;
  $maxWidth?: string;
  $minWidth?: string;
  $orientation: Orientation;
  $paddingSize: PaddingOptions;
  $wrap: WrapOptions;
}>`
  display: flex;
  flex-grow: ${({ $grow = "1" }) => $grow};
  flex-shrink: ${({ $shrink = "0" }) => $shrink};
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
