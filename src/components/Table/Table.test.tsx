import { fireEvent } from '@testing-library/react';
import { Table, TableProps } from '@/components/Table';
import { renderCUI } from '@/utils/test-utils';

const headers = [{ label: 'Company' }, { label: 'Contact' }, { label: 'Country' }];

const rows = [
  {
    id: 'row-1',
    items: [
      { label: 'Alfreds Futterkiste' },
      { label: 'Maria Anders' },
      { label: 'Germany' },
    ],
  },
  {
    id: 'row-2',
    items: [
      { label: 'Centro comercial Moctezuma' },
      { label: 'Francisco Chang' },
      { label: 'Mexico' },
    ],
  },
];

describe('Table', () => {
  const renderTable = (props: Omit<TableProps, 'headers' | 'rows'>) =>
    renderCUI(
      <Table
        headers={headers}
        rows={rows}
        data-testid="table"
        {...props}
      />
    );

  it('should render the Table', () => {
    const { queryByTestId } = renderTable({});
    expect(queryByTestId('table')).not.toBeNull();
    expect(queryByTestId('checkbox')).toBeNull();
  });

  it('should show checkbox on isSelectable', () => {
    const { queryByTestId, queryAllByTestId } = renderTable({
      isSelectable: true,
      selectedIds: [],
    });
    expect(queryByTestId('table')).not.toBeNull();
    expect(queryAllByTestId('checkbox')[0]).not.toBeNull();
    expect(queryAllByTestId('checkbox')[1]).not.toBeNull();
  });

  it('should trigger onSelect on clicking checkbox', () => {
    const onSelect = vi.fn();
    const { queryByTestId, queryAllByTestId } = renderTable({
      isSelectable: true,
      selectedIds: [],
      onSelect,
    });
    expect(queryByTestId('table')).not.toBeNull();
    expect(queryAllByTestId('checkbox')).toHaveLength(4);
    const selectAllCheckbox = queryAllByTestId('checkbox')[1];
    const rowCheckbox = queryAllByTestId('checkbox')[2];
    expect(selectAllCheckbox).not.toBeNull();
    fireEvent.click(selectAllCheckbox);
    expect(onSelect).toBeCalledTimes(1);
    expect(rowCheckbox).not.toBeNull();
    fireEvent.click(selectAllCheckbox);
    expect(onSelect).toBeCalledTimes(2);
  });

  it('should trigger onDelete on clicking closeButton', () => {
    const onDelete = vi.fn();
    const { queryByTestId, queryAllByTestId } = renderTable({
      isSelectable: true,
      onDelete,
    });
    expect(queryByTestId('table')).not.toBeNull();
    expect(queryAllByTestId('table-row-delete')).toHaveLength(2);
    expect(queryByTestId('table-row-edit')).toBeNull();
    const rowCheckbox = queryAllByTestId('table-row-delete')[0];
    expect(rowCheckbox).not.toBeNull();
    fireEvent.click(rowCheckbox);
    expect(onDelete).toBeCalledTimes(1);
  });

  it('should trigger onEdit on clicking editButton', () => {
    const onEdit = vi.fn();
    const { queryByTestId, queryAllByTestId } = renderTable({
      isSelectable: true,
      onEdit,
    });
    expect(queryByTestId('table')).not.toBeNull();
    expect(queryAllByTestId('table-row-edit')).toHaveLength(2);
    expect(queryByTestId('table-row-delete')).toBeNull();
    const rowCheckbox = queryAllByTestId('table-row-edit')[0];
    expect(rowCheckbox).not.toBeNull();
    fireEvent.click(rowCheckbox);
    expect(onEdit).toBeCalledTimes(1);
  });

  it('should resize column width on ArrowRight key press', () => {
    const { queryAllByRole } = renderTable({
      resizableColumns: true,
    });

    const resizers = queryAllByRole('separator');
    expect(resizers.length).toBe(2);
    expect(resizers[0]).toHaveAttribute('tabIndex', '0');

    resizers[0].focus();
    fireEvent.keyDown(resizers[0], { key: 'ArrowRight' });
  });

  it('should resize column width on ArrowLeft key press', () => {
    const { queryAllByRole } = renderTable({
      resizableColumns: true,
    });

    const resizers = queryAllByRole('separator');
    expect(resizers.length).toBe(2);
    expect(resizers[0]).toHaveAttribute('tabIndex', '0');

    resizers[0].focus();
    fireEvent.keyDown(resizers[0], { key: 'ArrowLeft' });
  });

  it('should default to list mobile layout', () => {
    const { container } = renderTable({});
    const outerContainer = container.querySelector('[data-mobile-layout]');
    expect(outerContainer).toHaveAttribute('data-mobile-layout', 'list');
  });

  it('should set scroll mode when mobileLayout is scroll', () => {
    const { container } = renderTable({ mobileLayout: 'scroll' });
    const outerContainer = container.querySelector('[data-mobile-layout]');
    expect(outerContainer).toHaveAttribute('data-mobile-layout', 'scroll');
  });

  it('should handle column reordering with resizable columns without NaN values', () => {
    const { rerender, queryAllByRole } = renderTable({
      resizableColumns: true,
    });

    let resizers = queryAllByRole('separator');
    expect(resizers.length).toBe(2);

    const reorderedHeaders = [
      { label: 'Country' },
      { label: 'Company' },
      { label: 'Contact' },
    ];

    const reorderedRows = [
      {
        id: 'row-1',
        items: [
          { label: 'Germany' },
          { label: 'Alfreds Futterkiste' },
          { label: 'Maria Anders' },
        ],
      },
      {
        id: 'row-2',
        items: [
          { label: 'Mexico' },
          { label: 'Centro comercial Moctezuma' },
          { label: 'Francisco Chang' },
        ],
      },
    ];

    rerender(
      <Table
        headers={reorderedHeaders}
        rows={reorderedRows}
        data-testid="table"
        resizableColumns
      />
    );

    resizers = queryAllByRole('separator');
    expect(resizers.length).toBe(2);

    resizers[0].focus();

    expect(() => {
      fireEvent.keyDown(resizers[0], { key: 'ArrowRight' });
    }).not.toThrow();

    expect(resizers[0]).toHaveAttribute('tabIndex', '0');
    expect(resizers[1]).toHaveAttribute('tabIndex', '0');
  });
});
