import { useCallback } from "react";

import {
  SelectionAction,
  SelectedRegion,
  SelectionPos,
  RowsSelection,
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
  AllSelection,
} from "./types";

interface Props {
  onCellSelect: onSelectFn;
  focus: { row: number; column: number };
  columnCount: number;
  rowCount: number;
  onFocusChange: (rowIndex: number, columnIndex: number) => void;
  scrollGridTo: (props: { row?: number; column?: number }) => void;
  selection: SelectedRegion;
}

interface SelectionActions {
  getSelectionType: SelectionTypeFn;
  onSelection: (action: SelectionAction) => void;
  mouseMoveCellSelect: (row: number, column: number) => void;
  moveSelection: (
    columnDiff: number,
    rowDiff: number,
    moveAnchor: boolean,
    event: KeyEventType
  ) => SelectionAction | null;
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
): SelectedRegion => {
  if (anchorColumn === focusColumn && focusRow === anchorRow) {
    return emptySelection();
  }
  return {
    type: "rectangle",
    bounds: orderedRect(anchorColumn, anchorRow, focusColumn, focusRow),
    anchor: { column: anchorColumn, row: anchorRow },
  };
};

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
  onCellSelect,
  focus,
  columnCount,
  rowCount,
  onFocusChange,
  scrollGridTo,
  selection,
}: Props): SelectionActions => {
  const allSelect = useCallback(
    (action: AllSelection) => {
      const newSelection: SelectedRegion = {
        type: "rows",
        rows: new Set(rangeIndices(0, rowCount - 1)),
        anchorRow: 0,
      };
      scrollGridTo({ row: 0, column: 0 });
      onFocusChange(0, 0);
      onCellSelect(action, newSelection, {
        row: 0,
        column: 0,
      });
    },
    [onCellSelect, onFocusChange, rowCount, scrollGridTo]
  );

  const cellSelect = useCallback(
    (action: CellSelectionAction) => {
      const { row, column } = action;
      scrollGridTo({ row, column });
      onFocusChange(row, column);
      const newSelection: SelectedRegion = emptySelection();
      onCellSelect(action, newSelection, focus);
    },
    [focus, onCellSelect, onFocusChange, scrollGridTo]
  );

  const shiftSelect = useCallback(
    (action: CellSelectionAction) => {
      const { row: rowIndex, column: columnIndex } = action;
      const newSelection = rectangleSelection(
        columnIndex,
        rowIndex,
        focus.column,
        focus.row
      );
      scrollGridTo({ row: rowIndex, column: columnIndex });
      onCellSelect(action, newSelection, focus);
    },
    [focus, onCellSelect, scrollGridTo]
  );

  const rowSelect = useCallback(
    (action: RowSelectionAction) => {
      const rowIndex = action.row;
      const newSelection = rowSelection([rowIndex], rowIndex);
      scrollGridTo({ row: rowIndex });
      onCellSelect(action, newSelection, focus);
    },
    [focus, onCellSelect, scrollGridTo]
  );

  const shiftRowSelect = useCallback(
    (action: RowSelectionAction) => {
      const rowIndex = action.row;
      const newSelection = rowSelection(rangeIndices(focus.row, rowIndex), rowIndex);
      scrollGridTo({ row: rowIndex });
      onCellSelect(action, newSelection, focus);
    },
    [focus, onCellSelect, scrollGridTo]
  );

  const columnSelect = useCallback(
    (action: ColumnSelectionAction) => {
      const columnIndex = action.column;
      const newSelection = columnSelection([columnIndex], columnIndex);
      scrollGridTo({ column: columnIndex });
      onCellSelect(action, newSelection, focus);
    },
    [focus, onCellSelect, scrollGridTo]
  );

  const shiftColumnSelect = useCallback(
    (action: ColumnSelectionAction) => {
      const columnIndex = action.column;
      const newSelection = columnSelection(
        rangeIndices(focus.column, columnIndex),
        columnIndex
      );
      onCellSelect(action, newSelection, focus);
      scrollGridTo({ column: columnIndex });
    },
    [focus, onCellSelect, scrollGridTo]
  );

  const onSelection = useCallback(
    (action: SelectionAction): void => {
      switch (action.type) {
        case "all":
          allSelect(action);
          break;
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
    [
      allSelect,
      cellSelect,
      shiftSelect,
      columnSelect,
      shiftColumnSelect,
      rowSelect,
      shiftRowSelect,
    ]
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
          const row = clamp(selection.anchorRow + rowDiff, 0, rowCount - 1);
          action = { type: "shiftRowSelection", row, event };
        } else if (selection.type === "columns") {
          const column = clamp(selection.anchorColumn + columnDiff, 0, columnCount - 1);
          action = { type: "shiftColumnSelection", column, event };
        } else if (selection.type === "rectangle") {
          const row = clamp(selection.anchor.row + rowDiff, 0, rowCount - 1);
          const column = clamp(selection.anchor.column + columnDiff, 0, columnCount - 1);
          action = { type: "shiftSelection", row, column, event };
        }
      } else {
        const row = clamp(focus.row + rowDiff, 0, rowCount - 1);
        const column = clamp(focus.column + columnDiff, 0, columnCount - 1);
        action = { type: "normal", row, column, event };
      }

      if (action) {
        onSelection(action);
      }

      return action;
    },
    [onSelection, columnCount, rowCount, selection, focus]
  );

  const getSelectionType = (args: IsSelectedType): SelectionType => {
    if (args.type === "all") {
      const isSelected = cellRectSelected(selection, 0, 0, columnCount - 1, rowCount - 1);
      return isSelected ? "selectDirect" : "default";
    }

    if (args.type === "column") {
      if (cellRectSelected(selection, args.column, 0, args.column, rowCount)) {
        return "selectDirect";
      }

      return columnAnySelected(selection, args.column) ? "selectIndirect" : "default";
    }

    const isRowSelected = cellRectSelected(selection, 0, args.row, columnCount, args.row);
    const isRowAnySelected =
      focus.row === args.row || rowAnySelected(selection, args.row);

    if (args.type === "cell" && args.column == -1) {
      return "default";
    }

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

    if (selection.type === "columns") {
      return "default";
    }

    return "selectIndirect";
  };

  const mouseMoveCellSelect = useCallback(
    (row: number, column: number) => {
      const selectionType = selection.type;
      const event = "click";
      if (row === -1 && column == -1) {
        return;
      }

      if (selectionType === "columns") {
        onSelection({
          type: "shiftColumnSelection",
          column,
          event,
        });
        return;
      }

      if (selectionType === "rows") {
        onSelection({
          type: "shiftRowSelection",
          row,
          event,
        });
        return;
      }

      if (row === -1) {
        let row = focus.row;
        if (selection.type !== "empty") {
          const {
            bounds: { top, bottom },
          } = selection;
          if (top <= row) {
            row = top;
          } else {
            row = bottom;
          }
        }
        onSelection({
          type: "shiftSelection",
          row,
          column,
          event,
        });
        return;
      }
      if (column === -1) {
        let column = focus.column;
        if (selection.type !== "empty") {
          const {
            bounds: { left, right },
          } = selection;
          if (left <= column) {
            column = left;
          } else {
            column = right;
          }
        }
        onSelection({
          type: "shiftSelection",
          row,
          column,
          event,
        });
        return;
      }

      onSelection({
        type: "shiftSelection",
        row,
        column,
        event,
      });
    },
    [focus.column, focus.row, onSelection, selection]
  );

  return {
    getSelectionType,
    onSelection,
    mouseMoveCellSelect,
    moveSelection,
  };
};
