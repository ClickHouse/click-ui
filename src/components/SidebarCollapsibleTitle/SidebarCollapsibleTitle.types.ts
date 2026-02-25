import { ReactNode } from 'react';
import type { HorizontalDirection } from '@/types';
import type { IconName } from '@/components/Icon';

export interface SidebarCollapsibleTitleProps extends React.HTMLAttributes<HTMLButtonElement> {
  label: ReactNode;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
  iconDir?: HorizontalDirection;
  icon?: IconName;
  selected?: boolean;
  type?: 'main' | 'sqlSidebar';
}
