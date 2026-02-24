import { SVGAttributes } from 'react';
import { useTheme } from 'styled-components';
import { getFallbackThemeName } from '@/utils/theme';
import { SvgImageElement } from '@/components/Icon/SvgImageElement';
import { LogoName, LogoProps } from './types';
import LogosDark from './LogosDark';
import LogosLight from './LogosLight';

// TODO: This is introducing complexity and more to maintain
// might be best to just deprecate (break change) instead of
// keeping deprecated names, it's small find and replace.
const resolveLogoName = (name: string): LogoName => {
  if (name === 'c#') {
    console.warn('Logo name "c#" is deprecated, use "c-sharp" instead');
    return 'c-sharp' as LogoName;
  }
  return name as LogoName;
};

const Logo = ({ name, theme, size, ...props }: LogoProps) => {
  const { name: themeName } = useTheme();
  const resolvedName = resolveLogoName(name);
  const resolvedTheme = getFallbackThemeName(theme ?? themeName);
  const Component =
    resolvedTheme === 'light' ? LogosLight[resolvedName] : LogosDark[resolvedName];

  if (!Component) {
    return null;
  }

  const ThemedLogo = (svgProps: SVGAttributes<SVGElement>) => (
    <Component
      theme={resolvedTheme}
      {...svgProps}
    />
  );

  return (
    <SvgImageElement
      as={ThemedLogo}
      $size={size}
      role="img"
      aria-label={resolvedName}
      {...props}
    />
  );
};

Logo.displayName = 'Logo';

export { Logo };
