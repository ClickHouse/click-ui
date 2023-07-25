import * as RadixRadioGroup from "@radix-ui/react-radio-group";
import { HTMLAttributes, ReactNode, useId } from "react";
import styled from "styled-components";

export interface RadioGroupProps extends RadixRadioGroup.RadioGroupProps {
  inline?: boolean;
}

const RadioGroupRoot = styled(RadixRadioGroup.Root)<{ inline?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.click.checkbox.space.gap};
  flex-direction: ${({ inline }) => (inline ? "row" : "column")};
`;

export const RadioGroup = ({ children, ...props }: RadioGroupProps) => {
  return <RadioGroupRoot {...props}>{children}</RadioGroupRoot>;
};

interface RadioGroupInputProps extends RadixRadioGroup.RadioGroupItemProps {
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
    <Wrapper {...props}>
      <RadioInput
        value={value}
        id={id ?? defaultId}
        disabled={disabled}
        required={required}
      >
        <RadioGroupIndicator />
      </RadioInput>
      {label && (
        <label
          className="Label"
          htmlFor={id ?? defaultId}
        >
          {label}
        </label>
      )}
    </Wrapper>
  );
};

RadioGroupItem.displayName = "RadioGroupItem";
RadioGroup.Item = RadioGroupItem;

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.click.checkbox.space.all};

  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.click.checkbox.space.gap};
`;

const RadioInput = styled(RadixRadioGroup.Item)`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  ${({ theme }) => `
    border-radius: ${theme.click.radio.radii.all};
    width: 1rem;
    height: 1rem;
    background: ${theme.click.radio.color.background.default};
    border: 1px solid ${theme.click.radio.color.stroke.default};

    & ~ label {
      color: ${theme.click.field.color.genericLabel.default};
      font: ${theme.click.radio.typography.label.default};
    }
    &:hover {
      background: ${theme.click.radio.color.background.hover};
      & ~ label {
        color: ${theme.click.field.color.genericLabel.hover};
        font: ${theme.click.radio.typography.label.hover};
      }
    }
    &[data-state="checked"] {
      border-color: ${theme.click.radio.color.stroke.active};
      background: ${theme.click.radio.color.background.active};
      & ~ label {
        color: ${theme.click.field.color.genericLabel.active};
        font: ${theme.click.radio.typography.label.active};
      }
    }
    &[data-disabled] {
      background: ${theme.click.radio.color.background.disabled};
      border-color: ${theme.click.radio.color.stroke.disabled};
      & ~ label {
        color: ${theme.click.field.color.genericLabel.disabled};
        font: ${theme.click.radio.typography.label.disabled};
      }
    }
  `};
`;

const RadioGroupIndicator = styled(RadixRadioGroup.Indicator)`
  ${({ theme }) => `
    background: ${theme.click.radio.color.background.default};
    &[data-state="checked"] {
      background: ${theme.click.radio.color.background.active};
    }
    &:hover {
      background: ${theme.click.radio.color.background.hover};
    }
    &[data-disabled] {
      background: ${theme.click.radio.color.background.disabled};
    }
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
      &[data-state="checked"] {
        background: ${theme.click.radio.color.indicator.active};
      }
      &[data-disabled] {
        background: ${theme.click.radio.color.indicator.disabled};
      }
    }
  `}
`;
