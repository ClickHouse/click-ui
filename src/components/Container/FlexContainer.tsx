import { ElementType, HTMLAttributes } from "react";
import styled, { CSSProperties } from "styled-components";

interface StyledProps {
  $direction?: CSSProperties["flexDirection"];
  $wrap?: CSSProperties["flexWrap"];
  $inline?: boolean;
  $alignItems?: CSSProperties["alignItems"];
  $alignSelf?: CSSProperties["alignSelf"];
  $alignContent?: CSSProperties["alignContent"];
  $justifyItems?: CSSProperties["justifyItems"];
  $justifySelf?: CSSProperties["justifySelf"];
  $justifyContent?: CSSProperties["justifyContent"];
  $gap?: CSSProperties["gap"];
  $rowGap?: CSSProperties["rowGap"];
  $columnGap?: CSSProperties["columnGap"];
  $flexGrow?: CSSProperties["flexGrow"];
  $flexShrink?: CSSProperties["flexShrink"];
  $flexBasis?: CSSProperties["flexBasis"];
  $placeItems?: CSSProperties["placeItems"];
  $placeContent?: CSSProperties["placeContent"];
}

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  component?: string | ElementType;
  direction?: CSSProperties["flexDirection"];
  wrap?: CSSProperties["flexWrap"];
  inline?: boolean;
  alignItems?: CSSProperties["alignItems"];
  alignSelf?: CSSProperties["alignSelf"];
  alignContent?: CSSProperties["alignContent"];
  justifyItems?: CSSProperties["justifyItems"];
  justifySelf?: CSSProperties["justifySelf"];
  justifyContent?: CSSProperties["justifyContent"];
  gap?: CSSProperties["gap"];
  rowGap?: CSSProperties["rowGap"];
  columnGap?: CSSProperties["columnGap"];
  flexGrow?: CSSProperties["flexGrow"];
  flexShrink?: CSSProperties["flexShrink"];
  flexBasis?: CSSProperties["flexBasis"];
  placeItems?: CSSProperties["placeItems"];
  placeContent?: CSSProperties["placeContent"];
}

const Container = styled.div<StyledProps>`
  ${({
    $direction = "row",
    $wrap = "nowrap",
    $inline,
    $alignItems,
    $alignSelf,
    $alignContent,
    $flexGrow,
    $flexShrink,
    $flexBasis,
    $justifyItems,
    $justifySelf,
    $justifyContent,
    $gap,
    $rowGap,
    $columnGap,
    $placeItems,
    $placeContent,
  }) => `
    display: ${$inline ? "inline-flex" : "flex"};
    flex-flow: ${$direction} ${$wrap};
    ${$alignItems ? `align-items: ${$alignItems};` : ""}
    ${$alignSelf ? `align-self: ${$alignSelf};` : ""}
    ${$alignContent ? `align-content: ${$alignContent};` : ""}
    ${$justifyItems ? `justify-items: ${$justifyItems};` : ""}
    ${$justifySelf ? `justify-self: ${$justifySelf};` : ""}
    ${$justifyContent ? `justify-content: ${$justifyContent};` : ""}
    gap: ${$gap ? $gap : $rowGap && $columnGap ? `${$rowGap} ${$columnGap}` : ""};
    ${$flexGrow ? `flex-grow: ${$flexGrow};` : ""}
    ${$flexShrink ? `flex-shrink: ${$flexShrink};` : ""}
    ${$flexBasis ? `flex-basis: ${$flexBasis};` : ""}
    ${$placeItems ? `place-items: ${$placeItems};` : ""}
    ${$placeContent ? `place-content: ${$placeContent};` : ""}
  `}
`;

export const CUIFlexContainer = ({
  component: Component = "div",
  direction,
  wrap,
  inline,
  alignItems,
  alignContent,
  alignSelf,
  flexGrow,
  flexShrink,
  flexBasis,
  justifyContent,
  justifyItems,
  justifySelf,
  gap,
  rowGap,
  columnGap,
  placeItems,
  placeContent,
  ...props
}: FlexProps) => {
  return (
    <Container
      as={Component}
      $flexGrow={flexGrow}
      $flexShrink={flexShrink}
      $flexBasis={flexBasis}
      $direction={direction ?? "row"}
      $wrap={wrap ?? "nowrap"}
      $inline={inline}
      $alignItems={alignItems}
      $alignContent={alignContent}
      $alignSelf={alignSelf}
      $justifyContent={justifyContent}
      $justifyItems={justifyItems}
      $justifySelf={justifySelf}
      $gap={gap}
      $rowGap={rowGap}
      $columnGap={columnGap}
      $placeItems={placeItems}
      $placeContent={placeContent}
      {...props}
    />
  );
};
