import type { SVGAttributes } from 'react';
import type { IconSize } from '@/types';
import type { ThemeName } from '@/theme';
import type { SVGAssetProps } from '../../types';

export type PaymentName = 'amex' | 'mastercard' | 'paypal' | 'visa';

export interface PaymentProps extends SVGAttributes<SVGElement> {
  name: PaymentName;
  theme?: ThemeName;
  size?: IconSize;
}

export type { SVGAssetProps };
