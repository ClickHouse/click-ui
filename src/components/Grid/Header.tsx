import styled from "styled-components";
import { CellProps, ColumnResizeFn, RoundedType, SelectionTypeFn } from "./types";
import { StyledCell } from "./StyledCell";
import { useRef } from "react";

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

const ResizeSpan = styled.div`
  right: 0;
  left: auto;
  position: absolute;
  z-index: 10;
  height: 100%;
  width: 10px;
  overflow: auto;
  &:hover,
  &:active {
    border: 1px solid red;
  }
  &:active {
    height: 100%;
  }
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
  display: flex;
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
  const resizeRef = useRef(null);
  const selectionType = getSelectionType({
    column: columnIndex,
    type: "column",
  });
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
        ref={resizeRef}
        onPointerDown={e => e.stopPropagation()}
        onPointerUp={e => e.stopPropagation()}
        onMouseDown={e => {
          e.preventDefault();
          e.stopPropagation();
          console.log("aasasas", resizeRef.current, e.screenX, e.clientX);
          resizeRef.current.style = {
            position: "fixed",
            left: e.screenX,
            right: "auto",
          };
        }}
        onMouseMove={e => {
          e.preventDefault();
          e.stopPropagation();
          console.log("aasasas1", resizeRef.current, e.screenX, e.clientX);
          resizeRef.current.style = {
            position: "fixed",
            left: e.screenX,
            right: "auto",
          };
        }}
        onMouseUp={e => {
          e.preventDefault();
          e.stopPropagation();
          console.log("aasasas2", resizeRef.current, e.screenX, e.clientX);
          resizeRef.current.style = {
            position: "absolute",
            left: "auto",
            right: 0,
          };
        }}
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
    </HeaderContainer>
  );
};

export default Header;
