import { CSSProperties } from 'react';
import { cn } from '@/lib/cva';
import styles from './Grid.module.css';
import {
  CellProps,
  ColumnResizeFn,
  GetResizerPositionFn,
  SelectionTypeFn,
} from './types';
import { StyledCell } from './StyledCell';
import ColumnResizer from './ColumnResizer';
import { ResizingState } from './useResizingState';

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
  | 'cell'
  | 'getSelectionType'
  | 'onColumnResize'
  | 'getColumnWidth'
  | 'height'
  | 'getResizerPosition'
  | 'showBorder'
  | 'getColumnHorizontalPosition'
  | 'resizingState'
> {
  columnIndex: number;
  isFirstColumn: boolean;
  isLastColumn: boolean;
}

const toCssSize = ($width: string | number): string =>
  typeof $width === 'string' ? $width : `${$width}px`;

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
    type: 'column',
  });
  const leftSelectionType = getSelectionType({
    column: columnIndex - 1,
    type: 'column',
  });
  const columnPosition = getColumnHorizontalPosition(columnIndex);

  const isSelected = selectionType === 'selectDirect';
  const isSelectedLeft =
    (leftSelectionType === 'selectDirect' || isSelected) &&
    leftSelectionType !== selectionType;

  const columnWidth = getColumnWidth(columnIndex);
  return (
    <div
      className={styles['header-cell-container']}
      style={
        {
          '--header-cell-width': toCssSize(columnWidth),
          '--header-cell-height': `${height}px`,
          '--header-cell-left': `${columnPosition}px`,
        } as CSSProperties
      }
      data-header={columnIndex}
    >
      <StyledCell
        $type="header"
        as={cell}
        columnIndex={columnIndex}
        type="header-cell"
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
        width={columnWidth}
      />
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
    type: 'all',
  });
  return (
    <div
      className={cn(
        styles['header-container'],
        scrolledVertical && styles['header-container_scrolled-vertical']
      )}
      style={{ '--header-height': `${height}px` } as CSSProperties}
    >
      <div
        className={styles['scrollable-header-container']}
        style={{ '--scrollable-header-left': `${rowNumberWidth}px` } as CSSProperties}
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
          className={cn(
            styles['header-cell-container'],
            styles['row-column-container'],
            scrolledHorizontal && styles['row-column-container_scrolled-horizontal']
          )}
          style={
            {
              '--header-cell-width': toCssSize(rowNumberWidth),
              '--header-cell-height': `${height}px`,
              '--header-cell-left': '0px',
            } as CSSProperties
          }
        >
          <StyledCell
            className={styles['row-column']}
            data-selected={selectedAllType === 'selectDirect'}
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
