import { useCallback, useEffect, useState } from "react";
import {
  Grid,
  CellProps,
  SelectedRegion,
  SelectionFocus,
  GridContextMenuItemProps,
  Pagination,
  Switch,
} from "..";

const Cell: CellProps = ({
  type,
  rowIndex,
  columnIndex,
  isScrolling,
  width,
  ...props
}) => {
  return (
    <span
      data-scrolling={isScrolling}
      {...props}
    >
      {rowIndex} {columnIndex} - {type} {Math.round(width)}px
    </span>
  );
};
const GridExample = () => {
  const [focus, setFocus] = useState({
    row: 19994,
    column: 17460,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const columnCount = 20000;
  const initialRowCount = 20000;

  const [rowCount, setRowCount] = useState(initialRowCount);
  const [dynamicUpdates, setDynamicUpdates] = useState(false);

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

  useEffect(() => {
    if (!dynamicUpdates) {
      // Reset the row count when the switch is off.
      setRowCount(initialRowCount);
      return;
    }

    const interval = setInterval(() => {
      // Add a row every 200ms
      setRowCount(v => v + 1);
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, [dynamicUpdates]);

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
      <Switch
        onClick={() => {
          setDynamicUpdates(v => !v);
        }}
        label="Add a row every 200ms"
        checked={dynamicUpdates}
        orientation="horizontal"
      />
    </div>
  );
};

export default GridExample;
