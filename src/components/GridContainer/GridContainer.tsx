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
}

const GridContainer = ({
  alignItems = "stretch",
  alignContent = "stretch",
  children,
  columnGap = "none",
  gap = "unset",
  gridAutoColumns = "",
  gridAutoFlow = "row",
  gridAutoRows = "",
  gridTemplateAreas = "",
  gridTemplateColumns = "",
  gridTemplateRows = "",
  gridTemplate = "",
  inline = false,
  isResponsive = true,
  justifyContent = "stretch",
  justifyItems = "stretch",
  rowGap = "none",
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
  $columnGap: GapOptions;
  $gap: GapOptions;
  $gridAutoColumns: string;
  $gridAutoFlow: FlowOptions;
  $gridAutoRows: string;
  $gridTemplateAreas: string;
  $gridTemplateColumns: string;
  $gridTemplateRows: string;
  $gridTemplate: string;
  $inline: boolean;
  $isResponsive: boolean;
  $justifyContent: ContentOptions;
  $justifyItems: ItemsOptions;
  $rowGap: GapOptions;
}>`
  align-items: ${({ $alignItems = "stretch" }) => $alignItems};
  align-content: ${({ $alignContent = "stretch" }) => $alignContent};
  column-gap: ${({ theme, $columnGap }) => theme.click.gridContainer.gap[$columnGap]};
  display: ${({ $inline }) => ($inline === true ? "inline-grid" : "grid")};
  gap: ${({ theme, $gap }) => theme.click.gridContainer.gap[$gap]};
  grid-auto-columns: ${({ $gridAutoColumns }) => $gridAutoColumns || "auto"};
  grid-auto-flow: ${({ $gridAutoFlow }) => $gridAutoFlow || "auto"};
  grid-auto-rows: ${({ $gridAutoRows }) => $gridAutoRows || "auto"};
  grid-template-area: ${({ $gridTemplateAreas }) => $gridTemplateAreas || "auto"};
  grid-template-columns: ${({ $gridTemplateColumns }) => $gridTemplateColumns || "auto"};
  grid-template-rows: ${({ $gridTemplateRows }) => $gridTemplateRows || "auto"};
  grid-template: ${({ $gridTemplate }) => $gridTemplate || "auto"};
  justify-content: ${({ $justifyContent = "stretch" }) => $justifyContent};
  justify-items: ${({ $justifyItems = "stretch" }) => $justifyItems};
  row-gap: ${({ theme, $rowGap }) => theme.click.gridContainer.gap[$rowGap]};

  @media (max-width: ${({ theme }) => theme.breakpoint.sizes.md}) {
    grid-template-columns: ${({ $isResponsive = true }) =>
      $isResponsive === true
        ? "1fr"
        : ({ $gridTemplateColumns }) => $gridTemplateColumns || "auto"};
  }
`;

export { GridContainer };
