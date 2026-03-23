import type { SVGAttributes } from 'react';

export type ThemeName = 'dark' | 'light';
export type AssetSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type SVGAssetProps = SVGAttributes<SVGElement> & {
  theme?: ThemeName;
};
