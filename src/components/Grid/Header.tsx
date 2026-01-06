import React from "react";
import clsx from "clsx";
import {
  CellProps,
  ColumnResizeFn,
  GetResizerPositionFn,
  SelectionTypeFn,
} from "./types";
import { StyledCell } from "./StyledCell";
import ColumnResizer from "./ColumnResizer";
import { ResizingState } from "./useResizingState";
import styles from "./Header.module.scss";

interface HeaderProps {
  showRowNumber: boolean;
  rowNumberWidth: number;
  minColumn: number;
  maxColumn: number;
  height: number;
  getColumnWidth: (index: number) => number;
  cell: CellProps;
  getSelectionType: SelectionTypeFn;
  columnCount: number;
  onColumnResize: ColumnResizeFn;
  getColumnHorizontalPosition: (columnIndex: number) => number;
  scrolledVertical: boolean;
  getResizerPosition: GetResizerPositionFn;
  showBorder: boolean;
  scrolledHorizontal: boolean;
  resizingState: ResizingState;
}

interface ColumnProps extends Pick<
  HeaderProps,
  | "cell"
  | "getSelectionType"
  | "onColumnResize"
  | "getColumnWidth"
  | "height"
  | "getResizerPosition"
  | "showBorder"
  | "getColumnHorizontalPosition"
  | "resizingState"
> {
  columnIndex: number;
  isFirstColumn: boolean;
  isLastColumn: boolean;
}

const Column = ({
  columnIndex,
  cell,
  getColumnWidth,
  getColumnHorizontalPosition,
  getSelectionType,
  isFirstColumn,
  isLastColumn,
  onColumnResize,
  height,
  getResizerPosition,
  showBorder,
  resizingState,
}: ColumnProps) => {
  const selectionType = getSelectionType({
    column: columnIndex,
    type: "column",
  });
  const leftSelectionType = getSelectionType({
    column: columnIndex - 1,
    type: "column",
  });
  const columnPosition = getColumnHorizontalPosition(columnIndex);

  const isSelected = selectionType === "selectDirect";
  const isSelectedLeft =
    (leftSelectionType === "selectDirect" || isSelected) &&
    leftSelectionType !== selectionType;

  const columnWidth = getColumnWidth(columnIndex);
  return (
    <div
      className={styles.cuiHeaderCellContainer}
      style={{
        width: typeof columnWidth === "string" ? columnWidth : `${columnWidth}px`,
        height: `${height}px`,
        left: `${columnPosition}px`,
      }}
      data-header={columnIndex}
    >
      <StyledCell
        $type="header"
        $isFirstColumn={isFirstColumn}
        $selectionType={selectionType}
        $isLastColumn={isLastColumn}
        $isFocused={false}
        $isSelectedLeft={isSelectedLeft}
        $isSelectedTop={isSelected}
        $isLastRow={false}
        $isFirstRow
        $height={height}
        data-grid-row={-1}
        data-grid-column={columnIndex}
        data-selected={isSelected}
        $showBorder={showBorder}
      >
        {React.createElement(cell, {
          columnIndex,
          type: "header-cell",
          width: columnWidth,
        })}
      </StyledCell>
      <ColumnResizer
        height={height}
        onColumnResize={onColumnResize}
        columnIndex={columnIndex}
        getResizerPosition={getResizerPosition}
        columnWidth={columnWidth}
        resizingState={resizingState}
      />
    </div>
  );
};

const Header = ({
  scrolledVertical,
  scrolledHorizontal,
  showRowNumber,
  rowNumberWidth,
  minColumn,
  maxColumn,
  height,
  getColumnWidth,
  cell,
  columnCount,
  getSelectionType,
  onColumnResize,
  getColumnHorizontalPosition,
  getResizerPosition,
  showBorder,
  resizingState,
}: HeaderProps) => {
  const selectedAllType = getSelectionType({
    type: "all",
  });
  return (
    <div
      className={clsx(styles.cuiHeaderContainer, {
        [styles.cuiScrolledVertical]: scrolledVertical,
      })}
      style={{ height: `${height}px` }}
    >
      <div
        className={styles.cuiScrollableHeaderContainer}
        style={{ left: `${rowNumberWidth}px` }}
      >
        {Array.from(
          { length: maxColumn - minColumn + 1 },
          (_, index) => minColumn + index
        ).map(columnIndex => (
          <Column
            key={`header-${columnIndex}`}
            getSelectionType={getSelectionType}
            columnIndex={columnIndex}
            getColumnWidth={getColumnWidth}
            getColumnHorizontalPosition={getColumnHorizontalPosition}
            cell={cell}
            isFirstColumn={columnIndex === 0 && !showRowNumber}
            isLastColumn={columnIndex + 1 === columnCount}
            onColumnResize={onColumnResize}
            height={height}
            getResizerPosition={getResizerPosition}
            showBorder={showBorder}
            resizingState={resizingState}
          />
        ))}
      </div>
      {showRowNumber && (
        <div
          className={clsx(styles.cuiRowColumnContainer, {
            [styles.cuiScrolledHorizontal]: scrolledHorizontal,
          })}
          style={{
            width:
              typeof rowNumberWidth === "string" ? rowNumberWidth : `${rowNumberWidth}px`,
            height: `${height}px`,
            left: "0px",
          }}
        >
          <StyledCell
            className={styles.cuiRowColumn}
            data-selected={selectedAllType === "selectDirect"}
            $type="header"
            $isFirstRow
            $isFirstColumn
            $selectionType={selectedAllType}
            $isLastRow={false}
            $isLastColumn={false}
            $height={height}
            $isFocused={false}
            $isSelectedLeft={false}
            $isSelectedTop={false}
            data-grid-row={-1}
            data-grid-column={-1}
            $showBorder={showBorder}
          >
            #
          </StyledCell>
        </div>
      )}
    </div>
  );
};

export default Header;
