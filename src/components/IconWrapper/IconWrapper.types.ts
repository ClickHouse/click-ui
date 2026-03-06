import { ReactNode } from 'react';
import type { HorizontalDirection, AssetSize } from '@/types';
import type { ImageName } from '@/components/Icon/Icon.types';
import type { GapOptions } from '@/components/Container';

export interface IconWrapperProps {
  icon?: ImageName;
  iconDir?: HorizontalDirection;
  size?: AssetSize;
  width?: number | string;
  height?: number | string;
  children: ReactNode;
  ellipsisContent?: boolean;
  gap?: GapOptions;
  isResponsive?: boolean;
}
