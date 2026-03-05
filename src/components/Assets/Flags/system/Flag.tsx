import { SVGAttributes } from 'react';
import { useTheme } from 'styled-components';
import { IconSize } from '@/components/Icon/types';
import { FlagName } from './types';
export type { FlagName, SVGAssetProps } from './types';
import FlagsLight from './FlagsLight';
import FlagsDark from './FlagsDark';
import { SvgImageElement } from '@/components/commonElement';
import { type ThemeName, THEMES } from '@/theme';
import {
  createAssetResolver,
  type AssetAlias,
  type AssetDeprecatedName,
} from '@/components/Assets/config';

const resolveFlagName = createAssetResolver<FlagName>();

export { resolveFlagName };

export interface FlagProps extends SVGAttributes<SVGElement> {
  name: FlagName | AssetAlias | AssetDeprecatedName;
  theme?: ThemeName;
  size?: IconSize;
}

const Flag = ({ name, theme, size, ...props }: FlagProps) => {
  const { name: themeName } = useTheme();
  const resolvedName = resolveFlagName(name);
  const resolvedTheme: ThemeName = theme ?? (themeName as ThemeName) ?? THEMES.Light;
  const Component =
    resolvedTheme === THEMES.Dark ? FlagsLight[resolvedName] : FlagsDark[resolvedName];

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
