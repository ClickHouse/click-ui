import type { SVGAttributes } from 'react';
import type { AssetSize } from '@/types';
import type { ThemeName } from '@/theme/theme.types';

export type FlagName =
  | 'australia'
  | 'brazil'
  | 'canada'
  | 'european-union'
  | 'france'
  | 'germany'
  | 'great-britain'
  | 'hong-kong'
  | 'india'
  | 'indonesia'
  | 'ireland'
  | 'israel'
  | 'japan'
  | 'malaysia'
  | 'mexico'
  | 'netherlands'
  | 'singapore'
  | 'south-africa'
  | 'south-korea'
  | 'sweden'
  | 'switzerland'
  | 'taiwan'
  | 'united-arab-emirates'
  | 'united-kingdom'
  | 'united-states';

export interface FlagProps extends SVGAttributes<SVGElement> {
  name: FlagName;
  theme?: ThemeName;
  size?: AssetSize;
}
