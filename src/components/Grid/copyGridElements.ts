import { SelectedRegion, SelectionFocus } from "./types";

interface CopyGridElementsProps {
  getElement: (rowIndex: number, columnIndex: number) => string;
  selection: SelectedRegion;
  rowCount: number;
  columnCount: number;
  pageStart?: number;
  focus: SelectionFocus;
}

const copyGridElements = async ({
  getElement,
  selection,
  rowCount,
  columnCount,
  pageStart = 0,
  focus,
}: CopyGridElementsProps): Promise<void> => {
  let text = "";
  switch (selection.type) {
    case "rectangle":
      text = Array.from(
        { length: selection.bounds.bottom + 1 - selection.bounds.top },
        (_, index) => selection.bounds.top + index
      )
        .map(rowIndex => {
          return Array.from(
            { length: selection.bounds.right + 1 - selection.bounds.left },
            (_, index) => selection.bounds.left + index
          )
            .map(columnIndex => getElement(rowIndex, columnIndex))
            .join("\t");
        })
        .join("\n");
      break;
    case "columns":
      text = Array.from({ length: rowCount }, (_, index) => pageStart + index)
        .map(rowIndex => {
          return [...selection.columns]
            .sort()
            .map(columnIndex => getElement(rowIndex, columnIndex))
            .join("\t");
        })
        .join("\n");
      break;
    case "rows":
      text = [...selection.rows]
        .sort()
        .map(rowIndex => {
          return Array.from({ length: columnCount }, (_, index) => pageStart + index)
            .map(columnIndex => getElement(rowIndex, columnIndex))
            .join("\t");
        })
        .join("\n");
      break;
    case "empty":
      text = getElement(focus.row, focus.column);
      break;
    default:
      throw new Error("incorrect selection provided");
  }

  await navigator.clipboard.writeText(text);
  return;
};

export default copyGridElements;
