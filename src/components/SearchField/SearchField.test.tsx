import { createRef } from 'react';
import { fireEvent } from '@testing-library/react';
import { SearchField } from '@/components/SearchField';
import { renderCUI } from '@/utils/test-utils';

describe('SearchField', () => {
  it('renders a text input associated with its label', () => {
    const { getByLabelText } = renderCUI(
      <SearchField
        label="Search"
        onChange={vi.fn()}
      />
    );

    expect(getByLabelText('Search')).toBeInTheDocument();
  });

  it('shows the search icon by default', () => {
    const { getByRole, queryByRole } = renderCUI(
      <SearchField
        label="Search"
        onChange={vi.fn()}
      />
    );

    expect(getByRole('img', { name: 'search' })).toBeInTheDocument();
    expect(queryByRole('img', { name: 'filter' })).not.toBeInTheDocument();
  });

  it('shows the filter icon when isFilter is set', () => {
    const { getByRole, queryByRole } = renderCUI(
      <SearchField
        label="Filter"
        isFilter
        onChange={vi.fn()}
      />
    );

    expect(getByRole('img', { name: 'filter' })).toBeInTheDocument();
    expect(queryByRole('img', { name: 'search' })).not.toBeInTheDocument();
  });

  it('calls onChange with the typed value', () => {
    const onChange = vi.fn();
    const { getByLabelText } = renderCUI(
      <SearchField
        label="Search"
        onChange={onChange}
      />
    );

    fireEvent.change(getByLabelText('Search'), { target: { value: 'clickhouse' } });

    expect(onChange).toHaveBeenCalledWith('clickhouse', expect.anything());
  });

  it('shows a clear button by default once there is a value, and clears on click', () => {
    const onChange = vi.fn();
    const { getByRole } = renderCUI(
      <SearchField
        label="Search"
        value="clickhouse"
        onChange={onChange}
      />
    );

    fireEvent.click(getByRole('button', { name: 'clear input' }));

    expect(onChange).toHaveBeenCalledWith('');
  });

  it('does not show a clear button while the field is empty', () => {
    const { queryByRole } = renderCUI(
      <SearchField
        label="Search"
        onChange={vi.fn()}
      />
    );

    expect(queryByRole('button', { name: 'clear input' })).not.toBeInTheDocument();
  });

  it('hides the clear button when clear is false', () => {
    const { queryByRole } = renderCUI(
      <SearchField
        label="Search"
        value="clickhouse"
        clear={false}
        onChange={vi.fn()}
      />
    );

    expect(queryByRole('button', { name: 'clear input' })).not.toBeInTheDocument();
  });

  it('disables the input and the clear button when disabled', () => {
    const { getByLabelText, getByRole } = renderCUI(
      <SearchField
        label="Search"
        value="clickhouse"
        disabled
        onChange={vi.fn()}
      />
    );

    expect(getByLabelText('Search')).toBeDisabled();
    expect(getByRole('button', { name: 'clear input' })).toBeDisabled();
  });

  it('focuses the input when the search icon is clicked', () => {
    const { getByLabelText, getByRole } = renderCUI(
      <SearchField
        label="Search"
        onChange={vi.fn()}
      />
    );

    fireEvent.click(getByRole('img', { name: 'search' }));

    expect(getByLabelText('Search')).toHaveFocus();
  });

  it('forwards the ref to the input', () => {
    const ref = createRef<HTMLInputElement>();
    const { getByLabelText } = renderCUI(
      <SearchField
        label="Search"
        onChange={vi.fn()}
        ref={ref}
      />
    );

    expect(ref.current).toBe(getByLabelText('Search'));
  });
});
