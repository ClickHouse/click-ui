import { Icon, IconName } from "@/components";
import { HTMLAttributes, forwardRef } from "react";
import styled from "styled-components";

type TableHeaderProps = {
  children: React.ReactNode;
  leftIcon?: IconName;
  rightIcon?: IconName;
};
type TableRowType = "header" | "default";
const StyledHeader = styled.th`
  padding: 0.75rem 1rem;
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

const StyledTableRow = styled.tr<{ $type?: TableRowType }>`
  overflow: hidden;
  ${({ $type = "default", theme }) =>
    $type === "default"
      ? `
        background-color: ${theme.click.table.row.color.background.default};
        border-bottom: 1px solid ${theme.click.table.row.color.stroke.default};
        &:active {
          background-color: ${theme.click.table.row.color.background.active};
        }
        &:hover {
          background-color: ${theme.click.table.row.color.background.hover};
        }
      `
      : `background-color: ${theme.click.table.header.color.background.default};`}

  &:last-of-type {
    border-bottom: none;
  }
`;

const TableRow = ({
  type,
  ...props
}: HTMLAttributes<HTMLTableRowElement> & { type?: TableRowType }) => {
  return (
    <StyledTableRow
      $type={type}
      {...props}
    />
  );
};

const TableData = styled.td`
  font: ${props => props.theme.click.table.cell.label.default};
  padding: 0.75rem 1rem;
  overflow: hidden;
`;

const Table = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(
  (props, ref) => (
    <StyledTable
      ref={ref}
      {...props}
    />
  )
);

const StyledTable = styled.table`
  border-spacing: 0;
  overflow: hidden;
  ${({ theme }) => `
    border-radius: ${theme.click.table.radii.all};
    border: 1px solid ${theme.click.table.global.color.stroke.default};
  `}
`;

TableHeader.displayName = "Table.Th";

TableData.displayName = "Table.Td";

TableRow.displayName = "Table.Tr";

const TableNamespace = Object.assign(Table, {
  Th: TableHeader,
  Td: TableData,
  Tr: TableRow,
});
export { TableNamespace as Table };
