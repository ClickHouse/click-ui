import { HTMLAttributes, ReactElement, ReactNode } from 'react';
import type {
  ItemInterface,
  ReactSortableProps,
  Sortable,
  Store,
} from 'react-sortablejs';
import type { IconName } from '@/components/Icon/Icon.types';

export type FileTabStatusType =
  | 'default'
  | 'success'
  | 'neutral'
  | 'danger'
  | 'warning'
  | 'info';

export interface FileTabProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  onClose?: () => void;
  index: number;
  status?: FileTabStatusType;
  icon?: IconName | ReactNode;
  text: string;
  /** Prefix for `data-testid`: the tab gets `<testId>-<index>`. */
  testId?: string;
  /** Shows the tab as a preview, in italics. */
  preview?: boolean;
}

export interface FileTabsProps extends Omit<
  ReactSortableProps<ItemInterface>,
  'onSelect' | 'list' | 'setList'
> {
  selectedIndex?: number;
  /** `FileTabs.Tab` elements. */
  children: ReactElement<FileTabProps> | ReactElement<FileTabProps>[];
  /** Called when a tab is dragged to a new position. */
  onReorderTab: (sourcePosition: number, destinationPosition: number) => void;
  onClose: (index: number) => void;
  onSelect: (index: number) => void;
  /** Sortable items, one per tab. Built from `children` when omitted. */
  list?: ItemInterface[];
  /** Setter for a controlled `list`. */
  setList?: (newState: ItemInterface[], sortable: Sortable | null, store: Store) => void;
}
