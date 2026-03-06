import { HTMLAttributes, MouseEventHandler, ReactNode } from 'react';
import type { IconName } from '@/components/Icon';

export type CardPrimarySize = 'sm' | 'md';
type ContentAlignment = 'start' | 'center' | 'end';

interface WithTopBadgeProps {
  topBadgeText?: string;
}

export interface CardPrimaryProps
  extends HTMLAttributes<HTMLDivElement>, WithTopBadgeProps {
  title?: string;
  icon?: IconName;
  iconUrl?: string;
  hasShadow?: boolean;
  disabled?: boolean;
  description?: ReactNode;
  infoUrl?: string;
  infoText?: string;
  size?: CardPrimarySize;
  isSelected?: boolean;
  children?: ReactNode;
  alignContent?: ContentAlignment;
  onButtonClick?: MouseEventHandler<HTMLElement>;
}
