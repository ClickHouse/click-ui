import { Icon, IconName } from "@/components";
import styled from "styled-components";

type TableHeaderProps = {
  children: React.ReactNode;
  leftIcon?: IconName;
  rightIcon?: IconName;
};
const StyledHeader = styled.th`
  padding: 8px 16px;
  background-color: ${props => props.theme.click.table.header.color.background.default};
  font: ${props => props.theme.click.table.header.title.default};
  color: ${props => props.theme.click.table.header.color.title.default};
  gap: 4px;
  text-align: left;

  &:first-of-type {
    border-top-left-radius: ${props => props.theme.click.table.radii.all};
  }
  &:last-of-type {
    border-top-right-radius: ${props => props.theme.click.table.radii.all};
  }
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
      {leftIcon && (
        <Icon
          name={leftIcon}
          width="12px"
          height="12px"
        />
      )}
      {children}
      {rightIcon && (
        <Icon
          name={rightIcon}
          width="12px"
          height="12px"
        />
      )}
    </HeaderContentWrapper>
  </StyledHeader>
);

const TableRow = styled.tr`
  background-color: ${props => props.theme.click.table.row.color.background.default};
  border-bottom: 1px solid ${props => props.theme.click.table.row.color.stroke.default};

  &:has(${StyledHeader}) {
    border-bottom: revert;
  }

  &:active {
    background-color: ${props => props.theme.click.table.row.color.background.active};
  }

  &:hover {
    background-color: ${props => props.theme.click.table.row.color.background.hover};
  }
`;

const TableData = styled.td`
  font: ${props => props.theme.click.table.cell.label.default};
  padding: 16px;
  border: 1px solid ${props => props.theme.click.table.global.color.stroke.default};
  border-top: none;

  :not(:last-of-type) {
    border-right: none;
  }
  :not(:first-of-type) {
    border-left: none;
  }

  ${TableRow}:last-of-type &:first-of-type {
    border-bottom-left-radius: ${props => props.theme.click.table.radii.all};
  }
  ${TableRow}:last-of-type &:last-of-type {
    border-bottom-right-radius: ${props => props.theme.click.table.radii.all};
  }
`;

const Table = (props: React.HTMLAttributes<HTMLTableElement>) => (
  <StyledTable {...props} />
);

const StyledTable = styled.table`
  border-spacing: 0;
`;

TableHeader.displayName = "Table.Th";
Table.Th = TableHeader;

TableData.displayName = "Table.Td";
Table.Td = TableData;

TableRow.displayName = "Table.Tr";
Table.Tr = TableRow;

export { Table };
