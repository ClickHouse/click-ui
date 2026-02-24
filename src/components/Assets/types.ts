import type { SVGAttributes } from 'react';
import type { IconSize } from '@/types';

export type SVGAssetProps = SVGAttributes<SVGElement> & {
  theme?: 'light' | 'dark';
  size?: IconSize;
};
