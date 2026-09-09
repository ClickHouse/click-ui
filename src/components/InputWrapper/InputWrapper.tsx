import { Error, FormElementContainer, FormRoot } from '@/components/FormContainer';
import { Label } from '@/components/Label';
import { cn, cva } from '@/lib/cva';
import {
  ButtonHTMLAttributes,
  ComponentProps,
  ComponentPropsWithRef,
  createContext,
  ElementType,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SVGProps,
  TextareaHTMLAttributes,
  forwardRef,
  useContext,
} from 'react';
import styles from './InputWrapper.module.css';

const wrapperVariants = cva(styles.wrapper, {
  variants: {
    error: {
      true: styles.wrapper_error,
      false: '',
    },
    resize: {
      none: '',
      vertical: styles.wrapper_resize_vertical,
      horizontal: styles.wrapper_resize_horizontal,
      both: styles.wrapper_resize_both,
    },
  },
  defaultVariants: {
    error: false,
    resize: 'none',
  },
});

type FieldErrorContextValue = {
  invalid?: boolean;
  describedBy?: string;
};

const FieldErrorContext = createContext<FieldErrorContextValue>({});

export interface WrapperProps {
  className?: string;
  id: string;
  label?: ReactNode;
  labelColor?: string;
  error?: ReactNode;
  disabled?: boolean;
  children: ReactNode;
  orientation?: 'vertical' | 'horizontal';
  dir?: 'start' | 'end';
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

export const InputWrapper = ({
  className,
  id,
  label = '',
  labelColor,
  error,
  disabled,
  children,
  orientation,
  dir,
  resize = 'none',
}: WrapperProps) => {
  const errorId = !!error && error !== true ? `${id}-error` : undefined;
  return (
    <FormRoot
      $orientation={orientation}
      $dir={dir}
      $addLabelPadding
    >
      <FormElementContainer>
        <FieldErrorContext.Provider value={{ invalid: !!error, describedBy: errorId }}>
          <div
            data-resize={resize}
            className={cn(
              wrapperVariants({ error: !!error, resize }),
              disabled && styles.disabled,
              className
            )}
          >
            {children}
          </div>
        </FieldErrorContext.Provider>
        {!!error && error !== true && (
          <Error
            id={errorId}
            role="alert"
          >
            {error}
          </Error>
        )}
      </FormElementContainer>
      {label && (
        <Label
          htmlFor={id}
          disabled={disabled}
          error={!!error}
          style={labelColor ? { color: labelColor } : undefined}
        >
          {label}
        </Label>
      )}
    </FormRoot>
  );
};

const inputVariants = cva(styles.input, {
  variants: {
    hasStartContent: {
      true: styles['input_has-start-content'],
      false: '',
    },
    hasEndContent: {
      true: styles['input_has-end-content'],
      false: '',
    },
  },
  defaultVariants: {
    hasStartContent: false,
    hasEndContent: false,
  },
});

interface InputElementOwnProps {
  $hasStartContent?: boolean;
  $hasEndContent?: boolean;
  /** Render as a different element/component. */
  as?: ElementType;
}

export type InputElementProps<T extends ElementType = 'input'> = Omit<
  ComponentProps<T>,
  keyof InputElementOwnProps
> &
  InputElementOwnProps;

type InputElementPolymorphicComponent = <T extends ElementType = 'input'>(
  props: InputElementProps<T>
) => ReactNode;

const InputElementInner = <T extends ElementType = 'input'>(
  { as, $hasStartContent, $hasEndContent, className, ...props }: InputElementProps<T>,
  ref: ComponentPropsWithRef<T>['ref']
) => {
  const Component = as ?? 'input';
  const { invalid, describedBy } = useContext(FieldErrorContext);
  return (
    <Component
      ref={ref}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      {...props}
      className={cn(
        inputVariants({
          hasStartContent: !!$hasStartContent,
          hasEndContent: !!$hasEndContent,
        }),
        className
      )}
    />
  );
};

export const InputElement: InputElementPolymorphicComponent =
  forwardRef(InputElementInner);

export interface NumberInputElementProps extends InputHTMLAttributes<HTMLInputElement> {
  $hasStartContent?: boolean;
  $hasEndContent?: boolean;
  $hideControls?: boolean;
}

export const NumberInputElement = forwardRef<HTMLInputElement, NumberInputElementProps>(
  ({ $hideControls, $hasStartContent, $hasEndContent, className, ...props }, ref) => {
    const { invalid, describedBy } = useContext(FieldErrorContext);
    return (
      <input
        ref={ref}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        {...props}
        className={cn(
          inputVariants({
            hasStartContent: !!$hasStartContent,
            hasEndContent: !!$hasEndContent,
          }),
          $hideControls && styles['number-input_hide-controls'],
          className
        )}
      />
    );
  }
);

export const TextAreaElement = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  const { invalid, describedBy } = useContext(FieldErrorContext);
  return (
    <textarea
      ref={ref}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      {...props}
      className={cn(styles.textarea, className)}
    />
  );
});

export const IconButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    {...props}
    className={cn(styles['icon-button'], className)}
  />
));

export const IconWrapper = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    className={cn(styles['icon-wrapper'], className)}
  />
);

export const InputStartContent = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    {...props}
    className={cn(styles['start-content'], className)}
  />
);

export const InputEndContent = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    {...props}
    className={cn(styles['end-content'], className)}
  />
);
