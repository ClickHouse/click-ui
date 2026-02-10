import { SVGAttributes } from 'react';
import { LogoProps } from '../Logos/Logo';
import { FlagName, FlagProps } from '../icons/Flags';
import { LogoName } from '../Logos/types';
import { PaymentName, PaymentProps } from '../icons/Payments';
import { ICON_NAMES } from './IconCommon';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type IconState = 'default' | 'success' | 'warning' | 'danger' | 'info';

// TODO: Concurrent type for Icon as ImageName VS IconName. Investigate
export type IconName = (typeof ICON_NAMES)[number];

export interface IconProps extends SVGAttributes<HTMLOrSVGElement> {
  /** The name of the icon to display */
  name: IconName;
  /** The color of the icon */
  color?: string;
  /** The size of the icon */
  size?: IconSize;
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
