import type { SVGAttributes } from 'react';
import type { AssetSize } from '@/types';
import type { ThemeName } from '@clickhouse/design-tokens/legacy/theme';

export type PaymentName = 'amex' | 'mastercard' | 'paypal' | 'visa';

export interface PaymentProps extends SVGAttributes<SVGElement> {
  name: PaymentName;
  theme?: ThemeName;
  size?: AssetSize;
}
