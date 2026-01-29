import { ChangeEvent, InputHTMLAttributes, forwardRef, useId } from 'react';
import { Icon } from '@/components/Icon/Icon';
import { InputWrapper, NumberInputElement, WrapperProps } from './InputWrapper';
export interface NumberFieldProps
  extends
    Omit<WrapperProps, 'id' | 'children'>,
    Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'dir'> {
  /** The input type - always number for NumberField */
  type?: 'number';
  /** Whether to show a loading spinner */
  loading: boolean;
  /** Callback when the input value changes */
  onChange: (inputValue: string, e?: ChangeEvent<HTMLInputElement>) => void;
  /** The orientation of the label relative to the input */
  orientation?: 'vertical' | 'horizontal';
  /** The direction/position of the label - start places label before, end places label after */
  dir?: 'start' | 'end';
  /** Whether to hide the increment/decrement controls */
  hideControls?: boolean;
}

export const NumberField = forwardRef<HTMLInputElement, NumberFieldProps>(
  (
    {
      disabled,
      label,
      error,
      id,
      loading,
      onChange: onChangeProp,
      orientation,
      dir,
      hideControls,
      ...props
    },
    ref
  ) => {
    const defaultId = useId();
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChangeProp(e.target.value, e);
    };

    return (
      <InputWrapper
        disabled={disabled}
        id={id ?? defaultId}
        label={label}
        error={error}
        orientation={orientation}
        dir={dir}
      >
        <NumberInputElement
          ref={ref}
          type="number"
          id={id ?? defaultId}
          disabled={disabled}
          onChange={onChange}
          $hideControls={hideControls}
          {...props}
        />
        {loading && (
          <Icon
            name="loading-animated"
            size="sm"
          />
        )}
      </InputWrapper>
    );
  }
);
