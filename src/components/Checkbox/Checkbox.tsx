import { Icon } from "@/components";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import styled from "styled-components";

export type CheckboxProps = {
  label?: string;
  isDisabled?: boolean;
  isChecked?: boolean;
  onChange?: (checked: boolean) => void;
};
export const Checkbox = ({
  label = "",
  isDisabled = false,
  isChecked = false,
  onChange,
  ...delegated
}: CheckboxProps) => (
  <Wrapper>
    <CheckInput
      disabled={isDisabled}
      checked={isChecked}
      onCheckedChange={onChange}
      data-testid='checkbox'
      {...delegated}
    >
      <CheckIconWrapper>
        <Icon name='check' size='small' />
      </CheckIconWrapper>
    </CheckInput>
    <Label isDisabled={isDisabled} isChecked={isChecked}>
      {label}
    </Label>
  </Wrapper>
);

const Wrapper = styled.div<Partial<CheckboxProps>>`
  padding: ${props => props.theme.click.checkbox.space.all};

  display: flex;
  align-items: center;
  gap: ${props => props.theme.click.checkbox.space.gap};
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

    &[data-state="checked"] {
      border-color: ${theme.click.checkbox.color.stroke.active};
      background: ${theme.click.checkbox.color.background.active};
    }
    &[data-disabled] {
      background: ${theme.click.checkbox.color.background["disabled-checked"]};
      border-color: ${theme.click.checkbox.color.stroke.disabled};
      &[data-state="checked"] {
        background: ${theme.click.checkbox.color.background["disabled-checked"]};
        border-color: ${theme.click.checkbox.color.stroke.disabled};
      }
    }
  `};
`;

const Label = styled.label<Partial<CheckboxProps>>`
  color: ${props =>
    props.isDisabled
      ? props.theme.click.checkbox.color.label.disabled
      : props.theme.click.checkbox.color.label.default};
`;

const CheckIconWrapper = styled(RadixCheckbox.Indicator)`
  ${({ theme }) => `
    color: ${theme.click.checkbox.color.check.active};
    &[data-disabled] {
      color: ${theme.click.checkbox.color.check.disabled};
    }
  `}
`;
