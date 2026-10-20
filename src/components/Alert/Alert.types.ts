import type { IconName } from '@/components/Icon';
import { ReactNode } from 'react';

type AlertType = 'default' | 'banner';
type AlertSize = 'small' | 'medium';
type AlertState = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

export interface AlertProps {
  state?: AlertState;
  /** String values keep `\n` and wrap long tokens. ReactNode is unchanged. */
  title?: ReactNode;
  /** String values keep `\n` and wrap long tokens. ReactNode is unchanged. */
  text: ReactNode;
  size?: AlertSize;
  type?: AlertType;
  showIcon?: boolean;
  customIcon?: IconName;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}
