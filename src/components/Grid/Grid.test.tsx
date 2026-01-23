import { CellProps, Grid, GridProps } from "..";
import { renderCUI } from "../../utils/test-utils";
import { SelectionFocus } from "./types";
import { ReactNode } from "react";

const Cell: CellProps = ({ type, rowIndex, columnIndex, isScrolling, ...props }) => {
  let content = `${rowIndex} ${columnIndex} - ${type}`;

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
      {...props}
      data-testid={`${type}-${rowIndex ?? "x"}-${columnIndex ?? "x"}`}
    >
      {content}
    </div>
  );
};
interface Props extends Omit<
  GridProps,
  | "cell"
  | "rowCount"
  | "columnCount"
  | "columnWidth"
  | "focus"
  | "onFocusChange"
  | "onColumnResize"
> {
  rowCount?: number;
  columnCount?: number;
  columnWidth?: (index: number) => number;
  focus?: SelectionFocus;
  onFocusChange?: (rowIndex: number, columnIndex: number) => void;
  onColumnResize?: () => void;
  rowAutoHeight?: boolean;
}
type AutoSizerModule = typeof import("react-virtualized-auto-sizer");

vi.mock("react-virtualized-auto-sizer", async () => ({
  __esModule: true,
  ...(await vi.importActual<AutoSizerModule>("react-virtualized-auto-sizer")),
  default: vi.fn().mockImplementation(({ children }) => {
    return (children as (size: { width: number; height: number }) => ReactNode)({
      width: 600,
      height: 600,
    });
  }),
}));

describe("Grid", () => {
  const onColumnResizeTestFn = vi.fn();
  const onFocusChangeTestFn = vi.fn();
  const getMenuOptions = vi.fn();
  const columnWidthTestFn = () => {
    return 100;
  };

  const renderGrid = ({
    rowCount = 20,
    columnCount = 20,
    columnWidth,
    onColumnResize,
    focus,
    onFocusChange,
    rowAutoHeight,
    ...props
  }: Props) =>
    renderCUI(
      <Grid
        rowCount={rowCount}
        columnCount={columnCount}
        columnWidth={columnWidth ?? columnWidthTestFn}
        cell={Cell}
        focus={focus ?? { row: 0, column: 0 }}
        onColumnResize={onColumnResize ?? onColumnResizeTestFn}
        onFocusChange={onFocusChange ?? onFocusChangeTestFn}
        getMenuOptions={getMenuOptions}
        rowAutoHeight={rowAutoHeight}
        {...props}
      />
    );

  it("should render", async () => {
    const { queryByTestId, getByText } = renderGrid({});
    const rowNumber = getByText("1");
    expect(rowNumber).not.toBeNull();
    const cell = queryByTestId("row-cell-0-0");
    expect(cell).not.toBeNull();
    const headerCell = queryByTestId("header-cell-x-0");
    expect(headerCell).not.toBeNull();
    const lastCell = queryByTestId("row-cell-0-19");
    expect(lastCell).toBeNull();
    const lastHeaderCell = queryByTestId("header-cell-x-19");
    expect(lastHeaderCell).toBeNull();
  });

  it("should render focused element", () => {
    const { queryByTestId, getByText } = renderGrid({});
    const rowNumber = getByText("1");
    expect(rowNumber).not.toBeNull();
    const cell = queryByTestId("row-cell-0-0");
    expect(cell).not.toBeNull();
    cell && expect(cell.dataset.selected).toEqual("true");
    cell && expect(cell.dataset.focused).toEqual("true");
  });

  it("should set row height to default (33px) when rowAutoHeight is false", async () => {
    const { getByTestId } = renderGrid({
      rowCount: 10,
      columnCount: 10,
      rowAutoHeight: false,
    });

    const cell = getByTestId("row-cell-0-0");

    const computedHeight = window.getComputedStyle(cell).height;
    const heightValue = parseFloat(computedHeight);
    expect(heightValue).toBe(33);
  });

  it("should expand row height to 100% when rowAutoHeight is true", async () => {
    const { getByTestId } = renderGrid({
      rowCount: 1,
      columnCount: 1,
      rowAutoHeight: true,
    });

    const cell = getByTestId("row-cell-0-0");

    const computedHeight = window.getComputedStyle(cell).height;
    expect(computedHeight).toBe("100%");
  });
});
