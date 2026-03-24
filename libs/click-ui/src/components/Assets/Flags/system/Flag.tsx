import { SVGAttributes } from 'react';
import { useTheme } from 'styled-components';
import { getFallbackThemeName } from '@/theme/theme.utils';
import { SvgImageElement } from '@/components/Icon/SvgImageElement';
import {
  FlagsLight,
  FlagsDark,
  createAssetResolver,
  type FlagName,
  type FlagProps,
  type AssetAlias,
  type AssetDeprecatedName,
} from '@clickhouse/icons';

const resolveFlagName = createAssetResolver<FlagName>();

export { resolveFlagName };

export interface FlagPropsWithAliases extends Omit<FlagProps, 'name'> {
  name: FlagName | AssetAlias | AssetDeprecatedName;
}

const Flag = ({ name, theme, size, ...props }: FlagPropsWithAliases) => {
  const { name: themeName } = useTheme();
  const resolvedName = resolveFlagName(name);
  const resolvedTheme = getFallbackThemeName(theme ?? themeName);
  const Component =
    resolvedTheme === 'light' ? FlagsLight[resolvedName] : FlagsDark[resolvedName];

  if (!Component) {
    return null;
  }

  const ThemedFlag = (svgProps: SVGAttributes<SVGElement>) => (
    <Component
      theme={resolvedTheme}
      {...svgProps}
    />
  );

  return (
    <SvgImageElement
      as={ThemedFlag}
      $size={size}
      role="img"
      aria-label={resolvedName}
      {...props}
    />
  );
};

Flag.displayName = 'Flag';

export { Flag };
