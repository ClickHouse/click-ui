import { Icon } from "@/components";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { useId } from "react";
import styled from "styled-components";

export interface CheckboxProps extends RadixCheckbox.CheckboxProps {
  label?: string;
}
export const Checkbox = ({ id, label = "", ...delegated }: CheckboxProps) => {
  const defaultId = useId();
  return (
    <Wrapper>
      <CheckInput
        id={id ?? defaultId}
        data-testid="checkbox"
        {...delegated}
      >
        <CheckIconWrapper>
          <Icon
            name="check"
            size="small"
          />
        </CheckIconWrapper>
      </CheckInput>
      {label && <label htmlFor={id ?? defaultId}>{label}</label>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.click.checkbox.space.all};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.click.checkbox.space.gap};
`;

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

    & ~ label {
      color: ${theme.click.checkbox.color.label.default};
      font: ${theme.click.field.typography.fieldText.default}
    }
    &:hover {
      background: ${theme.click.checkbox.color.background.hover};
      &~ label {
        color: ${theme.click.checkbox.color.label.hover};
      }
    }
    &[data-state="checked"] {
      border-color: ${theme.click.checkbox.color.stroke.active};
      background: ${theme.click.checkbox.color.background.active};
      & ~ label {
        color: ${theme.click.checkbox.color.label.active};
      }
    }
    &[data-disabled] {
      background: ${theme.click.checkbox.color.background.disabled};
      border-color: ${theme.click.checkbox.color.stroke.disabled};
      &[data-state="checked"] {
        background: ${theme.click.checkbox.color.background.disabled};
        border-color: ${theme.click.checkbox.color.stroke.disabled};
      }
      & ~ label {
        color: ${theme.click.checkbox.color.label.disabled};
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
