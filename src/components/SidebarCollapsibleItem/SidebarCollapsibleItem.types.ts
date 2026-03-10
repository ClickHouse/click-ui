import { HTMLAttributes, ReactNode } from 'react';
import type { HorizontalDirection } from '@/types';
import type { ImageName } from '@/components/Icon';

export interface SidebarCollapsibleItemProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
  iconDir?: HorizontalDirection;
  // TODO: The consumer app seem to expect to use other assets
  // this needs to be investigated why it had type IconName
  icon?: ImageName;
  indicatorDir?: HorizontalDirection;
  selected?: boolean;
  level?: number;
  type?: 'main' | 'sqlSidebar';
}
