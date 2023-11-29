import { ComponentType } from "react";
import styled from "styled-components";
import { CellProps, RoundedType, SelectionType, SelectionTypeFn } from "./types";

interface HeaderProps {
  showRowNumber: boolean;
  rowNumberWidth: string;
  minColumn: number;
  maxColumn: number;
  height: number;
  columnWidth: (index: number) => number;
  cell: ComponentType<CellProps>;
  inSelection: SelectionTypeFn;
  rounded: RoundedType;
}

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  z-index: 3;
`;

const ScrollableHeaderContainer = styled.div`
  position: absolute;
`;

const HeaderCell = styled.div<{
  $width: string | number;
  $rounded: RoundedType;
  $selectionType: SelectionType;
  $isFirstColumn: boolean;
  $isLastColumn: boolean;
}>`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  ${({ theme, $width, $selectionType, $rounded, $isFirstColumn, $isLastColumn }) => `
    width:${typeof $width === "string" ? $width : `${$width}px`};
    padding: ${theme.click.grid.header.cell.space.y} ${
    theme.click.grid.header.cell.space.x
  };
    background: ${theme.click.grid.header.cell.color.background[$selectionType]};
    ${
      $isFirstColumn ? `border-top-left-radius: ${theme.click.grid.radii[$rounded]};` : ""
    }
    ${
      $isLastColumn ? `border-top-right-radius: ${theme.click.grid.radii[$rounded]};` : ""
    }
  `}
`;

const RowColumn = styled(HeaderCell)`
  position: sticky;
  z-index: 3;
  left: 0;
  text-align: right;
`;

const Column = ({ columnIndex, cell, rounded, columnWidth, inSelection }) => {
  const selectionType = inSelection({
    columnIndex,
    type: "column",
  });
  return (
    <HeaderCell
      key={`header-${columnIndex}`}
      as={cell}
      columnIndex={columnIndex}
      type="header-cell"
      $width={columnWidth(columnIndex)}
      $rounded={rounded}
      $isFirstColumn={columnIndex}
      $selectionType={selectionType}
    />
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
  inSelection,
}: HeaderProps) => {
  const baseStyle = {
    height: height,
    minWidth: rowNumberWidth,
  };
  const scrollableStyle = { left: rowNumberWidth };

  const selectedAll = inSelection({
    type: "all",
  });
  return (
    <HeaderContainer>
      {showRowNumber && (
        <RowColumn
          style={baseStyle}
          $width={rowNumberWidth}
          $isFirstColumn
          $rounded={rounded}
          $selectionType={selectionType}
        >
          #
        </RowColumn>
      )}
      <ScrollableHeaderContainer style={scrollableStyle}>
        {Array.from(
          { length: maxColumn - minColumn + 1 },
          (_, index) => minColumn + index
        ).map(columnIndex => (
          <Column
            inSelection={inSelection}
            columnIndex={columnIndex}
            columnWidth={columnWidth}
            cell={cell}
            rounded={rounded}
          />
        ))}
      </ScrollableHeaderContainer>
    </HeaderContainer>
  );
};

export default Header;
