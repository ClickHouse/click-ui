import React from "react";
import clsx from "clsx";
import { SelectionType } from "./types";
import styles from "./StyledCell.module.scss";

interface StyledCellProps extends React.ComponentPropsWithoutRef<"div"> {
  $isFocused: boolean;
  $selectionType: SelectionType;
  $isSelectedTop: boolean;
  $isSelectedLeft: boolean;
  $isLastRow: boolean;
  $isLastColumn: boolean;
  $isFirstRow: boolean;
  $isFirstColumn: boolean;
  $height: number;
  $type?: "body" | "header";
  $showBorder: boolean;
  $rowAutoHeight?: boolean;
}

export const StyledCell = React.forwardRef<HTMLDivElement, StyledCellProps>(
  (
    {
      $isFocused,
      $selectionType,
      $isSelectedTop,
      $isSelectedLeft,
      $isLastRow,
      $isLastColumn,
      $height,
      $type = "body",
      $showBorder,
      $rowAutoHeight,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const shouldShowPseudoBorder =
      $isSelectedTop ||
      $isSelectedLeft ||
      ($selectionType === "selectDirect" && ($isLastRow || $isLastColumn)) ||
      $rowAutoHeight;

    const cellClassName = clsx(
      styles.cuiStyledCell,
      {
        // Height variations
        [styles.cuiHeightFixed]: !$rowAutoHeight,
        [styles.cuiHeightAuto]: $rowAutoHeight,

        // Type and selection
        [styles.cuiTypeBody]: $type === "body",
        [styles.cuiTypeHeader]: $type === "header",
        [styles.cuiSelectionDefault]: $selectionType === "default",
        [styles.cuiSelectionSelectIndirect]: $selectionType === "selectIndirect",
        [styles.cuiSelectionSelectDirect]: $selectionType === "selectDirect",

        // Focus state
        [styles.cuiFocused]: $isFocused,

        // Border management
        [styles.cuiBorderNone]: $rowAutoHeight,
        [styles.cuiBorderRightNone]: !$isLastColumn,
        [styles.cuiBorderBottomNone]: !$isLastRow,

        // Last row/column border colors
        [styles.cuiLastRowBorder]: $isLastRow,
        [styles.cuiLastColumnBorder]: $isLastColumn,

        // Header specific border hiding
        [styles.cuiHeaderNoBorder]: $type === "header" && !$showBorder,

        // Pseudo-element borders
        [styles.cuiPseudoBorder]: shouldShowPseudoBorder,
        [styles.cuiSelectedTop]: $isSelectedTop,
        [styles.cuiSelectedLeft]: $isSelectedLeft,
        [styles.cuiSelectedBottomDirect]: $selectionType === "selectDirect" && $isLastRow,
        [styles.cuiSelectedRightDirect]:
          $selectionType === "selectDirect" && $isLastColumn,
        [styles.cuiPseudoBorderNone]: $rowAutoHeight,
      },
      className
    );

    const cellStyle: React.CSSProperties = {
      height: $rowAutoHeight ? "100%" : `${$height}px`,
      ...style,
    };

    return (
      <div
        ref={ref}
        className={cellClassName}
        style={cellStyle}
        {...rest}
      />
    );
  }
);

StyledCell.displayName = "StyledCell";
