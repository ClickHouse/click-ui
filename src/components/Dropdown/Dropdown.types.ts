import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import type { HorizontalDirection } from '@/types';
import type { IconName } from '@/components/Icon/Icon.types';
import type { IconWrapperProps } from '@/components/IconWrapper/IconWrapper.types';

export interface ArrowProps {
  showArrow?: boolean;
}

export interface DropdownItemProps extends DropdownMenu.DropdownMenuItemProps {
  /** Icon to display in the menu item */
  icon?: IconName;
  /** The direction of the icon relative to the label */
  iconDir?: HorizontalDirection;
  /** The type of the menu item */
  type?: 'default' | 'danger';
  /**
   * Positions the tooltip shown when the label is truncated. Defaults to
   * `side: 'right'` so the tooltip does not cover the items above it.
   */
  tooltipProps?: IconWrapperProps['tooltipProps'];
}
