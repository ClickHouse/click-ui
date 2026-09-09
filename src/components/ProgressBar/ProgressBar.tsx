import type { CSSProperties } from 'react';
import { ProgressBarProps } from './ProgressBar.types';
import { IconButton } from '@/components/IconButton';
import { cn, cva } from '@/lib/cva';
import styles from './ProgressBar.module.css';

const progressBarVariants = cva(styles.progressbar, {
  variants: {
    type: {
      default: styles['progressbar_type_default'],
      small: styles['progressbar_type_small'],
    },
    orientation: {
      horizontal: styles['progressbar_orientation_horizontal'],
      vertical: styles['progressbar_orientation_vertical'],
    },
    dir: {
      start: styles['progressbar_dir_start'],
      end: styles['progressbar_dir_end'],
    },
    completed: {
      true: styles['progressbar_completed'],
    },
  },
  defaultVariants: {
    type: 'default',
    orientation: 'horizontal',
    dir: 'start',
  },
});

const closeButtonVariants = cva(styles.progressclosebutton, {
  variants: {
    dismissable: {
      true: styles['progressclosebutton_dismissable'],
    },
  },
});

export const ProgressBar = ({
  progress,
  type = 'default',
  dismissable = false,
  onCancel,
  successMessage,
  orientation = 'horizontal',
  dir = 'start',
  className,
  style,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  ...props
}: ProgressBarProps) => {
  const completed = progress === 100;
  const mergedStyle = {
    '--progress': `${progress}%`,
    ...style,
  } as CSSProperties;

  const progressAria = {
    role: 'progressbar' as const,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    'aria-valuemin': 0,
    'aria-valuemax': 100,
    'aria-valuenow': progress,
    'aria-valuetext':
      completed && typeof successMessage === 'string' ? successMessage : undefined,
  };

  return (
    <div
      // Using a CSS variable avoids generating a new class per progress value.
      style={mergedStyle}
      {...props}
      {...(type === 'small' ? progressAria : undefined)}
      className={cn(
        progressBarVariants({ type, orientation, dir, completed }),
        className
      )}
    >
      {type === 'default' && (
        <>
          <span
            {...progressAria}
            className={styles.progresstext}
          >
            {successMessage && completed ? successMessage : `${progress}%`}
          </span>
          <IconButton
            size="sm"
            type="ghost"
            icon="cross"
            onClick={onCancel}
            data-testid="progressbar-close"
            aria-label="Cancel"
            aria-hidden={!dismissable || undefined}
            tabIndex={dismissable ? undefined : -1}
            className={closeButtonVariants({ dismissable })}
          />
        </>
      )}
    </div>
  );
};
