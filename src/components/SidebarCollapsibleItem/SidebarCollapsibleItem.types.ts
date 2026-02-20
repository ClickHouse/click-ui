import { HTMLAttributes, ReactNode } from 'react';
import type { HorizontalDirection } from '@/components/types';
import type { IconName } from '@/components/Icon';

export interface SidebarCollapsibleItemProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
  iconDir?: HorizontalDirection;
  icon?: IconName;
  indicatorDir?: HorizontalDirection;
  selected?: boolean;
  level?: number;
  type?: 'main' | 'sqlSidebar';
}
