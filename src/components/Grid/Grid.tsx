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
    const elementBorderRef = useRef({
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      scrollBarWidth: 0,
      scrollBarHeight: 0,
      width: 0,
      height: 0,
    });
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
        if (!outerRef.current) {
          return;
        }

        const rowIndex = row ?? 0;
        const columnIndex = column ?? 0;
        let element = outerRef.current?.querySelector<HTMLElement>(
          `[data-row="${rowIndex}"][data-column="${columnIndex}"]`
        );
        if (element) {
          let left = 0,
            top = 0;
          if (outerRef.current?.scrollLeft - element.offsetLeft > 0) {
            left = element.offsetLeft - outerRef.current?.scrollLeft;
          }
          if (outerRef.current?.scrollTop - element.offsetTop > 0) {
            top = element.offsetTop - outerRef.current?.scrollTop;
          }
          outerRef.current.scrollBy(left, top);
        } else {
          gridRef.current?.scrollToItem({
            rowIndex: row,
            columnIndex: column,
          });
          await new Promise(requestAnimationFrame);
          element = outerRef.current?.querySelector<HTMLElement>(
            `[data-row="${rowIndex}"][data-column="${columnIndex}"]`
          );
        }
        element?.scrollIntoView({
          block: "nearest",
          inline: "nearest",
        });
      },
      []
    );

    const getFixedResizerLeftPosition = useCallback(
      (clientX: number, width: number, columnIndex: number): string | number => {
        const columnLeft = columnHorizontalPosition[columnIndex] + width;
        const { width: containerWidth, left, scrollBarWidth } = elementBorderRef.current;
        const scrollLeft = containerRef.current?.scrollLeft ?? 0;
        if (clientX + rowNumberWidth - left > containerWidth + scrollBarWidth) {
          return scrollLeft + containerWidth - scrollBarWidth - 4;
        }

        if (width < 50) {
          //50 is the minWidth for the column
          return columnHorizontalPosition[columnIndex] + rowNumberWidth + 50;
        }
        return columnLeft + rowNumberWidth;
      },
      [columnHorizontalPosition, rowNumberWidth]
    );

    const { getSelectionType, onSelection, mouseMoveCellSelect, onKeyDown } =
      useSelectionActions({
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

    const onColumnResize = useCallback(
      (columnIndex: number, newWidth: number) => {
        setColumnHorizontalPosition(columnHorizontalPosition => {
          const currentWidth =
            columnHorizontalPosition[columnIndex + 1] -
            columnHorizontalPosition[columnIndex];
          const diff = newWidth - currentWidth;

          for (let i = columnIndex + 1; i < columnCount; i++) {
            columnHorizontalPosition[i] = columnHorizontalPosition[i] + diff;
          }
          return [...columnHorizontalPosition];
        });
        gridRef.current?.resetAfterColumnIndex(columnIndex);
        onColumnResizeProp(columnIndex, newWidth);
      },
      [columnCount, onColumnResizeProp]
    );

    const InnerElementType = forwardRef<HTMLDivElement, InnerElementTypeTypes>(
      ({ children, ...containerProps }, ref) => {
        const [minRow, maxRow, minColumn, maxColumn] = getRenderedCursor(children);
        return (
          <GridContainer
            {...containerProps}
            className={`sticky-grid__container grid-outer ${props.className ?? ""}`}
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
                getFixedResizerLeftPosition={getFixedResizerLeftPosition}
              />
            )}
          </GridContainer>
        );
      }
    );
    useEffect(() => {
      containerRef.current?.focus();
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
        if (
          dragState.current === false ||
          e.buttons === NO_BUTTONS_PRESSED ||
          !containerRef.current ||
          !outerRef.current
        ) {
          return;
        }
        // let cell: Element | null = document.elementFromPoint(e.clientX, e.clientY);
        containerRef.current.setPointerCapture(dragState.current);
        let scrollHorizontalDirection: "left" | "right" | undefined,
          scrollVerticalDirection: "top" | "bottom" | undefined,
          top,
          left,
          x = e.clientX,
          y = e.clientY;
        if (
          elementBorderRef.current.left >= e.clientX ||
          e.clientX >=
            elementBorderRef.current.right - elementBorderRef.current.scrollBarWidth
        ) {
          scrollHorizontalDirection =
            e.clientX <= elementBorderRef.current.left ? "left" : "right";
          if (
            (scrollHorizontalDirection === "left" && e.movementX < 0) ||
            (scrollHorizontalDirection === "right" && e.movementX > 0)
          ) {
            const directionNum = scrollHorizontalDirection === "left" ? -1 : 1;
            left = 30 * directionNum;
          }
          x =
            scrollHorizontalDirection === "left"
              ? elementBorderRef.current.left + rowNumberWidth + 10
              : elementBorderRef.current.right -
                elementBorderRef.current.scrollBarWidth -
                10;
        }

        if (
          elementBorderRef.current.top >= e.clientY ||
          e.clientY >=
            elementBorderRef.current.bottom - elementBorderRef.current.scrollBarHeight
        ) {
          scrollVerticalDirection =
            e.clientY <= elementBorderRef.current.top ? "top" : "bottom";
          if (
            (scrollVerticalDirection === "top" && e.movementY < 0) ||
            (scrollVerticalDirection === "bottom" && e.movementY > 0)
          ) {
            top = 30 * (scrollVerticalDirection === "top" ? -1 : 1);
          }
          y =
            scrollVerticalDirection === "top"
              ? elementBorderRef.current.top + headerHeight + 10
              : elementBorderRef.current.bottom -
                elementBorderRef.current.scrollBarHeight -
                10;
        }

        if (
          scrollHorizontalDirection !== undefined ||
          scrollVerticalDirection !== undefined
        ) {
          outerRef.current.scrollBy({
            top,
            left,
          });
        }
        const cell = document.elementFromPoint(x, y);

        if (!cell) {
          return;
        }
        mouseMoveCellSelect(cell as HTMLElement);
      },
      [headerHeight, mouseMoveCellSelect, rowNumberWidth]
    );

    const onScroll = ({ scrollLeft, scrollTop }: GridOnScrollProps) => {
      setScrolledVertical(scrollTop > 0);
      setScrolledHorizontal(scrollLeft > 0);
    };

    return (
      <div
        ref={containerRef}
        tabIndex={0}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onKeyDown={e => {
          onKeyDown(e);
          containerRef.current?.focus();
        }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={setPointerCapture}
        onPointerEnter={setPointerCapture}
        style={{ width: "100%", height: "100%" }}
      >
        <AutoSizer
          onResize={({ height, width }) => {
            setTimeout(() => {
              if (!outerRef.current) {
                return;
              }
              const { top, bottom, left, right } =
                outerRef.current.getBoundingClientRect() ?? {};
              elementBorderRef.current = {
                top,
                bottom,
                left,
                right,
                scrollBarWidth: width - outerRef.current.clientWidth,
                scrollBarHeight: height - outerRef.current.clientHeight,
                width,
                height,
              };
            }, 0);
          }}
        >
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
