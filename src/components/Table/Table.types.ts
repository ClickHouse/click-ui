import { HTMLAttributes, ReactNode } from 'react';
import type { HorizontalDirection } from '@/components/types';

type SortDir = 'asc' | 'desc';
type TableSize = 'sm' | 'md';
type OverflowMode = 'truncated' | 'truncate-middle' | 'wrap';

export interface TableColumnConfigProps extends HTMLAttributes<HTMLTableCellElement> {
  label: ReactNode;
  isSortable?: boolean;
  sortDir?: SortDir;
  sortPosition?: HorizontalDirection;
  width?: string;
  overflowMode?: OverflowMode;
  resizable?: boolean;
}

export type TableHeaderType = TableColumnConfigProps;

export interface TableProps {
  columns: Array<TableColumnConfigProps>;
  data: Array<Record<string, ReactNode>>;
  size?: TableSize;
}
