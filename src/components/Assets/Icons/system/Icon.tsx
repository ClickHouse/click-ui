import { SVGAttributes } from 'react';
import { useTheme } from 'styled-components';
import type { ThemeName } from '@/theme/theme.types';
import { getFallbackThemeName } from '@/theme/theme.utils';
import { resolveIconName, type DeprecatedIconName } from './retroactiveNames';
import IconsLight from './IconsLight';
import IconsDark from './IconsDark';
import { SvgImageElement } from '@/components/Icon/SvgImageElement';

import type { IconName } from './types';
import type { AssetSize } from '@/types';

export interface IconProps extends SVGAttributes<SVGElement> {
  name: IconName | DeprecatedIconName;
  theme?: ThemeName;
  size?: AssetSize;
}

const Icon = ({ name, theme, size, ...props }: IconProps) => {
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
