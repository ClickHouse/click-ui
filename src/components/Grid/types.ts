import {
  ComponentPropsWithoutRef,
  ComponentType,
  KeyboardEventHandler,
  MouseEventHandler,
  MutableRefObject,
  ReactNode,
} from "react";
import { VariableSizeGrid, VariableSizeGridProps } from "react-window";
import { ContextMenuItemProps } from "@/components";

interface CellCommonProps extends ComponentPropsWithoutRef<"div"> {
  columnIndex: number;
  isScrolling?: boolean;
}

interface CellHeaderProps extends CellCommonProps {
  rowIndex?: never;
  type: "header-cell";
  width: number;
}

interface CellBodyProps extends CellCommonProps {
  rowIndex: number;
  type: "row-cell";
  width: number;
}

type CellComponentProps = CellHeaderProps | CellBodyProps;

export type CellProps = ComponentType<CellComponentProps>;
export interface CellSelectionAction {
  type: "normal" | "shiftSelection";
  row: number;
  column: number;
  event?: KeyEventType;
}

export interface AllSelection {
  type: "all";
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
  | AllSelection
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

export type RoundedType = "none" | "sm" | "md" | "lg" | "xl";

export type KeyEventType = "keypress" | "click";
export type onSelectFn = (
  action: SelectionAction,
  selction: SelectedRegion,
  focus: SelectionFocus
) => void;

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

export type ColumnResizeFn = (
  columnIndex: number,
  newWidth: number,
  type: "auto" | "manual"
) => void;

export type SelectionFocus = { row: number; column: number };

export interface ItemDataType {
  showRowNumber: boolean;
  showHeader: boolean;
  getSelectionType: SelectionTypeFn;
  rowCount: number;
  columnCount: number;
  cell: CellProps;
  focus: SelectionFocus;
  rowHeight: number;
  headerHeight: number;
  rowNumberWidth: number;
  rowStart: number;
  rowAutoHeight?: boolean;
  updateRowHeight: (rowIndex: number, height: number) => void;
  getRowHeight: (index: number) => number;
}

export interface GridContextMenuItemProps extends Omit<ContextMenuItemProps, "children"> {
  label: ReactNode;
}

export interface GridProps extends Omit<
  VariableSizeGridProps,
  | "height"
  | "width"
  | "rowHeight"
  | "children"
  | "innerElementType"
  | "innerRef"
  | "outerElementType"
  | "outerRef"
  | "columnWidth"
> {
  autoFocus?: boolean;
  autoHeight?: boolean;
  rowStart?: number;
  rounded?: RoundedType;
  focus?: SelectionFocus;
  rowHeight?: number;
  cell: CellProps;
  showHeader?: boolean;
  showRowNumber?: boolean;
  headerHeight?: number;
  onFocusChange?: (rowIndex: number, columnIndex: number) => void;
  onSelect?: onSelectFn;
  onColumnResize?: (columnIndex: number, newWidth: number) => void;
  getMenuOptions?: (
    selection: SelectedRegion,
    focus: SelectionFocus
  ) => Array<GridContextMenuItemProps>;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
  selection?: SelectedRegion;
  showToast?: boolean;
  columnWidth?: (index: number) => number;
  onMouseDown?: MouseEventHandler<HTMLDivElement>;
  onMouseMove?: MouseEventHandler<HTMLDivElement>;
  showBorder?: boolean;
  onCopy?: (selection: SelectedRegion, focus: SelectionFocus) => void | Promise<void>;
  onCopyCallback?: (copied: boolean) => void;
  onContextMenu?: MouseEventHandler<HTMLDivElement>;
  forwardedGridRef?: MutableRefObject<VariableSizeGrid>;
  rowAutoHeight?: boolean;
}

export type ResizerPosition = {
  left: string;
  top?: string;
};

export type GetResizerPositionFn = (
  clientX: number,
  width: number,
  columnIndex: number
) => ResizerPosition;
