import { SVGAttributes } from 'react';
import { useTheme } from 'styled-components';
import { getFallbackThemeName } from '@/theme/theme.utils';
import { SvgImageElement } from '@/components/Icon/SvgImageElement';
import {
  PaymentsLight,
  PaymentsDark,
  createAssetResolver,
  type PaymentName,
  type PaymentProps,
  type AssetAlias,
  type AssetDeprecatedName,
} from '@clickhouse/icons';

const resolvePaymentName = createAssetResolver<PaymentName>();

export { resolvePaymentName };

export interface PaymentPropsWithAliases extends Omit<PaymentProps, 'name'> {
  name: PaymentName | AssetAlias | AssetDeprecatedName;
}

const Payment = ({ name, theme, size, ...props }: PaymentPropsWithAliases) => {
  const { name: themeName } = useTheme();
  const resolvedName = resolvePaymentName(name);
  const resolvedTheme = getFallbackThemeName(theme ?? themeName);
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
