import type { SVGAttributes } from 'react';
import type { AssetSize } from '@/types';

export type PaymentName = 'amex' | 'mastercard' | 'paypal' | 'visa';

export interface PaymentProps extends SVGAttributes<SVGElement> {
  name: PaymentName;
  theme?: 'light' | 'dark';
  size?: AssetSize;
}
