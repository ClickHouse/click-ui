import { Error } from './Error';
import { FormElementContainer } from './FormElementContainer';
import { FormRoot } from './FormRoot';
import { Label } from '@/components/Label';
import { FormContainerProps } from './FormContainer.types';

export const FormContainer = ({
  id,
  label,
  orientation,
  dir,
  error,
  children,
  addLabelPadding,
  ...props
}: FormContainerProps) => (
  <FormRoot
    $orientation={orientation}
    $dir={dir}
    $addLabelPadding={addLabelPadding}
    {...props}
  >
    <FormElementContainer>
      {children}
      {!!error && error !== true && <Error>{error}</Error>}
    </FormElementContainer>
    {label && (
      <Label
        htmlFor={id}
        error={!!error}
      >
        {label}
      </Label>
    )}
  </FormRoot>
);
