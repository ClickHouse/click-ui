import { SVGAttributes } from 'react';
import { useTheme } from 'styled-components';
import { ThemeName } from '@/theme';
import { IconSize } from '@/components/Icon/types';
import { FlagName } from './types';
export type { FlagName, SVGAssetProps } from './types';
import { resolveFlagName, DeprecatedFlagName } from './retroactiveNames';
import FlagsLight from './FlagsLight';
import FlagsDark from './FlagsDark';
import { SvgImageElement } from '@/components/Common';

export interface FlagProps extends SVGAttributes<SVGElement> {
  name: FlagName | DeprecatedFlagName;
  theme?: ThemeName;
  size?: IconSize;
}

const Flag = ({ name, theme, size, ...props }: FlagProps) => {
  const { name: themeName } = useTheme();
  const resolvedName = resolveFlagName(name);
  const resolvedTheme = (theme ?? themeName ?? 'light') as ThemeName;
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
