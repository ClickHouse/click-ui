import styled from "styled-components";
import { HTMLAttributes } from "react";
import { Orientation } from "@/components";

type AlignItemsOptions = "start" | "center" | "end";
type GapOptions = "none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
type GrowthOptions = "0" | "1" | "2" | "3" | "4" | "5" | "6";
type JustifyContentOptions =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "start"
  | "end"
  | "left"
  | "right";
type PaddingOptions = "none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  alignItems?: AlignItemsOptions;
  children?: React.ReactNode;
  fillWidth?: boolean;
  gap?: GapOptions;
  grow?: GrowthOptions;
  hasBorder?: boolean;
  isResponsive?: boolean;
  justifyContent?: JustifyContentOptions;
  orientation?: Orientation;
  padding?: PaddingOptions;
}

const Container = ({
  alignItems = "center",
  children,
  fillWidth = false,
  gap = "none",
  grow = "1",
  hasBorder,
  isResponsive,
  justifyContent = "start",
  orientation = "horizontal",
  padding = "md",
}: ContainerProps) => {
  return (
    <Wrapper
      $alignItems={alignItems}
      $fillWidth={fillWidth}
      $gapSize={gap}
      $grow={grow}
      $hasBorder={hasBorder}
      $isResponsive={isResponsive}
      $justifyContent={justifyContent}
      $orientation={orientation}
      $paddingSize={padding}
    >
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div<{
  $alignItems: AlignItemsOptions;
  $fillWidth: boolean;
  $gapSize: GapOptions;
  $grow: GrowthOptions;
  $hasBorder?: boolean;
  $isResponsive?: boolean;
  $justifyContent: JustifyContentOptions;
  $orientation?: Orientation;
  $paddingSize: PaddingOptions;
}>`
  display: flex;
  flex-grow: ${({ $grow = "1" }) => ($grow === "1" ? "1" : `${$grow}`)};
  gap: ${({ theme, $gapSize }) => theme.click.container.gap[$gapSize]};
  padding: ${({ theme, $paddingSize }) => theme.click.container.space[$paddingSize]};
  background-color: ${({ theme }) => theme.click.global.color.background.muted};
  width: ${({ $fillWidth = true }) => ($fillWidth === true ? "100%" : "auto")};
  flex-direction: ${({ $orientation = "horizontal" }) =>
    $orientation === "horizontal" ? "row" : "column"};
  align-items: ${({ $alignItems = "center" }) =>
    $alignItems === "center" ? "center" : `${$alignItems}`};
  justify-content: ${({ $justifyContent = "left" }) =>
    $justifyContent === "start" ? "start" : `${$justifyContent}`};

  border: ${({ $hasBorder }) => ($hasBorder ? "1px solid red" : "none")};

  @media (max-width: 768px) {
    width: ${({ $isResponsive = true, $fillWidth = true }) =>
      $isResponsive === true ? "100%" : $fillWidth === true ? "100%" : "auto"};
    flex-direction: ${({ $isResponsive = true }) =>
      $isResponsive === true ? "column" : "auto"};
  }
`;

export { Container };
