import { SVGAttributes } from 'react';
import { useTheme } from 'styled-components';
import { IconSize } from '@/components/Icon/types';
import { PaymentName } from './types';
import PaymentsLight from './PaymentsLight';
import PaymentsDark from './PaymentsDark';
import { SvgImageElement } from '@/components/commonElement';
import type { ThemeName } from '@/theme';

export interface PaymentProps extends SVGAttributes<SVGElement> {
  name: PaymentName;
  theme?: 'light' | 'dark';
  size?: IconSize;
}

const Payment = ({ name, theme, size, ...props }: PaymentProps) => {
  const { name: themeName } = useTheme();
  // TODO: Ensure casting is removed as introduced in quick fix. This is resolved here https://github.com/ClickHouse/click-ui/pull/832/files#diff-793d03641716d6b47599cc83d61cfd5e06c6b6ecb69a21f75ee5dc0a71055553R13
  const resolvedTheme: ThemeName = theme ?? (themeName as ThemeName) ?? 'light';

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
