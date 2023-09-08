import * as RadixRadioGroup from "@radix-ui/react-radio-group";
import { HTMLAttributes, ReactNode, useId } from "react";
import styled from "styled-components";
import { Label } from "@/components";
import { FormRoot } from "../commonElement";

export interface RadioGroupProps extends RadixRadioGroup.RadioGroupProps {
  inline?: boolean;
}

const RadioGroupRoot = styled(RadixRadioGroup.Root)<{ $inline: "true" | "false" }>`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.click.checkbox.space.gap};
  flex-direction: ${({ $inline }) => ($inline === "true" ? "row" : "column")};
`;

export const RadioGroup = ({ children, inline, ...props }: RadioGroupProps) => {
  return (
    <RadioGroupRoot
      $inline={inline === true ? "true" : "false"}
      {...props}
    >
      {children}
    </RadioGroupRoot>
  );
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
    <Wrapper
      $orientation="horizontal"
      $dir="end"
      {...props}
    >
      <RadioInput
        value={value}
        id={id ?? defaultId}
        disabled={disabled}
        required={required}
      >
        <RadioGroupIndicator />
      </RadioInput>
      {label && (
        <Label
          htmlFor={id ?? defaultId}
          disabled={disabled}
        >
          {label}
        </Label>
      )}
    </Wrapper>
  );
};

RadioGroupItem.displayName = "RadioGroupItem";
RadioGroup.Item = RadioGroupItem;

const Wrapper = styled(FormRoot)`
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
