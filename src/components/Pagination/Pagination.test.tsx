import { renderCUI } from "@/utils/test-utils";
import { Pagination, PaginationProps } from "@/components";
import { fireEvent } from "@testing-library/dom";

describe("Pagination", () => {
  const onChange = vi.fn();
  const renderPagination = (props: PaginationProps) => {
    return renderCUI(<Pagination {...props} />);
  };

  it("render Pagination", () => {
    const { queryByTestId, getByDisplayValue, queryByText } = renderPagination({
      currentPage: 1,
      onChange,
      totalPages: 2,
      rowCount: 200,
      maxRowsPerPageList: [250, 500],
    });
    expect(queryByTestId("prev-btn")).not.toBeNull();
    expect(queryByTestId("next-btn")).not.toBeNull();
    expect(getByDisplayValue("1")).not.toBeNull();
    expect(queryByText("All rows")).not.toBeNull();
    expect(queryByText("200 rows")).not.toBeNull();
  });

  it("disable prev button on first page only", () => {
    const { getByTestId } = renderPagination({
      currentPage: 1,
      onChange,
    });
    const prevBtn = getByTestId("prev-btn");
    expect(prevBtn).toHaveProperty("disabled", true);
  });

  it("disable next button on last page only", () => {
    const { getByTestId } = renderPagination({
      currentPage: 2,
      totalPages: 2,
      onChange,
    });
    const nextBtn = getByTestId("next-btn");
    expect(nextBtn).toHaveProperty("disabled", true);
  });

  it("disable next button when disableNextButton is true", () => {
    const { getByTestId } = renderPagination({
      currentPage: 2,
      totalPages: 3,
      disableNextButton: true,
      onChange,
    });
    const nextBtn = getByTestId("next-btn");
    expect(nextBtn).toHaveProperty("disabled", true);
  });

  it("disable next button on first page if only one page is present", () => {
    const { getByTestId } = renderPagination({
      currentPage: 1,
      totalPages: 1,
      onChange,
    });
    const nextBtn = getByTestId("next-btn");
    expect(nextBtn).toHaveProperty("disabled", true);
  });

  it("should call onChange when input is changed", () => {
    const { getByDisplayValue } = renderPagination({
      currentPage: 1,
      onChange,
    });
    const pageInput = getByDisplayValue("1");
    fireEvent.input(pageInput, {
      target: {
        value: "2",
      },
    });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("should not call onChange when input is less than 1", () => {
    const onChange = vi.fn();
    const { getByDisplayValue } = renderPagination({
      currentPage: 1,
      onChange,
    });
    const pageInput = getByDisplayValue("1");
    fireEvent.input(pageInput, {
      target: {
        value: "0",
      },
    });
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  it("should not call onChange when input is greater than totalPages", () => {
    const onChange = vi.fn();
    const { getByDisplayValue } = renderPagination({
      currentPage: 99,
      totalPages: 100,
      onChange,
    });
    const pageInput = getByDisplayValue("99");
    fireEvent.input(pageInput, {
      target: {
        value: "100",
      },
    });
    expect(onChange).toHaveBeenCalledTimes(1);
    fireEvent.input(pageInput, {
      target: {
        value: "101",
      },
    });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("santizes inputs so that decimals become integers", () => {
    const { getByDisplayValue } = renderPagination({
      currentPage: 1,
      onChange,
    });
    const pageInput = getByDisplayValue("1");
    fireEvent.input(pageInput, {
      target: {
        value: "1.3",
      },
    });
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it("should call onPageSizeChange when pageSize option are selected", () => {
    const onPageSizeChange = vi.fn();
    const { getByText } = renderPagination({
      currentPage: 1,
      onChange,
      onPageSizeChange,
      maxRowsPerPageList: [250, 500],
    });
    const selector = getByText("All rows");
    fireEvent.click(selector);
    expect(getByText("250 rows")).not.toBeNull();
    fireEvent.click(getByText("250 rows"));
    expect(onPageSizeChange).toBeCalledTimes(1);
  });

  it("should disable input if the left and right button are disabled", () => {
    const onChange = vi.fn();
    const { getByDisplayValue } = renderPagination({
      currentPage: 1,
      totalPages: 1,
      onChange,
    });
    const pageInput = getByDisplayValue("1");
    expect(pageInput).toHaveProperty("disabled", true);
    fireEvent.input(pageInput, {
      target: {
        value: "2",
      },
    });
    expect(onChange).not.toHaveBeenCalled();
  });
});
