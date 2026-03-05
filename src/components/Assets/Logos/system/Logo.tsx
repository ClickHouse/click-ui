import { SVGAttributes } from 'react';
import { useTheme } from 'styled-components';
import { getFallbackThemeName } from '@/theme/theme.utils';
import { SvgImageElement } from '@/components/Icon/SvgImageElement';
import { LogoName, LogoProps } from './types';
import LogosDark from './LogosDark';
import { IconSize } from '@/components/Icon/types';
import { LogoName } from './types';
import { SvgImageElement } from '@/components/commonElement';
import type { ThemeName } from '@/theme';
import { resolveAssetName, type AssetAlias, type AssetDeprecatedName } from '@/components/Assets/config';

// TODO: This can be a generic see retroactiveNames.ts
// e.g. /Icons/system/retroactiveNames.ts
const resolveLogoName = (name: string): LogoName => {
  return resolveAssetName(name) as LogoName;
};

// TODO: Where required, can't import directly from the config?
export type LogoAliasName = AssetAlias;
export type DeprecatedLogoName = AssetDeprecatedName;

export interface LogoProps extends SVGAttributes<SVGElement> {
  name: LogoName | LogoAliasName | DeprecatedLogoName;
  theme?: 'light' | 'dark';
  size?: IconSize;
}

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
