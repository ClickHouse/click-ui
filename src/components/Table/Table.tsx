import { FC, HTMLAttributes, MouseEvent, ReactNode, forwardRef, useMemo } from "react";
import clsx from "clsx";

import { CheckedState } from "@radix-ui/react-checkbox";

import {
  Checkbox,
  CheckboxProps,
  EllipsisContent,
  HorizontalDirection,
  Icon,
  IconButton,
  Text,
} from "@/components";
import styles from "./Table.module.scss";

type SortDir = "asc" | "desc";
type SortFn = (sortDir: SortDir, header: TableHeaderType, index: number) => void;
type TableSize = "sm" | "md";

export interface TableHeaderType extends HTMLAttributes<HTMLTableCellElement> {
  label: ReactNode;
  isSortable?: boolean;
  sortDir?: SortDir;
  sortPosition?: HorizontalDirection;
  width?: string;
}

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
    <th
      className={clsx(styles.cuiHeader, {
        [styles.cuiHeaderSm]: size === "sm",
        [styles.cuiHeaderMd]: size === "md",
      })}
      {...delegated}
    >
      <div
        className={clsx(styles.cuiHeaderContentWrapper, {
          [styles.cuiInteractive]: isInteractive,
        })}
        onClick={onHeaderClick}
      >
        {isSorted && isSortable && sortPosition == "start" && (
          <Icon
            className={clsx(styles.cuiSortIcon, {
              [styles.cuiSortAsc]: sortDir === "asc",
              [styles.cuiSortDesc]: sortDir === "desc",
            })}
            name="arrow-down"
            size="sm"
          />
        )}
        {label}
        {isSorted && isSortable && sortPosition == "end" && (
          <Icon
            className={clsx(styles.cuiSortIcon, {
              [styles.cuiSortAsc]: sortDir === "asc",
              [styles.cuiSortDesc]: sortDir === "desc",
            })}
            name="arrow-down"
            size="sm"
          />
        )}
      </div>
    </th>
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
}: TheadProps) => {
  const onSort = (header: TableHeaderType, headerIndex: number) => () => {
    if (typeof onSortProp === "function" && header.isSortable) {
      onSortProp(header.sortDir === "asc" ? "desc" : "asc", header, headerIndex);
    }
  };
  return (
    <>
      <colgroup className={styles.cuiColGroup}>
        {isSelectable && <col width={48} />}
        {headers.map((headerProps, index) => (
          <col
            key={`header-col-${index}`}
            width={headerProps.width}
          />
        ))}
        {actionsList.length > 0 && <col width={(actionsList.length + 1) * 32 + 10} />}
      </colgroup>
      <thead className={styles.cuiThead}>
        <tr>
          {isSelectable && (
            <th
              className={clsx(styles.cuiHeader, {
                [styles.cuiHeaderSm]: size === "sm",
                [styles.cuiHeaderMd]: size === "md",
              })}
              aria-label="Select column"
            >
              <SelectAllCheckbox
                onCheckedChange={onSelectAll}
                rows={rows}
                selectedIds={selectedIds}
              />
            </th>
          )}
          {headers.map(({ width, ...headerProps }, index) => (
            <TableHeader
              key={`table-header-${index}-${width}`}
              onSort={onSort(headerProps, index)}
              size={size}
              {...headerProps}
            />
          ))}
          {actionsList.length > 0 && (
            <th
              className={clsx(styles.cuiHeader, {
                [styles.cuiHeaderSm]: size === "sm",
                [styles.cuiHeaderMd]: size === "md",
              })}
              aria-label="Actions"
            />
          )}
        </tr>
      </thead>
    </>
  );
};

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
  ...rowProps
}: TableBodyRowProps) => {
  const isDeletable = typeof onDelete === "function";
  const isEditable = typeof onEdit === "function";
  return (
    <tr
      className={clsx(styles.cuiTableRow, {
        [styles.cuiActive]: isActive,
        [styles.cuiDeleted]: isDeleted,
        [styles.cuiDisabled]: isDisabled,
        [styles.cuiSelectable]: isSelectable,
        [styles.cuiShowActions]: isDeletable || isEditable,
      })}
      style={{ height: rowHeight }}
      {...rowProps}
    >
      {isSelectable && (
        <td
          className={clsx(styles.cuiSelectData, {
            [styles.cuiSelectSm]: size === "sm",
            [styles.cuiSelectMd]: size === "md",
          })}
        >
          <Checkbox
            checked={isIndeterminate ? "indeterminate" : isSelected}
            onCheckedChange={onSelect}
            disabled={isDisabled || isDeleted}
          />
        </td>
      )}
      {items.map(({ label, ...cellProps }, cellIndex) => (
        <td
          className={clsx(styles.cuiTableData, {
            [styles.cuiDataSm]: size === "sm",
            [styles.cuiDataMd]: size === "md",
          })}
          key={`table-cell-${cellIndex}`}
          {...cellProps}
        >
          {headers[cellIndex] && (
            <div className={styles.cuiMobileHeader}>{headers[cellIndex].label}</div>
          )}
          <EllipsisContent component="div">{label}</EllipsisContent>
        </td>
      ))}
      {actionsList.length > 0 && (
        <td
          className={clsx(styles.cuiActionsList, {
            [styles.cuiActionsSm]: size === "sm",
            [styles.cuiActionsMd]: size === "md",
          })}
        >
          <div className={styles.cuiActionsContainer}>
            {actionsList.includes("editAction") && (
              <IconButton
                className={styles.cuiEditButton}
                type="ghost"
                disabled={isDisabled || isDeleted || !isEditable}
                icon="pencil"
                onClick={onEdit}
                data-testid="table-row-edit"
              />
            )}
            {actionsList.includes("deleteAction") && (
              <IconButton
                className={clsx(styles.cuiTableRowCloseButton, {
                  [styles.cuiDeleted]: isDeleted,
                })}
                disabled={isDisabled || !isDeletable}
                type="ghost"
                icon="cross"
                onClick={onDelete}
                data-testid="table-row-delete"
              />
            )}
          </div>
        </td>
      )}
    </tr>
  );
};

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
    <tr className={styles.cuiTableRow}>
      <td
        className={clsx(styles.cuiSpanedTableData, {
          [styles.cuiSpanedSm]: size === "sm",
          [styles.cuiSpanedMd]: size === "md",
        })}
        colSpan={colSpan}
      >
        <div className={styles.cuiCustomTableDataMessage}>
          {loading ? <LoadingData /> : (noDataMessage ?? "No Data available")}
        </div>
      </td>
    </tr>
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
      ...props
    },
    ref
  ) => {
    const isDeletable = typeof onDelete === "function";
    const isEditable = typeof onEdit === "function";

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

    return (
      <div className={styles.cuiTableOuterContainer}>
        {hasRows && showHeader && (
          <div className={styles.cuiMobileActions}>
            {isSelectable && (
              <SelectAllCheckbox
                label="Select All"
                onCheckedChange={onSelect}
                rows={rows}
                selectedIds={selectedIds}
              />
            )}
          </div>
        )}
        <div className={styles.cuiTableWrapper}>
          <table
            className={styles.cuiTable}
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
              />
            )}
            <tbody className={styles.cuiTbody}>
              {(loading || !hasRows) && (
                <CustomTableRow
                  colSpan={
                    headers.length +
                    (isEditable || isDeletable ? 1 : 0) +
                    (isSelectable ? 1 : 0)
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
                  {...rowProps}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
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

export { Table };
