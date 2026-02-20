import type { SVGAttributes } from 'react';
import type { ThemeName } from '@/theme';

export type SVGAssetProps = SVGAttributes<SVGElement> & {
  theme?: ThemeName;
};
