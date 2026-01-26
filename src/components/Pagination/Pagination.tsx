import {
  FocusEventHandler,
  MouseEventHandler,
  ReactElement,
  useCallback,
  useRef,
} from "react";
import { Container } from "@/components/Container/Container";
import type { ContainerProps } from "@/components/Container/Container";
import { IconButton } from "@/components/IconButton/IconButton";
import { NumberField } from "@/components/Input/NumberField";
import { Select } from "@/components/Select/SingleSelect";
import { Text } from "@/components/Typography/Text/Text";
import { styled } from "styled-components";

export interface PaginationProps extends Omit<
  ContainerProps<"div">,
  "children" | "onChange"
> {
  /** Total number of pages available */
  totalPages?: number;
  /** The currently selected page number */
  currentPage: number;
  /** List of options for rows per page dropdown */
  maxRowsPerPageList?: Array<number>;
  /** Total row count to display */
  rowCount?: number | string;
  /** Callback when page number changes */
  onChange: (pageNumber: number) => void;
  /** Callback when page size changes */
  onPageSizeChange?: (pageNumber: number) => void;
  /** Current page size/rows per page */
  pageSize?: number;
  /** Callback when next page button is clicked */
  onNextPageClick?: MouseEventHandler<HTMLButtonElement>;
  /** Callback when previous page button is clicked */
  onPrevPageClick?: MouseEventHandler<HTMLButtonElement>;
  /** Callback when page number input receives focus */
  onPageNumberFocus?: FocusEventHandler<HTMLInputElement>;
  /** Callback when page number input loses focus */
  onPageNumberBlur?: FocusEventHandler<HTMLInputElement>;
  /** Whether to disable the next page button */
  disableNextButton?: boolean;
  /** Whether to show "All rows" option in the dropdown */
  allowAllRows?: boolean;
}
const CustomSelect = styled.div`
  width: 150px;
`;

export const Pagination = ({
  totalPages,
  currentPage,
  maxRowsPerPageList = [],
  rowCount,
  onChange: onChangeProp,
  onPageSizeChange: onPageSizeChangeProp,
  pageSize = -1,
  fillWidth = true,
  gap = "md",
  justifyContent,
  onNextPageClick,
  onPrevPageClick,
  onPageNumberFocus,
  onPageNumberBlur,
  disableNextButton,
  allowAllRows = true,
  ...props
}: PaginationProps): ReactElement => {
  const hasRowCount = ["number", "string"].includes(typeof rowCount);
  const inputRef = useRef<HTMLInputElement>(null);
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en").format(value);
  };
  const leftButtonDisabled = currentPage <= 1;
  const rightButtonDisabled =
    (!!totalPages && currentPage === totalPages) || disableNextButton;

  const onChange = (value: string) => {
    const sanitizedValue = parseInt(value, 10);
    if (
      sanitizedValue < 1 ||
      inputRef.current?.disabled ||
      (typeof totalPages !== "undefined" ? sanitizedValue > totalPages : false)
    ) {
      return;
    }

    onChangeProp(sanitizedValue);
  };

  const onPageSizeChange = (value: string) => {
    if (typeof onPageSizeChangeProp === "function") {
      onPageSizeChangeProp(Number(value));
    }
  };

  const onPrevClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    e => {
      if (leftButtonDisabled) {
        return;
      }

      onChangeProp(currentPage - 1);
      if (typeof onPrevPageClick === "function") {
        onPrevPageClick(e);
      }
    },
    [currentPage, leftButtonDisabled, onChangeProp, onPrevPageClick]
  );

  const onNextClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    e => {
      if (rightButtonDisabled) {
        return;
      }

      onChangeProp(currentPage + 1);
      if (typeof onNextPageClick === "function") {
        onNextPageClick(e);
      }
    },
    [currentPage, onChangeProp, onNextPageClick, rightButtonDisabled]
  );

  // if `allowAllRows` is false we need to switch to the first option in the list
  if (pageSize === -1 && !allowAllRows && maxRowsPerPageList.length > 0) {
    pageSize = maxRowsPerPageList[0];
  }

  return (
    <Container
      gap={gap}
      justifyContent={
        justifyContent ??
        (rowCount || maxRowsPerPageList.length > 0 ? "space-between" : "center")
      }
      fillWidth={fillWidth}
      {...props}
    >
      {hasRowCount && (
        <Text
          component="div"
          color="muted"
          size="sm"
        >
          {typeof rowCount === "number" ? formatNumber(rowCount) : rowCount} rows
        </Text>
      )}
      <Container
        gap="xxs"
        fillWidth={false}
      >
        <IconButton
          icon="chevron-left"
          type="ghost"
          disabled={leftButtonDisabled}
          onClick={onPrevClick}
          data-testid="prev-btn"
        />
        <Container
          maxWidth="50px"
          fillWidth={false}
        >
          <NumberField
            ref={inputRef}
            onChange={onChange}
            value={currentPage}
            loading={false}
            aria-label={currentPage.toString()}
            min={1}
            max={totalPages}
            onFocus={onPageNumberFocus}
            hideControls
            onBlur={onPageNumberBlur}
            disabled={leftButtonDisabled && rightButtonDisabled}
          />
        </Container>
        {!!totalPages && (
          <Text
            component="div"
            color="muted"
            size="sm"
          >
            of {formatNumber(totalPages)}
          </Text>
        )}
        <IconButton
          icon="chevron-right"
          type="ghost"
          disabled={rightButtonDisabled}
          onClick={onNextClick}
          data-testid="next-btn"
        />
      </Container>
      {maxRowsPerPageList.length > 0 && (
        <CustomSelect
          as={Select}
          onSelect={onPageSizeChange}
          value={pageSize.toString()}
        >
          {allowAllRows && <Select.Item value="-1">All rows</Select.Item>}
          {maxRowsPerPageList.map(option => (
            <Select.Item
              key={option}
              value={option.toString()}
            >
              {option} rows
            </Select.Item>
          ))}
        </CustomSelect>
      )}
    </Container>
  );
};
