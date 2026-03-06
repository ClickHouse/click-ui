import { HTMLAttributes, ReactNode } from 'react';
import type { IconName } from '@/components/Icon';
import type { IconSize } from '@/types';

export type BadgeState =
  | 'default'
  | 'success'
  | 'neutral'
  | 'danger'
  | 'disabled'
  | 'warning'
  | 'info';

export interface CardSecondaryProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  icon?: IconName;
  iconUrl?: string;
  badgeState?: BadgeState;
  hasShadow?: boolean;
  disabled?: boolean;
  badgeText?: string;
  description: ReactNode;
  infoUrl?: string;
  infoText?: string;
  infoIcon?: IconName;
  infoIconSize?: IconSize;
}
