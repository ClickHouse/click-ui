import { Icon, Label } from "@/components";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { ReactNode, useId } from "react";
import styled from "styled-components";
import { FormRoot } from "../commonElement";

export interface CheckboxProps extends RadixCheckbox.CheckboxProps {
  label?: ReactNode;
  orientation?: "vertical" | "horizontal";
  dir?: "start" | "end";
}

const Wrapper = styled(FormRoot)`
  max-width: fit-content;
`;

export const Checkbox = ({
  id,
  label,
  disabled,
  orientation,
  dir,
  ...delegated
}: CheckboxProps) => {
  const defaultId = useId();
  return (
    <Wrapper
      $orientation={orientation ?? "horizontal"}
      $dir={dir ?? "end"}
    >
      <CheckInput
        id={id ?? defaultId}
        data-testid="checkbox"
        disabled={disabled}
        {...delegated}
      >
        <CheckIconWrapper>
          <Icon
            name="check"
            size="sm"
          />
        </CheckIconWrapper>
      </CheckInput>
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

const CheckInput = styled(RadixCheckbox.Root)`
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => `
    border-radius: ${theme.click.checkbox.radii.all};
    width: ${theme.click.checkbox.size.all};
    height: ${theme.click.checkbox.size.all};
    background: ${theme.click.checkbox.color.background.default};
    border: 1px solid ${theme.click.checkbox.color.stroke.default};
    cursor: pointer;

    &:hover {
      background: ${theme.click.checkbox.color.background.hover};
    }
    &[data-state="checked"] {
      border-color: ${theme.click.checkbox.color.stroke.active};
      background: ${theme.click.checkbox.color.background.active};
    }
    &[data-disabled] {
      background: ${theme.click.checkbox.color.background.disabled};
      border-color: ${theme.click.checkbox.color.stroke.disabled};
      &[data-state="checked"] {
        background: ${theme.click.checkbox.color.background.disabled};
        border-color: ${theme.click.checkbox.color.stroke.disabled};
      }
    }
  `};
`;

const CheckIconWrapper = styled(RadixCheckbox.Indicator)`
  ${({ theme }) => `
    color: ${theme.click.checkbox.color.check.active};
    &[data-disabled] {
      color: ${theme.click.checkbox.color.check.disabled};
    }
  `}
`;
