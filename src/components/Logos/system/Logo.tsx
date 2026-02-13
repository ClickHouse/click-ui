import { SVGAttributes } from 'react';
import { useTheme } from 'styled-components';
import LogosLight from './LogosLight';
import LogosDark from './LogosDark';
import { IconSize } from '@/components/Icon/types';
import { LogoName } from './types';
import { SvgImageElement } from '../../commonElement';

// TODO: This is introducing complexity and more to maintain
// might be best to just deprecate (break change) instead of
// keeping deprecated names
// It's small find and replace on package update
const LOGO_DEPRECATED_ALIASES: Record<string, LogoName> = {
  'c#': 'c-sharp',
} as const;

const resolveLogoName = (name: string): LogoName => {
  return LOGO_DEPRECATED_ALIASES[name] ?? (name as LogoName);
}

export interface LogoProps extends SVGAttributes<SVGElement> {
  name: LogoName | keyof typeof LOGO_DEPRECATED_ALIASES;
  theme?: 'light' | 'dark';
  size?: IconSize;
}

const Logo = ({ name, theme, size, ...props }: LogoProps) => {
  const { name: themeName } = useTheme();
  const resolvedName = resolveLogoName(name);
  const Component = (theme ?? themeName) === 'light'
    ? LogosLight[resolvedName]
    : LogosDark[resolvedName];

  if (!Component) {
    return null;
  }

  return (
    <SvgImageElement
      as={Component}
      $size={size}
      role="img"
      aria-label={resolvedName}
      {...props}
    />
  );
};

Logo.displayName = 'Logo';

export { Logo };
