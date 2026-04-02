// Types
export type { ThemeName, AssetSize, SVGAssetProps } from './types';
export type { IconName, IconProps } from './Icons/system/types';
export type { LogoName, LogoProps } from './Logos/system/types';
export type { FlagName, FlagProps } from './Flags/system/types';
export type { PaymentName, PaymentProps } from './Payments/system/types';

// Standalone icon components (for direct usage without registry)
export { default as Popover_Arrow } from './Icons/Popover-Arrow';
export { User } from './Icons/User';

// Icon registries
export { IconsLight } from './Icons/system/IconsLight';
export { IconsDark } from './Icons/system/IconsDark';

// Logo registries
export { LogosLight } from './Logos/system/LogosLight';
export { LogosDark } from './Logos/system/LogosDark';

// Flag registries
export { FlagsLight } from './Flags/system/FlagsLight';
export { FlagsDark } from './Flags/system/FlagsDark';

// Payment registries
export { PaymentsLight } from './Payments/system/PaymentsLight';
export { PaymentsDark } from './Payments/system/PaymentsDark';

// Config utilities
export {
  ASSET_NAME_MAPPINGS,
  resolveAssetName,
  createAssetResolver,
  type AssetAliasMap,
  type AssetAlias,
  type AssetDeprecatedName,
} from './config';
