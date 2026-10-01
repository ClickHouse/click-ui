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
  // TODO: The type prop ('primary' | 'secondary') shadows the native <button type="submit|reset|button"> attribute. Since type is destructured before ...props, consumers can never pass type="submit" for form submission. Consider renaming the visual variant prop to variant in the next major. This is a public API problem!
  /** The visual style variant of the button */
  type?: ButtonType;
  // TODO: A workaround to fix native prop shadowing by the `type` prop. Refactor in the next major update.
  /** Used for native button type attribute on the primary action button */
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled?: boolean;
  fillWidth?: boolean;
  menu: Array<Menu>;
  side?: 'top' | 'bottom';
  icon?: IconName;
  iconDir?: HorizontalDirection;
}
