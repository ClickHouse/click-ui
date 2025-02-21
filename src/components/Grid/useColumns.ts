import { RefObject, useCallback, useRef, useState } from "react";
import { ColumnResizeFn } from "./types";
import { VariableSizeGrid } from "react-window";

const DEFAULT_WIDTH = 100;
const MIN_COLUMN_WIDTH = 32;

/**
 * Measures the minimum width required to display all content in a column without wrapping or truncation.
 * Note. We cannot simply measure item.scrollWidth, because it will return the current width if it is larger than needed.
 * To workaround it, we temporary shrink the column width to MIN_COLUMN_WIDTH and measure the scrollWidth.
 * @param {number} columnIndex - The index of the column to measure.
 * @param {HTMLDivElement} outerGrid - The grid element containing the column.
 * @returns {number} The minimum width needed for the column's content (in pixels).
 */
const measureColumnWidth = (columnIndex: number, outerGrid: HTMLDivElement): number => {
  // Store the original widths
  const cells = outerGrid.querySelectorAll<HTMLDivElement>(
    `[data-grid-column="${columnIndex}"]`
  );

  // Store the original widths and temporarily set cells to minimum width
  const originalWidths: string[] = [];
  cells.forEach(cell => {
    originalWidths.push(cell.style.width);
    cell.style.width = `${MIN_COLUMN_WIDTH}px`;
  });

  // Measure the actual content width
  const maxWidth = Array.from(cells).reduce((max, item) => {
    return Math.max(max, item.scrollWidth + 2);
  }, MIN_COLUMN_WIDTH);

  // Restore original widths
  cells.forEach((cell, i) => {
    cell.style.width = originalWidths[i];
  });

  return maxWidth;
};

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
      
      setColumnHorizontalPosition(() => {
        return columnWidthList.reduce((acc, _, index) => {
          const width = getWidth(index);
          prevWidth.current[index.toString()] = width;
          columnWidthRefs.current[index] = width;
          acc.push(acc[index] + width);
          return acc;
        }, [0]);
      })
      gridRef.current?.resetAfterColumnIndex(0);
    },
    [columnCount, columnWidthProp, gridRef]
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
          newWidth = measureColumnWidth(columnIndex, outerGridRef.current);
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
    [gridRef, onColumnResizeProp, outerGridRef, columnCount]
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
