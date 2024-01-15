import {
  HTMLAttributes,
  KeyboardEventHandler,
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
import AutoSizer, { Size } from "react-virtualized-auto-sizer";
import RowNumberColumn from "./RowNumberColumn";
import Header from "./Header";
import styled from "styled-components";
import {
  GridContextMenuItemProps,
  GridProps,
  ItemDataType,
  SelectedRegion,
  SelectionAction,
  SelectionFocus,
  onSelectFn,
} from "./types";
import { useSelectionActions } from "./useSelectionActions";
import { mergeRefs } from "@/utils/mergeRefs";
import { Cell } from "./Cell";
import { ContextMenu, createToast } from "@/components";
import copyGridElements from "./copyGridElements";

const NO_BUTTONS_PRESSED = 0;
const RIGHT_BUTTON_PRESSED = 2;

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

const ContextMenuTrigger = styled.div`
  outline: none;
  height: 100%;
  width: 100%;
`;

interface InnerElementTypeTypes extends HTMLAttributes<HTMLDivElement> {
  children: Array<ReactElement>;
}
const OuterElementContainer = styled.div``;

const OuterElementType = forwardRef<HTMLDivElement>((props, ref) => (
  <OuterElementContainer
    ref={ref}
    data-testid="grid-outer-element"
    {...props}
  />
));

export const Grid = forwardRef<VariableSizeGrid, GridProps>(
  (
    {
      rowStart = 0,
      showRowNumber = true,
      rounded = "none",
      showHeader = true,
      focus: focusProp,
      useIsScrolling = true,
      rowHeight = 33,
      columnCount,
      columnWidth,
      onSelect: onSelectProp,
      headerHeight = 33,
      rowCount,
      cell,
      onColumnResize: onColumnResizeProp,
      onFocusChange: onFocusChangeProp,
      getMenuOptions,
      onKeyDown: onKeyDownProp,
      selection: selectionProp,
      showToast,
      ...props
    },
    forwardedRef
  ) => {
    const [focus, setFocus] = useState<SelectionFocus>(
      focusProp ?? {
        row: 0,
        column: 0,
      }
    );
    const [selection, setSelection] = useState<SelectedRegion>(
      selectionProp ?? {
        type: "empty",
      }
    );
    const onCopy = useCallback(async () => {
      try {
        await copyGridElements({
          cell,
          selection,
          focus,
          rowCount,
          columnCount,
        });
        if (showToast) {
          createToast({
            title: "Copied successfully",
            description: "Now you can copy the content",
            type: "success",
          });
        }
      } catch (e) {
        console.error(e);
        if (showToast) {
          createToast({
            title: "Failed to copy",
            description: "Encountered an error while copying. Try again after sometime",
            type: "danger",
          });
        }
      }
    }, [cell, columnCount, focus, rowCount, selection, showToast]);

    const defaultMenuOptions = [
      {
        label: "Copy",
        onSelect: onCopy,
      },
    ];

    const [menuOptions, setMenuOptions] =
      useState<Array<GridContextMenuItemProps>>(defaultMenuOptions);
    const [contextMenuOpen, setContextMenuOpen] = useState(false);
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
    const onCellSelect: onSelectFn = useCallback(
      (action, selection, focus) => {
        setSelection(selection);
        if (typeof onSelectProp === "function") {
          onSelectProp(action, selection, focus);
        }
      },
      [onSelectProp]
    );

    const onFocusChange = useCallback(
      (row: number, column: number) => {
        setFocus(focus => ({
          row: row ?? focus.row,
          column: column ?? focus.column,
        }));
        if (typeof onFocusChangeProp === "function") {
          onFocusChangeProp(row, column);
        }
      },
      [onFocusChangeProp]
    );

    const rowNumberWidth = (rowCount.toString().length + 2) * 8 + 3; // 128 includes 8px left and right padding and (8px + 8px + 8x(1ch) * rowcount) and 3 is for avoiding ellipsis

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
        if (!outerRef.current || !gridRef.current) {
          return;
        }

        const rowIndex = row ?? 0;
        const columnIndex = column ?? 0;
        let element = outerRef.current?.querySelector<HTMLElement>(
          `[data-row="${rowIndex}"][data-column="${columnIndex}"]`
        );
        if (!element) {
          return;
        }

        const { scrollTop, scrollLeft } = outerRef.current;
        // this is for the test to perform correctly
        if (typeof element?.scrollIntoView === "function") {
          element?.scrollIntoView({
            block: "nearest",
            inline: "nearest",
          });
          await new Promise(requestAnimationFrame);
        }
        element = outerRef.current?.querySelector<HTMLElement>(
          `[data-row="${rowIndex}"][data-column="${columnIndex}"]`
        );
        if (!element) {
          return;
        }

        outerRef.current?.scrollBy(
          scrollLeft > element.offsetLeft ? -rowNumberWidth : 0,
          scrollTop > element.offsetTop ? -headerHeight : 0
        );
      },
      [headerHeight, rowNumberWidth]
    );

    const getFixedResizerLeftPosition = useCallback(
      (clientX: number, width: number, columnIndex: number): string | number => {
        const columnLeft = columnHorizontalPosition[columnIndex] + width;
        const { width: containerWidth, left, scrollBarWidth } = elementBorderRef.current;
        const scrollLeft = outerRef.current?.scrollLeft ?? 0;
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

    const clearSelectionAndFocus = useCallback(
      (force: boolean) => {
        setSelection(selection => {
          if (selection.type === "columns" && !force) {
            return selection;
          } else {
            return { type: "empty" };
          }
        });
        onFocusChange(focus.row, focus.column);
        scrollGridTo(focus);
      },
      [focus, onFocusChange, scrollGridTo]
    );

    useEffect(() => {
      clearSelectionAndFocus(true);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rowStart]);

    const { getSelectionType, onSelection, mouseMoveCellSelect, moveSelection } =
      useSelectionActions({
        onCellSelect,
        focus: focusProp ?? focus,
        columnCount,
        rowCount,
        onFocusChange,
        scrollGridTo,
        selection: selectionProp ?? selection,
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
                rowStart={rowStart}
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
        if (e.buttons === RIGHT_BUTTON_PRESSED && target.dataset.selected === "true") {
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
            onFocusChange(0, column);
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
            onFocusChange(row, 0);
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
          onFocusChange(row, column);
        }
      },
      [onFocusChange, onSelection]
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
          if (!contextMenuOpen) {
            containerRef.current.focus();
          }
        }

        dragState.current = false;
        onFocusChange(focus.row, focus.column);
      },
      [contextMenuOpen, focus.column, focus.row, onFocusChange]
    );

    const onMouseMove: MouseEventHandler<HTMLDivElement> = useCallback(
      async e => {
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

        containerRef.current.setPointerCapture(dragState.current);
        let verticalSign = 0,
          horizontalSign = 0,
          x = e.clientX,
          y = e.clientY;
        if (
          elementBorderRef.current.left >= e.clientX ||
          e.clientX >=
            elementBorderRef.current.right - elementBorderRef.current.scrollBarWidth
        ) {
          const scrollHorizontalDirection =
            e.clientX <= elementBorderRef.current.left ? "left" : "right";
          if (
            (scrollHorizontalDirection === "left" && e.movementX < 0) ||
            (scrollHorizontalDirection === "right" && e.movementX > 0)
          ) {
            horizontalSign = scrollHorizontalDirection === "left" ? -1 : 1;
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
          const scrollVerticalDirection =
            e.clientY <= elementBorderRef.current.top ? "top" : "bottom";
          if (
            (scrollVerticalDirection === "top" && e.movementY < 0) ||
            (scrollVerticalDirection === "bottom" && e.movementY > 0)
          ) {
            verticalSign = scrollVerticalDirection === "top" ? -1 : 1;
          }
          y =
            scrollVerticalDirection === "top"
              ? elementBorderRef.current.top + headerHeight + 10
              : elementBorderRef.current.bottom -
                elementBorderRef.current.scrollBarHeight -
                10;
        }

        await new Promise(requestAnimationFrame);
        const cell = document.elementFromPoint(x, y) as HTMLElement | null;

        if (!cell) {
          return;
        }

        const { gridRow, gridColumn } = cell.dataset;
        if (!gridRow || !gridColumn) {
          return;
        }
        const rowIndex = Number(gridRow) + verticalSign;
        const columnIndex = Number(gridColumn) + horizontalSign;

        mouseMoveCellSelect(rowIndex, columnIndex);
      },
      [headerHeight, mouseMoveCellSelect, rowNumberWidth]
    );

    const onScroll = ({ scrollLeft, scrollTop }: GridOnScrollProps) => {
      setScrolledVertical(scrollTop > 0);
      setScrolledHorizontal(scrollLeft > 0);
    };

    const onResize = useCallback(({ height, width }: Size) => {
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
    }, []);

    const onKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback(
      async e => {
        if (typeof onKeyDownProp === "function") {
          onKeyDownProp(e);
        }
        if (!e.defaultPrevented) {
          e.preventDefault();
          e.stopPropagation();
        }
        const moveAnchor = e.shiftKey;
        const { row, column } = focus;

        const applyAction = (action: SelectionAction | null): void => {
          if (action) {
            onSelection({ ...action, event: "keypress" });
          }
          if (action?.type === "normal") {
            onFocusChange(action.row, action.column);
          }
        };
        if ((e.ctrlKey || e.metaKey) && e.key === "c") {
          onCopy();
          return;
        }

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
            onSelection({
              type: "normal",
              row,
              column,
              event: "keypress",
            });
            onFocusChange(row, column);
            break;
          case "Escape":
            clearSelectionAndFocus(true);
            break;
        }
        containerRef.current?.focus();
      },
      [
        onKeyDownProp,
        focus,
        onSelection,
        onFocusChange,
        onCopy,
        moveSelection,
        clearSelectionAndFocus,
      ]
    );
    const onContextMenu: MouseEventHandler<HTMLDivElement> = e => {
      onMouseDown(e);

      if (typeof getMenuOptions === "function") {
        const newOptions = getMenuOptions(selection, focus);
        setMenuOptions([...defaultMenuOptions, ...newOptions]);
      }
    };

    return (
      <ContextMenu
        modal={false}
        onOpenChange={setContextMenuOpen}
      >
        <ContextMenuTrigger
          as={ContextMenu.Trigger}
          ref={containerRef}
          tabIndex={0}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerLeave={setPointerCapture}
          onPointerEnter={setPointerCapture}
          onContextMenu={onContextMenu}
        >
          <AutoSizer onResize={onResize}>
            {({ height, width }) => (
              <VariableSizeGrid
                ref={mergeRefs([forwardedRef, gridRef])}
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
                outerElementType={OuterElementType}
                {...props}
              >
                {Cell}
              </VariableSizeGrid>
            )}
          </AutoSizer>
        </ContextMenuTrigger>
        <ContextMenu.Content>
          {menuOptions.map((option, index) => (
            <ContextMenu.Item
              key={`grid-${index}`}
              onSelect={option.onSelect}
            >
              {option.label}
            </ContextMenu.Item>
          ))}
        </ContextMenu.Content>
      </ContextMenu>
    );
  }
);
