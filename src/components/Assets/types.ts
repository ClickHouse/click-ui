import type { SVGAttributes } from 'react';
import type { ThemeName } from '@/theme/core';

export type SVGAssetProps = SVGAttributes<SVGElement> & {
  theme?: ThemeName;
};
