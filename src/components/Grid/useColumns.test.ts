import { renderHook, act } from "@testing-library/react";
import useColumns from "./useColumns";
import { VariableSizeGrid, VariableSizeGridProps } from "react-window";
import { ReactInstance, RefObject } from "react";

describe("useColumns", () => {
  let mockGridRef: RefObject<VariableSizeGrid>;
  let mockOuterGridRef: { current: HTMLDivElement };

  beforeEach(() => {
    mockGridRef = {
      current: {
        resetAfterColumnIndex: vi.fn(),
        scrollTo: () => {},
        scrollToItem: () => {},
        resetAfterIndices: () => {},
        resetAfterRowIndex: () => {},
        context: () => {},
        setState: () => {},
        forceUpdate: () => {},
        render: () => void {},
        props: {} as Readonly<VariableSizeGridProps<unknown>>,
        state: () => {},
        refs: {} as { [key: string]: ReactInstance },
      },
    };
    mockOuterGridRef = { current: document.createElement("div") };
    vi.clearAllMocks();
  });

  const renderColumnHook = (props = {}) =>
    renderHook(() =>
      useColumns({
        columnCount: 3,
        outerGridRef: mockOuterGridRef,
        gridRef: mockGridRef,
        ...props,
      })
    );

  describe("initColumnSize", () => {
    it("initializes columns with default width and positions of 100px", () => {
      const { result } = renderColumnHook();

      act(() => {
        result.current.initColumnSize(300);
      });

      const expectedPositions = [0, 100, 200];
      expectedPositions.forEach((position, index) => {
        expect(result.current.getColumnHorizontalPosition(index)).toBe(position);
        expect(result.current.columnWidth(index)).toEqual(100);
      });
    });

    it("returns default column width when the container is smaller than the sum of column widths", () => {
      const columnCount = 5;
      const { result } = renderColumnHook({ columnCount: 5 });

      act(() => {
        result.current.initColumnSize(200);
      });

      Array.from({ length: columnCount }).forEach((_, index) => {
        expect(result.current.columnWidth(index)).toBe(100);
      });
    });
  });

  describe("onColumnResize", () => {
    it("handles manual column resizing after initialization", () => {
      const { result } = renderColumnHook();

      act(() => {
        result.current.initColumnSize(300);
        result.current.onColumnResize(1, 150, "manual");
      });

      const expectedPositions = [0, 100, 250];
      expectedPositions.forEach((position, index) => {
        expect(result.current.getColumnHorizontalPosition(index)).toBe(position);
      });

      expect(result.current.columnWidth(1)).toBe(150);
    });

    it("resizes columns using columnWidthProp", () => {
      const expectedWidths = [150, 200, 250];
      const columnWidthProp = (index: number) => expectedWidths[index] || 100;
      const { result } = renderColumnHook({
        columnWidth: columnWidthProp,
        columnCount: expectedWidths.length,
      });

      act(() => {
        result.current.initColumnSize(600);
      });

      let accumulatedWidth = 0;
      expectedWidths.forEach((expectedWidth, index) => {
        expect(result.current.getColumnHorizontalPosition(index)).toBe(accumulatedWidth);
        expect(result.current.columnWidth(index)).toBe(expectedWidth);
        accumulatedWidth += expectedWidth;
      });

      expect(mockGridRef.current?.resetAfterColumnIndex).toHaveBeenCalledWith(0);
    });

    it("handles auto-width resizing using measureColumnWidth", () => {
      const mockCells = [
        { style: { width: "" }, scrollWidth: 110 },
        { style: { width: "" }, scrollWidth: 120 },
        { style: { width: "" }, scrollWidth: 115 },
      ];
      const mockQuerySelector = vi.fn().mockReturnValue(mockCells);
      const customMockOuterGridRef = {
        current: { querySelectorAll: mockQuerySelector },
      };

      const { result } = renderColumnHook({
        outerGridRef: customMockOuterGridRef as unknown,
      });

      act(() => {
        result.current.initColumnSize(300);
        result.current.onColumnResize(1, 0, "auto");
      });
      // prettier-ignore
      expect(mockQuerySelector).toHaveBeenCalledWith("[data-grid-column=\"1\"]");
      expect(result.current.columnWidth(1)).toBe(122);
    });
  });
});
