import styled from "styled-components";
import {
  CellProps,
  ColumnResizeFn,
  RoundedType,
  SelectionTypeFn,
  SetResizeCursorPositionFn,
} from "./types";
import { StyledCell } from "./StyledCell";
import ColumnResizer from "./ColumnResizer";

interface HeaderProps {
  showRowNumber: boolean;
  rowNumberWidth: number;
  minColumn: number;
  maxColumn: number;
  height: number;
  columnWidth: (index: number) => number;
  cell: CellProps;
  getSelectionType: SelectionTypeFn;
  rounded: RoundedType;
  columnCount: number;
  onColumnResize: ColumnResizeFn;
  columnHorizontalPosition: Array<number>;
  scrolledVertical: boolean;
  setResizeCursorPosition: SetResizeCursorPositionFn;
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
      : ""}
`;

const ScrollableHeaderContainer = styled.div<{
  $left: number;
}>`
  position: relative;
  left: ${({ $left }) => $left}px;
`;

interface ColumnProps
  extends Pick<
    HeaderProps,
    | "cell"
    | "getSelectionType"
    | "rounded"
    | "onColumnResize"
    | "columnWidth"
    | "height"
    | "setResizeCursorPosition"
  > {
  columnIndex: number;
  isFirstColumn: boolean;
  isLastColumn: boolean;
  columnHorizontalPosition: Array<number>;
}

const HeaderCellContainer = styled.div<{
  $width: string | number;
  $height: number;
  $columnPosition: number;
}>`
  position: absolute;
  display: flex;
  width: ${({ $width }) => (typeof $width === "string" ? $width : `${$width}px`)};
  height: ${({ $height }) => $height}px;
  left: ${({ $columnPosition }) => $columnPosition}px;
  &:hover [data-resize] {
    background: ${({ theme }) => theme.click.grid.header.cell.color.stroke.selectDirect};
  }
`;

const RowColumnContainer = styled(HeaderCellContainer)<{
  $width: string | number;
}>`
  position: sticky;
  top: 0;
  left: 0;
  width: ${({ $width }) => (typeof $width === "string" ? $width : `${$width}px`)};
  text-align: right;
`;

const RowColumn = styled(StyledCell)`
  width: 100%;
  text-align: right;
`;

const Column = ({
  columnIndex,
  cell,
  rounded,
  columnWidth,
  columnHorizontalPosition,
  getSelectionType,
  isFirstColumn,
  isLastColumn,
  onColumnResize,
  height,
  setResizeCursorPosition,
}: ColumnProps) => {
  const selectionType = getSelectionType({
    column: columnIndex,
    type: "column",
  });
  const columnPosition = columnHorizontalPosition[columnIndex];

  return (
    <HeaderCellContainer
      $width={columnWidth(columnIndex)}
      $columnPosition={columnPosition}
      $height={height}
      data-header={columnIndex}
    >
      <StyledCell
        $type="header"
        as={cell}
        columnIndex={columnIndex}
        type="header-cell"
        $rounded={rounded}
        $isFirstColumn={isFirstColumn}
        $selectionType={selectionType}
        $isLastColumn={isLastColumn}
        $isFocused={false}
        $isSelectedLeft={true}
        $isSelectedTop={true}
        $isLastRow={false}
        $isFirstRow
        $height={height}
        data-grid-row={-1}
        data-grid-column={columnIndex}
        data-selected={selectionType === "selectDirect"}
      />
      <ColumnResizer
        height={height}
        onColumnResize={onColumnResize}
        columnIndex={columnIndex}
        setResizeCursorPosition={setResizeCursorPosition}
      />
    </HeaderCellContainer>
  );
};

const Header = ({
  scrolledVertical,
  showRowNumber,
  rowNumberWidth,
  minColumn,
  maxColumn,
  height,
  columnWidth,
  cell,
  rounded,
  columnCount,
  getSelectionType,
  onColumnResize,
  columnHorizontalPosition,
  setResizeCursorPosition,
}: HeaderProps) => {
  const selectedAllType = getSelectionType({
    type: "all",
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
            columnWidth={columnWidth}
            columnHorizontalPosition={columnHorizontalPosition}
            cell={cell}
            rounded={rounded}
            isFirstColumn={columnIndex === 0 && !showRowNumber}
            isLastColumn={columnIndex + 1 === columnCount}
            onColumnResize={onColumnResize}
            height={height}
            setResizeCursorPosition={setResizeCursorPosition}
          />
        ))}
      </ScrollableHeaderContainer>
      {showRowNumber && (
        <RowColumnContainer
          $width={rowNumberWidth}
          $height={height}
          $columnPosition={0}
        >
          <RowColumn
            data-selected={selectedAllType === "selectDirect"}
            $type="header"
            $isFirstRow
            $isFirstColumn
            $rounded={rounded}
            $selectionType={selectedAllType}
            $isLastRow={false}
            $isLastColumn={false}
            $height={height}
            $isFocused={false}
            $isSelectedLeft
            $isSelectedTop
            data-row={-1}
            data-column={-1}
          >
            #
          </RowColumn>
        </RowColumnContainer>
      )}
    </HeaderContainer>
  );
};

export default Header;
