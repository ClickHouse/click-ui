import { GenericLabel, Icon } from "@/components";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { ReactNode, useId } from "react";
import { styled } from "styled-components";
import { FormRoot } from "../commonElement";

export type CheckboxVariants =
  | "default"
  | "var1"
  | "var2"
  | "var3"
  | "var4"
  | "var5"
  | "var6";

export interface CheckboxProps extends RadixCheckbox.CheckboxProps {
  label?: ReactNode;
  orientation?: "vertical" | "horizontal";
  variant?: CheckboxVariants;
  dir?: "start" | "end";
}

const Wrapper = styled(FormRoot)`
  align-items: center;
  max-width: fit-content;
`;

export const Checkbox = ({
  id,
  label,
  variant,
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
        variant={variant ?? "default"}
        disabled={disabled}
        aria-label={`${label}`}
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

const CheckInput = styled(RadixCheckbox.Root)<{
  variant: CheckboxVariants;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  ${({ theme, variant = "default" }) => `
    border-radius: ${theme.click.checkbox.radii.all};
    width: ${theme.click.checkbox.size.all};
    height: ${theme.click.checkbox.size.all};
    background: ${theme.click.checkbox.color.variations[variant].background.default};
    border: 1px solid ${theme.click.checkbox.color.variations[variant].stroke.default};
    cursor: pointer;

    &:hover {
      background: ${theme.click.checkbox.color.variations[variant].background.hover};
    }
    &[data-state="checked"] {
      border-color: ${theme.click.checkbox.color.variations[variant].stroke.active};
      background: ${theme.click.checkbox.color.variations[variant].background.active};
    }
    &[data-disabled] {
      background: ${theme.click.checkbox.color.background.disabled};
      border-color: ${theme.click.checkbox.color.stroke.disabled};
      cursor: not-allowed;
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
