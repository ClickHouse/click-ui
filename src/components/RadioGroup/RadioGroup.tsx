import * as RadixRadioGroup from '@radix-ui/react-radio-group';
import { useId } from 'react';
import { GenericLabel } from '@/components/GenericLabel';
import { Label } from '@/components/Label';
import { Error, FormElementContainer, FormRoot } from '@/components/FormContainer';
import { cn, cva } from '@/lib/cva';
import type { RadioGroupItemProps, RadioGroupProps } from './RadioGroup.types';
import styles from './RadioGroup.module.css';

const radioGroupVariants = cva(styles['radio-group'], {
  variants: {
    inline: {
      true: styles['radio-group_inline'],
      false: styles['radio-group_inline_false'],
    },
    error: {
      true: styles['radio-group_error'],
      false: '',
    },
  },
  defaultVariants: {
    inline: true,
    error: false,
  },
});

export const RadioGroup = ({
  children,
  inline,
  orientation,
  dir,
  error,
  itemDir,
  label,
  disabled,
  id,
  className,
  ...props
}: RadioGroupProps) => {
  return (
    <FormRoot
      $orientation={orientation}
      $dir={dir}
      $addLabelPadding
    >
      <FormElementContainer>
        <RadixRadioGroup.Root
          orientation={inline ? 'horizontal' : 'vertical'}
          disabled={disabled}
          id={id}
          dir={itemDir}
          {...props}
          className={cn(
            radioGroupVariants({
              inline: inline === false ? false : true,
              error: !!error,
            }),
            className
          )}
        >
          {children}
        </RadixRadioGroup.Root>
        {!!error && error !== true && <Error>{error}</Error>}
      </FormElementContainer>
      {label && (
        <Label
          htmlFor={id}
          disabled={disabled}
          error={!!error}
        >
          {label}
        </Label>
      )}
    </FormRoot>
  );
};

const RadioGroupItem = ({
  id,
  label,
  value,
  disabled,
  required,
  className,
  ...props
}: RadioGroupItemProps) => {
  const defaultId = useId();
  return (
    <FormRoot
      $orientation="horizontal"
      $dir="end"
      $addLabelPadding={false}
      {...props}
      className={cn(styles.item, className)}
    >
      <RadixRadioGroup.Item
        value={value}
        id={id ?? defaultId}
        disabled={disabled}
        required={required}
        aria-label={`${label}`}
        className={styles['radio-input']}
      >
        <RadixRadioGroup.Indicator className={styles['radio-indicator']} />
      </RadixRadioGroup.Item>
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

RadioGroupItem.displayName = 'RadioGroupItem';
RadioGroup.Item = RadioGroupItem;
