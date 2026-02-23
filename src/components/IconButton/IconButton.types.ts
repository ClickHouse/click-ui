import { HTMLAttributes } from 'react';
import type { IconName } from '@/components/Icon';

export interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  size?: 'default' | 'sm' | 'xs';
  disabled?: boolean;
  type?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'info';
  icon: IconName;
}
