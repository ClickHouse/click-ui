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
      rowStart,
    } = data;

    const currentRowIndex = rowIndex + rowStart;
    const { row: focusedRow, column: focusedColumn } = focus;
    const isFocused = columnIndex === focusedColumn && currentRowIndex === focusedRow;
    const rightOfFocus =
      columnIndex - 1 === focusedColumn && currentRowIndex === focusedRow;
    const belowFocus =
      columnIndex === focusedColumn && currentRowIndex - 1 === focusedRow;

    const selectionType = getSelectionType({
      row: currentRowIndex,
      column: columnIndex,
      type: "cell",
    });
    const rightSelection = getSelectionType({
      row: currentRowIndex,
      column: columnIndex - 1,
      type: "cell",
    });
    const belowSelection = getSelectionType({
      row: currentRowIndex - 1,
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
      <div
        style={style}
        data-row={currentRowIndex}
        data-column={columnIndex}
      >
        <StyledCell
          as={CellData}
          rowIndex={currentRowIndex}
          columnIndex={columnIndex + rowStart}
          type="row-cell"
          data-selected={isFocused || selectionType === "selectDirect"}
          data-focused={isFocused}
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
          data-grid-row={currentRowIndex}
          data-grid-column={columnIndex}
          $showBorder
          {...props}
        />
      </div>
    );
  },
  areEqual
);
