import {
  HTMLAttributes,
  MouseEventHandler,
  PointerEventHandler,
  ReactElement,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { GridOnScrollProps, VariableSizeGrid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import RowNumberColumn from "./RowNumberColumn";
import Header from "./Header";
import styled from "styled-components";
import { GridProps, ItemDataType } from "./types";
import { useSelectionActions } from "./useSelectionActions";
import { useRefCallback } from "./useRefCallback";
import { mergeRefs } from "@/utils/mergeRefs";
import { Cell } from "./Cell";

const NO_BUTTONS_PRESSED = 0;

const GridContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  background: ${({ theme }) => theme.click.grid.body.cell.color.background.default};
  user-select: none;
  overflow-anchor: none;
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

const GridDataContainer = styled.div<{ $top: number; $left: number }>`
  position: absolute;
  top: 0;
  left: 0;
  ${({ $top, $left }) => `
    margin-top: ${$top}px;
    margin-left: ${$left}px;
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
    const [scrolledVertical, setScrolledVertical] = useState(false);
    const [scrolledHorizontal, setScrolledHorizontal] = useState(false);
    const dragState = useRef<number | false>(false);
    const gridRef = useRef<VariableSizeGrid>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const outerRef = useRef<HTMLDivElement>(null);
    const onCellSelect = useRefCallback(onSelectProp ?? emptyFn);
    const onFocusRefChange = useRefCallback(onFocusChangeProp);
    const rowNumberWidth = 16 + rowCount; // 128 includes 8px left and right padding and (8px + 8px + 8x(1ch) * rowcount)

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

    const scrollGridTo = useCallback(
      async ({ row, column }: { row?: number; column?: number }) => {
        const rowIndex = row ?? 0;
        const columnIndex = column ?? 0;
        gridRef.current?.scrollToItem({
          rowIndex: row,
          columnIndex: column,
        });
        await new Promise(requestAnimationFrame);
        const element = containerRef.current?.querySelector(
          `[data-row="${rowIndex}"][data-column="${columnIndex}"]`
        );
        element?.scrollIntoView({
          block: "nearest",
          inline: "nearest",
        });
      },
      []
    );
    const {
      getSelectionType,
      onSelection,
      onMouseMove: onMouseMovement,
      onKeyDown,
    } = useSelectionActions({
      onCellSelect,
      focus,
      columnCount,
      rowCount,
      onFocusRefChange,
      scrollGridTo,
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
      headerHeight,
      rowNumberWidth,
    };

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
        console.log("aaaaaaInside");
        const [minRow, maxRow, minColumn, maxColumn] = getRenderedCursor(children);
        return (
          <GridContainer
            {...containerProps}
            className={`sticky-grid__container grid-outer ${props.className ?? ""}`}
            role="listbox"
            ref={containerRef}
          >
            <GridDataContainer
              $top={showHeader ? headerHeight : 0}
              $left={showRowNumber ? rowNumberWidth : 0}
              ref={ref}
            >
              {children}
            </GridDataContainer>
            {showRowNumber && (
              <RowNumberColumn
                scrolledHorizontal={scrolledHorizontal}
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
                scrolledVertical={scrolledVertical}
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
    useEffect(() => {
      containerRef.current?.focus();
    }, []);
    useEffect(() => {
      const onFocus = e => {
        console.log("onFocus", e);
      };
      const onBlur = e => {
        console.log("onBlur", e);
      };
      window.addEventListener("focus", onFocus);
      window.addEventListener("focus", onBlur);
      return () => {
        window.removeEventListener("focus", onFocus);
        window.removeEventListener("focus", onBlur);
      };
    }, []);

    const onMouseDown: MouseEventHandler<HTMLDivElement> = useCallback(
      e => {
        containerRef.current?.focus();
        const target = (e.target as HTMLElement).closest(
          "[data-row][data-column]"
        ) as HTMLElement;
        if (
          !target ||
          target.dataset.row === undefined ||
          target.dataset.column === undefined
        ) {
          return;
        }

        const { row: rowIndexString, column: columnIndexString } = target.dataset;
        const row = parseInt(rowIndexString);
        const column = parseInt(columnIndexString);
        if (row === -1 && column === -1) {
          onSelection({ type: "all" });
          return;
        }
        const shiftKeyPressed = e.shiftKey;
        if (row === -1) {
          onSelection({
            type: shiftKeyPressed ? "shiftColumnSelection" : "columnSelection",
            column,
            event: "click",
          });
          if (!shiftKeyPressed) {
            onFocusRefChange(0, column);
          }
          return;
        }
        if (column === -1) {
          onSelection({
            type: shiftKeyPressed ? "shiftRowSelection" : "rowSelection",
            row,
            event: "click",
          });
          if (!shiftKeyPressed) {
            onFocusRefChange(row, 0);
          }
          return;
        }
        onSelection({
          type: shiftKeyPressed ? "shiftSelection" : "normal",
          row,
          column,
          event: "click",
        });
        if (!shiftKeyPressed) {
          onFocusRefChange(row, column);
        }
      },
      [onFocusRefChange, onSelection]
    );
    const onPointerDown: PointerEventHandler<HTMLDivElement> = useCallback(e => {
      dragState.current = e.pointerId;
    }, []);

    const setPointerCapture: PointerEventHandler<HTMLDivElement> = useCallback(e => {
      if (e.buttons === NO_BUTTONS_PRESSED || dragState.current === false) {
        return;
      }

      containerRef.current?.setPointerCapture(dragState.current);
    }, []);

    const onPointerUp: PointerEventHandler<HTMLDivElement> = useCallback(
      e => {
        if (containerRef.current) {
          containerRef.current.releasePointerCapture(e.pointerId);
          containerRef.current.focus();
        }
        dragState.current = false;
        onFocusRefChange(focus.row, focus.column);
      },
      [focus.column, focus.row, onFocusRefChange]
    );

    const onMouseMove: MouseEventHandler<HTMLDivElement> = useCallback(
      e => {
        e.preventDefault();
        e.stopPropagation();
        if (dragState.current === false || e.buttons === NO_BUTTONS_PRESSED) {
          return;
        }
        containerRef.current?.setPointerCapture(dragState.current);

        onMouseMovement(e);
      },
      [onMouseMovement]
    );

    const onScroll = ({ scrollLeft, scrollTop }: GridOnScrollProps) => {
      setScrolledVertical(scrollTop > 0);
      setScrolledHorizontal(scrollLeft > 0);
    };

    return (
      <div
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={setPointerCapture}
        onPointerEnter={setPointerCapture}
        onFocus={e => console.log("eeee", e)}
        onBlur={e => console.log("xxxxx", e)}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
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
              initialScrollTop={0}
              initialScrollLeft={0}
              columnWidth={columnWidth}
              rowCount={rowCount}
              onScroll={onScroll}
              outerRef={outerRef}
              onItemsRendered={props => console.log("render", props)}
              {...props}
            >
              {Cell}
            </VariableSizeGrid>
          )}
        </AutoSizer>
      </div>
    );
  }
);
