import { fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Table, TableProps } from '@/components/Table';
import { renderCUI } from '@/utils/test-utils';

const headers = [{ label: 'Company' }, { label: 'Contact' }, { label: 'Country' }];

const headersWithWidths = [
  { label: 'Company', width: '100px' },
  { label: 'Contact', width: '200px' },
  { label: 'Country', width: '300px' },
];

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

  it('accepts readonly headers, rows and selectedIds', () => {
    const readonlyHeaders = [{ label: 'Company' }] as const;
    // Only the outer array is readonly: `TableRowType.items` stays mutable on purpose.
    const readonlyRows = Object.freeze([
      { id: 'row-1', items: [{ label: 'Alfreds Futterkiste' }] },
      { id: 'row-2', items: [{ label: 'Centro comercial Moctezuma' }] },
    ]);
    const selectedIds = ['row-1'] as const;
    const { getByRole, getByText, getAllByRole } = renderCUI(
      <Table
        headers={readonlyHeaders}
        rows={readonlyRows}
        isSelectable
        selectedIds={selectedIds}
      />
    );

    expect(getByRole('columnheader', { name: 'Company' })).toBeInTheDocument();
    expect(getByText('Alfreds Futterkiste')).toBeInTheDocument();
    expect(getAllByRole('checkbox', { checked: true })).toHaveLength(1);
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

  it('renders row action buttons with type="button" so they do not submit a form', () => {
    const { queryAllByTestId } = renderTable({
      isSelectable: true,
      onEdit: vi.fn(),
      onDelete: vi.fn(),
    });
    [
      ...queryAllByTestId('table-row-edit'),
      ...queryAllByTestId('table-row-delete'),
    ].forEach(button => expect(button).toHaveAttribute('type', 'button'));
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

  it('should render configured column widths if the header is visible', () => {
    const { container } = renderCUI(
      <Table
        headers={headersWithWidths}
        rows={rows}
      />
    );
    const columns = container.querySelectorAll('col');

    expect(container.querySelector('colgroup')).not.toBeNull();
    expect(Array.from(columns).map(column => column.getAttribute('width'))).toEqual([
      '100px',
      '200px',
      '300px',
    ]);
  });

  it('should render configured column widths if the header is hidden', () => {
    const { container } = renderCUI(
      <Table
        headers={headersWithWidths}
        rows={rows}
        showHeader={false}
      />
    );
    const columns = container.querySelectorAll('col');

    expect(container.querySelector('thead')).toBeNull();
    expect(container.querySelector('colgroup')).not.toBeNull();
    expect(Array.from(columns).map(column => column.getAttribute('width'))).toEqual([
      '100px',
      '200px',
      '300px',
    ]);
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

  describe('sortable headers', () => {
    const sortableHeaders = [
      { label: 'Company', isSortable: true, sortDir: 'asc' as const },
      { label: 'Contact', isSortable: true },
      { label: 'Country' },
    ];

    it('renders sortable headers as buttons named after the label', () => {
      const { getByRole } = renderCUI(
        <Table
          headers={sortableHeaders}
          rows={rows}
          onSort={vi.fn()}
        />
      );

      expect(getByRole('button', { name: 'Company' })).toBeInTheDocument();
      expect(getByRole('button', { name: 'Contact' })).toBeInTheDocument();
      const country = getByRole('columnheader', { name: 'Country' });
      expect(within(country).queryByRole('button')).toBeNull();
    });

    it('renders no header button when onSort is missing', () => {
      const { getAllByRole } = renderCUI(
        <Table
          headers={sortableHeaders}
          rows={rows}
        />
      );

      getAllByRole('columnheader').forEach(header => {
        expect(within(header).queryByRole('button')).toBeNull();
      });
    });

    it('is reachable with Tab and sorts with Enter and Space', async () => {
      const user = userEvent.setup();
      const onSort = vi.fn();
      const { getByRole } = renderCUI(
        <Table
          headers={sortableHeaders}
          rows={rows}
          onSort={onSort}
        />
      );

      await user.tab();
      expect(getByRole('button', { name: 'Company' })).toHaveFocus();

      await user.keyboard('{Enter}');
      expect(onSort).toHaveBeenCalledTimes(1);
      expect(onSort).toHaveBeenLastCalledWith('desc', sortableHeaders[0], 0);

      await user.tab();
      expect(getByRole('button', { name: 'Contact' })).toHaveFocus();

      await user.keyboard(' ');
      expect(onSort).toHaveBeenCalledTimes(2);
      expect(onSort).toHaveBeenLastCalledWith('asc', sortableHeaders[1], 1);
    });

    it('exposes aria-sort on the sorted column only', () => {
      const { getByRole } = renderCUI(
        <Table
          headers={sortableHeaders}
          rows={rows}
          onSort={vi.fn()}
        />
      );

      expect(getByRole('columnheader', { name: 'Company' })).toHaveAttribute(
        'aria-sort',
        'ascending'
      );
      expect(getByRole('columnheader', { name: 'Contact' })).not.toHaveAttribute(
        'aria-sort'
      );
      expect(getByRole('columnheader', { name: 'Country' })).not.toHaveAttribute(
        'aria-sort'
      );
    });

    it('maps a descending sortDir to aria-sort="descending"', () => {
      const { getByRole } = renderCUI(
        <Table
          headers={[{ label: 'Company', isSortable: true, sortDir: 'desc' }]}
          rows={[]}
          onSort={vi.fn()}
        />
      );

      expect(getByRole('columnheader', { name: 'Company' })).toHaveAttribute(
        'aria-sort',
        'descending'
      );
    });
  });

  it('names the header button with a consumer aria-label', () => {
    const { getByRole } = renderCUI(
      <Table
        headers={[{ label: 'Company', isSortable: true, 'aria-label': 'Company name' }]}
        rows={[]}
        onSort={vi.fn()}
      />
    );

    expect(getByRole('button', { name: 'Company name' })).toBeInTheDocument();
    expect(getByRole('columnheader', { name: 'Company name' })).toBeInTheDocument();
  });

  it('reports the column width and range on the resizer and updates it on ArrowRight', () => {
    const rect = vi
      .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockReturnValue({ width: 200 } as DOMRect);

    try {
      const { getAllByRole } = renderTable({ resizableColumns: true });
      const resizer = getAllByRole('separator')[0];

      expect(resizer).toHaveAttribute('tabIndex', '0');
      expect(resizer).toHaveAttribute('aria-valuenow', '200');
      expect(resizer).toHaveAttribute('aria-valuemin', '120');
      expect(resizer).toHaveAttribute('aria-valuemax', '280');
      expect(resizer).toHaveAttribute('aria-valuetext', '200 pixels');

      fireEvent.keyDown(resizer, { key: 'ArrowRight' });

      expect(resizer).toHaveAttribute('aria-valuenow', '202');
      expect(resizer).toHaveAttribute('aria-valuetext', '202 pixels');
      expect(resizer).toHaveAttribute('aria-valuemax', '280');
    } finally {
      rect.mockRestore();
    }
  });
});
