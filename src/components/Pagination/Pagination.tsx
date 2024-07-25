import {
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactElement,
  useCallback,
  useRef,
} from "react";
import {
  Container,
  ContainerProps,
  IconButton,
  NumberField,
  Select,
  Text,
} from "@/components";
import styled from "styled-components";

export interface PaginationProps
  extends Omit<ContainerProps<"div">, "children" | "onChange"> {
  totalPages?: number;
  currentPage: number;
  maxRowsPerPageList?: Array<number>;
  rowCount?: number | string;
  onChange: (pageNumber: number) => void;
  onPageSizeChange?: (pageNumber: number) => void;
  pageSize?: number;
  onNextPageClick?: MouseEventHandler<HTMLButtonElement>;
  onPrevPageClick?: MouseEventHandler<HTMLButtonElement>;
  onPageNumberFocus?: FocusEventHandler<HTMLInputElement>;
  onPageNumberBlur?: FocusEventHandler<HTMLInputElement>;
  disableNextButton?: boolean;
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

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
    const isInputEnabled = !inputRef.current?.disabled;
    if (
      (e.key === "ArrowUp" || e.key === "ArrowRight") &&
      isInputEnabled &&
      !rightButtonDisabled
    ) {
      onChangeProp(currentPage + 1);
    } else if (
      (e.key === "ArrowDown" || e.key === "ArrowLeft") &&
      isInputEnabled &&
      !leftButtonDisabled
    ) {
      const newPage = currentPage - 1;
      if (newPage > 0) {
        onChangeProp(newPage);
      }
    }
  };

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
            onKeyDown={onKeyDown}
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
          <Select.Item value="-1">All rows</Select.Item>
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
