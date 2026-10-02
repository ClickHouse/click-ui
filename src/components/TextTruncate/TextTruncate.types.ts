import { ElementType, ReactNode } from 'react';
import type { TooltipContentProps } from '@/components/Tooltip/Tooltip.types';

export type TextTruncateEllipsisPosition = 'end' | 'middle';

interface TextTruncateBaseProps<T extends ElementType> {
  /** Element or component to render as, shown as a block. Defaults to `span`; a component must forward `ref` and spread props. */
  component?: T;
  /** Caps the width with any CSS length, e.g. `'160px'` or `'20ch'`. */
  maxWidth?: string;
  /** Shows the full text in a tooltip and adds a tab stop while truncated; `false` skips both, e.g. in large lists or grid cells. Defaults to `true`. */
  showTooltip?: boolean;
  /** Tooltip content. Defaults to `children`; pass plain text when `children` holds links or buttons. */
  tooltipContent?: ReactNode;
  /** Positions the tooltip, e.g. `{ side: 'right' }`. */
  tooltipProps?: Pick<TooltipContentProps, 'side' | 'align' | 'sideOffset'>;
  className?: string;
}

interface TextTruncateEndProps<T extends ElementType> extends TextTruncateBaseProps<T> {
  /** `middle` keeps the end of the text visible and needs a string child. Defaults to `end`. */
  ellipsisPosition?: 'end';
  /** The content to truncate. */
  children: ReactNode;
  trailingChars?: never;
}

interface TextTruncateMiddleProps<
  T extends ElementType,
> extends TextTruncateBaseProps<T> {
  /** `middle` keeps the end of the text visible and needs a string child. Defaults to `end`. */
  ellipsisPosition: 'middle';
  /** The text to truncate. */
  children: string;
  /** Characters kept after the ellipsis; the text is not split when they would outnumber the rest. Defaults to `8`. */
  trailingChars?: number;
}

export type TextTruncateProps<T extends ElementType = 'span'> =
  TextTruncateEndProps<T> | TextTruncateMiddleProps<T>;
