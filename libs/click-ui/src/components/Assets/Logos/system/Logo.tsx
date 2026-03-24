import { SVGAttributes } from 'react';
import { useTheme } from 'styled-components';
import { getFallbackThemeName } from '@/theme/theme.utils';
import { SvgImageElement } from '@/components/Icon/SvgImageElement';
import {
  LogosLight,
  LogosDark,
  createAssetResolver,
  type LogoName,
  type LogoProps,
  type AssetAlias,
  type AssetDeprecatedName,
} from '@clickhouse/icons';

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
