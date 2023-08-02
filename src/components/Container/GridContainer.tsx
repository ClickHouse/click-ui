import { ElementType, HTMLAttributes } from "react";
import styled, { CSSProperties } from "styled-components";

interface StyledProps {
  $inline?: boolean;
  $rows?: number;
  $columns?: number;
  $gap?: string;
  $rowGap?: string;
  $columnGap?: string;
  $gridAutoFlow?: CSSProperties["gridAutoFlow"];
  $gridAutoRows?: CSSProperties["gridAutoRows"];
  $gridAutoColumns?: CSSProperties["gridAutoColumns"];
  $gridTemplate?: CSSProperties["gridTemplate"];
  $gridTemplateRows?: CSSProperties["gridTemplateRows"];
  $gridTemplateColumns?: CSSProperties["gridTemplateColumns"];
  $gridRow?: CSSProperties["gridRow"];
  $gridColumn?: CSSProperties["gridColumn"];
  $gridArea?: CSSProperties["gridArea"];
  $justifyItems?: CSSProperties["justifyItems"];
  $alignContent?: CSSProperties["alignContent"];
  $justifyContent?: CSSProperties["justifyContent"];
  $alignItems?: CSSProperties["alignItems"];
  $placeItems?: CSSProperties["placeItems"];
  $placeContent?: CSSProperties["placeContent"];
}

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  component?: ElementType | string;
  inline?: boolean;
  rows?: number;
  columns?: number;
  gap?: string;
  rowGap?: string;
  columnGap?: string;
  gridAutoFlow?: CSSProperties["gridAutoFlow"];
  gridAutoRows?: CSSProperties["gridAutoRows"];
  gridAutoColumns?: CSSProperties["gridAutoColumns"];
  gridTemplate?: CSSProperties["gridTemplate"];
  gridTemplateRows?: CSSProperties["gridTemplateRows"];
  gridTemplateColumns?: CSSProperties["gridTemplateColumns"];
  gridRow?: CSSProperties["gridRow"];
  gridColumn?: CSSProperties["gridColumn"];
  gridArea?: CSSProperties["gridArea"];
  justifyItems?: CSSProperties["justifyItems"];
  alignContent?: CSSProperties["alignContent"];
  justifyContent?: CSSProperties["justifyContent"];
  alignItems?: CSSProperties["alignItems"];
  placeItems?: CSSProperties["placeItems"];
  placeContent?: CSSProperties["placeContent"];
}

const Container = styled.div<StyledProps>`
  ${({
    $inline,
    $rows,
    $columns,
    $gap,
    $rowGap,
    $columnGap,
    $gridAutoFlow,
    $gridAutoRows,
    $gridAutoColumns,
    $gridTemplate,
    $gridTemplateRows,
    $gridTemplateColumns,
    $gridRow,
    $gridColumn,
    $gridArea,
    $justifyItems,
    $alignContent,
    $justifyContent,
    $alignItems,
    $placeItems,
    $placeContent,
  }) => `
    display: ${$inline ? "inline-grid" : "grid"};
    ${$gridTemplate ? `grid-template: ${$gridTemplate};` : ""}
    ${
      !$gridTemplate && ($gridTemplateRows || $rows)
        ? `grid-template: ${$gridTemplateRows ?? `repeat(${$rows}, 1fr)`};`
        : ""
    }
    ${
      !$gridTemplate && ($gridTemplateColumns || $columns)
        ? `grid-template: ${$gridTemplateColumns ?? `repeat(${$columns}, 1fr)`};`
        : ""
    }
    ${$alignItems ? `align-items: ${$alignItems};` : ""}
    ${$alignContent ? `align-content: ${$alignContent};` : ""}
    ${$justifyItems ? `justify-items: ${$justifyItems};` : ""}
    ${$justifyContent ? `justify-content: ${$justifyContent};` : ""}
    ${$alignItems ? `align-items: ${$alignItems};` : ""}
    ${$alignContent ? `align-content: ${$alignContent};` : ""}
    ${$justifyItems ? `justify-items: ${$justifyItems};` : ""}
    ${$justifyContent ? `justify-content: ${$justifyContent};` : ""}
    ${$placeItems ? `place-items: ${$placeItems};` : ""}
    ${$placeContent ? `place-content: ${$placeContent};` : ""}
    gap: ${$gap ? $gap : $rowGap && $columnGap ? `${$rowGap} ${$columnGap}` : ""};
    ${$gridAutoFlow ? `gri-auto-flow: ${$gridAutoFlow};` : ""}
    ${$gridAutoRows ? `gri-auto-rows: ${$gridAutoRows};` : ""}
    ${$gridAutoColumns ? $gridAutoColumns : ""}
    ${$gridArea ? `grid-area: ${$gridArea};` : ""}
    ${$gridRow ? `grid-row: ${$gridRow};` : ""}
    ${$gridColumn ? `grid-column: ${$gridColumn};` : ""}
  `}
`;

const CUIGridContainer = ({
  component: Component = "div",
  inline,
  rows,
  columns,
  gap,
  rowGap,
  columnGap,
  gridAutoFlow,
  gridAutoRows,
  gridAutoColumns,
  gridTemplate,
  gridTemplateRows,
  gridTemplateColumns,
  gridRow,
  gridColumn,
  gridArea,
  justifyItems,
  alignContent,
  justifyContent,
  alignItems,
  placeItems,
  placeContent,
  ...props
}: GridProps) => {
  return (
    <Container
      as={Component}
      $inline={inline}
      $rows={rows}
      $columns={columns}
      $gap={gap}
      $alignItems={alignItems}
      $alignContent={alignContent}
      $justifyContent={justifyContent}
      $justifyItems={justifyItems}
      $rowGap={rowGap}
      $columnGap={columnGap}
      $gridAutoFlow={gridAutoFlow}
      $gridAutoRows={gridAutoRows}
      $gridAutoColumns={gridAutoColumns}
      $gridTemplate={gridTemplate}
      $gridTemplateRows={gridTemplateRows}
      $gridTemplateColumns={gridTemplateColumns}
      $gridRow={gridRow}
      $gridColumn={gridColumn}
      $gridArea={gridArea}
      $placeItems={placeItems}
      $placeContent={placeContent}
      {...props}
    />
  );
};

const GridItem = styled(Container)<{
  $gridArea?: CSSProperties["gridArea"];
  $gridColumn?: CSSProperties["gridColumn"];
  $gridRow?: CSSProperties["gridRow"];
}>`
  ${({ $gridArea, $gridColumn, $gridRow }) => `
    ${$gridArea ? `grid-area: ${$gridArea};` : ""}
    ${$gridRow ? `grid-row: ${$gridRow};` : ""}
    ${$gridColumn ? `grid-column: ${$gridColumn};` : ""}
  `}
`;

interface GridItemProps extends HTMLAttributes<HTMLDivElement> {
  component?: ElementType | string;
  gridRow?: CSSProperties["gridRow"];
  gridColumn?: CSSProperties["gridColumn"];
  gridArea?: CSSProperties["gridArea"];
}

const CUIGridItem = ({
  component: Component = "div",
  gridArea,
  gridColumn,
  gridRow,
  ...props
}: GridItemProps) => {
  return (
    <GridItem
      as={Component}
      $gridArea={gridArea}
      $gridColumn={gridColumn}
      $gridRow={gridRow}
      {...props}
    />
  );
};
export { CUIGridContainer, CUIGridItem };
