import { SVGAttributes } from 'react';
import { useTheme } from 'styled-components';
import { IconSize } from '@/components/Icon/types';
import { FlagName } from './types';
export type { FlagName, SVGAssetProps } from './types';
import { resolveFlagName, DeprecatedFlagName } from './retroactiveNames';
import FlagsLight from './FlagsLight';
import FlagsDark from './FlagsDark';
import { SvgImageElement } from '@/components/commonElement';
import type { ThemeName } from '@/theme';

export interface FlagProps extends SVGAttributes<SVGElement> {
  name: FlagName | DeprecatedFlagName;
  // TODO: The Light and dark theme should not be hard typed
  // once https://github.com/ClickHouse/click-ui/pull/784
  // is merged, update it
  theme?: 'light' | 'dark';
  size?: IconSize;
}

const Flag = ({ name, theme, size, ...props }: FlagProps) => {
  const { name: themeName } = useTheme();
  const resolvedName = resolveFlagName(name);
  // TODO: Ensure casting is removed as introduced in quick fix. This is resolved here https://github.com/ClickHouse/click-ui/pull/832/files#diff-793d03641716d6b47599cc83d61cfd5e06c6b6ecb69a21f75ee5dc0a71055553R13
  const resolvedTheme: ThemeName = theme ?? (themeName as ThemeName) ?? 'light';
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
