import { SVGAttributes } from 'react';
import { useTheme } from 'styled-components';
import { IconSize } from '@/components/Icon/types';
import { IconName } from './types';
import { resolveIconName, DeprecatedIconName } from './retroactiveNames';
import IconsLight from './IconsLight';
import IconsDark from './IconsDark';
import { SvgImageElement } from '@/components/commonElement';
import type { ThemeName } from '@/theme';

export interface IconProps extends SVGAttributes<SVGElement> {
  name: IconName | DeprecatedIconName;
  theme?: 'light' | 'dark';
  size?: IconSize;
}

const Icon = ({ name, theme, size, ...props }: IconProps) => {
  const { name: themeName } = useTheme();
  const resolvedName = resolveIconName(name);
  const resolvedTheme: ThemeName = theme ?? (themeName as ThemeName) ?? 'light';
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
