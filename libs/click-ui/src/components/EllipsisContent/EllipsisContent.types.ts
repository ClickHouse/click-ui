import { ElementType } from 'react';

export interface EllipsisContentProps<T extends ElementType = 'div'> {
  component?: T;
}
