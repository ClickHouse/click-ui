import { HTMLAttributes, ReactNode } from 'react';
import { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';
import type { HorizontalDirection } from '@/types';
import type { IconName } from '@/components/Icon';

export type ButtonType = 'primary' | 'secondary';

type MenuItem = {
  icon?: IconName;
  iconDir?: HorizontalDirection;
  label: ReactNode;
  type?: 'item';
  items?: never;
} & Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'>;

type MenuGroup = {
  icon?: never;
  iconDir?: never;
  label?: never;
  type: 'group';
  items: Array<MenuItem | SubMenu>;
};

type SubMenu = Omit<MenuItem, 'type' | 'items'> & {
  items: Array<MenuGroup | MenuItem>;
  type: 'sub-menu';
};

export type Menu = SubMenu | MenuGroup | MenuItem;

export interface SplitButtonProps
  extends DropdownMenuProps, Omit<HTMLAttributes<HTMLButtonElement>, 'dir' | 'style'> {
  type?: ButtonType;
  disabled?: boolean;
  fillWidth?: boolean;
  menu: Array<Menu>;
  side?: 'top' | 'bottom';
  icon?: IconName;
  iconDir?: HorizontalDirection;
}
