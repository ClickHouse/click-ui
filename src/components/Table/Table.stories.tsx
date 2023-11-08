import { Table } from "./Table";

const headers = [{ label: "Company" }, { label: "Contact" }, { label: "Country" }];
const rows = [
  {
    id: "row-1",
    items: [
      { label: "Alfreds Futterkiste" },
      { label: "Maria Anders" },
      { label: "Germany" },
    ],
  },
  {
    id: "row-2",
    items: [
      { label: "Centro comercial Moctezuma" },
      { label: "Francisco Chang" },
      { label: "Mexico" },
    ],
  },
];

export default {
  component: Table,
  title: "Display/Table",
  tags: ["table", "autodocs"],
  argTypes: {
    selectedIds: {
      control: { type: "object" },
      if: { arg: "isSelectable", exists: true },
    },
  },
};

export const Playground = {
  args: {
    headers,
    rows,
    selectedIds: [],
  },
};
