import type { SVGAttributes } from 'react';
import type { AssetSize } from '@/types';
import type { ThemeName } from '@clickhouse/design-tokens/legacy/theme';

export type SVGAssetProps = SVGAttributes<SVGElement> & {
  theme?: ThemeName;
  size?: AssetSize;
};
