import {
  FC,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  forwardRef,
  useMemo,
  useState,
  useEffect,
} from "react";
import { styled } from "styled-components";

import { CheckedState } from "@radix-ui/react-checkbox";

import {
  Checkbox,
  CheckboxProps,
  EllipsisContent,
  HorizontalDirection,
  Icon,
  IconButton,
  Text,
  Popover,
} from "@/components";

type SortDir = "asc" | "desc";
type SortFn = (sortDir: SortDir, header: TableHeaderType, index: number) => void;
type TableSize = "sm" | "md";

export interface TableHeaderType extends HTMLAttributes<HTMLTableCellElement> {
  label: ReactNode;
  isSortable?: boolean;
  sortDir?: SortDir;
  sortPosition?: HorizontalDirection;
  width?: string;
  required?: boolean;
  selected?: boolean;
  id?: string;
}

const StyledHeader = styled.th<{ $size: TableSize }>`
  ${({ theme, $size }) => `
    padding: ${theme.click.table.header.cell.space[$size].y} ${theme.click.table.body.cell.space[$size].x};
    font: ${theme.click.table.header.title.default};
    color: ${theme.click.table.header.color.title.default};
  `}
  text-align: left;
`;

const HeaderContentWrapper = styled.div<{ $interactive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: inherit;

  ${({ $interactive }) => $interactive && "cursor: pointer;"}
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
  size,
  ...delegated
}: Omit<TableHeaderType, "width"> & { onSort?: () => void; size: TableSize }) => {
  const isSorted = typeof sortDir === "string";
  const isInteractive = Boolean(
    typeof onClick === "function" || (isSortable && typeof onSort === "function")
  );
  const onHeaderClick = (e: MouseEvent<HTMLTableCellElement>): void => {
    if (typeof onClick === "function") {
      onClick(e);
    }
    if (typeof onSort === "function") {
      onSort();
    }
  };
  return (
    <StyledHeader
      $size={size}
      {...delegated}
    >
      <HeaderContentWrapper
        onClick={onHeaderClick}
        $interactive={isInteractive}
      >
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
  onSelectAll?: (selectedValues: SelectReturnValue[]) => void;
  actionsList: Array<string>;
  onSort?: SortFn;
  size: TableSize;
  rows: TableRowType[];
  selectedIds: (number | string)[];
  enableColumnVisibility?: boolean;
  visibleColumns: Record<string, boolean>;
  onVisibilityChange: (columnId: string, visible: boolean) => void;
}

const Thead = ({
  headers,
  isSelectable,
  onSelectAll,
  actionsList,
  onSort: onSortProp,
  size,
  rows,
  selectedIds,
  enableColumnVisibility,
  visibleColumns,
  onVisibilityChange,
}: TheadProps) => {
  const onSort = (header: TableHeaderType, headerIndex: number) => () => {
    if (typeof onSortProp === "function" && header.isSortable) {
      onSortProp(header.sortDir === "asc" ? "desc" : "asc", header, headerIndex);
    }
  };

  const visibleHeaders = headers.filter((header, index) => {
    const columnId = header.id || `column-${index}`;
    return visibleColumns[columnId] !== false;
  });

  return (
    <>
      <StyledColGroup>
        {isSelectable && <col width={48} />}
        {visibleHeaders.map((headerProps, index) => (
          <col
            key={`header-col-${index}`}
            width={headerProps.width}
          />
        ))}
        {actionsList.length > 0 && <col width={(actionsList.length + 1) * 32 + 10} />}
        {enableColumnVisibility && <col width={48} />}
      </StyledColGroup>
      <StyledThead>
        <tr>
          {isSelectable && (
            <StyledHeader
              $size={size}
              aria-label="Select column"
            >
              <SelectAllCheckbox
                onCheckedChange={onSelectAll}
                rows={rows}
                selectedIds={selectedIds}
              />
            </StyledHeader>
          )}
          {visibleHeaders.map(({ width, ...headerProps }, index) => (
            <TableHeader
              key={`table-header-${index}-${width}`}
              onSort={onSort(headerProps, index)}
              size={size}
              {...headerProps}
            />
          ))}
          {actionsList.length > 0 && (
            <StyledHeader
              aria-label="Actions"
              $size={size}
            />
          )}
          {enableColumnVisibility && (
            <StyledHeader
              aria-label="Column visibility"
              $size={size}
            >
              <ColumnVisibilityPopover
                headers={headers}
                visibleColumns={visibleColumns}
                onVisibilityChange={onVisibilityChange}
              />
            </StyledHeader>
          )}
        </tr>
      </StyledThead>
    </>
  );
};
interface TableRowProps {
  $isSelectable?: boolean;
  $isDeleted?: boolean;
  $isDisabled?: boolean;
  $isActive?: boolean;
  $showActions?: boolean;
  $rowHeight?: string;
}

const TableRow = styled.tr<TableRowProps>`
  overflow: hidden;
  ${({ theme, $isDeleted, $isDisabled, $isActive, $rowHeight }) => `
    ${$rowHeight ? `height: ${$rowHeight};` : ""}
    background-color: ${theme.click.table.row.color.background.default};
    border-bottom: ${theme.click.table.cell.stroke} solid ${
      theme.click.table.row.color.stroke.default
    };

    ${$isActive && `background-color: ${theme.click.table.row.color.background.active};`}

    &:active {
      background-color: ${theme.click.table.row.color.background.active};
    }
    &:hover {
      background-color: ${theme.click.table.row.color.background.hover};
    }
    opacity: ${$isDeleted || $isDisabled ? 0.5 : 1};
    cursor: ${$isDeleted || $isDisabled ? "not-allowed" : "default"}
  `}

  &:last-of-type, &:last-child {
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

const TableData = styled.td<{ $size: TableSize }>`
  overflow: hidden;
  ${({ theme, $size }) => `
    color: ${theme.click.table.row.color.text.default};
    font: ${theme.click.table.cell.text.default};
    padding: ${theme.click.table.body.cell.space[$size].y} ${theme.click.table.body.cell.space[$size].x};
  `}
  @media (max-width: 768px) {
    width: auto;
    min-width: 40%;
    ${({ theme }) => `
      padding: ${theme.click.table.body.cell.space.sm.y} ${theme.click.table.body.cell.space.sm.x};
    `}
  }
`;

const StyledColGroup = styled.colgroup`
  @media (max-width: 768px) {
    display: none;
  }
`;
const StyledThead = styled.thead`
  tr {
    overflow: hidden;
    background-color: ${({ theme }) => theme.click.table.header.color.background.default};
    ${({
      theme,
    }) => ` border-bottom: ${theme.click.table.cell.stroke} solid ${theme.click.table.row.color.stroke.default};
  `}
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileHeader = styled.div`
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

const SelectData = styled.td<{ $size: TableSize }>`
  overflow: hidden;
  ${({ theme, $size }) => `
    color: ${theme.click.table.row.color.text.default};
    font: ${theme.click.table.cell.text.default};
    padding: ${theme.click.table.body.cell.space[$size].y} ${theme.click.table.body.cell.space[$size].x};
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
const ActionsList = styled.td<{ $size: TableSize }>`
  overflow: hidden;
  ${({ theme, $size }) => `
    color: ${theme.click.table.row.color.text.default};
    font: ${theme.click.table.cell.text.default};
    padding: ${theme.click.table.body.cell.space[$size].y} ${theme.click.table.body.cell.space[$size].x};
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

const ActionsContainer = styled.div`
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
  ${({ theme }) => `
  border: ${theme.click.table.cell.stroke} solid ${theme.click.table.global.color.stroke.default};
  border-radius: ${theme.click.table.radii.all}
  `}
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
interface TableRowCloseButtonProps {
  $isDeleted?: boolean;
}

const TableRowCloseButton = styled.button<TableRowCloseButtonProps>`
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
  isActive?: boolean;
  /** only works with <Table isSelectable={true} /> */
  isIndeterminate?: boolean;
}

interface CommonTableProps
  extends Omit<HTMLAttributes<HTMLTableElement>, "children" | "onSelect"> {
  headers: Array<TableHeaderType>;
  rows: Array<TableRowType>;
  onDelete?: (item: TableRowType, index: number) => void;
  onEdit?: (item: TableRowType, index: number) => void;
  onSort?: SortFn;
  loading?: boolean;
  noDataMessage?: ReactNode;
  size?: TableSize;
  showHeader?: boolean;
  rowHeight?: string;
  tableId?: string;
  enableColumnVisibility?: boolean;
  onLoadColumnVisibility?: (tableId: string) => Record<string, boolean>;
  onSaveColumnVisibility?: (tableId: string, visibility: Record<string, boolean>) => void;
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
  actionsList: Array<string>;
  size: TableSize;
  rowHeight?: string;
  visibleColumns: Record<string, boolean>;
  enableColumnVisibility?: boolean;
}

const TableBodyRow = ({
  headers,
  items,
  onSelect,
  isSelectable,
  isSelected,
  isIndeterminate,
  onDelete,
  onEdit,
  isDeleted,
  isActive,
  isDisabled,
  size,
  actionsList,
  rowHeight,
  visibleColumns,
  enableColumnVisibility,
  ...rowProps
}: TableBodyRowProps) => {
  const isDeletable = typeof onDelete === "function";
  const isEditable = typeof onEdit === "function";

  const visibleItems = items.filter((_, cellIndex) => {
    const header = headers[cellIndex];
    const columnId = header?.id || `column-${cellIndex}`;
    return visibleColumns[columnId] !== false;
  });

  const visibleHeaders = headers.filter((header, index) => {
    const columnId = header.id || `column-${index}`;
    return visibleColumns[columnId] !== false;
  });

  return (
    <TableRow
      $isSelectable={isSelectable}
      $isDeleted={isDeleted}
      $isDisabled={isDisabled}
      $isActive={isActive}
      $showActions={isDeletable || isEditable}
      $rowHeight={rowHeight}
      {...rowProps}
    >
      {isSelectable && (
        <SelectData $size={size}>
          <Checkbox
            checked={isIndeterminate ? "indeterminate" : isSelected}
            onCheckedChange={onSelect}
            disabled={isDisabled || isDeleted}
          />
        </SelectData>
      )}
      {visibleItems.map(({ label, ...cellProps }, visibleIndex) => {
        const originalIndex = items.findIndex(
          item => item === visibleItems[visibleIndex]
        );
        return (
          <TableData
            $size={size}
            key={`table-cell-${originalIndex}`}
            {...cellProps}
          >
            {visibleHeaders[visibleIndex] && (
              <MobileHeader>{visibleHeaders[visibleIndex].label}</MobileHeader>
            )}
            <EllipsisContent component="div">{label}</EllipsisContent>
          </TableData>
        );
      })}
      {actionsList.length > 0 && (
        <ActionsList $size={size}>
          <ActionsContainer>
            {actionsList.includes("editAction") && (
              <EditButton
                as={IconButton}
                type="ghost"
                disabled={isDisabled || isDeleted || !isEditable}
                icon="pencil"
                onClick={onEdit}
                data-testid="table-row-edit"
              />
            )}
            {actionsList.includes("deleteAction") && (
              <TableRowCloseButton
                as={IconButton}
                disabled={isDisabled || !isDeletable}
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
      {enableColumnVisibility && <TableData $size={size} />}
    </TableRow>
  );
};

const SpanedTableData = styled(TableData)`
  text-align: center;
`;
const CustomTableDataMessage = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
`;
const LoadingData = () => {
  return (
    <>
      <Icon
        name="loading-animated"
        size="sm"
      />
      <Text size="sm">Loading data</Text>
    </>
  );
};
interface CustomTableRowProps {
  loading?: boolean;
  noDataMessage?: ReactNode;
  colSpan: number;
  size: TableSize;
}
const CustomTableRow = ({
  loading,
  noDataMessage,
  colSpan,
  size,
}: CustomTableRowProps) => {
  return (
    <TableRow>
      <SpanedTableData
        $size={size}
        colSpan={colSpan}
      >
        <CustomTableDataMessage>
          {loading ? <LoadingData /> : (noDataMessage ?? "No Data available")}
        </CustomTableDataMessage>
      </SpanedTableData>
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
      loading,
      noDataMessage,
      size = "sm",
      showHeader = true,
      rowHeight,
      tableId,
      enableColumnVisibility = false,
      onLoadColumnVisibility,
      onSaveColumnVisibility,
      ...props
    },
    ref
  ) => {
    const isDeletable = typeof onDelete === "function";
    const isEditable = typeof onEdit === "function";

    // Initialize column visibility from storage
    const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(() => {
      if (!enableColumnVisibility || !tableId) return {};

      const loadFn = onLoadColumnVisibility || defaultLoadColumnVisibility;
      const stored = loadFn(tableId);
      const initial: Record<string, boolean> = {};

      headers.forEach((header, index) => {
        const columnId = header.id || `column-${index}`;
        // If required, always visible. Otherwise, if selected show by default, else hidden
        if (header.required) {
          initial[columnId] = true;
        } else {
          initial[columnId] = stored[columnId] ?? header.selected;
        }
      });

      return initial;
    });

    // Save to storage when visibility changes
    useEffect(() => {
      if (enableColumnVisibility && tableId) {
        const saveFn = onSaveColumnVisibility || defaultSaveColumnVisibility;
        saveFn(tableId, visibleColumns);
      }
    }, [visibleColumns, enableColumnVisibility, tableId, onSaveColumnVisibility]);

    const handleVisibilityChange = (columnId: string, visible: boolean) => {
      setVisibleColumns(prev => ({
        ...prev,
        [columnId]: visible,
      }));
    };

    const onRowSelect =
      (id: number | string) =>
      (checked: boolean): void => {
        if (typeof onSelect == "function") {
          const selectedItems = rows.flatMap((row, index) => {
            if (
              (id === row.id && checked) ||
              (selectedIds.includes(row.id) && id !== row.id)
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
    const hasRows = rows.length > 0;
    const actionsList: Array<string> = [];
    if (isDeletable) {
      actionsList.push("deleteAction");
    }
    if (isEditable) {
      actionsList.push("editAction");
    }

    const visibleHeadersCount = enableColumnVisibility
      ? headers.filter((header, index) => {
          const columnId = header.id || `column-${index}`;
          return visibleColumns[columnId] !== false;
        }).length
      : headers.length;

    return (
      <TableOuterContainer>
        {hasRows && showHeader && (
          <MobileActions>
            {isSelectable && (
              <SelectAllCheckbox
                label="Select All"
                onCheckedChange={onSelect}
                rows={rows}
                selectedIds={selectedIds}
              />
            )}
          </MobileActions>
        )}
        <TableWrapper>
          <StyledTable
            ref={ref}
            {...props}
          >
            {showHeader && (
              <Thead
                headers={headers}
                isSelectable={isSelectable}
                onSelectAll={onSelect}
                actionsList={actionsList}
                onSort={onSort}
                size={size}
                rows={rows}
                selectedIds={selectedIds}
                enableColumnVisibility={enableColumnVisibility}
                visibleColumns={visibleColumns}
                onVisibilityChange={handleVisibilityChange}
              />
            )}
            <Tbody>
              {(loading || !hasRows) && (
                <CustomTableRow
                  colSpan={
                    visibleHeadersCount +
                    (isEditable || isDeletable ? 1 : 0) +
                    (isSelectable ? 1 : 0) +
                    (enableColumnVisibility ? 1 : 0)
                  }
                  loading={loading}
                  noDataMessage={noDataMessage}
                  size={size}
                />
              )}
              {rows.map(({ id, ...rowProps }, rowIndex) => (
                <TableBodyRow
                  key={`table-body-row-${rowIndex}`}
                  headers={headers}
                  isSelectable={isSelectable}
                  isSelected={selectedIds?.includes(id)}
                  onSelect={onRowSelect(id)}
                  actionsList={actionsList}
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
                  size={size}
                  rowHeight={rowHeight}
                  visibleColumns={visibleColumns}
                  enableColumnVisibility={enableColumnVisibility}
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

interface SelectAllCheckboxProps extends Omit<CheckboxProps, "onCheckedChange"> {
  onCheckedChange?: (selectedValues: Array<SelectReturnValue>) => void;
  selectedIds: (number | string)[];
  rows: TableRowType[];
}

const SelectAllCheckbox: FC<SelectAllCheckboxProps> = ({
  rows,
  selectedIds,
  onCheckedChange,
  ...checkboxProps
}) => {
  const selectedIdSet = useMemo(() => new Set(selectedIds), [selectedIds]);

  const { checked, disabled } = useMemo(() => {
    let areAllChecked = true;
    let maybeIndeterminate: CheckedState = false;
    let disabled = true;

    for (const row of rows) {
      if (row.isDisabled || row.isDeleted) {
        continue;
      } else {
        disabled = false;
      }

      if (selectedIdSet.has(row.id)) {
        maybeIndeterminate = "indeterminate";
      } else {
        areAllChecked = false;
      }
    }

    return {
      checked: disabled ? false : areAllChecked || maybeIndeterminate,
      disabled,
    };
  }, [rows, selectedIdSet]);

  const handleCheckedChange = (checked: boolean) => {
    if (typeof onCheckedChange !== "function") {
      return;
    }

    // disabled items should not change their selected state because of user interaction

    const newSelectedRows = rows.reduce((acc: SelectReturnValue[], row, index) => {
      const isDisabled = row.isDisabled || row.isDeleted;

      const shouldBeSelected = checked
        ? !isDisabled || selectedIdSet.has(row.id)
        : isDisabled && selectedIdSet.has(row.id);

      if (shouldBeSelected) {
        acc.push({
          item: row,
          index,
        });
      }

      return acc;
    }, []);

    onCheckedChange(newSelectedRows);
  };

  return (
    <Checkbox
      checked={checked}
      disabled={disabled}
      onCheckedChange={handleCheckedChange}
      {...checkboxProps}
    />
  );
};

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  overflow: hidden;
  table-layout: fixed;

  @media (max-width: 768px) {
    border: none;
    table-layout: auto;
  }
`;

// Default storage implementation (used as fallback)
const defaultLoadColumnVisibility = (tableId: string): Record<string, boolean> => {
  const key = `click-ui-table-column-visibility-${tableId}`;

  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

const defaultSaveColumnVisibility = (
  tableId: string,
  visibility: Record<string, boolean>
) => {
  const key = `click-ui-table-column-visibility-${tableId}`;

  try {
    localStorage.setItem(key, JSON.stringify(visibility));
  } catch {
    // Silently fail if localStorage is not available
  }
};

// Styled components for column visibility popover
const ColumnVisibilityContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 200px;
  max-width: 300px;
`;

const ColumnVisibilityItem = styled.label<{ $disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  user-select: none;
`;

const ColumnVisibilityLabel = styled.span`
  ${({ theme }) => `
    font: ${theme.click.table.cell.text.default};
    color: ${theme.click.table.row.color.text.default};
  `}
`;

// Column Visibility Popover Component
interface ColumnVisibilityPopoverProps {
  headers: Array<TableHeaderType>;
  visibleColumns: Record<string, boolean>;
  onVisibilityChange: (columnId: string, visible: boolean) => void;
}

const ColumnVisibilityPopover: FC<ColumnVisibilityPopoverProps> = ({
  headers,
  visibleColumns,
  onVisibilityChange,
}) => {
  return (
    <Popover>
      <Popover.Trigger>
        <IconButton
          type="ghost"
          icon='gear'
          aria-label="Configure columns"
          data-testid="column-visibility-button"
        />
      </Popover.Trigger>
      <Popover.Content
        align="end"
        sideOffset={8}
      >
        <ColumnVisibilityContainer>
          {headers.map((header, index) => {
            const columnId = header.id || `column-${index}`;
            const isRequired = header.required === true;
            const isVisible = visibleColumns[columnId] !== false;

            return  (
              <ColumnVisibilityItem
                key={columnId}
                $disabled={isRequired}
              >
                {isRequired ? <Icon name="lock" size="sm"/> : <Checkbox
                  checked={isVisible}
                  disabled={isRequired}
                  onCheckedChange={checked => {
                    if (!isRequired) {
                      onVisibilityChange(columnId, checked === true);
                    }
                  }}
                />}
                <ColumnVisibilityLabel>{header.label}</ColumnVisibilityLabel>
              </ColumnVisibilityItem>
            );
          })}
        </ColumnVisibilityContainer>
      </Popover.Content>
    </Popover>
  );
};

export { Table };
