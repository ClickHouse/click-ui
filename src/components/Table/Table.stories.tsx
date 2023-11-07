import { Table } from "./Table";

const headers = [{ label: "Company" }, { label: "Contact" }, { label: "Country" }];
const rows = [
  {
    id: "row-1",
    cells: [
      { label: "Alfreds Futterkiste" },
      { label: "Maria Anders" },
      { label: "Germany" },
    ],
  },
  {
    id: "row-2",
    cells: [
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
    selectedIndices: {
      control: { type: "object" },
      if: { arg: "isSelectable", exists: true },
    },
  },
};

export const Playground = {
  args: {
    headers,
    rows,
    selectedIndices: [],
  },
};
