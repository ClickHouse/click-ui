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
  <Wrapper isDisabled={isDisabled} isChecked={isChecked}>
    <CheckInput
      disabled={isDisabled}
      checked={isChecked}
      onCheckedChange={onChange}
      data-testid="checkbox"
      {...delegated}
    >
      <RadixCheckbox.Indicator>
        <CheckIconWrapper>
          <Icon name="check" width={"12px"} height={"12px"} color="white" />
        </CheckIconWrapper>
      </RadixCheckbox.Indicator>
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
  border: 1px solid
    ${props =>
      props.disabled
        ? props.theme.click.checkbox.color.stroke.default
        : props.theme.click.checkbox.color.stroke.disabled};

  border-radius: ${props => props.theme.click.checkbox.radii.all};
  width: ${props => props.theme.click.checkbox.size.all};
  height: ${props => props.theme.click.checkbox.size.all};
  background-color: ${props =>
    props.disabled
      ? props.checked
        ? props.theme.click.checkbox.color.background["disabled-checked"]
        : props.theme.click.checkbox.color.background["disabled-unchecked"]
      : props.checked
      ? props.theme.click.checkbox.color.background.default
      : "revert"};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Label = styled.label<Partial<CheckboxProps>>`
  color: ${props =>
    props.isDisabled
      ? props.theme.click.checkbox.color.label.disabled
      : props.theme.click.checkbox.color.label.default};
`;

const CheckIconWrapper = styled.div<Partial<CheckboxProps>>`
  color: ${props =>
    props.isDisabled
      ? props.theme.click.checkbox.color.check.disabled
      : props.theme.click.checkbox.color.check.default};
`;
