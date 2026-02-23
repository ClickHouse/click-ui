import { FlagName } from './types';

export const FLAG_NAME_RETRO_MAP: Record<string, FlagName> = {
  ae: 'united-arab-emirates',
  au: 'australia',
  br: 'brazil',
  ca: 'canada',
  ch: 'switzerland',
  de: 'germany',
  eu: 'european-union',
  gb: 'great-britain',
  hk: 'hong-kong',
  id: 'indonesia',
  ie: 'ireland',
  il: 'israel',
  in: 'india',
  jp: 'japan',
  nl: 'netherlands',
  sg: 'singapore',
  kr: 'south-korea',
  sw: 'sweden',
  uk: 'united-kingdom',
  usa: 'united-states',
  za: 'south-africa',

  Australia: 'australia',
  Brazil: 'brazil',
  Canada: 'canada',
  EuropeanUnion: 'european-union',
  Germany: 'germany',
  GreatBritain: 'great-britain',
  HongKong: 'hong-kong',
  India: 'india',
  Indonesia: 'indonesia',
  Ireland: 'ireland',
  Israel: 'israel',
  Japan: 'japan',
  Netherlands: 'netherlands',
  Singapore: 'singapore',
  SouthAfrica: 'south-africa',
  SouthKorea: 'south-korea',
  Sweden: 'sweden',
  Switzerland: 'switzerland',
  UnitedArabEmirates: 'united-arab-emirates',
  UnitedKingdom: 'united-kingdom',
  UnitedStates: 'united-states',
};

// TODO: Retroactive support for simple name cases
// causes unwanted complexity. Isn't it best to make it
// a breaking change? A find and replace solves it quick

/** @deprecated Use lower case kebab naming, e.g. 'my-country-name' instead */
export type DeprecatedFlagName = keyof typeof FLAG_NAME_RETRO_MAP;

export const resolveFlagName = (name: string): FlagName => {
  const mapped = FLAG_NAME_RETRO_MAP[name];
  if (mapped) {
    console.warn(`Flag name "${name}" is deprecated, use "${mapped}" instead`);
    return mapped;
  }
  return name as FlagName;
};
