import {
  KeyboardEventHandler,
  MouseEventHandler,
  PointerEventHandler,
  RefObject,
  useCallback,
  useRef,
  useState,
} from "react";

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
import { VariableSizeGrid } from "react-window";

const NO_BUTTONS_PRESSED = 0;
interface Props {
  onCellSelect: onSelectFn;
  focus: { row: number; column: number };
  columnCount: number;
  rowCount: number;
  onFocusRefChange: (rowIndex: number, columnIndex: number) => void;
}

interface SelectionActions {
  getSelectionType: SelectionTypeFn;
  onMouseDown: MouseEventHandler<HTMLDivElement>;
  onMouseMove: MouseEventHandler<HTMLDivElement>;
  onKeyDown: KeyboardEventHandler<HTMLDivElement>;
  onPointerDown: PointerEventHandler<HTMLDivElement>;
  onPointerUp: PointerEventHandler<HTMLDivElement>;
  containerRef: RefObject<HTMLDivElement>;
  gridRef: RefObject<VariableSizeGrid>;
}

const PRIMARY_BUTTON = 1; // Primary button (usually the left button)
const AUXILIARY_BUTTON = 4; // Auxiliary button (usually the mouse wheel button or middle button)

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
}: Props): SelectionActions => {
  const dragState = useRef<number | false>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<VariableSizeGrid>(null);
  const [selection, setSelection] = useState<SelectedRegion>({
    type: "empty",
  });

  const scrollGridTo = useCallback((rowIndex: number, columnIndex: number) => {
    if (gridRef.current) {
      gridRef.current.scrollToItem({
        columnIndex,
        rowIndex,
      });
    }
  }, []);

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
      onCellSelect(action);
      setSelection(selectCell(columnIndex, rowIndex));
    },
    [onCellSelect]
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
      setSelection(newSelection);
    },
    [focus.column, focus.row, onCellSelect]
  );

  const rowSelect = useCallback(
    (action: RowSelectionAction) => {
      const rowIndex = action.row;
      onCellSelect(action);
      const newSelection = rowSelection([rowIndex], rowIndex);
      setSelection(newSelection);
    },
    [onCellSelect]
  );

  const shiftRowSelect = useCallback(
    (action: RowSelectionAction) => {
      const rowIndex = action.row;
      onCellSelect(action);
      const newSelection = rowSelection(rangeIndices(focus.row, rowIndex), rowIndex);
      setSelection(newSelection);
    },
    [focus.row, onCellSelect]
  );

  const columnSelect = useCallback(
    (action: ColumnSelectionAction) => {
      const columnIndex = action.column;
      onCellSelect(action);
      const newSelection = columnSelection([columnIndex], columnIndex);
      setSelection(newSelection);
    },
    [onCellSelect]
  );

  const shiftColumnSelect = useCallback(
    (action: ColumnSelectionAction) => {
      const columnIndex = action.column;
      onCellSelect(action);
      const newSelection = columnSelection(
        rangeIndices(focus.column, columnIndex),
        columnIndex
      );
      setSelection(newSelection);
    },
    [focus.column, onCellSelect]
  );

  const onSelection = useCallback(
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

  const onMouseDown: MouseEventHandler<HTMLDivElement> = useCallback(
    e => {
      const target = (e.target as HTMLElement).closest(
        "[data-row][data-column]"
      ) as HTMLElement;
      if (
        !target ||
        target.dataset.row === undefined ||
        target.dataset.column === undefined
      ) {
        return;
      }

      const { row: rowIndexString, column: columnIndexString } = target.dataset;
      const row = parseInt(rowIndexString);
      const column = parseInt(columnIndexString);
      if (row === -1 && column === -1) {
        setSelection({
          type: "rows",
          rows: new Set(rangeIndices(0, rowCount - 1)),
          anchorRow: 0,
        });
        onFocusRefChange(0, 0);
        return;
      }
      if (row === -1) {
        onSelection({
          type: "columnSelection",
          column,
          event: "click",
        });
        onFocusRefChange(0, column);
        return;
      }
      if (column === -1) {
        onSelection({
          type: "rowSelection",
          row,
          event: "click",
        });
        onFocusRefChange(row, 0);
        return;
      }
      onSelection({
        type: "normal",
        row,
        column,
        event: "click",
      });
      onFocusRefChange(row, column);
    },
    [onFocusRefChange, onSelection, rowCount]
  );

  const clearSelectionAndFocus = useCallback(
    (force: boolean) => {
      clearSelection(force);
      onFocusRefChange(focus.row, focus.column);
      scrollGridTo(focus.row, focus.column);
    },
    [clearSelection, focus.column, focus.row, onFocusRefChange, scrollGridTo]
  );

  const changeSelectionAndFocus = useCallback(
    (action: SelectionAction, event: KeyEventType = "click") => {
      onSelection({ ...action, event });
      onFocusRefChange(
        "row" in action ? action.row : focus.row,
        "column" in action ? action.column : focus.column
      );
    },
    [focus.column, focus.row, onFocusRefChange, onSelection]
  );

  const onKeyDown = useCallback(
    async (e: React.KeyboardEvent) => {
      e.preventDefault();
      const moveAnchor = e.shiftKey;

      const applyAction = (action: SelectionAction | null): void => {
        if (action) {
          changeSelectionAndFocus(action);
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
          changeSelectionAndFocus(
            { type: "normal", row: focus.row, column: focus.column },
            "keypress"
          );
          break;
        case "Escape":
          clearSelectionAndFocus(true);
          break;
      }
    },
    [
      changeSelectionAndFocus,
      onFocusRefChange,
      moveSelection,
      focus,
      clearSelectionAndFocus,
    ]
  );

  const onPointerDown: PointerEventHandler<HTMLDivElement> = useCallback(e => {
    console.log("asasasasxxxx");

    dragState.current = e.pointerId;
  }, []);

  const onMouseMove: MouseEventHandler<HTMLDivElement> = useCallback(
    e => {
      console.log("asasas", e.target);
      if (e.buttons === NO_BUTTONS_PRESSED && dragState.current !== false) {
        containerRef.current?.releasePointerCapture(dragState.current);
        dragState.current = false;
      }

      if (dragState.current === false) {
        return;
      }

      const target = (e.target as HTMLElement).closest(
        "[data-row][data-column]"
      ) as HTMLElement;

      let { row: rowIndexString, column: columnIndexString } = target?.dataset ?? {};

      if (!target || rowIndexString === undefined || columnIndexString === undefined) {
        rowIndexString = "0";
        columnIndexString = "0";
        console.log(e.target);
      }

      if (containerRef.current) {
        containerRef.current.setPointerCapture(dragState.current);
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
        console.log("x", selection);
        onSelection({
          type: "shiftSelection",
          row:
            "bounds" in selection
              ? focus.row <= selection.bounds.bottom
                ? selection.bounds.top
                : selection.bounds.left
              : focus.column,
          column,
          event,
        });
        return;
      }
      if (column === -1) {
        console.log("xy", selection);
        onSelection({
          type: "shiftSelection",
          row,
          column:
            "bounds" in selection
              ? focus.column <= selection.bounds.right
                ? selection.bounds.right
                : selection.bounds.left
              : focus.column,
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

  const onPointerUp: PointerEventHandler<HTMLDivElement> = useCallback(
    e => {
      console.log(
        "Asasasas",
        e.buttons,
        e.button,
        [PRIMARY_BUTTON, AUXILIARY_BUTTON],
        [PRIMARY_BUTTON, AUXILIARY_BUTTON].includes(e.buttons)
      );

      console.log(containerRef);
      if (containerRef.current) {
        containerRef.current.releasePointerCapture(e.pointerId);
      }
      dragState.current = false;
      onFocusRefChange(focus.row, focus.column);
    },
    [focus.column, focus.row, onFocusRefChange]
  );

  return {
    getSelectionType,
    onMouseDown,
    onMouseMove,
    onKeyDown,
    onPointerDown,
    onPointerUp,
    containerRef,
    gridRef,
  };
};
