import { HTMLAttributes, ReactNode } from 'react';
import type { HorizontalDirection } from '@/types';
import type { ImageName } from '@/components/Icon';

export interface SidebarNavigationItemProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  selected?: boolean;
  disabled?: boolean;
  level?: number;
  // TODO: The consumer app seem to expect to use Logos
  // this needs to be investigated why its called icon
  icon?: ImageName;
  iconDir?: HorizontalDirection;
  type?: 'main' | 'sqlSidebar';
}
