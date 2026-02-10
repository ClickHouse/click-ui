import { SVGAttributes } from 'react';
import { LogoProps } from '../Logos/Logo';
import { FlagName, FlagProps } from '../icons/Flags';
import { LogoName } from '../Logos/types';
import { PaymentName, PaymentProps } from '../icons/Payments';
import { ICON_NAMES } from './IconCommon';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type IconState = 'default' | 'success' | 'warning' | 'danger' | 'info';

// TODO: There was concurrent type for Icon as ImageName VS IconName. But it wasn't found a reason why they were separate as Icon required FileName, etc? For the moment uses IconName for both.
export type IconName = (typeof ICON_NAMES)[number] | LogoName | FlagName | PaymentName;

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

export type ImageType = (
  | (Omit<IconProps, 'name'> & NoThemeType)
  | (Omit<LogoProps, 'name'> & NoColorType)
  | (Omit<FlagProps, 'name'> & NoThemeType & NoColorType)
  | (Omit<PaymentProps, 'name'> & NoThemeType & NoColorType)
) & {
  name: IconName;
};
