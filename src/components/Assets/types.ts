import type { SVGAttributes } from 'react';
import type { ThemeName } from '@/theme/theme.types';

export type SVGAssetProps = SVGAttributes<SVGElement> & {
  theme?: ThemeName;
};
