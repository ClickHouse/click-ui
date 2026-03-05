import { SVGAttributes } from 'react';
import { useTheme } from 'styled-components';
import { IconSize } from '@/components/Icon/types';
import { PaymentName } from './types';
import PaymentsLight from './PaymentsLight';
import PaymentsDark from './PaymentsDark';
import { SvgImageElement } from '@/components/commonElement';
import type { ThemeName } from '@/theme';
import { resolveAssetName, type AssetAlias, type AssetDeprecatedName } from '@/components/Assets/config';

// TODO: This can be a generic see retroactiveNames.ts
// e.g. /Icons/system/retroactiveNames.ts
const resolvePaymentName = (name: string): PaymentName => {
  return resolveAssetName(name) as PaymentName;
};

// TODO: Where required, can't import directly from the config?
export type PaymentAliasName = AssetAlias;
export type DeprecatedPaymentName = AssetDeprecatedName;

export interface PaymentProps extends SVGAttributes<SVGElement> {
  name: PaymentName | PaymentAliasName | DeprecatedPaymentName;
  theme?: 'light' | 'dark';
  size?: IconSize;
}

const Payment = ({ name, theme, size, ...props }: PaymentProps) => {
  const { name: themeName } = useTheme();
  const resolvedName = resolvePaymentName(name);
  const resolvedTheme: ThemeName = theme ?? (themeName as ThemeName) ?? 'light';
  const Component =
    resolvedTheme === 'light' ? PaymentsLight[resolvedName] : PaymentsDark[resolvedName];

  if (!Component) {
    return null;
  }

  const ThemedPayment = (svgProps: SVGAttributes<SVGElement>) => (
    <Component
      theme={resolvedTheme}
      {...svgProps}
    />
  );

  return (
    <SvgImageElement
      as={ThemedPayment}
      $size={size}
      role="img"
      aria-label={resolvedName}
      {...props}
    />
  );
};

Payment.displayName = 'Payment';

export { Payment };
