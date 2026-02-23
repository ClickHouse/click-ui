import { SVGAttributes } from 'react';
import { useTheme } from 'styled-components';
import { SvgImageElement } from '@/components/Common';
import { FlagName, FlagProps } from './types';
export type { FlagName, FlagProps };
import { resolveFlagName } from './retroactiveNames';
import FlagsLight from './FlagsLight';
import FlagsDark from './FlagsDark';

const Flag = ({ name, theme, size, ...props }: FlagProps) => {
  const { name: themeName } = useTheme();
  const resolvedName = resolveFlagName(name);
  const resolvedTheme = theme ?? themeName ?? 'light';
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
