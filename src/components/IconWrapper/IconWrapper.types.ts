import { ReactNode } from 'react';

import type { HorizontalDirection } from '@/components/Common';
import type { ImageName, IconSize } from '@/components/Icon/Icon.types';
import type { GapOptions } from '@/components/Container';

export interface IconWrapperProps {
  icon?: ImageName;
  iconDir?: HorizontalDirection;
  size?: IconSize;
  width?: number | string;
  height?: number | string;
  children: ReactNode;
  ellipsisContent?: boolean;
  gap?: GapOptions;
  isResponsive?: boolean;
}
