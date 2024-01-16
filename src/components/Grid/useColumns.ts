import { RefObject, useCallback, useRef, useState } from "react";
import { ColumnResizeFn } from "./types";
import { VariableSizeGrid } from "react-window";

interface Props {
  columnCount: number;
  columnWidth: (index: number) => number;
  outerGridRef: RefObject<HTMLDivElement>;
  gridRef: RefObject<VariableSizeGrid>;
  onColumnResize: (columnIndex: number, newWidth: number) => void;
}
const useColumns = ({
  columnCount,
  columnWidth,
  outerGridRef,
  onColumnResize: onColumnResizeProp,
  gridRef,
}: Props) => {
  const prevWidth = useRef<Record<string, number>>({});
  const autoWidthIndices = useRef<Array<number>>([]);
  const [columnHorizontalPosition, setColumnHorizontalPosition] = useState<Array<number>>(
    () => {
      const columnWidthList = [...Array(columnCount).keys()];
      const array: Array<number> = [];
      return columnWidthList.reduce((acc, curr, index) => {
        const width = columnWidth(curr - 1);
        prevWidth.current[index.toString()] = width;
        if (index !== 0) {
          acc.push(width + acc[index - 1]);
        } else {
          acc.push(0);
        }
        return acc;
      }, array);
    }
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
              item.style.width = "auto";
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
      onColumnResizeProp(columnIndex, newWidth);
    },
    [columnCount, gridRef, onColumnResizeProp, outerGridRef]
  );

  return {
    columnHorizontalPosition,
    onColumnResize,
  };
};

export default useColumns;
