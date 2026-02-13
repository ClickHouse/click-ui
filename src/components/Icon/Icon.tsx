import { styled } from 'styled-components';
import { IconName, IconProps, IconSize, IconState, ImageType } from './types';
import { ICONS_MAP } from '@/components/Icon/IconCommon';
import Flags, { FlagList, FlagName } from '../icons/Flags';
import { Logo } from '../Logos/system/Logo';
import LogosLight from '../Logos/system/LogosLight';
import { LogoName } from '../Logos/system/types';
import Payments, { PaymentList, PaymentName } from '../icons/Payments';

const SVGIcon = ({
  name,
  color,
  width,
  height,
  state,
  className,
  size,
  ...props
}: IconProps) => {
  const Component = ICONS_MAP[name];

  if (!Component) {
    return null;
  }

  return (
    <SvgWrapper
      $color={color}
      $width={width}
      $height={height}
      $size={size}
      className={className}
      state={state}
    >
      <Component {...props} />
    </SvgWrapper>
  );
};

const SvgWrapper = styled.div<{
  $color?: string;
  $width?: number | string;
  $height?: number | string;
  $size?: IconSize;
  state?: IconState;
}>`
  display: flex;
  align-items: center;

  ${({ theme, $color = 'currentColor', $width, $height, $size }) => `
    & path[stroke], & svg[stroke]:not([stroke="none"]), & rect[stroke], & circle[fill] {
      stroke: ${$color};
    }

    & path[fill], & svg[fill]:not([fill="none"]), & rect[fill], & circle[fill] {
      fill: ${$color};
    }

    & svg {
      width: ${$width || theme.click.image[$size || 'md'].size.width || '24px'};
      height: ${$height || theme.click.image[$size || 'md'].size.height || '24px'};
    }
  `}

  ${({ theme, $color = 'currentColor', state = 'default', $size = 'md' }) => `
    background: ${theme.click.icon.color.background[state]};
    border-radius: ${theme.border.radii.full};
    padding: ${state === 'default' ? 'none' : theme.click.icon.space[$size].all};
    color: ${state === 'default' ? $color : theme.click.icon.color.text[state]};
  `}
`;

const SvgImage = ({ name, size, theme, ...props }: ImageType) => {
  if (Object.keys(FlagList).includes(name)) {
    return (
      <Flags
        name={name as FlagName}
        size={size}
        {...props}
      />
    );
  }
  if (Object.keys(LogosLight).includes(name)) {
    return (
      <Logo
        name={name as LogoName}
        theme={theme}
        size={size}
        {...props}
      />
    );
  }
  if (Object.keys(PaymentList).includes(name)) {
    return (
      <Payments
        name={name as PaymentName}
        size={size}
        {...props}
      />
    );
  }
  return (
    <SVGIcon
      name={name as IconName}
      size={size}
      role="img"
      aria-label={name}
      {...props}
    />
  );
};

SvgImage.displayName = 'Icon';

export { SvgImage as Icon };
