import { Error, FormElementContainer, FormRoot } from '@/components/FormContainer';
import { Label } from '@/components/Label';
import { cn, cva } from '@/lib/cva';
import {
  ButtonHTMLAttributes,
  ComponentProps,
  ComponentPropsWithRef,
  ElementType,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SVGProps,
  TextareaHTMLAttributes,
  forwardRef,
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
  return (
    <FormRoot
      $orientation={orientation}
      $dir={dir}
      $addLabelPadding
    >
      <FormElementContainer>
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
        {!!error && error !== true && <Error>{error}</Error>}
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
  /** Render as a different element/component (mirrors styled-components `as`). */
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

const _InputElement = <T extends ElementType = 'input'>(
  { as, $hasStartContent, $hasEndContent, className, ...props }: InputElementProps<T>,
  ref: ComponentPropsWithRef<T>['ref']
) => {
  const Component = as ?? 'input';
  return (
    <Component
      ref={ref}
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

export const InputElement: InputElementPolymorphicComponent = forwardRef(_InputElement);

export interface NumberInputElementProps extends InputHTMLAttributes<HTMLInputElement> {
  $hasStartContent?: boolean;
  $hasEndContent?: boolean;
  $hideControls?: boolean;
}

export const NumberInputElement = forwardRef<HTMLInputElement, NumberInputElementProps>(
  ({ $hideControls, $hasStartContent, $hasEndContent, className, ...props }, ref) => (
    <input
      ref={ref}
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
  )
);

export const TextAreaElement = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    {...props}
    className={cn(styles.textarea, className)}
  />
));

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
