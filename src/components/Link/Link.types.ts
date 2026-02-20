import { ElementType, ReactEventHandler } from 'react';
import type { IconName } from '@/components/Icon/types';
import type { TextSize, TextWeight } from '@/components/Common';

export interface LinkProps<T extends ElementType = 'a'> {
  size?: TextSize;
  weight?: TextWeight;
  onClick?: ReactEventHandler;
  children?: React.ReactNode;
  icon?: IconName;
  component?: T;
}
