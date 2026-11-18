import { FocusEventHandler, MouseEventHandler } from 'react';
import type { ContainerProps } from '@/components/Container';

export type PaginationPageNumberMode = 'input' | 'text';

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
  /** Not called when `pageNumberMode` is `text`. */
  onPageNumberFocus?: FocusEventHandler<HTMLInputElement>;
  /** Not called when `pageNumberMode` is `text`. */
  onPageNumberBlur?: FocusEventHandler<HTMLInputElement>;
  disableNextButton?: boolean;
  /** Adds an "All rows" option to the rows-per-page select. */
  allowAllRows?: boolean;
  /** `text` shows the page number as text, so the page changes only through the previous and next buttons, and `onPageNumberFocus` and `onPageNumberBlur` aren't called. Defaults to `input`. */
  pageNumberMode?: PaginationPageNumberMode;
}
