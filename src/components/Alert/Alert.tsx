import { Icon, type IconName } from '@/components/Icon';
import { useState, useCallback, useId, useMemo, type CSSProperties } from 'react';
import { cn, cva } from '@/lib/cva';
import { AlertProps } from './Alert.types';
import styles from './Alert.module.css';
import { useAlertOverflow } from './useAlertOverflow';

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

const toggleVariants = cva(styles.alert__toggle, {
  variants: {
    size: {
      small: styles.alert__toggle_size_small,
      medium: styles.alert__toggle_size_medium,
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
  className,
  preserveLineBreaks = false,
  maxHeight,
  onExpandedChange,
  expandLabel = 'Show more',
  collapseLabel = 'Show less',
  ...delegated
}: AlertProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const textId = useId();
  const titleId = useId();
  const hasMaxHeight = maxHeight !== undefined;
  const { rootRef, textRef, toggleRef, isOverflowing, isFadeVisible } = useAlertOverflow({
    enabled: hasMaxHeight && isVisible,
    expanded: isExpanded,
  });

  const rootStyle = useMemo(
    () =>
      hasMaxHeight
        ? ({
            '--alert-max-height':
              typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
          } as CSSProperties)
        : undefined,
    [hasMaxHeight, maxHeight]
  );

  const handleDismiss = useCallback(() => {
    setIsVisible(false);
    onDismiss?.();
  }, [onDismiss]);

  const changeExpanded = useCallback(
    (expanded: boolean) => {
      setIsExpanded(expanded);
      onExpandedChange?.(expanded);
    },
    [onExpandedChange]
  );

  const handleToggle = useCallback(() => {
    if (isExpanded && textRef.current) {
      textRef.current.scrollTop = 0;
    }
    changeExpanded(!isExpanded);
  }, [isExpanded, textRef, changeExpanded]);

  const handleTextFocus = useCallback(() => {
    if (isOverflowing && !isExpanded) {
      changeExpanded(true);
    }
  }, [isOverflowing, isExpanded, changeExpanded]);

  const isScrollable = isExpanded && isOverflowing;
  const hasTitle = Boolean(title);

  return isVisible ? (
    <div
      ref={rootRef}
      data-testid="click-alert"
      style={rootStyle}
      {...delegated}
      className={cn(
        wrapperVariants({ state, type }),
        hasMaxHeight && styles['alert_max-height'],
        hasMaxHeight && isExpanded && styles.alert_expanded,
        className
      )}
    >
      {dismissible && type === 'banner' && (
        <span
          aria-hidden="true"
          className={styles.alert__spacer}
        />
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
        {title && (
          <h6
            id={hasMaxHeight ? titleId : undefined}
            className={cn(titleVariants({ size }))}
          >
            {title}
          </h6>
        )}
        <div
          ref={textRef}
          id={hasMaxHeight ? textId : undefined}
          tabIndex={isScrollable ? 0 : undefined}
          role={isScrollable && hasTitle ? 'region' : undefined}
          aria-labelledby={isScrollable && hasTitle ? titleId : undefined}
          onFocus={hasMaxHeight ? handleTextFocus : undefined}
          className={cn(
            textVariants({ size }),
            preserveLineBreaks &&
              typeof text === 'string' &&
              styles['alert__text_pre-wrap'],
            hasMaxHeight && isExpanded && styles.alert__text_expanded,
            hasMaxHeight && !isFadeVisible && styles['alert__text_no-fade']
          )}
        >
          {text}
        </div>
        {isOverflowing && (
          <button
            ref={toggleRef}
            type="button"
            data-testid="click-alert-toggle"
            aria-expanded={isExpanded}
            aria-controls={textId}
            onClick={handleToggle}
            className={cn(toggleVariants({ size }))}
          >
            {isExpanded ? collapseLabel : expandLabel}
          </button>
        )}
      </div>
      {dismissible && (
        <button
          type="button"
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
