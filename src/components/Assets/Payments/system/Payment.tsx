import { SVGAttributes } from 'react';
import { useTheme } from '@/theme/ThemeContext';
import { getFallbackThemeName } from '@/theme/theme.utils';
import { SvgImageElement } from '@/components/Icon/SvgImageElement';
import { PaymentName, PaymentProps } from './types';
import {
  createAssetResolver,
  type AssetAlias,
  type AssetDeprecatedName,
} from '@/components/Assets/config';
import PaymentsDark from './PaymentsDark';
import PaymentsLight from './PaymentsLight';

const resolvePaymentName = createAssetResolver<PaymentName>();

export interface PaymentPropsWithAliases extends Omit<PaymentProps, 'name'> {
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- old PascalCase names stay accepted until they are removed
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
      size={size}
      role="img"
      aria-label={resolvedName}
      {...props}
    />
  );
};

Payment.displayName = 'Payment';

export { Payment };
