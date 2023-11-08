import { Checkbox, HorizontalDirection, Icon, IconButton, IconName } from "@/components";
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
interface TheadProps {
  headers: Array<TableHeaderProps>;
  isSelectable?: boolean;
  onSelectAll: (checked: boolean) => void;
  showActionsHeader?: boolean;
}
const Thead = ({ headers, isSelectable, onSelectAll, showActionsHeader }: TheadProps) => {
  return (
    <StyledThead>
      <tr>
        {isSelectable && (
          <StyledHeader>
            <Checkbox onCheckedChange={onSelectAll} />
          </StyledHeader>
        )}
        {headers.map((headerProps, index) => (
          <TableHeader
            key={`table-header-${index}`}
            {...headerProps}
          />
        ))}
        {showActionsHeader && <StyledHeader />}
      </tr>
    </StyledThead>
  );
};

const TableRow = styled.tr<{
  $isSelectable?: boolean;
  $deleted?: boolean;
  $showActions?: boolean;
}>`
  overflow: hidden;
  ${({ theme, $deleted }) => `
    background-color: ${theme.click.table.row.color.background.default};
    border-bottom: ${theme.click.table.cell.stroke} solid ${
    theme.click.table.row.color.stroke.default
  };
    &:active {
      background-color: ${theme.click.table.row.color.background.active};
    }
    &:hover {
      background-color: ${theme.click.table.row.color.background.hover};
    }
    opacity: ${$deleted ? 0.5 : 1};
  `}

  &:last-of-type {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    ${({ theme, $isSelectable = false, $showActions = false }) => `
      border: ${theme.click.table.cell.stroke} solid ${
      theme.click.table.row.color.stroke.default
    };
      border-radius: ${theme.click.table.radii.all};
      ${
        $isSelectable
          ? `padding-left: calc(${theme.click.table.body.cell.space.sm.x} + ${theme.click.table.body.cell.space.sm.x} + ${theme.click.checkbox.size.all});`
          : ""
      }
      ${
        $showActions
          ? `padding-right: calc(${theme.click.table.body.cell.space.sm.x} + ${theme.click.table.body.cell.space.sm.x} + ${theme.click.image.sm.size.width} + ${theme.click.button.iconButton.default.space.x} + ${theme.click.button.iconButton.default.space.x});`
          : ""
      }
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

const StyledThead = styled.thead`
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

const SelectData = styled.td`
  overflow: hidden;
  ${({ theme }) => `
    color: ${theme.click.table.row.color.text.default};
    font: ${theme.click.table.cell.text.default};
    padding: ${theme.click.table.body.cell.space.md.y} ${theme.click.table.body.cell.space.md.x};
  `}
  @media (max-width: 768px) {
    width: auto;
    align-self: stretch;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    ${({ theme }) => `
      padding: ${theme.click.table.body.cell.space.sm.y} ${theme.click.table.body.cell.space.sm.x};
      border-right: ${theme.click.table.cell.stroke} solid ${theme.click.table.row.color.stroke.default};
    `}
  }
`;
const ActionsList = styled.td`
  overflow: hidden;
  ${({ theme }) => `
    color: ${theme.click.table.row.color.text.default};
    font: ${theme.click.table.cell.text.default};
    padding: ${theme.click.table.body.cell.space.md.y} ${theme.click.table.body.cell.space.md.x};
  `}
  @media (max-width: 768px) {
    width: auto;
    align-self: stretch;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    ${({ theme }) => `
      padding: ${theme.click.table.body.cell.space.sm.y} ${theme.click.table.body.cell.space.sm.x};
      border-left: 1px solid ${theme.click.table.row.color.stroke.default};
    `}
  }
`;

const ActionsContainer = styled.span`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  overflow: hidden;
  @media (max-width: 768px) {
    flex-direction: column;
    overflow: auto;
    flex-wrap: nowrap;
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const TableOuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MobileActions = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 ${({ theme }) => theme.click.table.body.cell.space.sm.x};
  }
`;

const TableRowCloseButton = styled.button<{ $deleted?: boolean }>`
  transition: transform 200ms;

  ${({ $deleted }) => `
  ${$deleted ? "transform: rotate(90deg)" : ""}
`}
`;
interface TableCellType extends HTMLAttributes<HTMLTableCellElement> {
  label: ReactNode;
}
interface TableRowType
  extends Omit<HTMLAttributes<HTMLTableRowElement>, "onSelect" | "id"> {
  id: string | number;
  items: Array<TableCellType>;
  disabled?: boolean;
  deleted?: boolean;
}

interface CommonTableProps
  extends Omit<HTMLAttributes<HTMLTableElement>, "children" | "onSelect"> {
  headers: Array<TableHeaderProps>;
  rows: Array<TableRowType>;
  onDelete?: (item: TableRowType, id: string | number) => void;
  onEdit?: (item: TableRowType, id: string | number) => void;
}

type SelectReturnValue = {
  index: number;
  item: TableRowType;
};

interface SelectionType {
  isSelectable?: boolean;
  selectedIds?: Array<number | string>;
  onSelect?: (selectedValues: Array<SelectReturnValue>) => void;
}

interface NoSelectionType {
  isSelectable?: never;
  selectedIds?: never;
  onSelect?: never;
}

export type TableProps = CommonTableProps & (SelectionType | NoSelectionType);

interface TableBodyRowProps extends Omit<TableRowType, "id"> {
  headers: Array<TableHeaderProps>;
  onSelect: (checked: boolean) => void;
  isSelectable?: boolean;
  isSelected: boolean;
  onDelete?: () => void;
  onEdit?: () => void;
}

const TableBodyRow = ({
  headers,
  items,
  onSelect,
  isSelectable,
  isSelected,
  onDelete,
  onEdit,
  deleted,
  disabled,
  ...rowProps
}: TableBodyRowProps) => {
  const isDeletable = typeof onDelete === "function";
  const isEditable = typeof onEdit === "function";
  return (
    <TableRow
      $isSelectable={isSelectable}
      $deleted={deleted ?? disabled}
      $showActions={isDeletable || isEditable}
      {...rowProps}
    >
      {isSelectable && (
        <SelectData>
          <Checkbox
            checked={isSelected}
            onCheckedChange={onSelect}
          />
        </SelectData>
      )}
      {items.map(({ label, ...cellProps }, cellIndex) => (
        <TableData
          key={`table-cell-${cellIndex}`}
          {...cellProps}
        >
          {headers[cellIndex] && <MobileHeader>{headers[cellIndex].label}</MobileHeader>}
          <span>{label}</span>
        </TableData>
      ))}
      {(isDeletable || isEditable) && (
        <ActionsList>
          <ActionsContainer>
            {isEditable && (
              <IconButton
                type="ghost"
                icon="pencil"
                onClick={onEdit}
                data-testid="table-row-edit"
              />
            )}
            {isDeletable && (
              <TableRowCloseButton
                as={IconButton}
                $deleted={deleted}
                type="ghost"
                icon="cross"
                onClick={onDelete}
                data-testid="table-row-delete"
              />
            )}
          </ActionsContainer>
        </ActionsList>
      )}
    </TableRow>
  );
};

const Table = forwardRef<HTMLTableElement, TableProps>(
  (
    {
      headers,
      rows,
      isSelectable,
      selectedIds = [],
      onSelect,
      onDelete,
      onEdit,
      ...props
    },
    ref
  ) => {
    const isDeletable = typeof onDelete === "function";
    const isEditable = typeof onEdit === "function";
    const onSelectAll = (checked: boolean): void => {
      if (typeof onSelect === "function") {
        const ids = checked
          ? rows.map((row, index) => ({
              item: row,
              index,
            }))
          : [];
        onSelect(ids);
      }
    };

    const onRowSelect =
      (id: number | string) =>
      (checked: boolean): void => {
        if (typeof onSelect == "function") {
          const selectedItems = rows.flatMap((row, index) => {
            if (
              (id === row.id && checked) ||
              (selectedIds.includes(id) && id !== row.id)
            ) {
              return {
                item: row,
                index,
              };
            }

            return [];
          });
          onSelect(selectedItems);
        }
      };
    return (
      <TableOuterContainer>
        <MobileActions>
          {isSelectable && (
            <Checkbox
              label="Select All"
              checked={selectedIds.length === rows.length}
              onCheckedChange={onSelectAll}
            />
          )}
        </MobileActions>
        <TableWrapper>
          <StyledTable
            ref={ref}
            {...props}
          >
            <Thead
              headers={headers}
              isSelectable={isSelectable}
              onSelectAll={onSelectAll}
              showActionsHeader={isDeletable || isEditable}
            />
            <Tbody>
              {rows.map(({ id, ...rowProps }, rowIndex) => (
                <TableBodyRow
                  key={`table-body-row-${rowIndex}`}
                  headers={headers}
                  isSelectable={isSelectable}
                  isSelected={selectedIds?.includes(id)}
                  onSelect={onRowSelect(id)}
                  onDelete={
                    isDeletable ? () => onDelete({ id, ...rowProps }, id) : undefined
                  }
                  onEdit={isEditable ? () => onEdit({ id, ...rowProps }, id) : undefined}
                  {...rowProps}
                />
              ))}
            </Tbody>
          </StyledTable>
        </TableWrapper>
      </TableOuterContainer>
    );
  }
);

const StyledTable = styled.table`
  border-spacing: 0;
  overflow: hidden;
  ${({ theme }) => `
    border-radius: ${theme.click.table.radii.all};
    border: ${theme.click.table.cell.stroke} solid ${theme.click.table.global.color.stroke.default};
  `}

  @media (max-width: 768px) {
    border: none;
  }
`;

export { Table };
