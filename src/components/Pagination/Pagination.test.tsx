import { renderCUI } from '@/utils/test-utils';
import { Pagination } from '@/components/Pagination';
import type { PaginationProps } from '@/components/Pagination';
import { fireEvent } from '@testing-library/dom';

describe('Pagination', () => {
  const onChange = vi.fn();
  const renderPagination = (props: PaginationProps) => {
    return renderCUI(<Pagination {...props} />);
  };

  it('render Pagination', () => {
    const { queryByTestId, getByDisplayValue, queryByText } = renderPagination({
      currentPage: 1,
      onChange,
      totalPages: 2,
      rowCount: 200,
      maxRowsPerPageList: [250, 500],
    });
    expect(queryByTestId('prev-btn')).not.toBeNull();
    expect(queryByTestId('next-btn')).not.toBeNull();
    expect(getByDisplayValue('1')).not.toBeNull();
    expect(queryByText('All rows')).not.toBeNull();
    expect(queryByText('200 rows')).not.toBeNull();
  });

  it('disable prev button on first page only', () => {
    const { getByTestId } = renderPagination({
      currentPage: 1,
      onChange,
    });
    const prevBtn = getByTestId('prev-btn');
    expect(prevBtn).toHaveProperty('disabled', true);
  });

  it('disable next button on last page only', () => {
    const { getByTestId } = renderPagination({
      currentPage: 2,
      totalPages: 2,
      onChange,
    });
    const nextBtn = getByTestId('next-btn');
    expect(nextBtn).toHaveProperty('disabled', true);
  });

  it('disable next button when disableNextButton is true', () => {
    const { getByTestId } = renderPagination({
      currentPage: 2,
      totalPages: 3,
      disableNextButton: true,
      onChange,
    });
    const nextBtn = getByTestId('next-btn');
    expect(nextBtn).toHaveProperty('disabled', true);
  });

  it('disable next button on first page if only one page is present', () => {
    const { getByTestId } = renderPagination({
      currentPage: 1,
      totalPages: 1,
      onChange,
    });
    const nextBtn = getByTestId('next-btn');
    expect(nextBtn).toHaveProperty('disabled', true);
  });

  const typePageNumber = (pageInput: HTMLElement, value: string) => {
    fireEvent.input(pageInput, {
      target: {
        value,
      },
    });
  };

  it('does not call onChange while the page number is being typed', () => {
    const onChange = vi.fn();
    const { getByDisplayValue } = renderPagination({
      currentPage: 1,
      totalPages: 10,
      onChange,
    });
    const pageInput = getByDisplayValue('1');
    typePageNumber(pageInput, '');
    typePageNumber(pageInput, '3');
    expect(onChange).not.toHaveBeenCalled();
    expect(pageInput).toHaveValue(3);
  });

  it('calls onChange with the typed page on Enter', () => {
    const onChange = vi.fn();
    const { getByDisplayValue } = renderPagination({
      currentPage: 1,
      totalPages: 10,
      onChange,
    });
    const pageInput = getByDisplayValue('1');
    typePageNumber(pageInput, '3');
    fireEvent.keyDown(pageInput, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('calls onChange with the typed page on blur', () => {
    const onChange = vi.fn();
    const onPageNumberBlur = vi.fn();
    const { getByDisplayValue } = renderPagination({
      currentPage: 1,
      totalPages: 10,
      onChange,
      onPageNumberBlur,
    });
    const pageInput = getByDisplayValue('1');
    typePageNumber(pageInput, '3');
    fireEvent.focusOut(pageInput);
    expect(onChange).toHaveBeenCalledWith(3);
    expect(onPageNumberBlur).toHaveBeenCalledTimes(1);
  });

  it('restores the current page on Escape', () => {
    const onChange = vi.fn();
    const { getByDisplayValue } = renderPagination({
      currentPage: 1,
      totalPages: 10,
      onChange,
    });
    const pageInput = getByDisplayValue('1');
    typePageNumber(pageInput, '3');
    fireEvent.keyDown(pageInput, { key: 'Escape' });
    expect(pageInput).toHaveValue(1);
    fireEvent.focusOut(pageInput);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should not call onChange when input is less than 1', () => {
    const onChange = vi.fn();
    const { getByDisplayValue } = renderPagination({
      currentPage: 1,
      onChange,
    });
    const pageInput = getByDisplayValue('1');
    typePageNumber(pageInput, '0');
    fireEvent.keyDown(pageInput, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledTimes(0);
    expect(pageInput).toHaveValue(1);
  });

  it('should not call onChange when input is cleared', () => {
    const onChange = vi.fn();
    const { getByDisplayValue } = renderPagination({
      currentPage: 1,
      onChange,
    });
    const pageInput = getByDisplayValue('1');
    typePageNumber(pageInput, '');
    fireEvent.focusOut(pageInput);
    expect(onChange).not.toHaveBeenCalled();
    expect(pageInput).toHaveValue(1);
  });

  it('should not call onChange when input is greater than totalPages', () => {
    const onChange = vi.fn();
    const { getByDisplayValue } = renderPagination({
      currentPage: 99,
      totalPages: 100,
      onChange,
    });
    const pageInput = getByDisplayValue('99');
    typePageNumber(pageInput, '100');
    fireEvent.keyDown(pageInput, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledTimes(1);
    typePageNumber(pageInput, '101');
    fireEvent.keyDown(pageInput, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('santizes inputs so that decimals become integers', () => {
    const onChange = vi.fn();
    const { getByDisplayValue } = renderPagination({
      currentPage: 1,
      onChange,
    });
    const pageInput = getByDisplayValue('1');
    typePageNumber(pageInput, '2.3');
    fireEvent.keyDown(pageInput, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('should call onPageSizeChange when pageSize option are selected', () => {
    const onPageSizeChange = vi.fn();
    const { getByText } = renderPagination({
      currentPage: 1,
      onChange,
      onPageSizeChange,
      maxRowsPerPageList: [250, 500],
    });
    const selector = getByText('All rows');
    fireEvent.click(selector);
    expect(getByText('250 rows')).not.toBeNull();
    fireEvent.click(getByText('250 rows'));
    expect(onPageSizeChange).toHaveBeenCalledTimes(1);
  });

  it('accepts a readonly maxRowsPerPageList', () => {
    const maxRowsPerPageList = [250, 500] as const;
    const { getByText } = renderPagination({
      currentPage: 1,
      onChange,
      maxRowsPerPageList,
    });
    fireEvent.click(getByText('All rows'));

    expect(getByText('250 rows')).toBeInTheDocument();
    expect(getByText('500 rows')).toBeInTheDocument();
  });

  it('should disable input if the left and right button are disabled', () => {
    const onChange = vi.fn();
    const { getByDisplayValue } = renderPagination({
      currentPage: 1,
      totalPages: 1,
      onChange,
    });
    const pageInput = getByDisplayValue('1');
    expect(pageInput).toHaveProperty('disabled', true);
    typePageNumber(pageInput, '2');
    fireEvent.keyDown(pageInput, { key: 'Enter' });
    expect(onChange).not.toHaveBeenCalled();
  });

  it("should not show `All rows` in the page sizes if it's disabled", async () => {
    const onPageSizeChange = vi.fn();
    const { getByText, queryByText } = renderPagination({
      currentPage: 1,
      onChange,
      onPageSizeChange,
      maxRowsPerPageList: [250, 500],
      allowAllRows: false,
    });
    expect(queryByText('All rows')).not.toBeInTheDocument();

    await vi.waitFor(() => {
      fireEvent.click(getByText('250 rows'));
      fireEvent.click(getByText('500 rows'));
      expect(onPageSizeChange).toHaveBeenCalledTimes(1);
    });
  });
});
