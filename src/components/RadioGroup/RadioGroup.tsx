import * as RadixRadioGroup from '@radix-ui/react-radio-group';
import { HTMLAttributes, ReactNode, useId } from 'react';
import { styled } from 'styled-components';
import { GenericLabel, Label } from '@/components';
import { Error, FormElementContainer, FormRoot } from '../commonElement';

export interface RadioGroupProps extends Omit<RadixRadioGroup.RadioGroupProps, 'dir'> {
  /** Whether to display radio items inline (horizontally) */
  inline?: boolean;
  /** The orientation of the label relative to the radio group */
  orientation?: 'vertical' | 'horizontal';
  /** The direction/position of the label - start places label before, end places label after */
  dir?: 'start' | 'end';
  /** Text direction for radio items - ltr or rtl */
  itemDir?: 'rtl' | 'ltr';
  /** The label text displayed next to the radio group */
  label?: ReactNode;
  /** Error message to display below the radio group */
  error?: ReactNode;
}

const RadioGroupRoot = styled(RadixRadioGroup.Root)<{
  $error: boolean;
  $inline?: boolean;
}>`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.click.checkbox.space.gap};
  flex-direction: ${({ $inline = true }) => ($inline === true ? 'row' : 'column')};
  label {
    ${({ $error, theme }) =>
      $error ? `color: ${theme.click.field.color.label.error};` : ''}
  }
`;

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
  ...props
}: RadioGroupProps) => {
  return (
    <FormRoot
      $orientation={orientation}
      $dir={dir}
      $addLabelPadding
    >
      <FormElementContainer>
        <RadioGroupRoot
          orientation={inline ? 'horizontal' : 'vertical'}
          disabled={disabled}
          id={id}
          $error={!!error}
          dir={itemDir}
          $inline={inline}
          {...props}
        >
          {children}
        </RadioGroupRoot>
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

interface RadioGroupInputProps extends RadixRadioGroup.RadioGroupItemProps {
  /** The label text displayed next to the radio item */
  label?: ReactNode;
}

export type RadioGroupItemProps = RadioGroupInputProps & HTMLAttributes<HTMLDivElement>;

const RadioGroupItem = ({
  id,
  label,
  value,
  disabled,
  required,
  ...props
}: RadioGroupItemProps) => {
  const defaultId = useId();
  return (
    <Wrapper
      $orientation="horizontal"
      $dir="end"
      $addLabelPadding={false}
      {...props}
    >
      <RadioInput
        value={value}
        id={id ?? defaultId}
        disabled={disabled}
        required={required}
        aria-label={`${label}`}
      >
        <RadioGroupIndicator />
      </RadioInput>
      {label && (
        <GenericLabel
          htmlFor={id ?? defaultId}
          disabled={disabled}
        >
          {label}
        </GenericLabel>
      )}
    </Wrapper>
  );
};

RadioGroupItem.displayName = 'RadioGroupItem';
RadioGroup.Item = RadioGroupItem;

const Wrapper = styled(FormRoot)`
  padding: ${({ theme }) => theme.click.checkbox.space.all};

  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.click.checkbox.space.gap};
  width: auto;
`;

const RadioInput = styled(RadixRadioGroup.Item)`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  cursor: pointer;
  ${({ theme }) => `
    border-radius: ${theme.click.radio.radii.all};
    width: 1rem;
    height: 1rem;
    background: ${theme.click.radio.color.background.default};
    border: 1px solid ${theme.click.radio.color.stroke.default};

    &:hover {
      background: ${theme.click.radio.color.background.hover};
    }
    &[data-state="checked"] {
      border-color: ${theme.click.radio.color.stroke.active};
      background: ${theme.click.radio.color.background.active};
    }
    &[data-disabled] {
      background: ${theme.click.radio.color.background.disabled};
      border-color: ${theme.click.radio.color.stroke.disabled};
    }
  `};
`;

const RadioGroupIndicator = styled(RadixRadioGroup.Indicator)`
  ${({ theme }) => `
    background: ${theme.click.radio.color.background.default};
    &::after {
      content: '';
      display: block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: ${theme.click.radio.color.indicator.default};
      &:hover {
        background: ${theme.click.radio.color.indicator.hover};
      }
    }
    &[data-state="checked"] {
      background: ${theme.click.radio.color.background.active};
      &::after {
        background: ${theme.click.radio.color.indicator.active};
      }
    }
    &:hover {
      background: ${theme.click.radio.color.background.hover};
    }
    &[data-disabled] {
      background: ${theme.click.radio.color.background.disabled};
      &::after {
        background: ${theme.click.radio.color.indicator.disabled};
      }
    }
  `}
`;
