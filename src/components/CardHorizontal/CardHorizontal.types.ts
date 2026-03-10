import { HTMLAttributes, MouseEventHandler, ReactNode } from 'react';
import type { IconName, ImageName } from '@/components/Icon';
import type { BadgeState } from '@/components/Badge';

export type CardColor = 'default' | 'muted';
export type CardSize = 'sm' | 'md';

export interface CardHorizontalProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'title'
> {
  title?: ReactNode;
  // TODO: The consumer app seem to expect to use Logos
  // this needs to be investigated why its called icon
  icon?: ImageName;
  disabled?: boolean;
  description?: ReactNode;
  infoUrl?: string;
  infoText?: string;
  isSelected?: boolean;
  isSelectable?: boolean;
  children?: ReactNode;
  color?: CardColor;
  size?: CardSize;
  badgeText?: string;
  badgeState?: BadgeState;
  badgeIcon?: IconName;
  badgeIconDir?: 'start' | 'end';
  onClick?: MouseEventHandler<HTMLDivElement>;
  onButtonClick?: MouseEventHandler<HTMLElement>;
}
