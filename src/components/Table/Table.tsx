import {
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
import { styled } from 'styled-components';

import { CheckedState } from '@radix-ui/react-checkbox';

import { Checkbox, CheckboxProps } from '@/components/Checkbox/Checkbox';
import { EllipsisContent } from '@/components/EllipsisContent/EllipsisContent';
import { Icon } from '@/components/Icon/Icon';
import { IconButton } from '@/components/IconButton/IconButton';
import { Text } from '@/components/Typography/Text/Text';
import { MiddleTruncator } from '@/components/MiddleTruncator';
import type { HorizontalDirection } from '@/components/types';

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

const StyledHeader = styled.th<{ $size: TableSize; $resizable?: boolean }>`
  ${({ theme, $size }) => `
    padding: ${theme.click.table.header.cell.space[$size].y} ${theme.click.table.body.cell.space[$size].x};
    font: ${theme.click.table.header.title.default};
    color: ${theme.click.table.header.color.title.default};
  `}
  text-align: left;

  ${({ $resizable }) =>
    $resizable &&
    `
    position: relative;
  `}
`;

const Resizer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 24px;
  height: 100%;
  cursor: col-resize;
  user-select: none;
  z-index: 1;
  transition: opacity 0.2s;
  border-radius: 0.5rem;
  transform: translateX(50%);

  &:hover {
    opacity: 0.6;
  }

  &::before {
    content: ' ';
    background: ${({ theme }) => theme.click.table.header.color.checkbox.border.default};
    display: inline-block;
    top: 25%;
    width: 2px;
    height: 20px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.click.global.color.outline.default};
    outline-offset: 2px;
    opacity: 1;
  }
`;

const HeaderContentWrapper = styled.div<{ $interactive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: inherit;

  ${({ $interactive }) => $interactive && 'cursor: pointer;'}
`;

const SortIcon = styled(Icon)<{ $sortDir: SortDir }>`
  transition: all 200ms;
  transform: rotate(${({ $sortDir }) => ($sortDir === 'desc' ? '180deg' : '0deg')});
`;

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
    <StyledHeader
      $size={size}
      $resizable={resizable}
      {...props}
    >
      <HeaderContentWrapper
        onClick={onHeaderClick}
        $interactive={isInteractive}
      >
        {isSorted && isSortable && sortPosition == 'start' && (
          <SortIcon
            $sortDir={sortDir}
            name="arrow-down"
            size="sm"
          />
        )}
        {label}
        {isSorted && isSortable && sortPosition == 'end' && (
          <SortIcon
            $sortDir={sortDir}
            name="arrow-down"
            size="sm"
          />
        )}
      </HeaderContentWrapper>
      {showResizer && (
        <Resizer
          ref={resizerRef}
          onMouseDown={onResizeStart}
          role="separator"
          aria-orientation="vertical"
          aria-label={`Resize ${typeof label === 'string' ? label : 'column'}`}
          tabIndex={0}
          onKeyDown={onResizerKeyDown}
        />
      )}
    </StyledHeader>
  );
};
interface TheadProps {
  headers: Array<TableColumnConfigProps>;
  isSelectable?: boolean;
  onSelectAll?: (selectedValues: SelectReturnValue[]) => void;
  actionsList: Array<string>;
  onSort?: SortFn;
  size: TableSize;
  rows: TableRowType[];
  selectedIds: (number | string)[];
  resizableColumns?: boolean;
  columnWidths?: number[] | null;
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
      <StyledColGroup>
        {isSelectable && <col width={48} />}
        {headers.map((headerProps, index) => (
          <col
            key={`header-col-${index}`}
            width={
              resizableColumns &&
              columnWidths &&
              columnWidths[index] &&
              index < headers.length - 1
                ? `${columnWidths[index]}px`
                : headerProps.width
            }
          />
        ))}
        {actionsList.length > 0 && <col width={(actionsList.length + 1) * 32 + 10} />}
      </StyledColGroup>
      <StyledThead ref={theadRef}>
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
          {headers.map(({ width, ...headerProps }, index) => (
            <TableHeader
              key={`table-header-${index}-${width}`}
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
            <StyledHeader
              aria-label="Actions"
              $size={size}
            />
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
    ${$rowHeight ? `height: ${$rowHeight};` : ''}
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
    cursor: ${$isDeleted || $isDisabled ? 'not-allowed' : 'default'}
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
          : ''
      }
      ${
        $showActions
          ? `padding-right: calc(${theme.click.table.body.cell.space.sm.x} + ${theme.click.table.body.cell.space.sm.x} + ${theme.click.image.sm.size.width} + ${theme.click.button.iconButton.default.space.x} + ${theme.click.button.iconButton.default.space.x});`
          : ''
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
  overflow: visible;
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
    ${$isDeleted ? 'transform: rotate(45deg)' : ''};
    `}
  }
  &:disabled {
    background: transparent;
  }
`;

interface TableCellType extends HTMLAttributes<HTMLTableCellElement> {
  label: ReactNode;
  overflowMode?: OverflowMode;
}
export interface TableRowType extends Omit<
  HTMLAttributes<HTMLTableRowElement>,
  'onSelect' | 'id'
> {
  id: string | number;
  items: Array<TableCellType>;
  isDisabled?: boolean;
  isDeleted?: boolean;
  isActive?: boolean;
  /** only works with <Table isSelectable={true} /> */
  isIndeterminate?: boolean;
}

interface CommonTableProps extends Omit<
  HTMLAttributes<HTMLTableElement>,
  'children' | 'onSelect'
> {
  headers: Array<TableColumnConfigProps>;
  rows: Array<TableRowType>;
  onDelete?: (item: TableRowType, index: number) => void;
  onEdit?: (item: TableRowType, index: number) => void;
  onSort?: SortFn;
  loading?: boolean;
  noDataMessage?: ReactNode;
  size?: TableSize;
  showHeader?: boolean;
  rowHeight?: string;
  resizableColumns?: boolean;
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

interface TableBodyRowProps extends Omit<TableRowType, 'id'> {
  headers: Array<TableColumnConfigProps>;
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
  const isDeletable = typeof onDelete === 'function';
  const isEditable = typeof onEdit === 'function';
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
            checked={isIndeterminate ? 'indeterminate' : isSelected}
            onCheckedChange={onSelect}
            disabled={isDisabled || isDeleted}
          />
        </SelectData>
      )}
      {items.map(({ label, overflowMode, ...cellProps }, cellIndex) => (
        <TableData
          $size={size}
          key={`table-cell-${cellIndex}`}
          {...cellProps}
        >
          {headers[cellIndex] && <MobileHeader>{headers[cellIndex].label}</MobileHeader>}
          <Cell
            label={label}
            overflowMode={overflowMode ?? headers[cellIndex]?.overflowMode}
          />
        </TableData>
      ))}
      {actionsList.length > 0 && (
        <ActionsList $size={size}>
          <ActionsContainer>
            {actionsList.includes('editAction') && (
              <EditButton
                as={IconButton}
                type="ghost"
                disabled={isDisabled || isDeleted || !isEditable}
                icon="pencil"
                onClick={onEdit}
                data-testid="table-row-edit"
              />
            )}
            {actionsList.includes('deleteAction') && (
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
          {loading ? <LoadingData /> : (noDataMessage ?? 'No Data available')}
        </CustomTableDataMessage>
      </SpanedTableData>
    </TableRow>
  );
};
interface ResizeState {
  isResizing: boolean;
  columnIndex: number;
  nextColumnIndex: number;
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
      ...props
    },
    ref
  ) => {
    const isDeletable = typeof onDelete === 'function';
    const isEditable = typeof onEdit === 'function';

    const [columnWidths, setColumnWidths] = useState<number[] | null>(null);
    const theadRef = useRef<HTMLTableSectionElement>(null);

    useLayoutEffect(() => {
      if (!resizableColumns || columnWidths !== null || !theadRef.current) {
        return;
      }

      const headerCells = theadRef.current.querySelectorAll('th');
      const widths: number[] = [];

      const startIndex = isSelectable ? 1 : 0;
      const endIndex = headerCells.length - (isDeletable || isEditable ? 1 : 0);

      for (let i = startIndex; i < endIndex; i++) {
        widths.push(headerCells[i].getBoundingClientRect().width);
      }

      if (widths.length === headers.length) {
        setColumnWidths(widths);
      }
    }, [
      resizableColumns,
      columnWidths,
      headers.length,
      isSelectable,
      isDeletable,
      isEditable,
    ]);

    const resizeStateRef = useRef<ResizeState>({
      isResizing: false,
      columnIndex: -1,
      nextColumnIndex: -1,
      startX: 0,
      startWidth: 0,
      nextStartWidth: 0,
    });

    const onMouseMove = useCallback((e: globalThis.MouseEvent) => {
      if (!resizeStateRef.current.isResizing) {
        return;
      }

      const { columnIndex, nextColumnIndex, startX, startWidth, nextStartWidth } =
        resizeStateRef.current;

      if (columnIndex === null || nextColumnIndex === null) {
        return;
      }

      const diff = e.clientX - startX;
      const newWidth = startWidth + diff;
      const newNextWidth = nextStartWidth - diff;

      if (!newWidth || !newNextWidth) {
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
          const updated = [...prev];
          updated[columnIndex] = newWidth;
          updated[nextColumnIndex] = newNextWidth;
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

        const nextColumnIndex = columnIndex + 1;
        if (nextColumnIndex >= headers.length) {
          return;
        }

        resizeStateRef.current = {
          isResizing: true,
          columnIndex,
          nextColumnIndex,
          startX: e.clientX,
          startWidth: columnWidths[columnIndex],
          nextStartWidth: columnWidths[nextColumnIndex],
        };
      },
      [headers.length, columnWidths]
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
    const actionsList: Array<string> = [];
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

          const nextColumnIndex = columnIndex + 1;
          if (nextColumnIndex >= headers.length) {
            return;
          }

          const increment = 2;
          const multiplier = direction === 'right' ? 1 : -1;
          const diff = increment * multiplier;

          const currentWidth = columnWidths[columnIndex];
          const nextWidth = columnWidths[nextColumnIndex];
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
            const updated = [...prev];
            updated[columnIndex] = newWidth;
            updated[nextColumnIndex] = newNextWidth;
            return updated;
          });
        },
      [columnWidths, headers.length]
    );

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
                resizableColumns={resizableColumns}
                columnWidths={resizableColumns ? columnWidths : undefined}
                onResizeStart={resizableColumns ? handleResizeStart : undefined}
                theadRef={theadRef}
                onKeyboardResize={resizableColumns ? onKeyboardResize : undefined}
              />
            )}
            <Tbody>
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
            </Tbody>
          </StyledTable>
        </TableWrapper>
      </TableOuterContainer>
    );
  }
);

interface SelectAllCheckboxProps extends Omit<CheckboxProps, 'onCheckedChange'> {
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

const TextWrapped = styled.span`
  overflow-wrap: break-word;
  word-break: break-all;
  display: inline-block;
  max-width: 100%;
`;

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
    return <TextWrapped>{label}</TextWrapped>;
  }

  return <EllipsisContent component="div">{label}</EllipsisContent>;
};

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  overflow: visible;
  table-layout: fixed;

  @media (max-width: 768px) {
    border: none;
    table-layout: auto;
  }
`;

export { Table };
