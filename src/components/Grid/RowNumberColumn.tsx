import { CSSProperties } from 'react';
import { cn } from '@/lib/cva';
import styles from './Grid.module.css';
import { SelectionTypeFn } from './types';
import { StyledCell } from './StyledCell';

interface RowNumberColumnProps {
  minRow: number;
  maxRow: number;
  rowHeight: number;
  headerHeight: number;
  rowWidth: number;
  getSelectionType: SelectionTypeFn;
  rowCount: number;
  showHeader: boolean;
  scrolledHorizontal: boolean;
  rowStart: number;
  showBorder: boolean;
  rowAutoHeight?: boolean;
}
interface RowNumberProps extends Pick<
  RowNumberColumnProps,
  'rowHeight' | 'getSelectionType' | 'showBorder' | 'rowStart'
> {
  rowIndex: number;
  isLastRow: boolean;
  isFirstRow: boolean;
  rowAutoHeight?: boolean;
}
const RowNumber = ({
  rowIndex,
  rowHeight,
  getSelectionType,
  isLastRow,
  isFirstRow,
  showBorder,
  rowStart,
  rowAutoHeight,
}: RowNumberProps) => {
  const currentRowIndex = rowIndex + rowStart;
  const selectionType = getSelectionType({
    row: currentRowIndex,
    type: 'row',
  });
  const isSelected = selectionType === 'selectDirect';
  const topSelectionType = getSelectionType({
    row: currentRowIndex - 1,
    type: 'row',
  });
  const isSelectedTop =
    (topSelectionType === 'selectDirect' || isSelected) &&
    topSelectionType !== selectionType;

  return (
    <div
      className={styles['row-number-cell']}
      style={
        {
          '--row-number-cell-top': `${rowHeight * rowIndex}px`,
          '--row-number-cell-height': rowAutoHeight ? '100%' : `${rowHeight}px`,
        } as CSSProperties
      }
    >
      <StyledCell
        $height={rowHeight}
        $isLastColumn={false}
        $selectionType={selectionType}
        $isFirstColumn
        $type="header"
        $isFirstRow={isFirstRow}
        $isFocused={false}
        $isLastRow={isLastRow}
        $isSelectedLeft={isSelected}
        $isSelectedTop={isSelectedTop}
        $rowAutoHeight={rowAutoHeight}
        data-selected={isSelected}
        data-grid-row={currentRowIndex}
        data-grid-column={-1}
        data-testid={`header-cell-${currentRowIndex}-x`}
        $showBorder={showBorder}
        data-align="right"
      >
        {currentRowIndex}
      </StyledCell>
    </div>
  );
};

const RowNumberColumn = ({
  minRow,
  maxRow,
  rowHeight,
  headerHeight,
  rowWidth,
  getSelectionType,
  rowCount,
  showHeader,
  scrolledHorizontal,
  rowStart = 0,
  showBorder,
  rowAutoHeight,
}: RowNumberColumnProps) => {
  return (
    <div
      className={cn(
        styles['row-number-column-container'],
        scrolledHorizontal && styles['row-number-column-container_scrolled-horizontal']
      )}
      style={
        {
          '--row-number-column-top': `${headerHeight}px`,
          '--row-number-column-width': `${rowWidth}px`,
        } as CSSProperties
      }
    >
      {Array.from({ length: maxRow - minRow + 1 }, (_, index) => minRow + index).map(
        rowIndex => (
          <RowNumber
            key={`row-number-${rowIndex}`}
            getSelectionType={getSelectionType}
            rowHeight={rowHeight}
            rowIndex={rowIndex}
            isLastRow={rowIndex === rowCount}
            isFirstRow={!showHeader && rowIndex === 0}
            showBorder={showBorder}
            rowStart={rowStart}
            rowAutoHeight={rowAutoHeight}
          />
        )
      )}
    </div>
  );
};

export default RowNumberColumn;
