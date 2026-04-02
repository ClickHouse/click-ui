import { SVGAttributes } from 'react';
import type {
  IconName,
  LogoProps,
  LogoName,
  FlagName,
  FlagProps,
  PaymentProps,
  PaymentName,
} from '@clickhouse/icons';
import type { AssetSize } from '@/types';

export type { IconName } from '@clickhouse/icons';

export type IconState = 'default' | 'success' | 'warning' | 'danger' | 'info';

export interface IconProps extends SVGAttributes<HTMLOrSVGElement> {
  /** The name of the icon to display */
  name: IconName;
  /** The color of the icon */
  color?: string;
  /** The size of the icon */
  size?: AssetSize;
  /** The visual state of the icon */
  state?: IconState;
}

type NoThemeType = {
  theme?: never;
};

type NoColorType = {
  color?: never;
};

// TODO: This is used as the type for "Icon" in several components
// the name "ImageName" is NOT correct.
export type ImageName = IconName | LogoName | FlagName | PaymentName;
export type ImageType = (
  | (Omit<IconProps, 'name'> & NoThemeType)
  | (Omit<LogoProps, 'name'> & NoColorType)
  | (Omit<FlagProps, 'name'> & NoThemeType & NoColorType)
  | (Omit<PaymentProps, 'name'> & NoThemeType & NoColorType)
) & {
  name: ImageName;
};
