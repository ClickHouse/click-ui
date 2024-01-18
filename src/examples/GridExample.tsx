import { useCallback } from "react";
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
    columnCount = 2;

  const getMenuOptions = useCallback(
    (selection: SelectedRegion, focus: SelectionFocus): GridContextMenuItemProps[] => {
      return [
        {
          label: "Console log elements",
          onSelect: () => {
            console.log(selection, focus);
          },
        },
      ];
    },
    []
  );

  return (
    <div style={{ height: 500, width: "100%" }}>
      <Grid
        columnCount={columnCount}
        rowCount={rowCount}
        cell={Cell}
        headerHeight={32}
        getMenuOptions={getMenuOptions}
      />
    </div>
  );
};

export default GridExample;
