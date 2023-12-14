import React, { useCallback, useState } from "react";
import { Grid, CellProps } from "..";

const Cell: CellProps = ({ type, rowIndex, columnIndex, isScrolling, ...props }) => {
  return (
    <div {...props}>
      {rowIndex} {columnIndex} - {type}
    </div>
  );
};
const GridExample = () => {
  const [focus, setFocus] = useState({
    row: 0,
    column: 0,
  });
  const [columnWidth, setColumnWidth] = useState<Array<number>>(
    Array.from({ length: 20 }, () => 100)
  );
  const getColumnWidth = useCallback(
    (columnIndex: number) => {
      return columnWidth[columnIndex]; //(columnIndex + 1) * 100;
    },
    [columnWidth]
  );

  return (
    <div style={{ height: 500, width: "100%" }}>
      <Grid
        columnCount={20}
        rowCount={20}
        columnWidth={getColumnWidth}
        focus={focus}
        cell={Cell}
        headerHeight={32}
        onFocusChange={(row: number, column: number) => {
          setFocus({ row, column });
        }}
        onColumnResize={(columnIndex: number, newWidth: number): void => {
          setColumnWidth(columnWidths => {
            columnWidths[columnIndex] = newWidth;
            return [...columnWidths];
          });
        }}
      />
    </div>
  );
};

export default GridExample;
