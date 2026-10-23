import type { IconName } from '@/components/Icon';
import { ReactNode } from 'react';

type AlertType = 'default' | 'banner';
type AlertSize = 'small' | 'medium';
type AlertState = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

export interface AlertProps {
  state?: AlertState;
  title?: ReactNode;
  text: ReactNode;
  size?: AlertSize;
  type?: AlertType;
  showIcon?: boolean;
  customIcon?: IconName;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
  /** When true, string `text` keeps `\n` line breaks. Defaults to `false`. */
  preserveLineBreaks?: boolean;
  /** Caps the whole alert, toggle included, and adds a show more toggle when the text overflows. A number is px; a string is any CSS length, e.g. `'12lh'` or `'100%'`. */
  maxHeight?: number | string;
  /** Called when the user expands or collapses the text. Only fires when `maxHeight` is set. */
  onExpandedChange?: (expanded: boolean) => void;
  /** Defaults to `'Show more'`. */
  expandLabel?: string;
  /** Defaults to `'Show less'`. */
  collapseLabel?: string;
}
