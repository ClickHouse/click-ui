import { HTMLAttributes, ReactNode } from 'react';
import type { HorizontalDirection } from '@/types';
import type { IconName } from '@/components/Icon';

export interface SidebarNavigationTitleProps extends HTMLAttributes<HTMLButtonElement> {
  label: ReactNode;
  selected?: boolean;
  icon?: IconName;
  iconDir?: HorizontalDirection;
  type?: 'main' | 'sqlSidebar';
}
