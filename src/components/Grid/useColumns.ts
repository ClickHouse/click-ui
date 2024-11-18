import { RefObject, useCallback, useRef, useState } from "react";
import { ColumnResizeFn } from "./types";
import { VariableSizeGrid } from "react-window";

const DEFAULT_WIDTH = 100;
const MIN_COLUMN_WIDTH = 32;

interface Props {
  columnCount: number;
  columnWidth?: (index: number) => number;
  outerGridRef: RefObject<HTMLDivElement>;
  gridRef: RefObject<VariableSizeGrid>;
  onColumnResize?: (columnIndex: number, newWidth: number) => void;
}
const useColumns = ({
  columnCount,
  columnWidth: columnWidthProp,
  outerGridRef,
  onColumnResize: onColumnResizeProp,
  gridRef,
}: Props) => {
  const columnResized = useRef(false);
  const prevWidth = useRef<Record<string, number>>({});
  const columnWidthRefs = useRef<Array<number>>([]);
  const autoWidthIndices = useRef<Array<number>>([]);
  const [columnHorizontalPosition, setColumnHorizontalPosition] = useState<Array<number>>(
    []
  );

  const initColumnSize = useCallback(
    (containerWidth: number) => {
      const newWidth =
        containerWidth > DEFAULT_WIDTH * columnCount
          ? containerWidth / columnCount
          : DEFAULT_WIDTH;
      if (columnResized.current) {
        return;
      }

      const getWidth = (index: number) => {
        if (typeof columnWidthProp === "function") {
          return columnWidthProp(index);
        }
        return newWidth;
      };

      const columnWidthList = [...Array(columnCount).keys()];
      const array: Array<number> = [];
      setColumnHorizontalPosition(() => {
        return columnWidthList.reduce((acc, index) => {
          const width = getWidth(index);
          prevWidth.current[index.toString()] = width;
          columnWidthRefs.current[index] = width;
          if (index !== 0) {
            acc.push(width + acc[index - 1]);
          } else {
            acc.push(0);
          }
          return acc;
        }, array);
      });
      gridRef.current?.resetAfterColumnIndex(0);
    },
    [columnCount, columnWidthProp, gridRef]
  );

  /**
   * Measures the minimum width required to display all content in a column without wrapping or truncation.
   * Note. We cannot simply measure item.scrollWidth, because it will return the current width if it is larger than needed.
   * To workaround it, we temporary shrink the column width to MIN_COLUMN_WIDTH and measure the scrollWidth.
   * @param {number} columnIndex - The index of the column to measure
   * @returns {number} The minimum width needed for the column's content (in pixels)
   *                   Returns MIN_COLUMN_WIDTH if outerGridRef is not available
   */
  const measureColumnWidth = useCallback(
    (columnIndex: number): number => {
      if (!outerGridRef.current) {
        // The check is not necessary, but without it the linter will complain.
        return MIN_COLUMN_WIDTH;
      }

      // Store the original widths
      const cells = outerGridRef.current.querySelectorAll<HTMLDivElement>(
        `[data-grid-column="${columnIndex}"]`
      );
      // In theory, all widths are the same, but it's better to be safe than sorry.
      const originalWidths = Array.from(cells).map(cell => cell.style.width);

      // Temporarily set cells to minimum width
      cells.forEach(cell => {
        cell.style.width = `${MIN_COLUMN_WIDTH}px`;
      });

      // Measure the actual content width
      let maxWidth = MIN_COLUMN_WIDTH;
      cells.forEach(item => {
        maxWidth = Math.max(maxWidth, item.scrollWidth + 2);
      });

      // Restore original widths
      cells.forEach((cell, i) => {
        cell.style.width = originalWidths[i];
      });

      return maxWidth;
    },
    [outerGridRef]
  );

  const onColumnResize: ColumnResizeFn = useCallback(
    (columnIndex, newWidth, type) => {
      columnResized.current = true;
      if (type === "auto") {
        const widthIndex = autoWidthIndices.current.findIndex(
          index => index === columnIndex
        );
        if (widthIndex > -1) {
          newWidth = prevWidth.current[columnIndex.toString()];
          autoWidthIndices.current.splice(widthIndex, 1);
        } else if (outerGridRef.current) {
          newWidth = measureColumnWidth(columnIndex);
          autoWidthIndices.current.push(columnIndex);
        }
      } else {
        const widthIndex = autoWidthIndices.current.findIndex(
          index => index === columnIndex
        );
        autoWidthIndices.current.splice(widthIndex, 1);
        prevWidth.current[columnIndex.toString()] = newWidth;
      }

      columnWidthRefs.current[columnIndex] = newWidth;
      setColumnHorizontalPosition(columnHorizontalPosition => {
        const currentWidth =
          columnHorizontalPosition[columnIndex + 1] -
          columnHorizontalPosition[columnIndex];
        const diff = newWidth - currentWidth;

        for (let i = columnIndex + 1; i < columnCount; i++) {
          columnHorizontalPosition[i] = columnHorizontalPosition[i] + diff;
        }
        return [...columnHorizontalPosition];
      });
      gridRef.current?.resetAfterColumnIndex(columnIndex);
      if (typeof onColumnResizeProp === "function") {
        onColumnResizeProp(columnIndex, newWidth);
      }
    },
    [columnCount, gridRef, onColumnResizeProp, measureColumnWidth]
  );

  const columnWidth = useCallback(
    (columnIndex: number) => {
      if (columnWidthProp) {
        return columnWidthProp(columnIndex);
      }

      return columnWidthRefs.current[columnIndex] ?? DEFAULT_WIDTH;
    },
    [columnWidthProp]
  );

  const getColumnHorizontalPosition = useCallback(
    (index: number) => {
      return columnHorizontalPosition[index] ?? DEFAULT_WIDTH * index;
    },
    [columnHorizontalPosition]
  );

  return {
    getColumnHorizontalPosition,
    onColumnResize,
    columnWidth,
    initColumnSize,
  };
};

export default useColumns;
