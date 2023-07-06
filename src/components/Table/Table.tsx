import { Icon } from "@/components";
import { IconName } from "@/components/Icon/types";
import styled from "styled-components";

type TableHeaderProps = {
  children: React.ReactNode;
  leftIcon?: IconName;
  rightIcon?: IconName;
};
const StyledHeader = styled.th`
  padding: 8px 16px;
  background-color: ${props =>
    props.theme.click.table.header.color.background.default};
  font: ${props => props.theme.click.table.header.title.default};
  color: ${props => props.theme.click.table.header.color.title.default};
  gap: 4px;
  text-align: left;
`;

const HeaderContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 4px;
`;

const TableHeader = ({
  leftIcon,
  rightIcon,
  children,
  ...delegated
}: TableHeaderProps) => (
  <StyledHeader {...delegated}>
    <HeaderContentWrapper>
      {leftIcon && <Icon name={leftIcon} width="12px" height="12px" />}
      {children}
      {rightIcon && <Icon name={rightIcon} width="12px" height="12px" />}
    </HeaderContentWrapper>
  </StyledHeader>
);

const TableData = styled.td`
  font: ${props => props.theme.click.table.cell.label.default};
  padding: 16px;
`;

const TableRow = styled.tr`
  background-color: ${props =>
    props.theme.click.table.row.color.background.default};
  border-bottom: 1px solid
    ${props => props.theme.click.table.row.color.stroke.default};

  &:has(${StyledHeader}) {
    border-bottom: revert;
  }

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
