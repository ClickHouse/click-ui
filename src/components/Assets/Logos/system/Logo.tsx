import { SVGAttributes } from 'react';
import { useTheme } from 'styled-components';
import { IconSize } from '@/components/Icon/types';
import { LogoName } from './types';
import { SvgImageElement } from '@/components/commonElement';
import { type ThemeName, THEMES } from '@/theme';
import {
  createAssetResolver,
  type AssetAlias,
  type AssetDeprecatedName,
} from '@/components/Assets/config';
import LogosLight from './LogosLight';
import LogosDark from './LogosDark';

const resolveLogoName = createAssetResolver<LogoName>();

export { resolveLogoName };

export interface LogoProps extends SVGAttributes<SVGElement> {
  name: LogoName | AssetAlias | AssetDeprecatedName;
  theme?: ThemeName;
  size?: IconSize;
}

const Logo = ({ name, theme, size, ...props }: LogoProps) => {
  const { name: themeName } = useTheme();
  const resolvedName = resolveLogoName(name);
  const resolvedTheme: ThemeName = theme ?? (themeName as ThemeName) ?? THEMES.Light;
  const Component =
    resolvedTheme === THEMES.Light ? LogosLight[resolvedName] : LogosDark[resolvedName];

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
