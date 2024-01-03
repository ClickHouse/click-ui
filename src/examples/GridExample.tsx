import { KeyboardEventHandler, useCallback, useState } from "react";
import {
  Grid,
  CellProps,
  copyGridElements,
  SelectedRegion,
  SelectionFocus,
  GridContextMenuItemProps,
  createToast,
} from "..";

const Cell: CellProps = ({ type, rowIndex, columnIndex, isScrolling, ...props }) => {
  return (
    <div
      data-scrolling={isScrolling}
      {...props}
    >
      {rowIndex} {columnIndex} - {type}
    </div>
  );
};
const GridExample = () => {
  const rowCount = 20,
    columnCount = 20;

  const [focus, setFocus] = useState({
    row: 0,
    column: 0,
  });
  const [selection, setSelection] = useState<SelectedRegion>({ type: "empty" });
  const [columnWidth, setColumnWidth] = useState<Array<number>>(
    Array.from({ length: 20 }, () => 100)
  );
  const getColumnWidth = useCallback(
    (columnIndex: number) => {
      return columnWidth[columnIndex]; //(columnIndex + 1) * 100;
    },
    [columnWidth]
  );

  const onCopy = async () => {
    try {
      await copyGridElements({
        getElement: (rowIndex, columnIndex) => {
          return `${rowIndex} ${columnIndex} - rowCell`;
        },
        selection,
        focus,
        rowCount,
        columnCount,
      });
      createToast({
        title: "Copied successfully",
        description: "Now you can copy the content",
        type: "success",
      });
    } catch (e) {
      console.log(e);
      createToast({
        title: "Failed",
        description: "Copy Failed",
        type: "danger",
      });
    }
  };
  const getMenuOptions = (
    selection: SelectedRegion,
    focus: SelectionFocus
  ): GridContextMenuItemProps[] => {
    return [
      {
        label: "Copy",
        onSelect: onCopy,
      },
      {
        label: "Console log elements",
        onSelect: () => {
          console.log(selection, focus);
        },
      },
    ];
  };
  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = e => {
    if ((e.ctrlKey || e.metaKey) && e.key === "c") {
      onCopy();
    }
  };

  return (
    <div style={{ height: 500, width: "100%" }}>
      <Grid
        columnCount={columnCount}
        rowCount={rowCount}
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
        onSelect={(_, selection) => {
          setSelection(selection);
        }}
        getMenuOptions={getMenuOptions}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default GridExample;
