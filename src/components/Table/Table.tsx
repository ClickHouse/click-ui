import { Checkbox, HorizontalDirection, Icon, IconButton, IconName } from "@/components";
import { HTMLAttributes, MouseEvent, ReactNode, forwardRef } from "react";
import styled from "styled-components";
type SortDir = "asc" | "desc";
type SortFn = (sortDir: SortDir, header: TableHeaderType, index: number) => void;
export interface TableHeaderType extends HTMLAttributes<HTMLTableCellElement> {
  icon?: IconName;
  iconDir?: HorizontalDirection;
  label: ReactNode;
  isSortable?: boolean;
  sortDir?: SortDir;
  sortPosition?: HorizontalDirection;
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

const SortIcon = styled(Icon)<{ $sortDir: SortDir }>`
  transition: all 200ms;
  transform: rotate(${({ $sortDir }) => ($sortDir === "desc" ? "180deg" : "0deg")});
`;

const TableHeader = ({
  label,
  sortDir,
  sortPosition = "end",
  isSortable,
  onSort,
  onClick,
  ...delegated
}: TableHeaderType & { onSort?: () => void }) => {
  const isSorted = typeof sortDir === "string";
  const onHeaderClick = (e: MouseEvent<HTMLTableCellElement>): void => {
    if (typeof onClick === "function") {
      onClick(e);
    }
    if (typeof onSort === "function") {
      onSort();
    }
  };
  return (
    <StyledHeader {...delegated}>
      <HeaderContentWrapper onClick={onHeaderClick}>
        {isSorted && isSortable && sortPosition == "start" && (
          <SortIcon
            $sortDir={sortDir}
            name="arrow-down"
            size="sm"
          />
        )}
        {label}
        {isSorted && isSortable && sortPosition == "end" && (
          <SortIcon
            $sortDir={sortDir}
            name="arrow-down"
            size="sm"
          />
        )}
      </HeaderContentWrapper>
    </StyledHeader>
  );
};
interface TheadProps {
  headers: Array<TableHeaderType>;
  isSelectable?: boolean;
  onSelectAll: (checked: boolean) => void;
  showActionsHeader?: boolean;
  onSort?: SortFn;
}
const Thead = ({
  headers,
  isSelectable,
  onSelectAll,
  showActionsHeader,
  onSort: onSortProp,
}: TheadProps) => {
  const onSort = (header: TableHeaderType, headerIndex: number) => () => {
    if (typeof onSortProp === "function" && header.isSortable) {
      onSortProp(header.sortDir === "asc" ? "desc" : "asc", header, headerIndex);
    }
  };
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
            onSort={onSort(headerProps, index)}
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
  $isDeleted?: boolean;
  $isDisabled?: boolean;
  $showActions?: boolean;
}>`
  overflow: hidden;
  ${({ theme, $isDeleted, $isDisabled }) => `
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
    opacity: ${$isDeleted || $isDisabled ? 0.5 : 1};
    cursor: ${$isDeleted || $isDisabled ? "not-allowed" : "default"}
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
  width: 100%;
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
const EditButton = styled.button`
  &:disabled {
    background: transparent;
  }
`;
const TableRowCloseButton = styled.button<{
  $isDeleted?: boolean;
}>`
  svg {
    transition: transform 200ms;
    ${({ $isDeleted }) => `
    ${$isDeleted ? "transform: rotate(45deg)" : ""};
    `}
  }
  &:disabled {
    background: transparent;
  }
`;
interface TableCellType extends HTMLAttributes<HTMLTableCellElement> {
  label: ReactNode;
}
export interface TableRowType
  extends Omit<HTMLAttributes<HTMLTableRowElement>, "onSelect" | "id"> {
  id: string | number;
  items: Array<TableCellType>;
  isDisabled?: boolean;
  isDeleted?: boolean;
}

interface CommonTableProps
  extends Omit<HTMLAttributes<HTMLTableElement>, "children" | "onSelect"> {
  headers: Array<TableHeaderType>;
  rows: Array<TableRowType>;
  onDelete?: (item: TableRowType, index: number) => void;
  onEdit?: (item: TableRowType, index: number) => void;
  onSort?: SortFn;
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
  headers: Array<TableHeaderType>;
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
  isDeleted,
  isDisabled,
  ...rowProps
}: TableBodyRowProps) => {
  const isDeletable = typeof onDelete === "function";
  const isEditable = typeof onEdit === "function";
  return (
    <TableRow
      $isSelectable={isSelectable}
      $isDeleted={isDeleted}
      $isDisabled={isDisabled}
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
              <EditButton
                as={IconButton}
                type="ghost"
                disabled={isDisabled || isDeleted}
                icon="pencil"
                onClick={onEdit}
                data-testid="table-row-edit"
              />
            )}
            {isDeletable && (
              <TableRowCloseButton
                as={IconButton}
                disabled={isDisabled}
                $isDeleted={isDeleted}
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
      onSort,
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
          {true && (
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
              onSort={onSort}
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
                    isDeletable
                      ? () =>
                          onDelete(
                            { id, ...rowProps, isDeleted: !rowProps.isDeleted },
                            rowIndex
                          )
                      : undefined
                  }
                  onEdit={
                    isEditable ? () => onEdit({ id, ...rowProps }, rowIndex) : undefined
                  }
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
  width: 100%;
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
