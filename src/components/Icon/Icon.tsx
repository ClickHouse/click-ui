import { CSSProperties } from 'react';
import { cn, cva } from '@/lib/cva';
import { IconName, IconProps, ImageType } from './Icon.types';
import { ICONS_MAP } from '@/components/Icon/IconCommon';
import { Flag } from '@/components/Assets/Flags/system/Flag';
import FlagsLight from '@/components/Assets/Flags/system/FlagsLight';
import { FlagName } from '@/components/Assets/Flags/system/types';
import { Logo } from '@/components/Assets/Logos/system/Logo';
import LogosLight from '@/components/Assets/Logos/system/LogosLight';
import { LogoName } from '@/components/Assets/Logos/system/types';
import { Payment } from '@/components/Assets/Payments/system/Payment';
import { PaymentName } from '@/components/Assets/Payments/system/types';
import PaymentsLight from '@/components/Assets/Payments/system/PaymentsLight';
import styles from './Icon.module.css';

const svgWrapperVariants = cva(styles['svg-wrapper'], {
  variants: {
    size: {
      xs: styles['svg-wrapper_size_xs'],
      sm: styles['svg-wrapper_size_sm'],
      md: styles['svg-wrapper_size_md'],
      lg: styles['svg-wrapper_size_lg'],
      xl: styles['svg-wrapper_size_xl'],
      xxl: styles['svg-wrapper_size_xxl'],
    },
    state: {
      default: '',
      success: styles['svg-wrapper_state_success'],
      warning: styles['svg-wrapper_state_warning'],
      danger: styles['svg-wrapper_state_danger'],
      info: styles['svg-wrapper_state_info'],
    },
  },
  defaultVariants: {
    size: 'md',
    state: 'default',
  },
});

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

  const wrapperStyle = {
    ...(color !== undefined ? { '--svg-icon-color': color } : {}),
    ...(width !== undefined ? { '--svg-width': String(width) } : {}),
    ...(height !== undefined ? { '--svg-height': String(height) } : {}),
  } as CSSProperties;

  return (
    <div
      className={cn(svgWrapperVariants({ size, state }), className)}
      style={wrapperStyle}
    >
      <Component {...props} />
    </div>
  );
};

const SvgImage = ({ name, size, theme, ...props }: ImageType) => {
  if (Object.keys(FlagsLight).includes(name)) {
    return (
      <Flag
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
  if (Object.keys(PaymentsLight).includes(name)) {
    return (
      <Payment
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
