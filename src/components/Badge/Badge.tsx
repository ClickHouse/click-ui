import { Icon } from '@/components/Icon';
import { IconWrapper } from '@/components/IconWrapper';
import { cn, cva } from '@/lib/cva';
import { BadgeProps } from './Badge.types';
import styles from './Badge.module.css';

const wrapperVariants = cva(styles.wrapper, {
  variants: {
    typestate: {
      'opaque-default': styles['wrapper_typestate_opaque-default'],
      'opaque-success': styles['wrapper_typestate_opaque-success'],
      'opaque-neutral': styles['wrapper_typestate_opaque-neutral'],
      'opaque-danger': styles['wrapper_typestate_opaque-danger'],
      'opaque-disabled': styles['wrapper_typestate_opaque-disabled'],
      'opaque-warning': styles['wrapper_typestate_opaque-warning'],
      'opaque-info': styles['wrapper_typestate_opaque-info'],
      'solid-default': styles['wrapper_typestate_solid-default'],
      'solid-success': styles['wrapper_typestate_solid-success'],
      'solid-neutral': styles['wrapper_typestate_solid-neutral'],
      'solid-danger': styles['wrapper_typestate_solid-danger'],
      'solid-disabled': styles['wrapper_typestate_solid-disabled'],
      'solid-warning': styles['wrapper_typestate_solid-warning'],
      'solid-info': styles['wrapper_typestate_solid-info'],
    },
    size: {
      sm: styles['wrapper_size_sm'],
      md: styles['wrapper_size_md'],
    },
  },
  defaultVariants: {
    typestate: 'opaque-default',
    size: 'md',
  },
});

// The original `BadgeContent = styled(IconWrapper)` only forwarded `$state` —
// `$type` and `$size` were NOT passed and defaulted to `'opaque'` and `'md'`
// inside the styled rule. So the descendant <svg> color always came from the
// opaque-text-* tokens (regardless of the badge's actual `type`) and the
// SVG dimensions were always md (regardless of the badge's actual `size`).
// To preserve byte-for-byte behavior, this variant set keys off `state` only.
const badgeContentVariants = cva(styles.badgecontent, {
  variants: {
    state: {
      default: styles['badgecontent_state_default'],
      success: styles['badgecontent_state_success'],
      neutral: styles['badgecontent_state_neutral'],
      danger: styles['badgecontent_state_danger'],
      disabled: styles['badgecontent_state_disabled'],
      warning: styles['badgecontent_state_warning'],
      info: styles['badgecontent_state_info'],
    },
  },
  defaultVariants: { state: 'default' },
});

const closeIconVariants = cva(styles.closeicon, {
  variants: {
    state: {
      default: styles['closeicon_state_default'],
      success: styles['closeicon_state_success'],
      neutral: styles['closeicon_state_neutral'],
      danger: styles['closeicon_state_danger'],
      disabled: styles['closeicon_state_disabled'],
      warning: styles['closeicon_state_warning'],
      info: styles['closeicon_state_info'],
    },
  },
  defaultVariants: { state: 'default' },
});

type BadgeTypeState =
  | 'opaque-default'
  | 'opaque-success'
  | 'opaque-neutral'
  | 'opaque-danger'
  | 'opaque-disabled'
  | 'opaque-warning'
  | 'opaque-info'
  | 'solid-default'
  | 'solid-success'
  | 'solid-neutral'
  | 'solid-danger'
  | 'solid-disabled'
  | 'solid-warning'
  | 'solid-info';

export const Badge = ({
  icon,
  iconDir,
  text,
  state = 'default',
  size,
  type,
  dismissible,
  onClose,
  ellipsisContent = true,
  className,
  ...props
}: BadgeProps) => {
  const resolvedType = type ?? 'opaque';
  const resolvedSize = size ?? 'md';
  const typestate = `${resolvedType}-${state}` as BadgeTypeState;
  return (
    <div
      {...props}
      className={cn(wrapperVariants({ typestate, size: resolvedSize }), className)}
    >
      <div
        data-testid={`${ellipsisContent ? 'ellipsed' : 'normal'}-badge-content`}
        className={styles.content}
      >
        <IconWrapper
          icon={icon}
          iconDir={iconDir}
          size={size}
          ellipsisContent={ellipsisContent}
          className={cn(badgeContentVariants({ state }))}
        >
          {text}
        </IconWrapper>
        {dismissible && (
          <Icon
            name="cross"
            onClick={onClose}
            aria-label="close"
            className={cn(closeIconVariants({ state }))}
          />
        )}
      </div>
    </div>
  );
};
