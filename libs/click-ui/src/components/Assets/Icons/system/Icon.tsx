import { SVGAttributes } from 'react';
import { useTheme } from 'styled-components';
import { getFallbackThemeName } from '@/theme/theme.utils';
import { SvgImageElement } from '@/components/Icon/SvgImageElement';
import {
  IconsLight,
  IconsDark,
  createAssetResolver,
  type IconName,
  type IconProps,
  type AssetAlias,
  type AssetDeprecatedName,
} from '@clickhouse/icons';

const resolveIconName = createAssetResolver<IconName>();

export { resolveIconName };

export interface IconPropsWithAliases extends Omit<IconProps, 'name'> {
  name: IconName | AssetAlias | AssetDeprecatedName;
}

const Icon = ({ name, theme, size, ...props }: IconPropsWithAliases) => {
  const { name: themeName } = useTheme();
  const resolvedName = resolveIconName(name);
  const resolvedTheme = getFallbackThemeName(theme ?? themeName);
  const Component =
    resolvedTheme === 'light' ? IconsLight[resolvedName] : IconsDark[resolvedName];

  if (!Component) {
    return null;
  }

  const ThemedIcon = (svgProps: SVGAttributes<SVGElement>) => (
    <Component
      theme={resolvedTheme}
      {...svgProps}
    />
  );

  return (
    <SvgImageElement
      as={ThemedIcon}
      $size={size}
      role="img"
      aria-label={resolvedName}
      {...props}
    />
  );
};

Icon.displayName = 'Icon';

export { Icon };
