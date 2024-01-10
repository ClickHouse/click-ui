import { useCallback, useState } from "react";
import {
  Grid,
  CellProps,
  SelectedRegion,
  SelectionFocus,
  GridContextMenuItemProps,
} from "..";

const Cell: CellProps = ({ type, rowIndex, columnIndex, isScrolling, ...props }) => {
  return (
    <span
      data-scrolling={isScrolling}
      {...props}
    >
      {rowIndex} {columnIndex} - {type}
    </span>
  );
};
const GridExample = () => {
  const rowCount = 20,
    columnCount = 20;

  const [columnWidth, setColumnWidth] = useState<Array<number>>(
    Array.from({ length: 20 }, () => 100)
  );
  const getColumnWidth = useCallback(
    (columnIndex: number) => {
      return columnWidth[columnIndex]; //(columnIndex + 1) * 100;
    },
    [columnWidth]
  );

  const getMenuOptions = (
    selection: SelectedRegion,
    focus: SelectionFocus
  ): GridContextMenuItemProps[] => {
    return [
      {
        label: "Console log elements",
        onSelect: () => {
          console.log(selection, focus);
        },
      },
    ];
  };

  return (
    <div style={{ height: 500, width: "100%" }}>
      <Grid
        columnCount={columnCount}
        rowCount={rowCount}
        columnWidth={getColumnWidth}
        cell={Cell}
        headerHeight={32}
        onColumnResize={(columnIndex: number, newWidth: number): void => {
          setColumnWidth(columnWidths => {
            columnWidths[columnIndex] = newWidth;
            return [...columnWidths];
          });
        }}
        getMenuOptions={getMenuOptions}
      />
    </div>
  );
};

export default GridExample;
