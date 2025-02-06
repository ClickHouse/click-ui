import { useCallback, useEffect, useState } from "react";
import { CellProps, GridContextMenuItemProps, SelectedRegion, SelectionFocus } from "..";
import { Grid as CUIGrid } from "./Grid";

const Cell: CellProps = ({ type, rowIndex, columnIndex, isScrolling, width, ...props }) => {
  return (
    <div
      data-scrolling={isScrolling}
      {...props}
    >
      {rowIndex} {columnIndex} - {type} - {width}px
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
  rowAutoHeight?: boolean;
}
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

export const AutoHeightWithVariableData = {
  args: {
    rowCount: 10,
    columnCount: 5,
    rowAutoHeight: true,
    rowStart: 0,
  },
  parameters: {
    docs: {
      source: {
        transform: (_: string, story: { args: Props; [x: string]: unknown }) => {
          const { rowCount, columnCount, rowAutoHeight, ...props } = story.args;
          return `
const VariableCell: CellProps = ({ type, rowIndex, columnIndex, isScrolling, width, ...props }) => {
  let content = \`Row \${rowIndex}, Col \${columnIndex}\${rowIndex % 2 === 0 ? '\\nExtra line' : ''}\`;
  
  if (rowIndex === 0 && columnIndex === 0) {
    content = \`CREATE TABLE random_user_events (
    user_id UInt32,
    event_time DateTime,
    event_type Enum8('click' = 1, 'view' = 2, 'purchase' = 3),
    item_id String,
    price Decimal(10,2),
    quantity UInt16
) ENGINE = MergeTree()
ORDER BY (user_id, event_time)
PARTITION BY toYYYYMM(event_time)
SETTINGS index_granularity = 8192;\`;
  }

  return (
    <div
      data-scrolling={isScrolling}
      style={{
        whiteSpace: 'pre-wrap',
        padding: '8px',
        borderBottom: '1px solid #ccc',
        fontFamily: rowIndex === 0 && columnIndex === 0 ? 'monospace' : 'inherit',
        fontSize: rowIndex === 0 && columnIndex === 0 ? '12px' : 'inherit',
      }}
      {...props}
    >
      {content}
    </div>
  );
};

<Grid
  cell={VariableCell}
  focus={{ row: 0, column: 0 }}
  columnWidth={() => 300}
  rowAutoHeight={${rowAutoHeight}}
${Object.entries(props)
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
  render: (args) => {
    const VariableCell: CellProps = ({ type, rowIndex, columnIndex, isScrolling, width, ...props }) => {
      let content = `Row ${rowIndex}, Col ${columnIndex}${rowIndex % 2 === 0 ? '\nExtra line' : ''}`;
      
      if (rowIndex === 0 && columnIndex === 0) {
        content = `CREATE TABLE random_user_events (
    user_id UInt32,
    event_time DateTime,
    event_type Enum8('click' = 1, 'view' = 2, 'purchase' = 3),
    item_id String,
    price Decimal(10,2),
    quantity UInt16
) ENGINE = MergeTree()
ORDER BY (user_id, event_time)
PARTITION BY toYYYYMM(event_time)
SETTINGS index_granularity = 8192;`;
      }

      return (
        <div
          data-scrolling={isScrolling}
          style={{
            whiteSpace: 'pre-wrap',
            padding: '8px',
            borderBottom: '1px solid #ccc',
            fontFamily: rowIndex === 0 && columnIndex === 0 ? 'monospace' : 'inherit',
            fontSize: rowIndex === 0 && columnIndex === 0 ? '12px' : 'inherit',
          }}
          {...props}
        >
          {content}
        </div>
      );
    };

    return <Grid {...args} cell={VariableCell} columnWidth={() => 300} />;
  },
};
