import { ElementType, ReactEventHandler } from 'react';
import type { IconName } from '@/components/Icon/Icon.types';
import type { TextSize, TextWeight } from '@/components/Text';

export interface LinkProps<T extends ElementType = 'a'> {
  size?: TextSize;
  weight?: TextWeight;
  onClick?: ReactEventHandler;
  /** Link text. */
  children?: React.ReactNode;
  /** Icon shown after the text. */
  icon?: IconName;
  /** Element or component to render instead of `a`. */
  component?: T;
}
