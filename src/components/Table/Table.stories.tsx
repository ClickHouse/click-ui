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

export const Variations: StoryObj<typeof Table> = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: ".cuiTableRow",
      focus: ".cuiTableRow",
      active: ".cuiTableRow",
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <section>
        <h3>Basic Table</h3>
        <Table
          headers={headers}
          rows={rows.slice(0, 3)}
        />
      </section>

      <section>
        <h3>Table Sizes</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <span
              style={{ fontSize: "0.75rem", display: "block", marginBottom: "0.5rem" }}
            >
              Small (sm)
            </span>
            <Table
              headers={headers}
              rows={rows.slice(0, 2)}
              size="sm"
            />
          </div>
          <div>
            <span
              style={{ fontSize: "0.75rem", display: "block", marginBottom: "0.5rem" }}
            >
              Medium (md)
            </span>
            <Table
              headers={headers}
              rows={rows.slice(0, 2)}
              size="md"
            />
          </div>
        </div>
      </section>

      <section>
        <h3>Row States</h3>
        <Table
          headers={headers}
          rows={rows}
        />
      </section>

      <section>
        <h3>Without Header</h3>
        <Table
          headers={headers}
          rows={rows.slice(0, 3)}
          showHeader={false}
        />
      </section>

      <section>
        <h3>Loading State</h3>
        <Table
          headers={headers}
          rows={[]}
          loading
        />
      </section>

      <section>
        <h3>No Data</h3>
        <Table
          headers={headers}
          rows={[]}
          noDataMessage="No items found"
        />
      </section>

      <section>
        <h3>Custom No Data Message</h3>
        <Table
          headers={headers}
          rows={[]}
          noDataMessage={
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <strong>Custom empty state</strong>
              <p style={{ margin: "0.5rem 0 0 0" }}>Add your first item to get started</p>
            </div>
          }
        />
      </section>

      <section>
        <h3>Custom Row Height</h3>
        <Table
          headers={headers}
          rows={rows.slice(0, 3)}
          rowHeight="60px"
        />
      </section>

      <section>
        <h3>With Column Widths</h3>
        <Table
          headers={[
            { label: "Company", width: "40%" },
            { label: "Contact", width: "30%" },
            { label: "Country", width: "30%" },
          ]}
          rows={rows.slice(0, 3)}
        />
      </section>
    </div>
  ),
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
