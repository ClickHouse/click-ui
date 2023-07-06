import styled from "styled-components";

const TableHeader = styled.th`
  padding: 8px 16px;
  background-color: ${props =>
    props.theme.click.table.header.color.background.default};
  font: ${props => props.theme.click.table.header.title.default};
  color: ${props => props.theme.click.table.header.color.title.default};
`;

const TableData = styled.td`
  font: ${props => props.theme.click.table.cell.label.default};
`;

const TableRow = styled.tr`
  background-color: ${props =>
    props.theme.click.table.row.color.background.default};
  border-bottom: 1px solid
    ${props => props.theme.click.table.row.color.stroke.default};

  &:active {
    background-color: ${props =>
      props.theme.click.table.row.color.background.active};
  }

  &:hover {
    background-color: ${props =>
      props.theme.click.table.row.color.background.hover};
  }
`;

const Table = (props: React.HTMLAttributes<HTMLTableElement>) => (
  <StyledTable {...props} />
);

const StyledTable = styled.table`
  border-collapse: collapse;
`;

Table.Th = TableHeader;
Table.Td = TableData;
Table.Tr = TableRow;

export { Table };
