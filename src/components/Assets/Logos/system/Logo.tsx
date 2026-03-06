import { SVGAttributes } from 'react';
import { useTheme } from 'styled-components';
import { getFallbackThemeName } from '@/theme/theme.utils';
import { SvgImageElement } from '@/components/Icon/SvgImageElement';
import { LogoName, LogoProps } from './types';
import {
  createAssetResolver,
  type AssetAlias,
  type AssetDeprecatedName,
} from '@/components/Assets/config';
import LogosDark from './LogosDark';
import LogosLight from './LogosLight';

const resolveLogoName = createAssetResolver<LogoName>();

export { resolveLogoName };

export interface LogoPropsWithAliases extends Omit<LogoProps, 'name'> {
  name: LogoName | AssetAlias | AssetDeprecatedName;
}

const Logo = ({ name, theme, size, ...props }: LogoPropsWithAliases) => {
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
