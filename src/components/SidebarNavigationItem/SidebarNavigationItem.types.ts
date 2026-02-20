import { HTMLAttributes, ReactNode } from 'react';
import type { HorizontalDirection } from '@/components/types';
import type { IconName } from '@/components/Icon';

export interface SidebarNavigationItemProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  selected?: boolean;
  disabled?: boolean;
  level?: number;
  icon?: IconName;
  iconDir?: HorizontalDirection;
  type?: 'main' | 'sqlSidebar';
}
