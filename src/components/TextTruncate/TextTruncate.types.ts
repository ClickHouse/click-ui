import { ElementType } from 'react';

export interface TextTruncateProps<T extends ElementType = 'span'> {
  /** Element or component to render as. Defaults to `span`, displayed as a block. */
  component?: T;
  className?: string;
}
