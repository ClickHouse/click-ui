import { memo } from "react";
import { GridChildComponentProps, areEqual } from "react-window";
import { ItemDataType } from "./types";
import { StyledCell } from "./StyledCell";

export const Cell = memo(
  ({
    data,
    rowIndex,
    columnIndex,
    style,
    ...props
  }: GridChildComponentProps<ItemDataType>) => {
    const {
      cell: CellData,
      getSelectionType,
      focus,
      columnCount,
      rowCount,
      showRowNumber,
      showHeader,
      rowHeight,
      rounded,
    } = data;

    const { row: focusedRow, column: focusedColumn } = focus;
    const isFocused = columnIndex === focusedColumn && rowIndex === focusedRow;
    const rightOfFocus = columnIndex - 1 === focusedColumn && rowIndex === focusedRow;
    const belowFocus = columnIndex === focusedColumn && rowIndex - 1 === focusedRow;

    const selectionType = getSelectionType({
      row: rowIndex,
      column: columnIndex,
      type: "cell",
    });
    const rightSelection = getSelectionType({
      row: rowIndex,
      column: columnIndex - 1,
      type: "cell",
    });
    const belowSelection = getSelectionType({
      row: rowIndex - 1,
      column: columnIndex,
      type: "cell",
    });
    const rightOfSelectionBorder =
      (selectionType === "selectDirect" || rightSelection === "selectDirect") &&
      selectionType !== rightSelection;
    const belowSelectionBorder =
      (selectionType === "selectDirect" || belowSelection === "selectDirect") &&
      selectionType !== belowSelection;

    const selectionBorderLeft = rightOfSelectionBorder || rightOfFocus || isFocused;
    const selectionBorderTop = belowSelectionBorder || belowFocus || isFocused;
    return (
      <div style={style}>
        <StyledCell
          as={CellData}
          rowIndex={rowIndex}
          columnIndex={columnIndex}
          type="row-cell"
          $isSelectedTop={selectionBorderTop}
          $isSelectedLeft={selectionBorderLeft}
          $isFocused={isFocused}
          $isLastRow={rowCount - 1 === rowIndex}
          $isLastColumn={columnCount - 1 === columnIndex}
          $isFirstColumn={columnIndex === 0 && !showRowNumber}
          $isFirstRow={rowIndex === 0 && !showHeader}
          $selectionType={selectionType}
          $height={rowHeight}
          $rounded={rounded}
          data-row={rowIndex}
          data-column={columnIndex}
          {...props}
        />
      </div>
    );
  },
  areEqual
);
