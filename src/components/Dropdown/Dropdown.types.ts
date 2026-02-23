import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import type { HorizontalDirection } from '@/components/Common';
import type { IconName } from '@/components/Icon/Icon.types';

export interface ArrowProps {
  showArrow?: boolean;
}

export interface DropdownItemProps extends DropdownMenu.DropdownMenuItemProps {
  icon?: IconName;
  iconDir?: HorizontalDirection;
}
