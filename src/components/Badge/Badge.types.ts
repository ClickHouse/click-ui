import type { HorizontalDirection } from '@/types';
import { HTMLAttributes, MouseEvent, ReactNode } from 'react';
import type { IconName } from '@/components/Icon';

export type BadgeState =
  | 'default'
  | 'success'
  | 'neutral'
  | 'danger'
  | 'disabled'
  | 'warning'
  | 'info';

export type BadgeSize = 'sm' | 'md';
export type BadgeType = 'opaque' | 'solid';

export interface CommonBadgeProps extends HTMLAttributes<HTMLDivElement> {
  text: ReactNode;
  state?: BadgeState;
  size?: BadgeSize;
  type?: BadgeType;
  icon?: IconName;
  iconDir?: HorizontalDirection;
  ellipsisContent?: boolean;
}

export interface DismissibleBadge extends CommonBadgeProps {
  dismissible: true;
  onClose: (e: MouseEvent<HTMLOrSVGElement>) => void;
}

export interface NonDismissibleBadge extends CommonBadgeProps {
  dismissible?: never;
  onClose?: never;
}

export type BadgeProps = DismissibleBadge | NonDismissibleBadge;
