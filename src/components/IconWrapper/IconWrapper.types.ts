import { ReactNode } from 'react';

import type { HorizontalDirection } from '@/components/types';
import type { ImageName } from '@/components/Icon/Icon.types';
import type { IconSize } from '@/types';
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
