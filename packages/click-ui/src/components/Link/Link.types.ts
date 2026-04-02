import { ElementType, ReactEventHandler } from 'react';
import type { IconName } from '@/components/Icon/Icon.types';
import type { TextSize, TextWeight } from '@/components/Text';

export interface LinkProps<T extends ElementType = 'a'> {
  size?: TextSize;
  weight?: TextWeight;
  onClick?: ReactEventHandler;
  children?: React.ReactNode;
  icon?: IconName;
  component?: T;
}
