import {
  HTMLAttributes,
  MouseEvent,
  PointerEvent,
  ReactElement,
  forwardRef,
  memo,
  useCallback,
  useRef,
  useState,
} from "react";
import { VariableSizeGrid, VariableSizeGridProps } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import RowNumberColumn from "./RowNumberColumn";
import Header from "./Header";
import styled, { useTheme } from "styled-components";
import {
  CellProps,
  onSelectFn,
  RoundedType,
  ColumnResizeFn,
  SelectionAction,
  KeyEventType,
  SelectionFocus,
  ItemDataType,
} from "./types";
import { useSelectionActions } from "./useSelectionActions";
import { useRefCallback } from "./useRefCallback";
import { mergeRefs } from "@/utils/mergeRefs";
import { Cell } from "./Cell";

interface GridProps
  extends Omit<VariableSizeGridProps, "height" | "width" | "rowHeight" | "children"> {
  rounded?: RoundedType;
  focus: SelectionFocus;
  rowHeight?: number;
  cell: CellProps;
  showHeader?: boolean;
  showRowNumber?: boolean;
  headerHeight: number;
  onFocusChange: (rowIndex: number, columnIndex: number) => void;
  onSelect?: onSelectFn;
  onColumnResize: ColumnResizeFn;
}

const GridContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  background: ${({ theme }) => theme.click.grid.body.cell.color.background.default};
`;

const getRenderedCursor = (children: Array<ReactElement>) =>
  children.reduce(
    ([minRow, maxRow, minColumn, maxColumn], { props: { columnIndex, rowIndex } }) => {
      if (rowIndex < minRow) {
        minRow = rowIndex;
      }
      if (rowIndex > maxRow) {
        maxRow = rowIndex;
      }
      if (columnIndex < minColumn) {
        minColumn = columnIndex;
      }
      if (columnIndex > maxColumn) {
        maxColumn = columnIndex;
      }

      return [minRow, maxRow, minColumn, maxColumn];
    },
    [
      Number.POSITIVE_INFINITY,
      Number.NEGATIVE_INFINITY,
      Number.POSITIVE_INFINITY,
      Number.NEGATIVE_INFINITY,
    ]
  );

const GridDataContainer = styled.div<{ $top: number; $left: string }>`
  position: absolute;
  ${({ $top, $left }) => `
    top: ${$top}px;
    left: ${$left};
  `}
`;
interface InnerElementTypeTypes extends HTMLAttributes<HTMLDivElement> {
  children: Array<ReactElement>;
}
const emptyFn = () => null;

export const Grid = forwardRef<VariableSizeGrid, GridProps>(
  (
    {
      showRowNumber = true,
      rounded = "none",
      showHeader = true,
      focus,
      useIsScrolling = true,
      rowHeight = 33,
      columnCount,
      columnWidth,
      onSelect: onSelectProp,
      headerHeight,
      rowCount,
      cell,
      onColumnResize: onColumnResizeProp,
      onFocusChange: onFocusChangeProp,
      ...props
    },
    forwardedRed
  ) => {
    const onCellSelect = useRefCallback(onSelectProp ?? emptyFn);
    const onFocusRefChange = useRefCallback(onFocusChangeProp);

    const {
      getSelectionType,
      onMouseDown,
      onMouseMove,
      onKeyDown,
      containerRef,
      gridRef,
      onPointerDown,
      onPointerUp,
    } = useSelectionActions({
      onCellSelect,
      focus,
      columnCount,
      rowCount,
      onFocusRefChange,
    });
    const data: ItemDataType = {
      showRowNumber,
      cell,
      rowCount,
      columnCount,
      rounded,
      showHeader,
      focus,
      getSelectionType,
      rowHeight,
    };
    const [columnHorizontalPosition, setColumnHorizontalPosition] = useState<
      Array<number>
    >(() => {
      const columnWidthList = [...Array(columnCount).keys()];
      const array: Array<number> = [];
      return columnWidthList.reduce((acc, curr, index) => {
        const width = columnWidth(curr - 1);
        if (index !== 0) {
          acc.push(width + acc[index - 1]);
        } else {
          acc.push(0);
        }
        return acc;
      }, array);
    });

    const theme = useTheme();
    const rowNumberWidth = `calc(${rowCount.toString().length}ch + ${
      theme.click.grid.body.cell.space.x
    } + ${theme.click.grid.body.cell.space.x})`;

    const onColumnResize = (columnIndex: number, newWidth: number) => {
      setColumnHorizontalPosition(columnHorizontalPosition => {
        const originalWidthForUpdatedColumn = columnHorizontalPosition[columnIndex];
        for (let i = columnIndex + 1; i < columnCount; i++) {
          columnHorizontalPosition[i] += newWidth - originalWidthForUpdatedColumn;
        }
        return [...columnHorizontalPosition];
      });
      onColumnResizeProp(columnIndex, newWidth);
    };

    const InnerElementType = forwardRef<HTMLDivElement, InnerElementTypeTypes>(
      ({ children, ...containerProps }, ref) => {
        const [minRow, maxRow, minColumn, maxColumn] = getRenderedCursor(children);
        return (
          <GridContainer
            className="sticky-grid__container"
            ref={mergeRefs([containerRef, ref])}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onKeyDown={onKeyDown}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            {...containerProps}
          >
            <GridDataContainer
              $top={headerHeight}
              $left={rowNumberWidth}
            >
              {children}
            </GridDataContainer>
            {showRowNumber && (
              <RowNumberColumn
                minRow={minRow}
                maxRow={maxRow}
                rowHeight={rowHeight}
                headerHeight={headerHeight}
                rowWidth={rowNumberWidth}
                rowCount={rowCount}
                rounded={rounded}
                getSelectionType={getSelectionType}
                showHeader={showHeader}
              />
            )}

            {showHeader && (
              <Header
                showRowNumber={showRowNumber}
                minColumn={minColumn}
                maxColumn={maxColumn}
                height={headerHeight}
                columnWidth={columnWidth}
                cell={cell}
                rowNumberWidth={rowNumberWidth}
                rounded={rounded}
                getSelectionType={getSelectionType}
                columnCount={columnCount}
                onColumnResize={onColumnResize}
                columnHorizontalPosition={columnHorizontalPosition}
              />
            )}
          </GridContainer>
        );
      }
    );
    return (
      <AutoSizer>
        {({ height, width }) => (
          <VariableSizeGrid
            ref={mergeRefs([forwardedRed, gridRef])}
            height={height}
            width={width}
            columnCount={columnCount}
            rowHeight={() => rowHeight}
            useIsScrolling={useIsScrolling}
            innerElementType={InnerElementType}
            itemData={data}
            initialScrollTop={focus.row}
            initialScrollLeft={focus.column}
            columnWidth={columnWidth}
            rowCount={rowCount}
            {...props}
          >
            {Cell}
          </VariableSizeGrid>
        )}
      </AutoSizer>
    );
  }
);
