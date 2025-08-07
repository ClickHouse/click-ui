import { useEffect, useState } from "react";

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
