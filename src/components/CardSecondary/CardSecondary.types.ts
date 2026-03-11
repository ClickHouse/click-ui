import { HTMLAttributes, ReactNode } from 'react';
import type { AssetSize } from '@/types';
import type { IconName, ImageName } from '@/components/Icon/Icon.types';

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
  // TODO: The consumer app seem to expect to use Logos
  // this needs to be investigated why its called icon
  icon?: ImageName;
  iconUrl?: string;
  badgeState?: BadgeState;
  hasShadow?: boolean;
  disabled?: boolean;
  badgeText?: string;
  description: ReactNode;
  infoUrl?: string;
  infoText?: string;
  infoIcon?: IconName;
  infoAssetSize?: AssetSize;
}
