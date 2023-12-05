import styled from "styled-components";
import { CellProps, ColumnResizeFn, RoundedType, SelectionTypeFn } from "./types";
import { StyledCell } from "./StyledCell";

interface HeaderProps {
  showRowNumber: boolean;
  rowNumberWidth: string;
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
}

const HeaderContainer = styled.div<{ $height: number }>`
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  height: ${({ $height }) => $height}px;
`;

const ScrollableHeaderContainer = styled.div`
  position: relative;
  left: 0;
`;

const ResizeSpan = styled.span`
  position: absolute;
  top: 0;
  right: 0;
`;

interface ColumnProps
  extends Pick<
    HeaderProps,
    "cell" | "getSelectionType" | "rounded" | "onColumnResize" | "columnWidth" | "height"
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
  width: ${({ $width }) => (typeof $width === "string" ? $width : `${$width}px`)};
  height: ${({ $height }) => $height}px;
  left: ${({ $columnPosition }) => $columnPosition}px;
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
}: ColumnProps) => {
  const selectionType = getSelectionType({
    column: columnIndex,
    type: "column",
  });
  const onDragStart = (e: any) => {
    console.log("headerdrag", e);
  };
  const onDragEnd = (e: any) => {
    console.log("headerdrop", e);
    const a = false;
    if (a) {
      onColumnResize(columnIndex, 0);
    }
  };

  return (
    <HeaderCellContainer
      $width={columnWidth(columnIndex)}
      $columnPosition={columnHorizontalPosition[columnIndex]}
      $height={height}
      data-a={height}
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
        data-row={-1}
        data-column={columnIndex}
      />
      <ResizeSpan
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      />
    </HeaderCellContainer>
  );
};

const Header = ({
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
}: HeaderProps) => {
  const selectedAllType = getSelectionType({
    type: "all",
  });
  return (
    <HeaderContainer $height={height}>
      {showRowNumber && (
        <RowColumnContainer
          $width={rowNumberWidth}
          $height={height}
          $columnPosition={0}
        >
          <RowColumn
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
          >
            #
          </RowColumn>
        </RowColumnContainer>
      )}
      <ScrollableHeaderContainer>
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
          />
        ))}
      </ScrollableHeaderContainer>
    </HeaderContainer>
  );
};

export default Header;
