import type { SVGAttributes } from 'react';
import type { IconSize } from '@/types';
import type { ThemeName } from '@/theme';

export type SVGAssetProps = SVGAttributes<SVGElement> & {
  theme?: ThemeName;
  size?: IconSize;
};
