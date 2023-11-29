import {
  ComponentType,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  forwardRef,
  memo,
  useCallback,
  useState,
} from "react";
import {
  VariableSizeGrid,
  areEqual,
  GridChildComponentProps,
  VariableSizeGridProps,
} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import GridContextMenuGuard from "./GridContextMenuGuard";
import RowNumberColumn from "./RowNumberColumn";
import Header from "./Header";
import styled, { useTheme } from "styled-components";
import { CellProps, SelectionTypeFn, SelectionType, onSelectFn } from "./types";
import { ContextMenuItemProps } from "../ContextMenu/ContextMenu";
import { useSelectionActions } from "./useSelectionActions";
import { useRefCallback } from "./useRefCallback";

export interface MenuOptionType extends Omit<ContextMenuItemProps, "children"> {
  label: ReactNode;
}
interface GridProps
  extends Omit<VariableSizeGridProps, "height" | "width" | "rowHeight" | "children"> {
  isRounded?: boolean;
  focusedRow: number;
  focusedColumn: number;
  rowHeight?: number;
  cell: ComponentType<CellProps>;
  showHeader?: boolean;
  showRowNumber?: boolean;
  headerHeight: number;
  getMenuOptions: (selection: SelectionType) => Array<MenuOptionType>;
  onFocusChange: (rowIndex: number, columnIndex: number) => void;
  onSelect?: onSelectFn;
}

interface ItemDataType {
  showRowNumber: boolean;
  showHeader: boolean;
  getSelectionType: SelectionTypeFn;
  rowCount: number;
  columnCount: number;
  selectedValues: SelectionType;
  cell: ComponentType<CellProps>;
  focusedRow: number;
  focusedColumn: number;
  isRounded: boolean;
}

const StyledCell = styled.div<{
  $isNumber?: boolean;
  $isFocused: boolean;
  $selectionType: SelectionType;
  $isSelectedTop: boolean;
  $isSelectedLeft: boolean;
  $isLastRow: boolean;
  $isLastColumn: boolean;
  $isFirstRow: boolean;
  $isFirstColumn: boolean;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${({
    theme,
    $isNumber,
    $isFocused,
    $isSelected,
    $isLastRow,
    $isLastColumn,
    $selectionType,
  }) => {
    let selectionType: SelectionType = "default";
    if ($isFocused || $isSelected) {
      selectionType = $isFocused ? "selectDirect" : "selectIndirect";
    }
    return `
    justify-content: ${$isNumber ? "flex-end" : "flex-start"};
    background: ${theme.click.grid.body.cell.color.background[$selectionType]};
    color: ${theme.click.grid.cell.text.default};
    padding: ${theme.click.grid.body.cell.space.y} ${theme.click.grid.body.cell.space.x};
    border: 1px solid ${theme.click.grid.body.cell.color.stroke[selectionType]};
    ${
      $isFocused
        ? `box-shadow: inset 0 0 0 1px ${theme.click.grid.body.cell.color.stroke.selectDirect};`
        : ""
    }
    ${
      $isLastRow
        ? `
        border-bottom-color: ${theme.click.grid.body.cell.color.stroke[selectionType]};
    `
        : "border-bottom: none;"
    }
    ${
      $isLastColumn
        ? `
        border-right-color: ${theme.click.grid.body.cell.color.stroke[selectionType]};
    `
        : "border-bottom: none;"
    }
    ${
      $isSelected
        ? `
    `
        : ""
    }
  `;
  }}
`;
const Cell = memo(
  ({ data, rowIndex, columnIndex, ...props }: GridChildComponentProps<ItemDataType>) => {
    const {
      cell: CellData,
      getSelectionType,
      focusedRow,
      focusedColumn,
      columnCount,
      rowCount,
      showRowNumber,
      showHeader,
    } = data;
    const isFocused = columnIndex === focusedColumn && rowIndex === focusedRow;
    const rightOfFocus = columnIndex - 1 === focusedColumn && rowIndex === focusedRow;
    const belowFocus = columnIndex === focusedColumn && rowIndex - 1 === focusedRow;

    const selectionType = getSelectionType({ rowIndex, columnIndex, type: "cell" });
    const rightOfSelectionBorder =
      selectionType !==
      getSelectionType({
        rowIndex,
        columnIndex: columnIndex - 1,
        type: "cell",
      });
    const belowSelectionBorder =
      selectionType !==
      getSelectionType({
        rowIndex: rowIndex - 1,
        columnIndex,
        type: "cell",
      });

    const selectionBorderLeft = rightOfSelectionBorder || rightOfFocus || isFocused;
    const selectionBorderTop = belowSelectionBorder || belowFocus || isFocused;

    return (
      <StyledCell
        as={CellData}
        rowIndex={rowIndex}
        columnIndex={columnIndex}
        type="row-cell"
        $isSelectedTop={selectionBorderTop}
        $isSelectedLeft={selectionBorderLeft}
        $isFocused={isFocused}
        $isSelected={isSelected}
        $isLastRow={rowCount === rowIndex - 1}
        $isLastColumn={columnCount === columnIndex - 1}
        $isFirstColumn={columnIndex === 0 && !showRowNumber}
        $isFirstRow={rowIndex === 0 && !showHeader}
        $selectionType={selectionType}
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

const Grid = ({
  showRowNumber = true,
  rounded = "none",
  showHeader = true,
  focusedRow,
  focusedColumn,
  useIsScrolling = true,
  rowHeight = 33,
  columnCount,
  columnWidth,
  onSelect: onSelectProp,
  getMenuOptions,
  headerHeight,
  rowCount,
  cell,
  ...props
}: GridProps) => {
  const [menuOptions, setMenuOptions] = useState<Array<MenuOptionType>>([]);

  const onCellSelect = useRefCallback(onSelectProp);
  const onSelect = useCallback(
    (key: string, props: Record<string, any>) => {
      const newOptions = getMenuOptions(props.selection);
      onCellSelect(key, props);
      setMenuOptions(newOptions);
    },
    [getMenuOptions, onCellSelect]
  );
  const { getSelectionType, moveSelection, clearSelection, select } = useSelectionActions(
    {
      onSelect,
      focusedRow,
      focusedColumn,
      columnCount,
      rowCount,
    }
  );
  const data: ItemDataType = {
    showRowNumber,
    cell,
    rowCount,
    columnCount,
    rounded,
    showHeader,
    focusedColumn,
    focusedRow,
  };
  const theme = useTheme();
  const getRowHeight = (index: number) => {
    if (showHeader && index === 0) {
      return 50;
    } else {
      return rowHeight;
    }
  };
  const rowNumberWidth = `calc(${rowCount.toString().length}ch + ${
    theme.click.grid.body.cell.space.x
  } + ${theme.click.grid.body.cell.space.x})`;

  const InnerElementType = forwardRef<HTMLDivElement, InnerElementTypeTypes>(
    ({ children, ...containerProps }, ref) => {
      const [minRow, maxRow, minColumn, maxColumn] = getRenderedCursor(children);
      return (
        <GridContextMenuGuard menuOptions={menuOptions}>
          <div
            className="sticky-grid__container"
            ref={ref}
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
              />
            )}
            {showRowNumber && (
              <RowNumberColumn
                minRow={minRow}
                maxRow={maxRow}
                rowHeight={rowHeight}
                rowWidth={rowNumberWidth}
                cell={cell}
                rowCount={rowCount}
                rounded={rounded}
                getSelectionType={getSelectionType}
              />
            )}

            <GridDataContainer
              $top={headerHeight}
              $left={rowNumberWidth}
            >
              {children}
            </GridDataContainer>
          </div>
        </GridContextMenuGuard>
      );
    }
  );
  return (
    <AutoSizer>
      {({ height, width }) => (
        <VariableSizeGrid
          height={height}
          width={width}
          columnCount={columnCount + (showRowNumber ? 1 : 0)}
          rowHeight={getRowHeight}
          useIsScrolling={useIsScrolling}
          innerElementType={InnerElementType}
          itemData={data}
          initialScrollTop={focusedRow}
          initialScrollLeft={focusedColumn}
          columnWidth={columnWidth}
          rowCount={rowCount}
          {...props}
        >
          {Cell}
        </VariableSizeGrid>
      )}
    </AutoSizer>
  );
};

export default Grid;
