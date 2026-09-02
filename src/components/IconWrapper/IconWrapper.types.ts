import { HTMLAttributes, ReactNode } from 'react';
import type { HorizontalDirection, AssetSize } from '@/types';
import type { EllipsisContentProps } from '@/components/EllipsisContent/EllipsisContent.types';
import type { ImageName } from '@/components/Icon/Icon.types';
import type { GapOptions } from '@/components/Container';

export interface IconWrapperProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ImageName;
  iconDir?: HorizontalDirection;
  size?: AssetSize;
  width?: number | string;
  height?: number | string;
  children: ReactNode;
  ellipsisContent?: boolean;
  /** Positions the truncation tooltip. Ignored when `ellipsisContent` is `false`. */
  tooltipProps?: EllipsisContentProps['tooltipProps'];
  gap?: GapOptions;
  isResponsive?: boolean;
}
