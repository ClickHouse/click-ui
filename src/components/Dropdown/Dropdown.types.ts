import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import type { ReactElement, ReactNode } from 'react';
import type { HorizontalDirection } from '@/types';
import type { IconName } from '@/components/Icon/Icon.types';
import type { IconWrapperProps } from '@/components/IconWrapper/IconWrapper.types';

export interface ArrowProps {
  showArrow?: boolean;
}

interface DropdownItemBaseProps extends Omit<
  DropdownMenu.DropdownMenuItemProps,
  'asChild' | 'children'
> {
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

interface DropdownItemContentProps extends DropdownItemBaseProps {
  asChild?: false;
  children?: ReactNode;
}

interface DropdownItemAsChildProps extends DropdownItemBaseProps {
  /** Renders the single child element (for example an `<a>`) as the menu item, with the icon and label inside it. */
  asChild: true;
  children: ReactElement;
}

export type DropdownItemProps = DropdownItemContentProps | DropdownItemAsChildProps;
