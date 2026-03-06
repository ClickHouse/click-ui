import { SVGAttributes } from 'react';
import { useTheme } from 'styled-components';
import { getFallbackThemeName } from '@/theme/theme.utils';
import { SvgImageElement } from '@/components/Icon/SvgImageElement';
import { PaymentProps } from './types';
import PaymentsDark from './PaymentsDark';
import PaymentsLight from './PaymentsLight';

const Payment = ({ name, theme, size, ...props }: PaymentProps) => {
  const { name: themeName } = useTheme();
  const resolvedTheme = getFallbackThemeName(theme ?? themeName);
  const Component = resolvedTheme === 'light' ? PaymentsLight[name] : PaymentsDark[name];

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
      aria-label={name}
      {...props}
    />
  );
};

Payment.displayName = 'Payment';

export { Payment };
