import styled from "styled-components";
import { HTMLAttributes } from "react";

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

export interface GridContainerProps extends HTMLAttributes<HTMLDivElement> {
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

const GridContainer = ({
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
  ...props
}: GridContainerProps) => {
  return (
    <Wrapper
      $alignItems={alignItems}
      $alignContent={alignContent}
      $columnGap={columnGap}
      $gap={gap}
      $gridAutoColumns={gridAutoColumns}
      $gridAutoFlow={gridAutoFlow}
      $gridAutoRows={gridAutoRows}
      $gridTemplateAreas={gridTemplateAreas}
      $gridTemplateColumns={gridTemplateColumns}
      $gridTemplateRows={gridTemplateRows}
      $gridTemplate={gridTemplate}
      $inline={inline}
      $isResponsive={isResponsive}
      $justifyContent={justifyContent}
      $justifyItems={justifyItems}
      $rowGap={rowGap}
      $height={height}
      $maxHeight={maxHeight}
      $minHeight={minHeight}
      $fillWidth={fillWidth}
      $maxWidth={maxWidth}
      $minWidth={minWidth}
      $overflow={overflow}
      data-testid="grid-container"
      {...props}
    >
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div<{
  $alignContent: ContentOptions;
  $alignItems: ItemsOptions;
  $columnGap?: GapOptions;
  $gap?: GapOptions;
  $gridAutoColumns?: string;
  $gridAutoFlow?: FlowOptions;
  $gridAutoRows?: string;
  $gridTemplateAreas?: string;
  $gridTemplateColumns?: string;
  $gridTemplateRows?: string;
  $gridTemplate?: string;
  $inline: boolean;
  $isResponsive: boolean;
  $justifyContent: ContentOptions;
  $justifyItems: ItemsOptions;
  $rowGap?: GapOptions;
  $height?: string;
  $maxHeight?: string;
  $minHeight?: string;
  $fillWidth: boolean;
  $maxWidth?: string;
  $minWidth?: string;
  $overflow?: string;
}>`
  align-items: ${({ $alignItems = "stretch" }) => $alignItems};
  align-content: ${({ $alignContent = "stretch" }) => $alignContent};
  display: ${({ $inline }) => ($inline === true ? "inline-grid" : "grid")};
  ${({ $gridAutoColumns }) =>
    $gridAutoColumns ? `grid-auto-columns: ${$gridAutoColumns}` : ""};
  ${({ $gridAutoFlow }) => ($gridAutoFlow ? `grid-auto-flow: ${$gridAutoFlow}` : "")};
  ${({ $gridAutoRows }) => ($gridAutoRows ? `grid-auto-rows: ${$gridAutoRows}` : "")};
  ${({ $gridTemplateAreas }) =>
    $gridTemplateAreas ? `grid-template-area: ${$gridTemplateAreas}` : ""};
  ${({ $gridTemplateColumns }) =>
    $gridTemplateColumns ? `grid-template-columns: ${$gridTemplateColumns}` : ""};
  ${({ $gridTemplateRows }) =>
    $gridTemplateRows ? `grid-template-rows: ${$gridTemplateRows}` : ""};
  ${({ $gridTemplate }) => ($gridTemplate ? `grid-template:  ${$gridTemplate}` : "")};
  justify-content: ${({ $justifyContent = "stretch" }) => $justifyContent};
  justify-items: ${({ $justifyItems = "stretch" }) => $justifyItems};
  ${({ theme, $gap, $columnGap, $rowGap }) => `
    gap: ${$gap ? theme.click.gridContainer.gap[$gap] : "inherit"};
    ${$columnGap ? `column-gap: ${theme.click.gridContainer.gap[$columnGap]};` : ""}
    ${$rowGap ? `row-gap: ${theme.click.gridContainer.gap[$rowGap]};` : ""}
  `}

  ${({ $fillWidth, $maxWidth, $minWidth }) => `
    width: ${$fillWidth ? "100%" : "auto"};
    ${typeof $maxWidth === "string" ? `max-width: ${$maxWidth};` : ""}
    ${typeof $minWidth === "string" ? `min-width: ${$minWidth};` : ""}
  `}
  ${({ $height, $maxHeight, $minHeight }) => `
    ${typeof $height === "string" ? `height: ${$height};` : ""}
    ${typeof $maxHeight === "string" ? `max-height: ${$maxHeight};` : ""}
    ${typeof $minHeight === "string" ? `min-height: ${$minHeight};` : ""}
  `}
  ${({ $overflow }) => `
    ${typeof $overflow === "string" ? `overflow: ${$overflow};` : ""}
  `}

  @media (max-width: ${({ theme }) => theme.breakpoint.sizes.md}) {
    grid-template-columns: ${({ $isResponsive = true }) =>
      $isResponsive === true
        ? "1fr"
        : ({ $gridTemplateColumns }) => $gridTemplateColumns || "auto"};
  }
`;

export { GridContainer };
