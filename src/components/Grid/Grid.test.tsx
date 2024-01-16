import "@testing-library/jest-dom";
import { CellProps, Grid, GridProps } from "@/components";
import { renderCUI } from "@/utils/test-utils";
import { SelectionFocus } from "./types";
import { ReactNode } from "react";

const Cell: CellProps = ({ type, rowIndex, columnIndex, isScrolling, ...props }) => {
  return (
    <div
      data-scrolling={isScrolling}
      {...props}
      data-testid={`${type}-${rowIndex ?? "x"}-${columnIndex ?? "x"}`}
    >
      {rowIndex} {columnIndex} - {type}
    </div>
  );
};
interface Props
  extends Omit<
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
}
type AutoSizerModule = typeof import("react-virtualized-auto-sizer");

jest.mock<AutoSizerModule>("react-virtualized-auto-sizer", () => ({
  __esModule: true,
  ...jest.requireActual<AutoSizerModule>("react-virtualized-auto-sizer"),
  default: jest.fn().mockImplementation(({ children }) => {
    return (children as (size: { width: number; height: number }) => ReactNode)({
      width: 600,
      height: 600,
    });
  }),
}));

describe("Grid", () => {
  const onColumnResizeTestFn = jest.fn();
  const onFocusChangeTestFn = jest.fn();
  const getMenuOptions = jest.fn();
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

  it("should render focussed element", () => {
    const { queryByTestId, getByText } = renderGrid({});
    const rowNumber = getByText("1");
    expect(rowNumber).not.toBeNull();
    const cell = queryByTestId("row-cell-0-0");
    expect(cell).not.toBeNull();
    cell && expect(cell.dataset.selected).toEqual("true");
    cell && expect(cell.dataset.focused).toEqual("true");
  });
});
