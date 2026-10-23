import { FocusEventHandler, MouseEventHandler } from 'react';
import type { ContainerProps } from '@/components/Container';

export interface PaginationProps extends Omit<
  ContainerProps<'div'>,
  'children' | 'onChange'
> {
  totalPages?: number;
  currentPage: number;
  /** Options for the rows-per-page select. */
  maxRowsPerPageList?: readonly number[];
  /** Total row count, shown as "N rows". */
  rowCount?: number | string;
  onChange: (pageNumber: number) => void;
  /** Called with the new page size. */
  onPageSizeChange?: (pageNumber: number) => void;
  pageSize?: number;
  onNextPageClick?: MouseEventHandler<HTMLButtonElement>;
  onPrevPageClick?: MouseEventHandler<HTMLButtonElement>;
  onPageNumberFocus?: FocusEventHandler<HTMLInputElement>;
  onPageNumberBlur?: FocusEventHandler<HTMLInputElement>;
  disableNextButton?: boolean;
  /** Adds an "All rows" option to the rows-per-page select. */
  allowAllRows?: boolean;
}
