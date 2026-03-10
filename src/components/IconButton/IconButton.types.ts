import { HTMLAttributes } from 'react';
import type { ImageName } from '@/components/Icon';

export type IconButtonSize = 'default' | 'sm' | 'xs';

export interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  size?: 'default' | 'sm' | 'xs';
  disabled?: boolean;
  type?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'info';
  // TODO: The consumer app seem to expect to use other assets
  // this needs to be investigated why it had type IconName
  // or why consumer was doing it wrong
  icon: ImageName;
}
