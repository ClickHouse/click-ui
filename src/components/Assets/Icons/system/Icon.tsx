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
  // TODO: Ensure casting is removed as introduced in quick fix. This is resolved here https://github.com/ClickHouse/click-ui/pull/832/files#diff-793d03641716d6b47599cc83d61cfd5e06c6b6ecb69a21f75ee5dc0a71055553R13
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
