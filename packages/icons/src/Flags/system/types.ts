import type { SVGAttributes } from 'react';
import type { AssetSize, ThemeName } from '../../types';

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
  size?: AssetSize;
}
