import { useEffect, useMemo, useState } from "react";

import { Meta, StoryObj } from "@storybook/react-vite";

import { Table, TableRowType } from "./Table";

const headers = [{ label: "Company" }, { label: "Contact" }, { label: "Country" }];
const rows: TableRowType[] = [
  {
    id: "row-1",
    items: [
      { label: "Alfreds Futterkiste" },
      { label: "Maria Anders" },
      { label: "Germany" },
    ],
    isIndeterminate: true,
  },
  {
    id: "row-2",
    items: [
      { label: "Centro comercial Moctezuma" },
      { label: "Francisco Chang" },
      { label: "Mexico" },
    ],
  },
  {
    id: "row-3",
    isActive: true,
    items: [
      { label: "Alfreds Futterkiste" },
      { label: "Maria Anders" },
      { label: "Germany" },
    ],
  },
  {
    id: "row-4",
    isDeleted: true,
    items: [
      { label: "Centro comercial Moctezuma" },
      { label: "Francisco Chang" },
      { label: "Mexico" },
    ],
  },
];

const meta: Meta<typeof Table> = {
  component: Table,
  title: "Display/Table",
  tags: ["table", "autodocs"],
};

export default meta;

export const Playground: StoryObj<typeof Table> = {
  args: {
    headers,
    rows,
  },
};

export const Selectable: StoryObj<typeof Table> = {
  args: {
    headers,
    rows,
    isSelectable: true,
    selectedIds: [],
  },
  render: ({ selectedIds, rows: rowsProp, ...props }) => {
    const [rows, setRows] = useState(rowsProp);
    const [selectedRows, setSelectedRows] = useState(selectedIds);

    useEffect(() => {
      setSelectedRows(selectedIds);
    }, [selectedIds]);

    useEffect(() => {
      setRows(prevState =>
        prevState.map(row => ({
          ...row,
          isIndeterminate: selectedRows?.includes(row.id) ? false : row.isIndeterminate,
        }))
      );
    }, [selectedRows]);

    return (
      <Table
        {...props}
        rows={rows}
        selectedIds={selectedRows}
        onSelect={selectedItems => {
          setSelectedRows(selectedItems.map(({ item: { id } }) => id));
        }}
      />
    );
  },
};

export const Sortable: StoryObj<typeof Table> = {
  args: {
    headers,
    rows,
  },
  render: ({ rows, headers, ...props }) => {
    const [sort, setSort] = useState<[number, "asc" | "desc"]>([0, "asc"]);

    const sortedHeaders = useMemo(
      () =>
        headers.map((header, headerIndex) => ({
          ...header,
          isSortable: true,
          sortDir: sort[0] === headerIndex ? sort[1] : undefined,
        })),
      [headers, sort]
    );

    const sortedRows = useMemo(
      () =>
        [...rows].sort((a, b) => {
          const [cellIdx, sortDir] = sort;
          const cellA = a.items[cellIdx]?.label?.toString() || "";
          const cellB = b.items[cellIdx]?.label?.toString() || "";
          const result = cellA.localeCompare(cellB, "en", { numeric: true });
          return sortDir === "asc" ? result : -result;
        }),
      [rows, sort]
    );

    return (
      <Table
        {...props}
        headers={sortedHeaders}
        rows={sortedRows}
        onSort={(dir, _, idx) => void setSort([idx, dir])}
      />
    );
  },
};

export const ConfigurableColumns: StoryObj<typeof Table> = {
  args: {
    headers: [
      { id: "company", label: "Company", mandatory: true },
      { id: "contact", label: "Contact" },
      { id: "country", label: "Country" },
    ],
    rows,
    enableColumnVisibility: true,
    tableId: "demo-table",
    onLoadColumnVisibility: undefined,
    onSaveColumnVisibility: undefined,
  },
  render: props => {
    return (
      <div>
        <p style={{ marginBottom: "1rem", fontSize: "14px", color: "#666" }}>
          Click the settings icon in the top-right corner to configure visible columns.
          The &quot;Company&quot; column is mandatory and cannot be hidden. Uses default
          localStorage with key &quot;click-ui-table-column-visibility-demo-table&quot;.
        </p>
        <Table {...props} />
      </div>
    );
  },
};

export const ConfigurableColumnsCustomStorage: StoryObj<typeof Table> = {
  args: {
    headers: [
      { id: "company", label: "Company", mandatory: true },
      { id: "contact", label: "Contact" },
      { id: "country", label: "Country" },
    ],
    rows,
    enableColumnVisibility: true,
    tableId: "custom-table",
  },
  render: props => {
    // Example: Custom storage implementation
    const handleLoad = (tableId: string): Record<string, boolean> => {
      try {
        const stored = localStorage.getItem(`my-app-columns-${tableId}`);
        return stored ? JSON.parse(stored) : {};
      } catch {
        return {};
      }
    };

    const handleSave = (tableId: string, visibility: Record<string, boolean>) => {
      try {
        localStorage.setItem(`my-app-columns-${tableId}`, JSON.stringify(visibility));
      } catch {
        // Handle error silently
      }
    };

    return (
      <div>
        <p style={{ marginBottom: "1rem", fontSize: "14px", color: "#666" }}>
          This example uses custom storage with key prefix &quot;my-app-columns-&quot;.
          You can provide your own onLoadColumnVisibility and onSaveColumnVisibility for
          custom storage (API, IndexedDB, sessionStorage, etc.).
        </p>
        <Table
          {...props}
          onLoadColumnVisibility={handleLoad}
          onSaveColumnVisibility={handleSave}
        />
      </div>
    );
  },
};
