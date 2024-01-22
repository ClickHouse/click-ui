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
  const [focus, setFocus] = useState({
    row: 32,
    column: 0,
  });
  const rowCount = 20,
    columnCount = 20;

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
        rowStart={32}
        columnCount={columnCount}
        rowCount={rowCount}
        cell={Cell}
        headerHeight={32}
        getMenuOptions={getMenuOptions}
        focus={focus}
        onFocusChange={(row, column) => setFocus({ row, column })}
      />
    </div>
  );
};

export default GridExample;
