import type { SVGAttributes } from 'react';
import type { IconSize } from '@/components/Icon/Icon.types';

/** @deprecated Use lower case kebab naming, e.g. 'my-country-name' instead */
type DeprecatedFlagName =
  | 'ae' | 'au' | 'br' | 'ca' | 'ch' | 'de' | 'eu' | 'gb' | 'hk' | 'id' | 'ie' | 'il' | 'in' | 'jp' | 'nl' | 'sg' | 'kr' | 'sw' | 'uk' | 'usa' | 'za'
  | 'Australia' | 'Brazil' | 'Canada' | 'EuropeanUnion' | 'Germany' | 'GreatBritain' | 'HongKong' | 'India' | 'Indonesia' | 'Ireland' | 'Israel' | 'Japan' | 'Netherlands' | 'Singapore' | 'SouthAfrica' | 'SouthKorea' | 'Sweden' | 'Switzerland' | 'UnitedArabEmirates' | 'UnitedKingdom' | 'UnitedStates';

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
  name: FlagName | DeprecatedFlagName;
  theme?: 'light' | 'dark';
  size?: IconSize;
}

export type { SVGAssetProps } from '../../types';
