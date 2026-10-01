import type { SVGAttributes } from 'react';
import type { AssetSize } from '@/types';
import type { ThemeName } from '@/theme/theme.types';

export type FlagName =
  | 'australia'
  | 'austria'
  | 'bahrain'
  | 'belgium'
  | 'brazil'
  | 'canada'
  | 'chile'
  | 'china'
  | 'denmark'
  | 'european-union'
  | 'finland'
  | 'france'
  | 'germany'
  | 'great-britain'
  | 'greece'
  | 'hong-kong'
  | 'india'
  | 'indonesia'
  | 'ireland'
  | 'israel'
  | 'italy'
  | 'japan'
  | 'malaysia'
  | 'mexico'
  | 'netherlands'
  | 'new-zealand'
  | 'norway'
  | 'poland'
  | 'qatar'
  | 'saudi-arabia'
  | 'singapore'
  | 'south-africa'
  | 'south-korea'
  | 'spain'
  | 'sweden'
  | 'switzerland'
  | 'taiwan'
  | 'thailand'
  | 'united-arab-emirates'
  | 'united-kingdom'
  | 'united-states';

export interface FlagProps extends SVGAttributes<SVGElement> {
  name: FlagName;
  theme?: ThemeName;
  size?: AssetSize;
}
