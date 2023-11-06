import { HorizontalDirection, Icon, IconName } from "@/components";
import { HTMLAttributes, ReactNode, forwardRef } from "react";
import styled from "styled-components";

interface TableHeaderProps extends HTMLAttributes<HTMLTableCellElement> {
  icon?: IconName;
  iconDir?: HorizontalDirection;
  label: ReactNode;
}
const StyledHeader = styled.th`
  ${({ theme }) => `
    padding: ${theme.click.table.header.cell.space.md.y}
      ${theme.click.table.body.cell.space.md.x};
    font: ${theme.click.table.header.title.default};
    color: ${theme.click.table.header.color.title.default};
  `}
  gap: 0.25rem;
  text-align: left;
`;

const HeaderContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: inherit;
`;

const TableHeader = ({
  icon,
  iconDir = "end",
  label,
  ...delegated
}: TableHeaderProps) => (
  <StyledHeader {...delegated}>
    <HeaderContentWrapper>
      {icon && iconDir == "start" && (
        <Icon
          name={icon}
          size="sm"
        />
      )}
      {label}
      {icon && iconDir == "end" && (
        <Icon
          name={icon}
          size="sm"
        />
      )}
    </HeaderContentWrapper>
  </StyledHeader>
);

const TableRow = styled.tr`
  overflow: hidden;
  ${({ theme }) => `
    background-color: ${theme.click.table.row.color.background.default};
    border-bottom: 1px solid ${theme.click.table.row.color.stroke.default};
    &:active {
      background-color: ${theme.click.table.row.color.background.active};
    }
    &:hover {
      background-color: ${theme.click.table.row.color.background.hover};
    }
  `}

  &:last-of-type {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    ${({ theme }) => `
      border: 1px solid ${theme.click.table.row.color.stroke.default};
      border-radius: ${theme.click.table.radii.all};
    `}
  }
`;

const TableData = styled.td`
  overflow: hidden;
  ${({ theme }) => `
    color: ${theme.click.table.row.color.text.default};
    font: ${theme.click.table.cell.text.default};
    padding: ${theme.click.table.body.cell.space.md.y} ${theme.click.table.body.cell.space.md.x};
  `}
  @media (max-width: 768px) {
    width: auto;
    min-width: 40%;
    padding: ${({ theme }) => theme.click.table.body.cell.space.sm.y}
      ${({ theme }) => theme.click.table.body.cell.space.sm.x};
  }
`;

const THead = styled.thead`
  tr {
    overflow: hidden;
    background-color: ${({ theme }) => theme.click.table.header.color.background.default};
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileHeader = styled.span`
  display: none;
  ${({ theme }) => `
    color: ${theme.click.table.row.color.label.default};
    font:  ${theme.click.table.cell.label.default};
  `}
  @media (max-width: 768px) {
    display: block;
  }
`;
const Tbody = styled.tbody`
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
`;
interface TableCellType extends HTMLAttributes<HTMLTableCellElement> {
  label: ReactNode;
}
type TableRowType = Array<TableCellType>;
interface TableProps extends HTMLAttributes<HTMLTableElement> {
  headers: Array<TableHeaderProps>;
  rows: Array<TableRowType>;
}
const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ headers, rows, ...props }, ref) => (
    <StyledTable
      ref={ref}
      {...props}
    >
      <THead>
        <tr>
          {headers.map((headerProps, index) => (
            <TableHeader
              key={`table-header-${index}`}
              {...headerProps}
            />
          ))}
        </tr>
      </THead>
      <Tbody>
        {rows.map(row => (
          <TableRow>
            {row.map(({ label, ...cellProps }, index) => (
              <TableData {...cellProps}>
                {headers[index] && <MobileHeader>{headers[index].label}</MobileHeader>}
                <span>{label}</span>
              </TableData>
            ))}
          </TableRow>
        ))}
      </Tbody>
    </StyledTable>
  )
);

const StyledTable = styled.table`
  border-spacing: 0;
  overflow: hidden;
  ${({ theme }) => `
    border-radius: ${theme.click.table.radii.all};
    border: 1px solid ${theme.click.table.global.color.stroke.default};
  `}

  @media (max-width: 768px) {
    border: none;
  }
`;

export { Table };
