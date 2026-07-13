import { GenericLabel } from '@/components/GenericLabel';
import { Icon } from '@/components/Icon';

import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { useId } from 'react';
import { FormRoot } from '@/components/FormContainer';
import { cn, cva } from '@/lib/cva';
import styles from './Checkbox.module.css';
import { CheckboxProps } from './Checkbox.types';

const checkInputVariants = cva(styles.checkinput, {
  variants: {
    variant: {
      default: styles['checkinput_variant_default'],
      var1: styles['checkinput_variant_var1'],
      var2: styles['checkinput_variant_var2'],
      var3: styles['checkinput_variant_var3'],
      var4: styles['checkinput_variant_var4'],
      var5: styles['checkinput_variant_var5'],
      var6: styles['checkinput_variant_var6'],
      var7: styles['checkinput_variant_var7'],
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const Checkbox = ({
  id,
  label,
  variant = 'default',
  disabled,
  orientation = 'horizontal',
  dir = 'end',
  checked,
  className,
  ...delegated
}: CheckboxProps) => {
  const defaultId = useId();
  return (
    <FormRoot
      $orientation={orientation}
      $dir={dir}
      className={styles.wrapper}
    >
      <RadixCheckbox.Root
        id={id ?? defaultId}
        data-testid="checkbox"
        disabled={disabled}
        aria-label={`${label}`}
        checked={checked}
        {...delegated}
        className={cn(checkInputVariants({ variant }), className)}
      >
        <RadixCheckbox.Indicator className={styles.checkicon}>
          <Icon
            name={checked === 'indeterminate' ? 'minus' : 'check'}
            size="sm"
          />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
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
};
