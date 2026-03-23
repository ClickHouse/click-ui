// Types
export type { ThemeName, AssetSize, SVGAssetProps } from './types';
export type { IconName, IconProps } from './Icons/system/types';
export type { LogoName, LogoProps } from './Logos/system/types';
export type { FlagName, FlagProps } from './Flags/system/types';
export type { PaymentName, PaymentProps } from './Payments/system/types';

// Standalone icon components (for direct usage without registry)
export { default as Popover_Arrow } from './Icons/Popover-Arrow';

// Icon registries
export { default as IconsLight } from './Icons/system/IconsLight';
export { default as IconsDark } from './Icons/system/IconsDark';

// Logo registries
export { default as LogosLight } from './Logos/system/LogosLight';
export { default as LogosDark } from './Logos/system/LogosDark';

// Flag registries
export { default as FlagsLight } from './Flags/system/FlagsLight';
export { default as FlagsDark } from './Flags/system/FlagsDark';

// Payment registries
export { default as PaymentsLight } from './Payments/system/PaymentsLight';
export { default as PaymentsDark } from './Payments/system/PaymentsDark';

// Config utilities
export {
  ASSET_NAME_MAPPINGS,
  resolveAssetName,
  createAssetResolver,
  type AssetAliasMap,
  type AssetAlias,
  type AssetDeprecatedName,
} from './config';
