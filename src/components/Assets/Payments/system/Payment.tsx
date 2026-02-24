import { SVGAttributes } from 'react';
import { useTheme } from 'styled-components';
import { ThemeName } from '@/theme';
import { IconSize } from '@/components/Icon/types';
import { PaymentName } from './types';
import PaymentsLight from './PaymentsLight';
import PaymentsDark from './PaymentsDark';
import { SvgImageElement } from '@/components/Common';
import { getFallbackThemeName } from '@/utils/theme';

export interface PaymentProps extends SVGAttributes<SVGElement> {
  name: PaymentName;
  theme?: ThemeName;
  size?: IconSize;
}

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
