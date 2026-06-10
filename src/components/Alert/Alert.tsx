import { Icon, type IconName } from '@/components/Icon';
import { useState, useCallback } from 'react';
import { cn, cva } from '@/lib/cva';
import { AlertProps } from './Alert.types';
import styles from './Alert.module.css';

type AlertState = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

const stateIconMap: Record<AlertState, IconName> = {
  neutral: 'information',
  success: 'check',
  warning: 'warning',
  danger: 'warning',
  info: 'information',
};

const wrapperVariants = cva(styles.alert, {
  variants: {
    type: {
      default: styles.alert_type_default,
      banner: styles.alert_type_banner,
    },
    state: {
      neutral: styles.alert_state_neutral,
      success: styles.alert_state_success,
      warning: styles.alert_state_warning,
      danger: styles.alert_state_danger,
      info: styles.alert_state_info,
    },
  },
  defaultVariants: {
    type: 'default',
    state: 'neutral',
  },
});

const iconWrapperVariants = cva(styles['alert__icon-wrapper'], {
  variants: {
    state: {
      neutral: styles['alert__icon-wrapper_state_neutral'],
      success: styles['alert__icon-wrapper_state_success'],
      warning: styles['alert__icon-wrapper_state_warning'],
      danger: styles['alert__icon-wrapper_state_danger'],
      info: styles['alert__icon-wrapper_state_info'],
    },
    size: {
      small: styles['alert__icon-wrapper_size_small'],
      medium: styles['alert__icon-wrapper_size_medium'],
    },
    type: {
      default: '',
      banner: styles['alert__icon-wrapper_type_banner'],
    },
  },
  defaultVariants: {
    state: 'neutral',
    size: 'small',
    type: 'default',
  },
});

const iconVariants = cva(styles.alert__icon, {
  variants: {
    size: {
      small: styles['alert__icon_size_small'],
      medium: styles['alert__icon_size_medium'],
    },
  },
  defaultVariants: {
    size: 'small',
  },
});

const textWrapperVariants = cva(styles['alert__text-wrapper'], {
  variants: {
    size: {
      small: styles['alert__text-wrapper_size_small'],
      medium: styles['alert__text-wrapper_size_medium'],
    },
  },
  defaultVariants: {
    size: 'small',
  },
});

const titleVariants = cva(styles.alert__title, {
  variants: {
    size: {
      small: styles.alert__title_size_small,
      medium: styles.alert__title_size_medium,
    },
  },
  defaultVariants: {
    size: 'small',
  },
});

const textVariants = cva(styles.alert__text, {
  variants: {
    size: {
      small: styles.alert__text_size_small,
      medium: styles.alert__text_size_medium,
    },
  },
  defaultVariants: {
    size: 'small',
  },
});

export const Alert = ({
  text,
  title = '',
  size = 'small',
  state = 'neutral',
  type = 'default',
  showIcon = true,
  dismissible,
  onDismiss,
  customIcon,
  ...delegated
}: AlertProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = useCallback(() => {
    setIsVisible(false);
    onDismiss?.();
  }, [onDismiss]);

  return isVisible ? (
    <div
      data-testid="click-alert"
      {...delegated}
      className={cn(wrapperVariants({ state, type }))}
    >
      {dismissible && type === 'banner' && (
        <button className={styles.alert__dismiss}></button>
      )}
      {showIcon && (
        <div className={cn(iconWrapperVariants({ state, size, type }))}>
          <Icon
            size="sm"
            aria-hidden
            name={customIcon || stateIconMap[state]}
            className={cn(iconVariants({ size }))}
          />
        </div>
      )}
      <div className={cn(textWrapperVariants({ size }))}>
        {title && <h6 className={cn(titleVariants({ size }))}>{title}</h6>}
        <div className={cn(textVariants({ size }))}>{text}</div>
      </div>
      {dismissible && (
        <button
          data-testid="click-alert-dismiss-button"
          onClick={handleDismiss}
          className={styles.alert__dismiss}
        >
          <Icon
            name="cross"
            aria-label="close"
          />
        </button>
      )}
    </div>
  ) : null;
};

export const DangerAlert = (props: AlertProps) => (
  <Alert
    {...props}
    state="danger"
  />
);

export const InfoAlert = (props: AlertProps) => (
  <Alert
    {...props}
    state="info"
  />
);

export const SuccessAlert = (props: AlertProps) => (
  <Alert
    {...props}
    state="success"
  />
);

export const WarningAlert = (props: AlertProps) => (
  <Alert
    {...props}
    state="warning"
  />
);
