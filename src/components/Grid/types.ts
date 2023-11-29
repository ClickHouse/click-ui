import { HTMLAttributes } from "react";

export interface CellProps extends HTMLAttributes<HTMLElement> {
  rowIndex?: number;
  columnIndex: number;
  type: "row-cell" | "header-cell";
}

export interface CellSelectionAction {
  type: "normal" | "shiftSelection";
  row: number;
  column: number;
  event?: KeyEventType;
}

export interface ColumnSelectionAction {
  type: "columnSelection" | "shiftColumnSelection" | "ctrlColumnSelection";
  column: number;
  event?: KeyEventType;
}

export interface RowSelectionAction {
  type: "rowSelection" | "shiftRowSelection" | "ctrlRowSelection";
  row: number;
  event?: KeyEventType;
}

export type SelectionAction =
  | CellSelectionAction
  | ColumnSelectionAction
  | RowSelectionAction;

export type SelectionType = "default" | "selectIndirect" | "selectDirect";

export interface SelectionPos {
  column: number;
  row: number;
}

export interface EmptySelection {
  type: "empty";
}

export interface RowsSelection {
  type: "rows";
  rows: Set<number>;
  anchorRow: number;
}

export interface ColumnsSelection {
  type: "columns";
  columns: Set<number>;
  anchorColumn: number;
}

export interface Rectangle {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export interface RectangleSelection {
  type: "rectangle";
  bounds: Rectangle;
  anchor: SelectionPos;
}

export type SelectedRegion =
  | EmptySelection
  | RowsSelection
  | ColumnsSelection
  | RectangleSelection;

export type RoundedType = "none" | "lg" | "md" | "sm";

export type KeyEventType = "keypress" | "click";
export type onSelectFn = (props: SelectionAction) => void;

type IsAllSelectedType = {
  type: "all";
};

type IsRowSelectedType = {
  type: "row";
  row: number;
};

type IsColumnSelectedType = {
  type: "column";
  column: number;
};

type IsCellSelectedType = {
  type: "cell";
  row: number;
  column: number;
};

export type IsSelectedType =
  | IsAllSelectedType
  | IsRowSelectedType
  | IsColumnSelectedType
  | IsCellSelectedType;

export type SelectionTypeFn = (props: IsSelectedType) => SelectionType;
