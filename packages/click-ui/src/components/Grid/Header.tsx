import { styled } from 'styled-components';
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

const HeaderContainer = styled.div<{ $height: number; $scrolledVertical: boolean }>`
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  height: ${({ $height }) => $height}px;
  ${({ $scrolledVertical, theme }) =>
    $scrolledVertical
      ? `box-shadow: 0px 0 0px 1px ${theme.click.grid.header.cell.color.stroke.default};`
      : ''}
`;

const ScrollableHeaderContainer = styled.div<{
  $left: number;
}>`
  position: relative;
  left: ${({ $left }) => $left}px;
`;

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

const HeaderCellContainer = styled.div<{
  $width: string | number;
  $height: number;
  $columnPosition: number;
}>`
  position: absolute;
  display: flex;
  width: ${({ $width }) => (typeof $width === 'string' ? $width : `${$width}px`)};
  height: ${({ $height }) => $height}px;
  left: ${({ $columnPosition }) => $columnPosition}px;
  &:hover [data-resize] {
    background: ${({ theme }) => theme.click.grid.header.cell.color.stroke.selectDirect};
  }
`;

const RowColumnContainer = styled(HeaderCellContainer)<{
  $width: string | number;
  $scrolledHorizontal: boolean;
}>`
  position: sticky;
  top: 0;
  left: 0;
  width: ${({ $width }) => (typeof $width === 'string' ? $width : `${$width}px`)};
  text-align: right;
  ${({ $scrolledHorizontal, theme }) =>
    $scrolledHorizontal
      ? `box-shadow: 0px 0 0px 1px ${theme.click.grid.header.cell.color.stroke.default};`
      : ''}
`;

const RowColumn = styled(StyledCell)`
  width: 100%;
  text-align: right;
  overflow: hidden;
`;

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
    <HeaderCellContainer
      $width={columnWidth}
      $columnPosition={columnPosition}
      $height={height}
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
    </HeaderCellContainer>
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
    <HeaderContainer
      $height={height}
      $scrolledVertical={scrolledVertical}
    >
      <ScrollableHeaderContainer $left={rowNumberWidth}>
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
      </ScrollableHeaderContainer>
      {showRowNumber && (
        <RowColumnContainer
          $width={rowNumberWidth}
          $height={height}
          $columnPosition={0}
          $scrolledHorizontal={scrolledHorizontal}
        >
          <RowColumn
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
          </RowColumn>
        </RowColumnContainer>
      )}
    </HeaderContainer>
  );
};

export default Header;
