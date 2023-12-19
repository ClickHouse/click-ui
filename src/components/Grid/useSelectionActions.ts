import { KeyboardEventHandler, useCallback, useState } from "react";

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
  AllSelection,
} from "./types";

interface Props {
  onCellSelect: onSelectFn;
  focus: { row: number; column: number };
  columnCount: number;
  rowCount: number;
  onFocusRefChange: (rowIndex: number, columnIndex: number) => void;
  scrollGridTo: (props: { row?: number; column?: number }) => void;
}

interface SelectionActions {
  getSelectionType: SelectionTypeFn;
  onSelection: (action: SelectionAction) => void;
  mouseMoveCellSelect: (cell: HTMLElement) => void;
  onKeyDown: KeyboardEventHandler<HTMLDivElement>;
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
  // console.log(selection);
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
  onCellSelect,
  focus,
  columnCount,
  rowCount,
  onFocusRefChange,
  scrollGridTo,
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

  const allSelect = useCallback(
    (action: AllSelection) => {
      onCellSelect(action);
      setSelection({
        type: "rows",
        rows: new Set(rangeIndices(0, rowCount - 1)),
        anchorRow: 0,
      });
      scrollGridTo({ row: 0, column: 0 });
      onFocusRefChange(0, 0);
    },
    [onCellSelect, onFocusRefChange, rowCount, scrollGridTo]
  );

  const cellSelect = useCallback(
    (action: CellSelectionAction) => {
      const { row, column } = action;
      onCellSelect(action);
      scrollGridTo({ row, column });
      setSelection(selectCell(column, row));
    },
    [onCellSelect, scrollGridTo]
  );

  const shiftSelect = useCallback(
    (action: CellSelectionAction) => {
      const { row: rowIndex, column: columnIndex } = action;
      onCellSelect(action);
      const newSelection = rectangleSelection(
        columnIndex,
        rowIndex,
        focus.column,
        focus.row
      );
      scrollGridTo({ row: rowIndex, column: columnIndex });
      setSelection(newSelection);
    },
    [focus.column, focus.row, onCellSelect, scrollGridTo]
  );

  const rowSelect = useCallback(
    (action: RowSelectionAction) => {
      const rowIndex = action.row;
      onCellSelect(action);
      const newSelection = rowSelection([rowIndex], rowIndex);
      scrollGridTo({ row: rowIndex });
      setSelection(newSelection);
    },
    [onCellSelect, scrollGridTo]
  );

  const shiftRowSelect = useCallback(
    (action: RowSelectionAction) => {
      const rowIndex = action.row;
      onCellSelect(action);
      const newSelection = rowSelection(rangeIndices(focus.row, rowIndex), rowIndex);
      scrollGridTo({ row: rowIndex });
      setSelection(newSelection);
    },
    [focus.row, onCellSelect, scrollGridTo]
  );

  const columnSelect = useCallback(
    (action: ColumnSelectionAction) => {
      const columnIndex = action.column;
      onCellSelect(action);
      const newSelection = columnSelection([columnIndex], columnIndex);
      scrollGridTo({ column: columnIndex });
      setSelection(newSelection);
    },
    [onCellSelect, scrollGridTo]
  );

  const shiftColumnSelect = useCallback(
    (action: ColumnSelectionAction) => {
      const columnIndex = action.column;
      onCellSelect(action);
      const newSelection = columnSelection(
        rangeIndices(focus.column, columnIndex),
        columnIndex
      );
      scrollGridTo({ column: columnIndex });
      setSelection(newSelection);
    },
    [focus.column, onCellSelect, scrollGridTo]
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
      const isSelected = cellRectSelected(selection, 0, 0, columnCount, rowCount);
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

  const clearSelectionAndFocus = useCallback(
    (force: boolean) => {
      clearSelection(force);
      onFocusRefChange(focus.row, focus.column);
      scrollGridTo(focus);
    },
    [clearSelection, focus, onFocusRefChange, scrollGridTo]
  );

  const onKeyDown = useCallback(
    async (e: React.KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const moveAnchor = e.shiftKey;
      const { row, column } = focus;

      const applyAction = (action: SelectionAction | null): void => {
        console.log(action);
        if (action) {
          onSelection({ ...action, event: "keypress" });
        }
        if (action?.type === "normal") {
          onFocusRefChange(action.row, action.column);
        }
      };

      switch (e.key) {
        case "ArrowLeft":
          applyAction(moveSelection(-1, 0, moveAnchor, "keypress"));
          break;
        case "ArrowRight":
          applyAction(moveSelection(1, 0, moveAnchor, "keypress"));
          break;
        case "ArrowUp":
          applyAction(moveSelection(0, -1, moveAnchor, "keypress"));
          break;
        case "ArrowDown":
          applyAction(moveSelection(0, 1, moveAnchor, "keypress"));
          break;
        case "Enter":
          onSelection({
            type: "normal",
            row,
            column,
            event: "keypress",
          });
          onFocusRefChange(row, column);
          break;
        case "Escape":
          clearSelectionAndFocus(true);
          break;
      }
    },
    [onSelection, onFocusRefChange, moveSelection, focus, clearSelectionAndFocus]
  );

  const mouseMoveCellSelect = useCallback(
    (cell: HTMLElement) => {
      const target = cell.closest("[data-row][data-column]") as HTMLElement;

      const { row: rowIndexString, column: columnIndexString } = target?.dataset ?? {};

      if (!target || rowIndexString === undefined || columnIndexString === undefined) {
        return;
      }

      const row = parseInt(rowIndexString);
      const column = parseInt(columnIndexString);
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
    onKeyDown,
  };
};
