import { useCallback, useEffect, useState } from "react";
import {
  CellProps,
  GridContextMenuItemProps,
  SelectedRegion,
  SelectionFocus,
  GridProps,
} from "@/components";
import { Grid as CUIGrid } from "./Grid";

const Cell: CellProps = ({
  type,
  rowIndex,
  columnIndex,
  isScrolling,
  width,
  ...props
}) => {
  return (
    <div
      data-scrolling={isScrolling}
      {...props}
    >
      {rowIndex} {columnIndex} - {type} - {width}px
    </div>
  );
};

interface Props extends Pick<
  GridProps,
  | "columnCount"
  | "rowCount"
  | "focus"
  | "rowAutoHeight"
  | "showRowNumber"
  | "showHeader"
  | "rowStart"
> {}
const Grid = ({ columnCount, rowCount, focus: focusProp, ...props }: Props) => {
  const [focus, setFocus] = useState(focusProp);
  const [columnWidth, setColumnWidth] = useState<Array<number>>(
    Array.from({ length: columnCount }, () => 100)
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
        getMenuOptions={getMenuOptions}
        rowAutoHeight={props.rowAutoHeight}
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

export const Variations = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: ".cuiGridContainer",
      focus: ".cuiGridContainer",
      active: ".cuiGridContainer",
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <section>
        <h3>Basic Grid</h3>
        <Grid
          rowCount={10}
          columnCount={5}
          focus={{ row: 0, column: 0 }}
        />
      </section>

      <section>
        <h3>With Row Numbers</h3>
        <Grid
          rowCount={8}
          columnCount={4}
          focus={{ row: 0, column: 0 }}
          showRowNumber={true}
        />
      </section>

      <section>
        <h3>Without Header</h3>
        <Grid
          rowCount={6}
          columnCount={4}
          focus={{ row: 0, column: 0 }}
          showHeader={false}
        />
      </section>

      <section>
        <h3>Without Row Numbers</h3>
        <Grid
          rowCount={6}
          columnCount={4}
          focus={{ row: 0, column: 0 }}
          showRowNumber={false}
        />
      </section>

      <section>
        <h3>Different Row Start</h3>
        <Grid
          rowCount={8}
          columnCount={4}
          focus={{ row: 100, column: 0 }}
          rowStart={100}
        />
      </section>

      <section>
        <h3>More Columns</h3>
        <Grid
          rowCount={5}
          columnCount={10}
          focus={{ row: 0, column: 0 }}
        />
      </section>

      <section>
        <h3>Auto Height</h3>
        <Grid
          rowCount={5}
          columnCount={4}
          focus={{ row: 0, column: 0 }}
          rowAutoHeight={true}
        />
      </section>
    </div>
  ),
};

export const Playground = {
  args: {
    rowCount: 120,
    columnCount: 200,
    rowStart: 0,
  },
  parameters: {
    docs: {
      source: {
        transform: (_: string, story: { args: Props; [x: string]: unknown }) => {
          const { rowCount, columnCount, ...props } = story.args;
          return `const Cell: CellProps = ({ type, rowIndex, columnIndex, isScrolling, ...props }) => {
  return (
    <div {...props}>
      {rowIndex} {columnIndex} - {type}
    </div>
  );
};

<Grid\n  cell={Cell}\n  focus={{ row: ${rowCount}, column: ${columnCount} }}// this value changes with onFocusChange and would be updated (user has control over it)\n  columnWidth={getColumnWidth}// this determines the
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
