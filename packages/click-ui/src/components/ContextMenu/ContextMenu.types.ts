import * as RightMenu from '@radix-ui/react-context-menu';
import type { HorizontalDirection } from '@/types';
import type { IconName } from '@/components/Icon/Icon.types';

export interface ArrowProps {
  showArrow?: boolean;
}

export interface ContextMenuItemProps extends RightMenu.ContextMenuItemProps {
  icon?: IconName;
  iconDir?: HorizontalDirection;
  type?: 'default' | 'danger';
}
