import { KeyboardEventHandler, ReactElement } from "react";
import {
  Container,
  ContainerProps,
  IconButton,
  NumberField,
  Select,
  Text,
} from "@/components";
import styled from "styled-components";

export interface PaginationProps extends Omit<ContainerProps, "children" | "onChange"> {
  totalPages?: number;
  currentPage: number;
  options?: Array<number>;
  rowCount?: number | string;
  onChange: (pageNumber: number) => void;
  onPageSizeChange?: (pageNumber: number) => void;
  pageSize?: number;
}
const CustomSelect = styled.div`
  width: 150px;
`;

export const Pagination = ({
  totalPages,
  currentPage,
  options = [],
  rowCount,
  onChange: onChangeProp,
  onPageSizeChange: onPageSizeChangeProp,
  pageSize = -1,
  ...props
}: PaginationProps): ReactElement => {
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

  return (
    <Container
      gap="md"
      justifyContent={rowCount || options.length > 0 ? "space-between" : "center"}
      {...props}
    >
      {["number", "string"].includes(typeof rowCount) && (
        <Text component="div">{rowCount} rows</Text>
      )}
      <Container gap="md">
        <IconButton
          icon="chevron-left"
          type="ghost"
          disabled={currentPage === 1}
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
          />
        </Container>
        {!!totalPages && <Text component="div">of {totalPages}</Text>}
        <IconButton
          icon="chevron-right"
          type="ghost"
          disabled={!!totalPages && currentPage === totalPages}
          data-testid="next-btn"
        />
      </Container>
      {options.length > 0 && (
        <CustomSelect
          as={Select}
          onSelect={onPageSizeChange}
          value={pageSize.toString()}
        >
          <Select.Item value="-1">All rows</Select.Item>
          {options.map(option => (
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
