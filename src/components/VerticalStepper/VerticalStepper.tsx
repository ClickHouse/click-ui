import { createContext, useContext } from 'react';
import { Icon } from '@/components/Icon';
import { cn, cva } from '@/lib/cva';
import styles from './VerticalStepper.module.css';
import {
  VerticalStepperProps,
  VerticalStepProps,
  StepperType,
} from './VerticalStepper.types';

type ContextProps = {
  type: StepperType;
};

const StepperContext = createContext<ContextProps>({
  type: 'numbered',
});

export const VerticalStepper = ({
  children,
  type = 'numbered',
  className,
  ...props
}: VerticalStepperProps) => {
  const value = {
    type,
  };
  return (
    <div
      {...props}
      className={cn(styles.stepper, className)}
    >
      <StepperContext.Provider value={value}>{children}</StepperContext.Provider>
    </div>
  );
};

const stepVariants = cva(styles.step, {
  variants: {
    type: {
      numbered: styles.step_type_numbered,
      bulleted: styles.step_type_bulleted,
    },
    status: {
      active: styles.step_status_active,
      complete: styles.step_status_complete,
      incomplete: '',
    },
    isOpen: {
      true: styles.step_open,
      false: '',
    },
  },
});

const triggerVariants = cva(styles.step__trigger, {
  variants: {
    status: {
      active: styles.step__trigger_status_active,
      complete: styles.step__trigger_status_complete,
      incomplete: '',
    },
  },
});

const bubbleVariants = cva(styles.step__bubble, {
  variants: {
    type: {
      numbered: styles.step__bubble_type_numbered,
      bulleted: styles.step__bubble_type_bulleted,
    },
    status: {
      active: styles.step__bubble_status_active,
      complete: styles.step__bubble_status_complete,
      incomplete: styles.step__bubble_status_incomplete,
    },
  },
});

const labelVariants = cva(styles.step__label, {
  variants: {
    type: {
      numbered: styles.step__label_type_numbered,
      bulleted: styles.step__label_type_bulleted,
    },
    status: {
      active: styles.step__label_status_active,
      complete: styles.step__label_status_complete,
      incomplete: '',
    },
  },
});

const contentVariants = cva(styles.step__content, {
  variants: {
    type: {
      numbered: styles.step__content_type_numbered,
      bulleted: styles.step__content_type_bulleted,
    },
  },
});

const VerticalStep = ({
  status = 'incomplete',
  children,
  label,
  collapsed = true,
  disabled,
  className,
  ...props
}: VerticalStepProps) => {
  const { type } = useContext(StepperContext);
  const isOpen = !collapsed || status === 'active';
  return (
    <div className={cn(stepVariants({ type, status, isOpen }))}>
      <button
        disabled={status === 'incomplete' || disabled}
        {...props}
        className={cn(triggerVariants({ status }), className)}
      >
        <div className={cn(bubbleVariants({ type, status }))}>
          {type === 'numbered' && status === 'complete' ? (
            <Icon
              name="check"
              size="xs"
              className={styles.step__check}
            />
          ) : null}
        </div>
        {label && <div className={cn(labelVariants({ type, status }))}>{label}</div>}
      </button>
      {isOpen && <div className={cn(contentVariants({ type }))}>{children}</div>}
    </div>
  );
};
VerticalStep.displayName = 'VerticalStepper.Step';
VerticalStepper.Step = VerticalStep;
