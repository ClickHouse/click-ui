import { CellProps, SelectedRegion, SelectionFocus } from "./types";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

interface CopyGridElementsProps {
  cell: CellProps;
  selection: SelectedRegion;
  rowCount: number;
  columnCount: number;
  pageStart?: number;
  focus: SelectionFocus;
}

const addCellToRow = (
  row: HTMLTableRowElement,
  cell: CellProps,
  rowIndex: number,
  columnIndex: number
) => {
  const td = document.createElement("td");
  // const root = createRoot(td);
  const html = renderToStaticMarkup(
    createElement(cell, { rowIndex, columnIndex, type: "row-cell" })
  );
  td.innerHTML = html;

  row.appendChild(td);
  // root.unmount();
};

const columnListLoop = (
  tbody: HTMLTableSectionElement,
  columnList: Array<number>,
  cell: CellProps,
  rowIndex: number
) => {
  const row = document.createElement("tr");
  columnList.forEach(columnIndex => {
    addCellToRow(row, cell, rowIndex, columnIndex);
  });
  tbody.appendChild(row);
};

const copyGridElements = async ({
  cell,
  selection,
  rowCount,
  columnCount,
  pageStart = 0,
  focus,
}: CopyGridElementsProps): Promise<void> => {
  const table = document.createElement("table");
  table.style.position = "absolute";
  table.style.width = "0px";
  table.style.height = "0px";
  table.style.overflow = "hidden";
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  switch (selection.type) {
    case "rectangle":
      Array.from(
        { length: selection.bounds.bottom + 1 - selection.bounds.top },
        (_, index) => selection.bounds.top + index
      ).forEach(rowIndex => {
        const columnList = Array.from(
          { length: selection.bounds.right + 1 - selection.bounds.left },
          (_, index) => selection.bounds.left + index
        );
        columnListLoop(tbody, columnList, cell, rowIndex);
      });
      break;
    case "columns":
      Array.from({ length: rowCount }, (_, index) => pageStart + index).forEach(
        rowIndex => {
          const columnList = [...selection.columns].sort();
          columnListLoop(tbody, columnList, cell, rowIndex);
        }
      );
      break;
    case "rows":
      [...selection.rows].sort().forEach(rowIndex => {
        const columnList = Array.from(
          { length: columnCount },
          (_, index) => pageStart + index
        );
        columnListLoop(tbody, columnList, cell, rowIndex);
      });
      break;
    case "empty":
      columnListLoop(tbody, [focus.column], cell, focus.row);
      break;
    default:
      throw new Error("incorrect selection provided");
  }

  table.appendChild(thead);
  table.appendChild(tbody);

  document.body.appendChild(table);

  const windowSelection = window.getSelection();
  if (windowSelection) {
    const range = document.createRange();
    range.selectNodeContents(table);
    windowSelection.removeAllRanges();
    windowSelection.addRange(range);
    await navigator.clipboard.writeText(table.innerText);
    windowSelection.removeAllRanges();

    document.body.removeChild(table);
  } else {
    throw "Could not fetch selection";
  }
};

export default copyGridElements;
