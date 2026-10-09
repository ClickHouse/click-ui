import { ElementType } from 'react';
import type { TooltipContentProps } from '@/components/Tooltip/Tooltip.types';

/**
 * @deprecated Use `TextTruncateProps` instead. This type will be removed in a future version.
 */
export interface EllipsisContentProps<T extends ElementType = 'div'> {
  component?: T;
  /**
   * Positions the tooltip shown when the content is truncated, e.g.
   * `{ side: 'right' }` to keep it clear of the content above it.
   */
  tooltipProps?: Pick<TooltipContentProps, 'side' | 'align' | 'sideOffset'>;
}
