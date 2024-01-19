import { RefObject, useCallback, useRef, useState } from "react";
import { ColumnResizeFn } from "./types";
import { VariableSizeGrid } from "react-window";

const DEFAULT_WIDTH = 100;

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
  const prevWidth = useRef<Record<string, number>>({});
  const columnWidthRefs = useRef<Array<number>>([]);
  const autoWidthIndices = useRef<Array<number>>([]);
  const [columnHorizontalPosition, setColumnHorizontalPosition] = useState<Array<number>>(
    []
  );

  const initColumnSize = useCallback(
    (containerWidth: number) => {
      if (columnWidthRefs.current.length > 0) {
        return;
      }

      const newWidth =
        containerWidth > DEFAULT_WIDTH * columnCount
          ? containerWidth / columnCount
          : DEFAULT_WIDTH;
      const getWidth = (index: number) => {
        if (typeof columnWidthProp === "function") {
          return columnWidthProp(index - 1);
        }
        return newWidth;
      };

      const columnWidthList = [...Array(columnCount).keys()];
      const array: Array<number> = [];
      setColumnHorizontalPosition(() => {
        return columnWidthList.reduce((acc, index) => {
          const width = getWidth(index - 1);
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

  const onColumnResize: ColumnResizeFn = useCallback(
    (columnIndex, newWidth, type) => {
      if (type === "auto") {
        const widthIndex = autoWidthIndices.current.findIndex(
          index => index === columnIndex
        );
        if (widthIndex > -1) {
          newWidth = prevWidth.current[columnIndex.toString()];
          autoWidthIndices.current.splice(widthIndex, 1);
        } else if (outerGridRef.current) {
          newWidth = 32;
          outerGridRef.current
            .querySelectorAll<HTMLDivElement>(`[data-grid-column="${columnIndex}"]`)
            .forEach(item => {
              item.style.width = "fit-content";
              newWidth = Math.max(newWidth, item.scrollWidth);
            });
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
    [columnCount, gridRef, onColumnResizeProp, outerGridRef]
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
