import { useCallback, useState } from "react";
import {
  Grid,
  CellProps,
  SelectedRegion,
  SelectionFocus,
  GridContextMenuItemProps,
  Pagination,
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
    row: 19994,
    column: 17460,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const rowCount = 20000,
    columnCount = 20000;

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
    <div>
      <div style={{ height: 500, width: "100%" }}>
        <Grid
          rowStart={currentPage * rowCount}
          columnCount={columnCount}
          rowCount={rowCount}
          cell={Cell}
          headerHeight={32}
          getMenuOptions={getMenuOptions}
          focus={focus}
          onFocusChange={(row, column) => setFocus({ row, column })}
        />
      </div>
      <Pagination
        currentPage={currentPage}
        onChange={setCurrentPage}
        totalPages={5}
      />
    </div>
  );
};

export default GridExample;
