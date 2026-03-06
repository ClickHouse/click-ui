import { FocusEventHandler, MouseEventHandler } from 'react';
import type { ContainerProps } from '@/components/Container';

export interface PaginationProps extends Omit<
  ContainerProps<'div'>,
  'children' | 'onChange'
> {
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
  allowAllRows?: boolean;
}
