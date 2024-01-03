import { KeyboardEventHandler, useCallback, useEffect, useState } from "react";
import {
  CellProps,
  GridContextMenuItemProps,
  SelectedRegion,
  SelectionFocus,
  copyGridElements,
  createToast,
} from "..";
import { Grid as CUIGrid } from "./Grid";

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

interface Props {
  columnCount: number;
  rowCount: number;
  focus: {
    row: number;
    column: number;
  };
}
const Grid = ({ columnCount, rowCount, focus: focusProp, ...props }: Props) => {
  const [focus, setFocus] = useState(focusProp);
  const [selection, setSelection] = useState<SelectedRegion>({ type: "empty" });
  const [columnWidth, setColumnWidth] = useState<Array<number>>(
    Array.from({ length: 20 }, () => 100)
  );

  useEffect(() => {
    setFocus(focusProp);
  }, [focusProp]);

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
      <CUIGrid
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
        {...props}
      />
    </div>
  );
};

export default {
  component: Grid,
  title: "Display/Grid",
  tags: ["grid", "autodocs"],
};

export const Playground = {
  args: {
    rowCount: 120,
    columnCount: 200,
    rowStart: 0,
    focus: {
      row: 0,
      column: 0,
    },
  },
  parameters: {
    docs: {
      source: {
        transform: (_: string, story: { args: Props; [x: string]: unknown }) => {
          const { focus, ...props } = story.args;
          return `const Cell: CellProps = ({ type, rowIndex, columnIndex, isScrolling, ...props }) => {
  return (
    <div {...props}>
      {rowIndex} {columnIndex} - {type}
    </div>
  );
};

<Grid\n  cell={Cell}\n  focus={{ row: ${focus.row}, column: ${
            focus.column
          } }}// this value changes with onFocusChange and would be updated (user has control over it)\n  columnWidth={getColumnWidth}// this determines the
  onFocusChange={(row: number, column: number) => {}}// change focus and update state
  onColumnResize={(columnIndex: number, newWidth: number): void => {}}// update columnWidth using this function on resize
  getMenuOptions={getMenuOptions}\n${Object.entries(props)
    .flatMap(([key, value]) =>
      typeof value === "boolean"
        ? value
          ? `  ${key}`
          : []
        : `  ${key}=${typeof value == "string" ? `"${value}"` : `{${value}}`}`
    )
    .join("\n")}
/>
`;
        },
      },
    },
  },
};
