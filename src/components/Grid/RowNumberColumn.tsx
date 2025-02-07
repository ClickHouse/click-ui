import { styled } from "styled-components";
import { SelectionTypeFn } from "./types";
import { StyledCell } from "./StyledCell";
const RowNumberColumnContainer = styled.div<{
  $height: number;
  $width: number;
  $scrolledHorizontal: boolean;
  $rowAutoHeight?: boolean;
}>`
  position: sticky;
  left: 0;
  ${({ $height, $width }) => `
    top: ${$height}px;
    width: ${$width}px;
    height: 100%
  `}

  ${({ $scrolledHorizontal, theme }) =>
    $scrolledHorizontal
      ? `box-shadow: 0px 0 0px 1px ${theme.click.grid.header.cell.color.stroke.default};`
      : ""}
`;

const RowNumberCell = styled.div<{
  $height: number;
  $rowNumber: number;
  $rowAutoHeight?: boolean;
}>`
  position: absolute;
  left: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  ${({ $height, $rowNumber, $rowAutoHeight }) => `
    top: ${$height * $rowNumber}px;
    height: ${$rowAutoHeight ? "100%" : `${$height}px`};
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
  showHeader: boolean;
  scrolledHorizontal: boolean;
  rowStart: number;
  showBorder: boolean;
  rowAutoHeight?: boolean;
}
interface RowNumberProps
  extends Pick<
    RowNumberColumnProps,
    "rowHeight" | "getSelectionType" | "showBorder" | "rowStart"
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
    type: "row",
  });
  const isSelected = selectionType === "selectDirect";
  const topSelectionType = getSelectionType({
    row: currentRowIndex - 1,
    type: "row",
  });
  const isSelectedTop =
    (topSelectionType === "selectDirect" || isSelected) &&
    topSelectionType !== selectionType;

  return (
    <RowNumberCell
      $rowNumber={rowIndex}
      $height={rowHeight}
      $rowAutoHeight={rowAutoHeight}
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
        $overflow="hidden"
        data-selected={isSelected}
        data-grid-row={currentRowIndex}
        data-grid-column={-1}
        data-testid={`header-cell-${currentRowIndex}-x`}
        $showBorder={showBorder}
        data-align="right"
      >
        {currentRowIndex}
      </StyledCell>
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
  showHeader,
  scrolledHorizontal,
  rowStart = 0,
  showBorder,
  rowAutoHeight,
}: RowNumberColumnProps) => {
  return (
    <RowNumberColumnContainer
      $height={headerHeight}
      $width={rowWidth}
      $scrolledHorizontal={scrolledHorizontal}
      $rowAutoHeight={rowAutoHeight}
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
    </RowNumberColumnContainer>
  );
};

export default RowNumberColumn;
