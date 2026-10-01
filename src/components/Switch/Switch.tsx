import * as RadixSwitch from '@radix-ui/react-switch';
import { forwardRef, useId } from 'react';
import { FormRoot } from '@/components/FormContainer';
import { GenericLabel } from '@/components/GenericLabel';
import { cn } from '@/lib/cva';
import styles from './Switch.module.css';
import { SwitchProps } from './Switch.types';

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, disabled, orientation, dir, label, id, className, ...props }, ref) => {
    const defaultId = useId();
    return (
      <FormRoot
        $orientation={orientation}
        $dir={dir}
        className={styles.wrapper}
      >
        <RadixSwitch.Root
          ref={ref}
          id={id ?? defaultId}
          disabled={disabled}
          aria-label={`${label}`}
          checked={checked}
          {...props}
          className={cn(styles.switch, className)}
        >
          <RadixSwitch.Thumb className={styles.switch__thumb} />
        </RadixSwitch.Root>
        {label && (
          <GenericLabel
            htmlFor={id ?? defaultId}
            disabled={disabled}
          >
            {label}
          </GenericLabel>
        )}
      </FormRoot>
    );
  }
);
