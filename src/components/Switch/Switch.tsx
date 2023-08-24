import { Theme } from "@/styles/types";
import * as RadixSwitch from "@radix-ui/react-switch";
import { forwardRef } from "react";
import styled, { DefaultTheme } from "styled-components";

interface RootProps {
  checked: boolean;
  disabled?: boolean;
}

type SwitchProps = RootProps & RadixSwitch.SwitchProps;

interface ThumbProps {
  $checked: boolean;
  $disabled?: boolean;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, disabled, ...props }, ref) => (
    <SwitchRoot
      ref={ref}
      disabled={disabled}
      checked={checked}
      {...props}
    >
      <SwitchThumb $checked={checked} />
    </SwitchRoot>
  )
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
