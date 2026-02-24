import type { SVGAttributes } from 'react';
import type { IconSize } from '@/types';
import type { ThemeName } from '@/theme';
import type { SVGAssetProps } from '../../types';

export type FlagName =
  | 'australia'
  | 'brazil'
  | 'canada'
  | 'european-union'
  | 'germany'
  | 'great-britain'
  | 'hong-kong'
  | 'india'
  | 'indonesia'
  | 'ireland'
  | 'israel'
  | 'japan'
  | 'netherlands'
  | 'singapore'
  | 'south-africa'
  | 'south-korea'
  | 'sweden'
  | 'switzerland'
  | 'united-arab-emirates'
  | 'united-kingdom'
  | 'united-states';

export interface FlagProps extends SVGAttributes<SVGElement> {
  name: FlagName;
  theme?: ThemeName;
  size?: IconSize;
}

export type { SVGAssetProps };
