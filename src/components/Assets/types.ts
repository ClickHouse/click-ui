import type { SVGAttributes } from 'react';
import type { AssetSize } from '@/types';
import type { ThemeName } from '@/theme/theme.types';

export type SVGAssetProps = SVGAttributes<SVGElement> & {
  theme?: ThemeName;
  size?: AssetSize;
};
