import type { SVGAttributes } from 'react';

export type States = 'default' | 'active' | 'disabled' | 'error' | 'hover';
export type HorizontalDirection = 'start' | 'end';
export type Orientation = 'horizontal' | 'vertical';

export type AssetSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type SVGAssetProps = SVGAttributes<SVGElement> & {
  theme?: 'light' | 'dark';
};
