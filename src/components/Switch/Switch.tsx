import { Theme } from "@/styles/types";
import * as RadixSwitch from "@radix-ui/react-switch";
import { ReactNode, forwardRef, useId } from "react";
import { DefaultTheme, styled } from "styled-components";
import { FormRoot } from "../commonElement";
import { GenericLabel } from "@/components";

interface RootProps {
  checked: boolean;
  disabled?: boolean;
  orientation?: "vertical" | "horizontal";
  dir?: "start" | "end";
  label?: ReactNode;
}

type SwitchProps = RootProps & Omit<RadixSwitch.SwitchProps, "dir">;

interface ThumbProps {
  $checked: boolean;
  $disabled?: boolean;
}

const Wrapper = styled(FormRoot)`
  align-items: center;
  max-width: fit-content;
`;

const StyledLabel = styled(GenericLabel)<{ disabled?: boolean }>`
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
`;

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, disabled, orientation, dir, label, id, ...props }, ref) => {
    const defaultId = useId();
    return (
      <Wrapper
        $orientation={orientation}
        $dir={dir}
      >
        <SwitchRoot
          ref={ref}
          id={id ?? defaultId}
          disabled={disabled}
          aria-label={`${label}`}
          checked={checked}
          {...props}
        >
          <SwitchThumb $checked={checked} />
        </SwitchRoot>
        {label && (
          <StyledLabel
            htmlFor={id ?? defaultId}
            disabled={disabled}
          >
            {label}
          </StyledLabel>
        )}
      </Wrapper>
    );
  }
);

const getRootVars = (theme: Theme, disabled: boolean | undefined, checked: boolean) => {
  const baseVars = {};

  if (disabled) {
    return {
      ...baseVars,
      backgroundColor: theme.click.switch.color.background.disabled,
      border: `1px solid ${theme.click.switch.color.stroke.disabled}`,
    };
  } else if (checked) {
    return {
      ...baseVars,
      backgroundColor: theme.click.switch.color.background.active,
      border: `1px solid ${theme.click.switch.color.stroke.active}`,
    };
  } else {
    return {
      ...baseVars,
      backgroundColor: theme.click.switch.color.background.default,
      border: `1px solid ${theme.click.switch.color.stroke.default}`,
    };
  }
};

const getThumbVars = (
  theme: DefaultTheme,
  disabled: boolean | undefined,
  checked: boolean
) => {
  const baseVars = {};

  if (disabled) {
    return {
      ...baseVars,
      backgroundColor: theme.click.switch.color.indicator.disabled,
    };
  } else if (checked) {
    return {
      ...baseVars,
      backgroundColor: theme.click.switch.color.indicator.active,
    };
  } else {
    return {
      ...baseVars,
      backgroundColor: theme.click.switch.color.indicator.default,
    };
  }
};

const SwitchRoot = styled(RadixSwitch.Root)<RootProps>(props => {
  const vars = getRootVars(props.theme, props.disabled, props.checked);

  return {
    width: props.theme.click.switch.size.width,
    height: props.theme.click.switch.size.height,
    backgroundColor: vars.backgroundColor,
    border: vars.border,
    borderRadius: props.theme.click.switch.radii.all,
    position: "relative",
    padding: 0,
    cursor: props.disabled ? "not-allowed" : "pointer",
  };
});

const SwitchThumb = styled(RadixSwitch.Thumb)<ThumbProps>(props => {
  const vars = getThumbVars(props.theme, props.$disabled, props.$checked);

  return {
    display: "block",
    width: "12px",
    height: "12px",
    backgroundColor: vars.backgroundColor,
    borderRadius: props.theme.click.switch.radii.all,
    transition: "transform 100ms",
    transform: props.$checked ? "translateX(15px)" : "translateX(2px)",
    willChange: "transform",
  };
});
