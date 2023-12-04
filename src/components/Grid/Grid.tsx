import {
  HTMLAttributes,
  ReactElement,
  forwardRef,
  memo,
  useCallback,
  useRef,
  useState,
} from "react";
import {
  VariableSizeGrid,
  areEqual,
  GridChildComponentProps,
  VariableSizeGridProps,
} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import RowNumberColumn from "./RowNumberColumn";
import Header from "./Header";
import styled, { useTheme } from "styled-components";
import {
  CellProps,
  SelectionTypeFn,
  SelectionType,
  onSelectFn,
  RoundedType,
  ColumnResizeFn,
  SelectionAction,
  KeyEventType,
  SelectionFocus,
} from "./types";
import { useSelectionActions } from "./useSelectionActions";
import { useRefCallback } from "./useRefCallback";
import { mergeRefs } from "@/utils/mergeRefs";
import { StyledCell } from "./StyledCell";

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

interface ItemDataType {
  showRowNumber: boolean;
  showHeader: boolean;
  getSelectionType: SelectionTypeFn;
  rowCount: number;
  columnCount: number;
  cell: CellProps;
  focus: SelectionFocus;
  rounded: RoundedType;
  onFocusChange: any;
  rowHeight: number;
}

const Cell = memo(
  ({ data, rowIndex, columnIndex, ...props }: GridChildComponentProps<ItemDataType>) => {
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
      onFocusChange,
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
    const rightOfSelectionBorder =
      selectionType !==
      getSelectionType({
        row: rowIndex,
        column: columnIndex - 1,
        type: "cell",
      });
    const belowSelectionBorder =
      selectionType !==
      getSelectionType({
        row: rowIndex - 1,
        column: columnIndex,
        type: "cell",
      });

    const selectionBorderLeft = rightOfSelectionBorder || rightOfFocus || isFocused;
    const selectionBorderTop = belowSelectionBorder || belowFocus || isFocused;
    const onClick = () => {
      onFocusChange(rowIndex, columnIndex);
      console.log("onClick");
    };
    return (
      <StyledCell
        as={CellData}
        rowIndex={rowIndex}
        columnIndex={columnIndex}
        type="row-cell"
        $isSelectedTop={selectionBorderTop}
        $isSelectedLeft={selectionBorderLeft}
        $isFocused={isFocused}
        $isLastRow={rowCount === rowIndex - 1}
        $isLastColumn={columnCount === columnIndex - 1}
        $isFirstColumn={columnIndex === 0 && !showRowNumber}
        $isFirstRow={rowIndex === 0 && !showHeader}
        $selectionType={selectionType}
        $height={rowHeight}
        $rounded={rounded}
        onClick={onClick}
        {...props}
      />
    );
  },
  areEqual
);

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
      onFocusChange,
      ...props
    },
    forwardedRed
  ) => {
    const gridRef = useRef<VariableSizeGrid>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const onCellSelect = useRefCallback(onSelectProp);
    const { getSelectionType, moveSelection, clearSelection, onSelection } =
      useSelectionActions({
        onCellSelect,
        focus,
        columnCount,
        rowCount,
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
      onFocusChange,
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

    const onDragStart = e => {
      console.log("dragstart", e);
    };
    const onDragEnd = e => {
      console.log("dragend", e);
    };

    const scrollGridTo = useCallback((columnIndex: number, rowIndex: number) => {
      if (gridRef.current) {
        gridRef.current.scrollToItem({
          columnIndex,
          rowIndex,
        });
      }
    }, []);

    const onChangeFocusEvent = useCallback(
      (row: number, column: number) => {
        const corrected = onFocusChange(row, column);
        scrollGridTo(column, row);
        return corrected;
      },
      [onFocusChange, scrollGridTo]
    );

    const clearSelectionAndFocus = useCallback(
      (force: boolean) => {
        clearSelection(force);
        containerRef.current && containerRef.current.focus();
      },
      [clearSelection, containerRef]
    );

    const changeSelectionAndFocus = useCallback(
      (action: SelectionAction, event: KeyEventType = "click") => {
        onSelection({ ...action, event });
        containerRef.current && containerRef.current.focus();
      },
      [onSelection]
    );

    const onKeyDown = useCallback(
      async (e: React.KeyboardEvent) => {
        console.log("asasas");
        e.preventDefault();
        const moveAnchor = e.shiftKey;

        const applyAction = (action: SelectionAction | null): void => {
          if (action) {
            changeSelectionAndFocus(action);
          }
          if (action?.type === "normal") {
            onChangeFocusEvent(action.row, action.column);
          }
        };

        switch (e.key) {
          case "ArrowLeft":
            applyAction(moveSelection(-1, 0, moveAnchor, "keypress"));
            break;
          case "ArrowRight":
            applyAction(moveSelection(1, 0, moveAnchor, "keypress"));
            break;
          case "ArrowUp":
            applyAction(moveSelection(0, -1, moveAnchor, "keypress"));
            break;
          case "ArrowDown":
            applyAction(moveSelection(0, 1, moveAnchor, "keypress"));
            break;
          case "Enter":
            changeSelectionAndFocus(
              { type: "normal", row: focus.row, column: focus.column },
              "keypress"
            );
            break;
          case "Escape":
            clearSelectionAndFocus(true);
            break;
        }
      },
      [
        changeSelectionAndFocus,
        onChangeFocusEvent,
        moveSelection,
        focus,
        clearSelectionAndFocus,
      ]
    );
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
          <div
            className="sticky-grid__container"
            ref={mergeRefs([containerRef, ref])}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onKeyDown={onKeyDown}
            {...containerProps}
          >
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

            <GridDataContainer
              $top={headerHeight}
              $left={rowNumberWidth}
            >
              {children}
            </GridDataContainer>
          </div>
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
