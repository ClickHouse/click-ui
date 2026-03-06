import { HTMLAttributes } from 'react';
import type { IconName } from '@/components/Icon';

export interface CardPromotionProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  icon: IconName;
  dismissible?: boolean;
}
