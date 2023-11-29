import { useCallback, useState } from "react";

import {
  SelectionAction,
  SelectedRegion,
  SelectionPos,
  RowsSelection,
  RectangleSelection,
  Rectangle,
  ColumnsSelection,
  KeyEventType,
  onSelectFn,
  RowSelectionAction,
  ColumnSelectionAction,
  CellSelectionAction,
  SelectionType,
  IsSelectedType,
  SelectionTypeFn,
} from "./types";

interface Props {
  onSelect: onSelectFn;
  focus: { row: number; column: number };
  columnCount: number;
  rowCount: number;
}

interface SelectionActions {
  onSelect: onSelectFn;
  clearSelection: (force: boolean) => void;
  moveSelection: (
    columnDiff: number,
    rowDiff: number,
    moveAnchor: boolean,
    action: KeyEventType
  ) => SelectionAction | null;
  getSelectionType: SelectionTypeFn;
}

export const singleCellSelected = (selection: SelectedRegion): SelectionPos | null => {
  if (
    selection.type === "rectangle" &&
    selection.bounds.left === selection.bounds.right &&
    selection.bounds.top === selection.bounds.bottom
  ) {
    return {
      column: selection.bounds.left,
      row: selection.bounds.top,
    };
  } else {
    return null;
  }
};

const orderedRect = (x1: number, y1: number, x2: number, y2: number): Rectangle => {
  const left = Math.min(x1, x2);
  const right = Math.max(x1, x2);
  const top = Math.min(y1, y2);
  const bottom = Math.max(y1, y2);
  return { left, right, top, bottom };
};

export const cellRectSelected = (
  selection: SelectedRegion,
  x1: number,
  y1: number,
  x2: number,
  y2: number
): boolean => {
  const { left, right, top, bottom } = orderedRect(x1, y1, x2, y2);

  switch (selection.type) {
    case "columns":
      for (let i = left; i <= right; ++i) {
        if (!selection.columns.has(i)) {
          return false;
        }
      }
      return true;
    case "rows":
      for (let i = top; i <= bottom; ++i) {
        if (!selection.rows.has(i)) {
          return false;
        }
      }
      return true;
    case "rectangle":
      return (
        selection.bounds.left <= left &&
        selection.bounds.right >= right &&
        selection.bounds.top <= top &&
        selection.bounds.bottom >= bottom
      );
    default:
      return false;
  }
};

const rowSelection = (rows: Iterable<number>, anchorRow: number): RowsSelection => ({
  type: "rows",
  rows: new Set(rows),
  anchorRow,
});

const columnSelection = (
  columns: Iterable<number>,
  anchorColumn: number
): ColumnsSelection => ({
  type: "columns",
  columns: new Set(columns),
  anchorColumn,
});

export const rectangleSelection = (
  anchorColumn: number,
  anchorRow: number,
  focusColumn: number,
  focusRow: number
): RectangleSelection => ({
  type: "rectangle",
  bounds: orderedRect(anchorColumn, anchorRow, focusColumn, focusRow),
  anchor: { column: anchorColumn, row: anchorRow },
});

export const emptySelection = (): SelectedRegion => ({ type: "empty" });

export const columnIsSelected = (
  selection: SelectedRegion,
  column: number,
  bounds: Rectangle
): boolean => cellRectSelected(selection, column, bounds.top, column, bounds.bottom);
const rowAnySelected = (selection: SelectedRegion, row: number): boolean =>
  selection.type === "columns" ||
  (selection.type === "rows" && selection.rows.has(row)) ||
  (selection.type === "rectangle" &&
    selection.bounds.top <= row &&
    selection.bounds.bottom >= row);

const columnAnySelected = (selection: SelectedRegion, column: number): boolean =>
  selection.type === "rows" ||
  (selection.type === "columns" && selection.columns.has(column)) ||
  (selection.type === "rectangle" &&
    selection.bounds.left <= column &&
    selection.bounds.right >= column);

export const selectCell = (col: number, row: number): SelectedRegion =>
  rectangleSelection(col, row, col, row);

export const rangeIndices = (a: number, b: number): number[] => {
  const low = Math.min(a, b);
  const high = Math.max(a, b);
  const indices: number[] = [];
  for (let i = low; i <= high; ++i) {
    indices.push(i);
  }
  return indices;
};

export const useSelectionActions = ({
  onSelect: onSelectProp,
  focus,
  columnCount,
  rowCount,
}: Props): SelectionActions => {
  const [selection, setSelection] = useState<SelectedRegion>({
    type: "empty",
  });

  const clearSelection = useCallback((force: boolean): void => {
    setSelection(selection => {
      if (selection.type === "columns" && !force) {
        return selection;
      } else {
        return { type: "empty" };
      }
    });
  }, []);

  const cellSelect = useCallback(
    (action: CellSelectionAction) => {
      const { row: rowIndex, column: columnIndex } = action;
      onSelectProp(action);
      setSelection(selectCell(columnIndex, rowIndex));
    },
    [onSelectProp]
  );

  const shiftSelect = useCallback(
    (action: CellSelectionAction) => {
      const { row: rowIndex, column: columnIndex } = action;
      onSelectProp(action);
      const newSelection = rectangleSelection(
        columnIndex,
        rowIndex,
        focus.column,
        focus.row
      );
      setSelection(newSelection);
    },
    [focus.column, focus.row, onSelectProp, selection]
  );

  const rowSelect = useCallback(
    (action: RowSelectionAction) => {
      const rowIndex = action.row;
      onSelectProp(action);
      const newSelection = rowSelection([rowIndex], rowIndex);
      setSelection(newSelection);
    },
    [onSelectProp, selection]
  );

  const shiftRowSelect = useCallback(
    (action: RowSelectionAction) => {
      const rowIndex = action.row;
      onSelectProp(action);
      const newSelection = rowSelection(rangeIndices(focus.row, rowIndex), rowIndex);
      setSelection(newSelection);
    },
    [focus.row, onSelectProp]
  );

  const columnSelect = useCallback(
    (action: ColumnSelectionAction) => {
      const columnIndex = action.column;
      onSelectProp(action);
      const newSelection = columnSelection([columnIndex], columnIndex);
      setSelection(newSelection);
    },
    [onSelectProp, selection]
  );

  const shiftColumnSelect = useCallback(
    (action: ColumnSelectionAction) => {
      const columnIndex = action.column;
      onSelectProp(action);
      const newSelection = columnSelection(
        rangeIndices(focus.column, columnIndex),
        columnIndex
      );
      setSelection(newSelection);
    },
    [focus.column, onSelectProp]
  );

  const onSelect = useCallback(
    (action: SelectionAction): void => {
      switch (action.type) {
        case "normal":
          cellSelect(action);
          break;
        case "shiftSelection":
          shiftSelect(action);
          break;
        case "columnSelection":
          columnSelect(action);
          break;
        case "shiftColumnSelection":
          shiftColumnSelect(action);
          break;
        case "rowSelection":
          rowSelect(action);
          break;
        case "shiftRowSelection":
          shiftRowSelect(action);
          break;
        default:
          throw new Error(`Value should not occur ${action}`);
      }
    },
    [cellSelect, shiftSelect, columnSelect, rowSelect, shiftColumnSelect, shiftRowSelect]
  );

  const moveSelection = useCallback(
    (
      columnDiff: number,
      rowDiff: number,
      moveAnchor: boolean,
      event: KeyEventType
    ): SelectionAction | null => {
      const clamp = (n: number, low: number, high: number) => {
        return Math.max(low, Math.min(high, n));
      };

      let action: SelectionAction | null = null;

      if (moveAnchor) {
        if (selection.type === "rows") {
          const row = clamp(selection.anchorRow + rowDiff, 0, rowCount);
          action = { type: "shiftRowSelection", row, event };
        } else if (selection.type === "columns") {
          const column = clamp(selection.anchorColumn + columnDiff, 0, columnCount);
          action = { type: "shiftColumnSelection", column, event };
        } else if (selection.type === "rectangle") {
          const row = clamp(selection.anchor.row + rowDiff, 0, rowCount);
          const column = clamp(selection.anchor.column + columnDiff, 0, columnCount);
          action = { type: "shiftSelection", row, column, event };
        }
      } else {
        const row = clamp(focus.row + rowDiff, 0, rowCount);
        const column = clamp(focus.column + columnDiff, 0, columnCount);
        action = { type: "normal", row, column, event };
      }

      if (action) {
        onSelect(action);
      }

      return action;
    },
    [onSelect, columnCount, rowCount, selection, focus]
  );

  const getSelectionType = (args: IsSelectedType): SelectionType => {
    if (args.type === "all") {
      const isSelected = cellRectSelected(selection, 0, 0, columnCount, rowCount);
      return isSelected ? "selectDirect" : "default";
    }

    if (args.type === "column") {
      if (cellRectSelected(selection, args.column, 0, args.column, rowCount)) {
        return "selectDirect";
      }
      return columnAnySelected(selection, args.column) ? "selectIndirect" : "default";
    }
    const isRowSelected = cellRectSelected(selection, 0, 0, columnCount, rowCount);
    const isRowAnySelected = rowAnySelected(selection, args.row);
    if (isRowSelected) {
      return "selectDirect";
    }
    if (!isRowAnySelected) {
      return "default";
    }
    if (args.type === "cell") {
      const { row, column } = args;
      if (row >= rowCount || column >= columnCount || row < 0 || column < 0) {
        return "default";
      }
      if (cellRectSelected(selection, column, row, column, row)) {
        return "selectDirect";
      }
    }
    return "selectIndirect";
  };
  return {
    onSelect,
    clearSelection,
    moveSelection,
    getSelectionType,
  };
};
