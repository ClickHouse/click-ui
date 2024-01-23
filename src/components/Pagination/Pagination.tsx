import {
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactElement,
  useCallback,
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
  ...props
}: PaginationProps): ReactElement => {
  const hasRowCount = ["number", "string"].includes(typeof rowCount);
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en").format(value);
  };
  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === "ArrowUp" || e.key === "ArrowRight") {
      onChangeProp(currentPage + 1);
    } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
      onChangeProp(currentPage - 1);
    }
  };

  const onChange = (value: string) => {
    onChangeProp(Number(value));
  };

  const onPageSizeChange = (value: string) => {
    if (typeof onPageSizeChangeProp === "function") {
      onPageSizeChangeProp(Number(value));
    }
  };

  const onPrevClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    e => {
      onChangeProp(currentPage - 1);
      if (typeof onPrevPageClick === "function") {
        onPrevPageClick(e);
      }
    },
    [currentPage, onChangeProp, onPrevPageClick]
  );

  const onNextClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    e => {
      onChangeProp(currentPage + 1);
      if (typeof onNextPageClick === "function") {
        onNextPageClick(e);
      }
    },
    [currentPage, onChangeProp, onNextPageClick]
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
      <Container gap="xxs">
        <IconButton
          icon="chevron-left"
          type="ghost"
          disabled={currentPage === 1}
          onClick={onPrevClick}
          data-testid="prev-btn"
        />
        <Container maxWidth="50px">
          <NumberField
            onChange={onChange}
            value={currentPage}
            loading={false}
            onKeyDown={onKeyDown}
            min={1}
            max={totalPages}
            onFocus={onPageNumberFocus}
            onBlur={onPageNumberBlur}
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
          disabled={!!totalPages && currentPage === totalPages}
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
