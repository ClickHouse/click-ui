import {
  ChangeEvent,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  useId,
  useRef,
} from 'react';
import { Icon } from '@/components/Icon';
import {
  InputEndContent,
  InputStartContent,
  InputWrapper,
  NumberInputElement,
  WrapperProps,
} from '@/components/InputWrapper';
import { mergeRefs } from '@/utils/mergeRefs';
export interface NumberFieldProps
  extends
    Omit<WrapperProps, 'id' | 'children'>,
    Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'dir'> {
  /** The input type - always number for NumberField */
  type?: 'number';
  /** Whether to show a loading spinner */
  loading?: boolean;
  /** Callback when the input value changes */
  onChange: (inputValue: string, e?: ChangeEvent<HTMLInputElement>) => void;
  /** The orientation of the label relative to the input */
  orientation?: 'vertical' | 'horizontal';
  /** The direction/position of the label - start places label before, end places label after */
  dir?: 'start' | 'end';
  /** Whether to hide the increment/decrement controls */
  hideControls?: boolean;
  /** Additional content to the left of the control */
  startContent?: ReactNode;
  /** Additional content to the right of the control */
  endContent?: ReactNode;
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
      startContent,
      endContent,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const defaultId = useId();
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChangeProp(e.target.value, e);
    };

    const handleStartContentClick: React.MouseEventHandler<HTMLDivElement> = () => {
      inputRef.current?.focus();
    };

    const hasStartContent = Boolean(startContent);
    const hasEndContent = Boolean(loading || endContent);

    return (
      <InputWrapper
        disabled={disabled}
        id={id ?? defaultId}
        label={label}
        error={error}
        orientation={orientation}
        dir={dir}
      >
        {startContent && (
          <InputStartContent onClick={handleStartContentClick}>
            {startContent}
          </InputStartContent>
        )}
        <NumberInputElement
          ref={mergeRefs([inputRef, ref])}
          type="number"
          id={id ?? defaultId}
          disabled={disabled}
          onChange={onChange}
          $hideControls={hideControls}
          $hasStartContent={hasStartContent}
          $hasEndContent={hasEndContent}
          {...props}
        />
        {hasEndContent && (
          <InputEndContent>
            {endContent ? endContent : null}
            {loading && (
              <Icon
                name="loading-animated"
                size="sm"
              />
            )}
          </InputEndContent>
        )}
      </InputWrapper>
    );
  }
);
