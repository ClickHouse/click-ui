import { HTMLAttributes, ReactElement, MouseEvent } from 'react';
import type { IconName } from '@/components/Icon/Icon.types';

export type FileTabStatusType =
  | 'default'
  | 'success'
  | 'neutral'
  | 'danger'
  | 'warning'
  | 'info';

export interface FileTabProps extends HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  children: ReactElement;
  icon?: IconName;
  iconDir?: 'start' | 'end';
  onClose?: (e: MouseEvent<HTMLButtonElement>) => void;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  status?: FileTabStatusType;
  value: string;
  showClose?: boolean;
  isLoading?: boolean;
}

export interface FileTabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  children: ReactElement<FileTabProps> | Array<ReactElement<FileTabProps>>;
  onReorder?: (values: Array<string>) => void;
  value?: string;
  onChange?: (value: string) => void;
  sortable?: boolean;
}
