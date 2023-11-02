import { Table } from "./Table";

export default {
  component: Table,
  title: "Display/Table",
  tags: ["table", "autodocs"],
};

export const Playground = {
  args: {
    children: [
      <Table.Tr type="header">
        <Table.Th>Company</Table.Th>
        <Table.Th>Contact</Table.Th>
        <Table.Th>Country</Table.Th>
      </Table.Tr>,
      <Table.Tr>
        <Table.Td>Alfreds Futterkiste</Table.Td>
        <Table.Td>Maria Anders</Table.Td>
        <Table.Td>Germany</Table.Td>
      </Table.Tr>,
      <Table.Tr>
        <Table.Td>Centro comercial Moctezuma</Table.Td>
        <Table.Td>Francisco Chang</Table.Td>
        <Table.Td>Mexico</Table.Td>
      </Table.Tr>,
    ],
  },
};
