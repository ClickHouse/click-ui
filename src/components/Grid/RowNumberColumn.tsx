import { ComponentType } from "react";
import styled from "styled-components";
import { CellProps, SelectionType } from "./types";

const RowNumberColumnContainer = styled.div<{
  $height: number;
  $width: string;
}>`
  position: sticky;
  left: 0;
  z-index: 2;
  ${({ $height, $width }) => `
    top: ${$height}px;
    width: ${$width};
    height: calc(100% - ${$height}px);
  `}
`;

const RowNumberCell = styled.div<{
  $height: number;
  $width: string;
  $rowNumber: number;
  $selectionType: SelectionType;
}>`
  position: sticky;
  left: 0;
  z-index: 2;
  ${({ theme, $height, $width, $rowNumber, $selectionType }) => `
    background: ${theme.click.grid.header.cell.color.background[$selectionType]};
    text-align: right;
    top: ${$height * $rowNumber}px;
    width: ${$width};
    height: calc(100% - ${$height}px);
  `}
`;
interface RowNumberColumnProps {
  minRow: number;
  maxRow: number;
  rowHeight: number;
  rowWidth: string;
}

const RowNumberColumn = ({
  minRow,
  maxRow,
  rowHeight,
  rowWidth,
  getSelectionType,
  pageStart = 0,
}: RowNumberColumnProps) => {
  const selectionType = getSelectionType({
    row: rowIndex,
    column: columnIndex - 1,
  });
  return (
    <RowNumberColumnContainer
      $height={rowHeight}
      $width={rowWidth}
    >
      {Array.from({ length: maxRow - minRow + 1 }, (_, index) => minRow + index).map(
        rowIndex => (
          <RowNumberCell
            key={`row-number-${rowIndex}`}
            $width={rowWidth}
            $height={rowHeight}
            $rowNumber={rowIndex}
            $selectionType={selectionType}
          >
            {pageStart + rowIndex}
          </RowNumberCell>
        )
      )}
    </RowNumberColumnContainer>
  );
};

export default RowNumberColumn;
