import React, { useState } from "react";
import { Grid, CellProps } from "..";

const Cell: CellProps = ({ type, rowIndex, columnIndex, ...props }) => {
  return (
    <div {...props}>
      {type} {rowIndex} {columnIndex}
    </div>
  );
};
const GridExample = () => {
  const [focus, setFocus] = useState({
    row: 0,
    column: 0,
  });
  const columnWidth = (columnIndex: number) => {
    return (columnIndex + 1) * 100;
  };

  return (
    <div style={{ height: 500, width: 500 }}>
      <Grid
        columnCount={20}
        rowCount={20}
        columnWidth={columnWidth}
        focus={focus}
        cell={Cell}
        headerHeight={32}
        onFocusChange={(row: number, column: number) => {
          setFocus({ row, column });
        }}
        onColumnResize={(columnIndex: number, newWidth: number): void => {
          console.log({ columnIndex, newWidth });
        }}
      />
    </div>
  );
};

export default GridExample;
