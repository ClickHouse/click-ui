import styled from "styled-components";
import { RoundedType, SelectionTypeFn } from "./types";
import { StyledCell } from "./StyledCell";
const RowNumberColumnContainer = styled.div<{
  $height: number;
  $width: number;
  $scrolledHorizontal: boolean;
}>`
  position: sticky;
  left: 0;
  ${({ $height, $width }) => `
    top: ${$height}px;
    width: ${$width}px;
    height: 100%;
  `}

  ${({ $scrolledHorizontal, theme }) =>
    $scrolledHorizontal
      ? `box-shadow: 0px 0 0px 1px ${theme.click.grid.header.cell.color.stroke.default};`
      : ""}
`;

const RowNumberCell = styled(StyledCell)<{
  $height: number;
  $rowNumber: number;
}>`
  position: absolute;
  left: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  text-align: right;
  ${({ $height, $rowNumber }) => `
    top: ${$height * $rowNumber}px;
    height: ${$height}px;
  `}
`;
interface RowNumberColumnProps {
  minRow: number;
  maxRow: number;
  rowHeight: number;
  headerHeight: number;
  rowWidth: number;
  getSelectionType: SelectionTypeFn;
  rowCount: number;
  rounded: RoundedType;
  showHeader: boolean;
  scrolledHorizontal: boolean;
  rowStart?: number;
}
interface RowNumberProps
  extends Pick<RowNumberColumnProps, "rowHeight" | "getSelectionType" | "rounded"> {
  rowIndex: number;
  isLastRow: boolean;
  isFirstRow: boolean;
}
const RowNumber = ({
  rowIndex: row,
  rowHeight,
  getSelectionType,
  isLastRow,
  rounded,
  isFirstRow,
}: RowNumberProps) => {
  const selectionType = getSelectionType({
    row,
    type: "row",
  });
  const isSelected = selectionType === "selectDirect";

  return (
    <RowNumberCell
      $height={rowHeight}
      $rowNumber={row}
      $isLastColumn={false}
      $selectionType={selectionType}
      $rounded={rounded}
      $isFirstColumn
      $type="header"
      $isFirstRow={isFirstRow}
      $isFocused={false}
      $isLastRow={isLastRow}
      $isSelectedLeft={isSelected}
      $isSelectedTop={isSelected}
      data-selected={isSelected}
      data-grid-row={row}
      data-grid-column={-1}
      data-testid={`header-cell-${row}-x`}
    >
      {row}
    </RowNumberCell>
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
  rounded,
  showHeader,
  scrolledHorizontal,
  rowStart = 0,
}: RowNumberColumnProps) => {
  return (
    <RowNumberColumnContainer
      $height={headerHeight}
      $width={rowWidth}
      $scrolledHorizontal={scrolledHorizontal}
    >
      {Array.from({ length: maxRow - minRow + 1 }, (_, index) => minRow + index).map(
        rowIndex => (
          <RowNumber
            key={`row-number-${rowIndex}`}
            getSelectionType={getSelectionType}
            rowHeight={rowHeight}
            rowIndex={rowStart + rowIndex}
            isLastRow={rowIndex === rowCount}
            rounded={rounded}
            isFirstRow={!showHeader && rowIndex === 0}
          />
        )
      )}
    </RowNumberColumnContainer>
  );
};

export default RowNumberColumn;
