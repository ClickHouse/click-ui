import { HTMLAttributes, ReactNode } from 'react';
import type { HorizontalDirection } from '@/types';
import type { ImageName } from '@/components/Icon';

export interface SidebarNavigationItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Required unless `asChild` is set; with `asChild` the child link's own content is the label. */
  label?: ReactNode;
  selected?: boolean;
  disabled?: boolean;
  level?: number;
  // TODO: The consumer app seem to expect to use Logos
  // this needs to be investigated why its called icon
  icon?: ImageName;
  iconDir?: HorizontalDirection;
  type?: 'main' | 'sqlSidebar';
  /** Renders the child link (e.g. a router `Link`) as the item, so it receives the selected and disabled state. */
  asChild?: boolean;
}
