import { Error } from './Error';
import { FormElementContainer } from './FormElementContainer';
import { FormRoot } from './FormRoot';
import { Label } from '@/components/Label';
import { FormContainerProps } from './FormContainer.types';

export const FormContainer = ({
  id,
  htmlFor,
  label,
  orientation,
  dir,
  error,
  children,
  addLabelPadding,
  ...props
}: FormContainerProps) => {
  const controlId = htmlFor ?? id;
  const errorId = controlId && !!error && error !== true ? `${controlId}-error` : undefined;
  return (
    <FormRoot
      $orientation={orientation}
      $dir={dir}
      $addLabelPadding={addLabelPadding}
      {...props}
    >
      <FormElementContainer>
        {children}
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
          htmlFor={controlId}
          error={!!error}
        >
          {label}
        </Label>
      )}
    </FormRoot>
  );
};
