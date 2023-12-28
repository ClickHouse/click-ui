import "@testing-library/jest-dom";
import { CellProps, Grid, GridProps } from "@/components";
import { fireEvent, waitFor } from "@testing-library/react";
import { renderCUI } from "@/utils/test-utils";
import { SelectionFocus } from "./types";
// import userEvent from "@testing-library/user-event";

const Cell: CellProps = ({ type, rowIndex, columnIndex, isScrolling, ...props }) => {
  return (
    <div {...props}>
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

describe("Grid", () => {
  const onColumnResizeTestFn = jest.fn();
  const onFocusChangeTestFn = jest.fn();
  const columnWidthTestFn = (index: number) => {
    return (index + 1) * 100;
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
      <div style={{ width: 500, height: 500 }}>
        <Grid
          rowCount={rowCount}
          columnCount={columnCount}
          columnWidth={columnWidth ?? columnWidthTestFn}
          cell={Cell}
          focus={focus ?? { row: 0, column: 0 }}
          onColumnResize={onColumnResize ?? onColumnResizeTestFn}
          onFocusChange={onFocusChange ?? onFocusChangeTestFn}
          {...props}
        />
      </div>
    );

  it("should render", async () => {
    const { getByText } = renderGrid({});
    const rowNumber = getByText("1");
    expect(rowNumber).not.toBeNull();
    const cell = getByText("0 0 - row-cell");
    expect(cell).not.toBeNull();
    const headerCell = getByText(" 0 - header-cell");
    expect(headerCell).not.toBeNull();
  });

  it("should not close hoverCard on clicking the checkbox", async () => {
    const { getByText } = renderGrid({});
    const rowNumber = getByText("1");
    expect(rowNumber).not.toBeNull();
    const cell = getByText("0 0 - row-cell");
    expect(cell).not.toBeNull();
    const headerCell = getByText(" 0 - header-cell");
    expect(headerCell).not.toBeNull();
  });

  it("should select entire row on clicking the row number", async () => {
    const { getByText, queryByText } = renderGrid({});
    const hoverCardTrigger = getByText("Hover Here");
    expect(hoverCardTrigger).not.toBeNull();
    fireEvent.pointerOver(hoverCardTrigger);

    await waitFor(() => {
      expect(getByText("Click on the input element below")).not.toBeNull();
    });
    fireEvent.pointerLeave(hoverCardTrigger);
    await waitFor(() => {
      expect(queryByText("Click on the input element below")).not.toBeInTheDocument();
    });
  });

  it("should not close hover card on pointerLeave and focus ", async () => {
    const { getByText, queryByText, getByTestId } = renderGrid({});
    const hoverCardTrigger = getByText("Hover Here");
    expect(hoverCardTrigger).not.toBeNull();
    fireEvent.pointerOver(hoverCardTrigger);

    await waitFor(() => {
      expect(getByText("Click on the input element below")).not.toBeNull();
    });
    const checkbox = getByTestId("checkbox");
    fireEvent.click(checkbox);
    fireEvent.pointerLeave(getByTestId("popover-panel"));
    await waitFor(() => {
      expect(queryByText("Click on the input element below")).not.toBeInTheDocument();
    });
  });
});
