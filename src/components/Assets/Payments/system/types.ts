import type { SVGAttributes } from 'react';
import type { IconSize } from '@/components/Common';

export type PaymentName = 'amex' | 'mastercard' | 'paypal' | 'visa';

export interface PaymentProps extends SVGAttributes<SVGElement> {
  name: PaymentName;
  theme?: 'light' | 'dark';
  size?: IconSize;
}

export type { SVGAssetProps } from '../../types';
