import { Table } from "./Table";

export default {
  component: Table,
  title: "Table",
  tags: ["table", "autodocs"],
};

export const Default = {
  args: {
    children: (
      <>
        <Table.Tr>
          <Table.Th>Company</Table.Th>
          <Table.Th>Contact</Table.Th>
          <Table.Th>Country</Table.Th>
        </Table.Tr>
        <Table.Tr>
          <Table.Td>Alfreds Futterkiste</Table.Td>
          <Table.Td>Maria Anders</Table.Td>
          <Table.Td>Germany</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td>Centro comercial Moctezuma</Table.Td>
          <Table.Td>Francisco Chang</Table.Td>
          <Table.Td>Mexico</Table.Td>
        </Table.Tr>
      </>
    ),
  },
};

export const Icons = {
  args: {
    children: (
      <>
        <Table.Tr>
          <Table.Th leftIcon="arrow-down" rightIcon="info">
            Company
          </Table.Th>
          <Table.Th>Contact</Table.Th>
          <Table.Th>Country</Table.Th>
        </Table.Tr>
        <Table.Tr>
          <Table.Td>Alfreds Futterkiste</Table.Td>
          <Table.Td>Maria Anders</Table.Td>
          <Table.Td>Germany</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td>Centro comercial Moctezuma</Table.Td>
          <Table.Td>Francisco Chang</Table.Td>
          <Table.Td>Mexico</Table.Td>
        </Table.Tr>
      </>
    ),
  },
};
