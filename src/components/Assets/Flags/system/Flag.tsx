import { SVGAttributes } from 'react';
import { useTheme } from 'styled-components';
import { getFallbackThemeName } from '@/utils/theme';
import { SvgImageElement } from '@/components/Icon/SvgImageElement';
import { FlagProps } from './types';
import { resolveFlagName } from './retroactiveNames';
import FlagsDark from './FlagsDark';
import FlagsLight from './FlagsLight';

const Flag = ({ name, theme, size, ...props }: FlagProps) => {
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
