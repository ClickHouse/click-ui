import {
  CSSProperties,
  FC,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from 'react';

import { CheckedState } from '@radix-ui/react-checkbox';

import { Icon } from '@/components/Icon';
import { IconButton } from '@/components/IconButton';
import { Text } from '@/components/Text';
import { HorizontalDirection } from '@/types';
import { EllipsisContent } from '@/components/EllipsisContent';
import { Checkbox, CheckboxProps } from '@/components/Checkbox';
import { MiddleTruncator } from '@/components/MiddleTruncator';
import { cn, cva } from '@/lib/cva';
import styles from './Table.module.css';

type SortDir = 'asc' | 'desc';
type SortFn = (sortDir: SortDir, header: TableColumnConfigProps, index: number) => void;
type TableSize = 'sm' | 'md';

// wrap: text breaks into multiple lines
// truncated: text cuts at end with an ellipsis (...)
// truncate-middle: text cuts in middle, shows start and end
type OverflowMode = 'truncated' | 'truncate-middle' | 'wrap';

export interface TableColumnConfigProps extends HTMLAttributes<HTMLTableCellElement> {
  label: ReactNode;
  isSortable?: boolean;
  sortDir?: SortDir;
  sortPosition?: HorizontalDirection;
  width?: string;
  overflowMode?: OverflowMode;
  resizable?: boolean;
}

// TODO: Delete `TableHeaderType` (deprecation warn at v0.0.251-test.67)
/** @deprecated The TableHeaderType field have been deprecated to favour TableColumnConfigProps */
export type TableHeaderType = TableColumnConfigProps;

const headerVariants = cva(styles.table__header, {
  variants: {
    size: {
      sm: styles.table__header_size_sm,
      md: styles.table__header_size_md,
    },
    resizable: {
      true: styles.table__header_resizable,
      false: '',
    },
  },
  defaultVariants: {
    resizable: false,
  },
});

const sortIconVariants = cva(styles['table__sort-icon'], {
  variants: {
    dir: {
      asc: styles['table__sort-icon_dir_asc'],
      desc: styles['table__sort-icon_dir_desc'],
    },
  },
});

type OnKeyboardResizerDirection = 'left' | 'right';

interface TableHeaderProps extends Omit<TableColumnConfigProps, 'width'> {
  onSort?: () => void;
  size: TableSize;
  showResizer?: boolean;
  onResizeStart?: (e: MouseEvent) => void;
  onKeyboardResize?: (
    e: React.KeyboardEvent,
    direction: OnKeyboardResizerDirection
  ) => void;
}

const TableHeader = ({
  label,
  sortDir,
  sortPosition = 'end',
  isSortable,
  onSort,
  onClick,
  size,
  resizable,
  showResizer,
  onResizeStart,
  onKeyboardResize,
  overflowMode,
  className,
  ...props
}: TableHeaderProps) => {
  if (overflowMode === 'wrap' && resizable) {
    console.warn(
      '"Wrap" overflow mode doesn\'t work well with resizable table columns. Consider using truncation instead, please!'
    );
  }

  const isSorted = typeof sortDir === 'string';
  const isInteractive = Boolean(
    typeof onClick === 'function' || (isSortable && typeof onSort === 'function')
  );
  const resizerRef = useRef<HTMLDivElement>(null);

  const onHeaderClick = (e: MouseEvent<HTMLTableCellElement>): void => {
    if (typeof onClick === 'function') {
      onClick(e);
    }
    if (typeof onSort === 'function') {
      onSort();
    }
  };

  const onResizerKeyDown = (e: React.KeyboardEvent) => {
    if (!onKeyboardResize) {
      return;
    }

    if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
    }

    switch (e.key) {
      case 'ArrowLeft':
        onKeyboardResize(e, 'left');
        break;
      case 'ArrowRight':
        onKeyboardResize(e, 'right');
        break;
      case 'Escape':
        resizerRef.current?.blur();
        break;
    }
  };

  return (
    <th
      {...props}
      className={cn(headerVariants({ size, resizable }), className)}
    >
      <div
        onClick={onHeaderClick}
        className={cn(
          styles['table__header-content'],
          isInteractive && styles['table__header-content_interactive']
        )}
      >
        {isSorted && isSortable && sortPosition == 'start' && (
          <Icon
            name="arrow-down"
            size="sm"
            className={cn(sortIconVariants({ dir: sortDir }))}
          />
        )}
        {label}
        {isSorted && isSortable && sortPosition == 'end' && (
          <Icon
            name="arrow-down"
            size="sm"
            className={cn(sortIconVariants({ dir: sortDir }))}
          />
        )}
      </div>
      {showResizer && (
        <div
          ref={resizerRef}
          onMouseDown={onResizeStart}
          role="separator"
          aria-orientation="vertical"
          aria-label={`Resize ${typeof label === 'string' ? label : 'column'}`}
          tabIndex={0}
          onKeyDown={onResizerKeyDown}
          className={cn(styles.table__resizer)}
        />
      )}
    </th>
  );
};
interface TheadProps {
  headers: TableColumnConfigProps[];
  isSelectable?: boolean;
  onSelectAll?: (selectedValues: SelectReturnValue[]) => void;
  actionsList: string[];
  onSort?: SortFn;
  size: TableSize;
  rows: TableRowType[];
  selectedIds: (number | string)[];
  resizableColumns?: boolean;
  columnWidths?: Map<string, number> | null;
  onResizeStart?: (columnIndex: number) => (e: MouseEvent) => void;
  onKeyboardResize?: (
    columnIndex: number
  ) => (e: React.KeyboardEvent, direction: OnKeyboardResizerDirection) => void;
  theadRef?: RefObject<HTMLTableSectionElement>;
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
  resizableColumns,
  columnWidths,
  onResizeStart,
  theadRef,
  onKeyboardResize,
}: TheadProps) => {
  const onSort = (header: TableColumnConfigProps, headerIndex: number) => () => {
    if (typeof onSortProp === 'function' && header.isSortable) {
      onSortProp(header.sortDir === 'asc' ? 'desc' : 'asc', header, headerIndex);
    }
  };
  return (
    <>
      <colgroup className={cn(styles.table__colgroup)}>
        {isSelectable && <col width={48} />}
        {headers.map((headerProps, index) => {
          const headerLabel =
            typeof headerProps.label === 'string'
              ? headerProps.label
              : `__index_${index}`;
          const widthFromMap = columnWidths?.get(headerLabel);
          return (
            <col
              key={`header-col-${index}`}
              width={
                resizableColumns && widthFromMap && index < headers.length - 1
                  ? `${widthFromMap}px`
                  : headerProps.width
              }
            />
          );
        })}
        {actionsList.length > 0 && <col width={(actionsList.length + 1) * 32 + 10} />}
      </colgroup>
      <thead
        ref={theadRef}
        className={cn(styles.table__thead)}
      >
        <tr>
          {isSelectable && (
            <th
              aria-label="Select column"
              className={cn(headerVariants({ size }))}
            >
              <SelectAllCheckbox
                onCheckedChange={onSelectAll}
                rows={rows}
                selectedIds={selectedIds}
              />
            </th>
          )}
          {headers.map((headerProps, index) => (
            <TableHeader
              key={`table-header-${index}`}
              onSort={onSort(headerProps, index)}
              size={size}
              resizable={resizableColumns}
              showResizer={resizableColumns && index < headers.length - 1}
              onResizeStart={onResizeStart?.(index)}
              onKeyboardResize={onKeyboardResize?.(index)}
              {...headerProps}
            />
          ))}
          {actionsList.length > 0 && (
            <th
              aria-label="Actions"
              className={cn(headerVariants({ size }))}
            />
          )}
        </tr>
      </thead>
    </>
  );
};

const rowVariants = cva(styles.table__row, {
  variants: {
    isSelectable: {
      true: styles.table__row_selectable,
      false: '',
    },
    isActive: {
      true: styles.table__row_active,
      false: '',
    },
    isDisabled: {
      true: styles.table__row_disabled,
      false: '',
    },
    showActions: {
      true: styles['table__row_show-actions'],
      false: '',
    },
  },
  defaultVariants: {
    isSelectable: false,
    isActive: false,
    isDisabled: false,
    showActions: false,
  },
});

const cellVariants = cva(styles.table__data, {
  variants: {
    size: {
      sm: styles.table__data_size_sm,
      md: styles.table__data_size_md,
    },
  },
});

const selectDataVariants = cva(styles['table__select-data'], {
  variants: {
    size: {
      sm: styles['table__select-data_size_sm'],
      md: styles['table__select-data_size_md'],
    },
  },
});

const actionsCellVariants = cva(styles['table__actions-cell'], {
  variants: {
    size: {
      sm: styles['table__actions-cell_size_sm'],
      md: styles['table__actions-cell_size_md'],
    },
  },
});

interface TableCellType extends HTMLAttributes<HTMLTableCellElement> {
  label: ReactNode;
  overflowMode?: OverflowMode;
}
export interface TableRowType extends Omit<
  HTMLAttributes<HTMLTableRowElement>,
  'onSelect' | 'id'
> {
  id: string | number;
  items: TableCellType[];
  isDisabled?: boolean;
  isDeleted?: boolean;
  isActive?: boolean;
  /** only works with <Table isSelectable={true} /> */
  isIndeterminate?: boolean;
}

export type MobileLayoutProp = 'list' | 'scroll';

interface CommonTableProps extends Omit<
  HTMLAttributes<HTMLTableElement>,
  'children' | 'onSelect'
> {
  headers: TableColumnConfigProps[];
  rows: TableRowType[];
  onDelete?: (item: TableRowType, index: number) => void;
  onEdit?: (item: TableRowType, index: number) => void;
  onSort?: SortFn;
  loading?: boolean;
  noDataMessage?: ReactNode;
  size?: TableSize;
  showHeader?: boolean;
  rowHeight?: string;
  resizableColumns?: boolean;
  mobileLayout?: MobileLayoutProp;
}

type SelectReturnValue = {
  index: number;
  item: TableRowType;
};

interface SelectionType {
  isSelectable?: boolean;
  selectedIds?: (number | string)[];
  onSelect?: (selectedValues: SelectReturnValue[]) => void;
}

interface NoSelectionType {
  isSelectable?: never;
  selectedIds?: never;
  onSelect?: never;
}

export type TableProps = CommonTableProps & (SelectionType | NoSelectionType);

interface TableBodyRowProps extends Omit<TableRowType, 'id'> {
  headers: TableColumnConfigProps[];
  onSelect: (checked: boolean) => void;
  isSelectable?: boolean;
  isSelected: boolean;
  onDelete?: () => void;
  onEdit?: () => void;
  actionsList: string[];
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
  className,
  style,
  ...rowProps
}: TableBodyRowProps) => {
  const isDeletable = typeof onDelete === 'function';
  const isEditable = typeof onEdit === 'function';
  const rowStyle = useMemo(
    () =>
      ({
        ...(rowHeight ? { '--table-row-height': rowHeight } : {}),
        ...style,
      }) as CSSProperties,
    [rowHeight, style]
  );
  return (
    <tr
      style={rowStyle}
      {...rowProps}
      className={cn(
        rowVariants({
          isSelectable,
          isActive,
          isDisabled: isDeleted || isDisabled,
          showActions: isDeletable || isEditable,
        }),
        className
      )}
    >
      {isSelectable && (
        <td className={cn(selectDataVariants({ size }))}>
          <Checkbox
            checked={isIndeterminate ? 'indeterminate' : isSelected}
            onCheckedChange={onSelect}
            disabled={isDisabled || isDeleted}
          />
        </td>
      )}
      {items.map(
        ({ label, overflowMode, className: cellClassName, ...cellProps }, cellIndex) => (
          <td
            key={`table-cell-${cellIndex}`}
            {...cellProps}
            className={cn(cellVariants({ size }), cellClassName)}
          >
            {headers[cellIndex] && (
              <div className={cn(styles['table__mobile-header'])}>
                {headers[cellIndex].label}
              </div>
            )}
            <Cell
              label={label}
              overflowMode={overflowMode ?? headers[cellIndex]?.overflowMode}
            />
          </td>
        )
      )}
      {actionsList.length > 0 && (
        <td className={cn(actionsCellVariants({ size }))}>
          <div className={cn(styles.table__actions)}>
            {actionsList.includes('editAction') && (
              <IconButton
                type="ghost"
                disabled={isDisabled || isDeleted || !isEditable}
                icon="pencil"
                onClick={onEdit}
                data-testid="table-row-edit"
                className={cn(styles['table__edit-button'])}
              />
            )}
            {actionsList.includes('deleteAction') && (
              <IconButton
                disabled={isDisabled || !isDeletable}
                type="ghost"
                icon="cross"
                onClick={onDelete}
                data-testid="table-row-delete"
                className={cn(
                  styles['table__close-button'],
                  isDeleted && styles['table__close-button_deleted']
                )}
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
    <tr className={cn(rowVariants({}))}>
      <td
        colSpan={colSpan}
        className={cn(cellVariants({ size }), styles['table__spanned-data'])}
      >
        <div className={cn(styles['table__custom-message'])}>
          {loading ? <LoadingData /> : (noDataMessage ?? 'No Data available')}
        </div>
      </td>
    </tr>
  );
};
interface ResizeState {
  isResizing: boolean;
  columnLabel: string | null;
  nextColumnLabel: string | null;
  startX: number;
  startWidth: number;
  nextStartWidth: number;
}

// TODO: What is an acceptable minimum column width?
const MIN_COLUMN_WIDTH = 120;

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
      size = 'sm',
      showHeader = true,
      rowHeight,
      resizableColumns,
      mobileLayout = 'list',
      className,
      ...props
    },
    ref
  ) => {
    const isDeletable = typeof onDelete === 'function';
    const isEditable = typeof onEdit === 'function';

    const [columnWidths, setColumnWidths] = useState<Map<string, number> | null>(null);
    const theadRef = useRef<HTMLTableSectionElement>(null);

    useLayoutEffect(() => {
      if (!resizableColumns || columnWidths !== null || !theadRef.current) {
        return;
      }

      const headerCells = theadRef.current.querySelectorAll('th');
      const widths = new Map<string, number>();

      // Skip select column (index 0 if isSelectable) and actions column (last if present)
      const startIndex = isSelectable ? 1 : 0;
      const endIndex = headerCells.length - (isDeletable || isEditable ? 1 : 0);

      let headerIndex = 0;
      for (let i = startIndex; i < endIndex; i++) {
        const header = headers[headerIndex];
        if (header) {
          const key =
            typeof header.label === 'string' ? header.label : `__index_${headerIndex}`;
          widths.set(key, headerCells[i].getBoundingClientRect().width);
        }
        headerIndex++;
      }

      if (widths.size === headers.length) {
        setColumnWidths(widths);
      }
    }, [resizableColumns, columnWidths, isSelectable, isDeletable, isEditable]);

    const headerKey = useMemo(
      () =>
        headers
          .map((h, i) => (typeof h.label === 'string' ? h.label : `__index_${i}`))
          .join(','),
      [headers]
    );
    useEffect(() => {
      setColumnWidths(null);
    }, [headerKey]);

    const resizeStateRef = useRef<ResizeState>({
      isResizing: false,
      columnLabel: null,
      nextColumnLabel: null,
      startX: 0,
      startWidth: 0,
      nextStartWidth: 0,
    });

    const onMouseMove = useCallback((e: globalThis.MouseEvent) => {
      if (!resizeStateRef.current.isResizing) {
        return;
      }

      const { columnLabel, nextColumnLabel, startX, startWidth, nextStartWidth } =
        resizeStateRef.current;

      if (!columnLabel || !nextColumnLabel) {
        return;
      }

      const diff = e.clientX - startX;
      const newWidth = startWidth + diff;
      const newNextWidth = nextStartWidth - diff;

      if (Number.isNaN(newWidth) || Number.isNaN(newNextWidth)) {
        console.warn('Unexpected computed values for resize width', {
          newWidth,
          newNextWidth,
        });
        return;
      }

      if (newWidth >= MIN_COLUMN_WIDTH && newNextWidth >= MIN_COLUMN_WIDTH) {
        setColumnWidths(prev => {
          if (!prev) {
            return prev;
          }
          const updated = new Map(prev);
          updated.set(columnLabel, newWidth);
          updated.set(nextColumnLabel, newNextWidth);
          return updated;
        });
      }
    }, []);

    const onMouseUp = useCallback(() => {
      resizeStateRef.current.isResizing = false;
    }, []);

    useEffect(() => {
      if (!resizableColumns) {
        return;
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);

      return () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
    }, [resizableColumns, onMouseMove, onMouseUp]);

    const handleResizeStart = useCallback(
      (columnIndex: number) => (e: MouseEvent) => {
        e.preventDefault();

        if (!columnWidths) {
          return;
        }

        const currentHeader = headers[columnIndex];
        const nextHeader = headers[columnIndex + 1];

        if (!currentHeader || !nextHeader) {
          return;
        }

        const currentLabel =
          typeof currentHeader.label === 'string'
            ? currentHeader.label
            : `__index_${columnIndex}`;
        const nextLabel =
          typeof nextHeader.label === 'string'
            ? nextHeader.label
            : `__index_${columnIndex + 1}`;

        const startWidth = columnWidths.get(currentLabel);
        const nextStartWidth = columnWidths.get(nextLabel);

        if (startWidth === undefined || nextStartWidth === undefined) {
          return;
        }

        resizeStateRef.current = {
          isResizing: true,
          columnLabel: currentLabel,
          nextColumnLabel: nextLabel,
          startX: e.clientX,
          startWidth,
          nextStartWidth,
        };
      },
      [headers, columnWidths]
    );

    const onRowSelect =
      (id: number | string) =>
      (checked: boolean): void => {
        if (typeof onSelect == 'function') {
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
    const actionsList: string[] = [];
    if (isDeletable) {
      actionsList.push('deleteAction');
    }
    if (isEditable) {
      actionsList.push('editAction');
    }

    const onKeyboardResize = useCallback(
      (columnIndex: number) =>
        (_e: React.KeyboardEvent, direction: OnKeyboardResizerDirection) => {
          if (!columnWidths) {
            return;
          }

          const currentHeader = headers[columnIndex];
          const nextHeader = headers[columnIndex + 1];

          if (!currentHeader || !nextHeader) {
            return;
          }

          const currentLabel =
            typeof currentHeader.label === 'string'
              ? currentHeader.label
              : `__index_${columnIndex}`;
          const nextLabel =
            typeof nextHeader.label === 'string'
              ? nextHeader.label
              : `__index_${columnIndex + 1}`;

          const increment = 2;
          const multiplier = direction === 'right' ? 1 : -1;
          const diff = increment * multiplier;

          const currentWidth = columnWidths.get(currentLabel);
          const nextWidth = columnWidths.get(nextLabel);

          if (currentWidth === undefined || nextWidth === undefined) {
            return;
          }

          const newWidth = currentWidth + diff;
          const newNextWidth = nextWidth - diff;
          const shouldUpdateColumnWidth =
            newWidth >= MIN_COLUMN_WIDTH && newNextWidth >= MIN_COLUMN_WIDTH;

          if (!shouldUpdateColumnWidth) {
            return;
          }

          setColumnWidths(prev => {
            if (!prev) {
              return prev;
            }
            const updated = new Map(prev);
            updated.set(currentLabel, newWidth);
            updated.set(nextLabel, newNextWidth);
            return updated;
          });
        },
      [columnWidths, headers]
    );

    return (
      <div
        data-mobile-layout={mobileLayout}
        className={cn(styles.table)}
      >
        {hasRows && showHeader && (
          <div className={cn(styles['table__mobile-actions'])}>
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
        <div className={cn(styles.table__wrapper)}>
          <table
            ref={ref}
            {...props}
            className={cn(styles['table__table'], className)}
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
                resizableColumns={resizableColumns}
                columnWidths={resizableColumns ? columnWidths : undefined}
                onResizeStart={resizableColumns ? handleResizeStart : undefined}
                theadRef={theadRef}
                onKeyboardResize={resizableColumns ? onKeyboardResize : undefined}
              />
            )}
            <tbody className={cn(styles.table__tbody)}>
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

interface SelectAllCheckboxProps extends Omit<CheckboxProps, 'onCheckedChange'> {
  onCheckedChange?: (selectedValues: SelectReturnValue[]) => void;
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
        maybeIndeterminate = 'indeterminate';
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
    if (typeof onCheckedChange !== 'function') {
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

const Cell = ({
  label,
  overflowMode = 'truncated',
}: {
  label: ReactNode;
  overflowMode?: OverflowMode;
}) => {
  const isText = typeof label === 'string';

  if (!isText) {
    return <>{label}</>;
  }

  if (overflowMode === 'truncate-middle') {
    return <MiddleTruncator text={label} />;
  }

  if (overflowMode === 'wrap') {
    return <span className={cn(styles['table__text-wrapped'])}>{label}</span>;
  }

  return <EllipsisContent component="div">{label}</EllipsisContent>;
};

export { Table };
