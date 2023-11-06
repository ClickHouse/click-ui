import { Table } from "./Table";

const headers = [{ label: "Company" }, { label: "Contact" }, { label: "Country" }];
const rows = [
  {
    cells: [
      { label: "Alfreds Futterkiste" },
      { label: "Maria Anders" },
      { label: "Germany" },
    ],
  },
  {
    checked: true,
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
};

export const Playground = {
  args: {
    headers,
    rows,
  },
};
