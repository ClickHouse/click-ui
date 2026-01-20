import { HTMLAttributes, ReactNode } from "react";
import { styled } from "styled-components";

type ButtonGroupType = "default" | "borderless";

export interface ButtonGroupElementProps extends Omit<
  HTMLAttributes<HTMLButtonElement>,
  "children"
> {
  /** The unique value for this button */
  value: string;
  /** The label text to display */
  label?: ReactNode;
}

export interface ButtonGroupProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onClick"
> {
  /** Array of button options to display */
  options: Array<ButtonGroupElementProps>;
  /** The currently selected button value */
  selected?: string;
  /** Callback when a button is clicked */
  onClick?: (value: string) => void;
  /** Whether the button group should fill the full width */
  fillWidth?: boolean;
  /** The style type of the button group */
  type?: ButtonGroupType;
}

export const ButtonGroup = ({
  options,
  selected,
  fillWidth = false,
  onClick,
  type = "default",
  ...props
}: ButtonGroupProps) => {
  const buttons = options.map(({ value, label, ...props }) => {
    const isActive = value === selected;
    return (
      <Button
        key={value}
        $active={isActive}
        aria-pressed={isActive}
        $fillWidth={fillWidth}
        $type={type}
        onClick={() => onClick?.(value)}
        role="button"
        {...props}
      >
        {label}
      </Button>
    );
  });

  return (
    <ButtonGroupWrapper
      $fillWidth={fillWidth}
      $type={type}
      {...props}
    >
      {buttons}
    </ButtonGroupWrapper>
  );
};

const ButtonGroupWrapper = styled.div<{ $fillWidth: boolean; $type: ButtonGroupType }>`
  display: inline-flex;
  box-sizing: border-box;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: ${({ theme, $type }) =>
    `${theme.click.button.group.space.panel[$type].x} ${theme.click.button.group.space.panel[$type].y}`};
  gap: ${({ theme, $type }) => theme.click.button.group.space.panel[$type].gap};
  border: ${({ theme, $type }) =>
    $type === "default"
      ? `1px solid ${theme.click.button.group.color.panel.stroke[$type]}`
      : "none"};
  background: ${({ theme }) => theme.click.button.group.color.background.panel};
  border-radius: ${({ theme }) => theme.click.button.group.radii.panel.all};
  width: ${({ $fillWidth }) => ($fillWidth ? "100%" : "auto")};
`;

const Button = styled.button<{
  $active: boolean;
  $fillWidth: boolean;
  $type: ButtonGroupType;
}>`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: ${({ $active, theme }) =>
    $active
      ? theme.click.button.group.color.background.active
      : theme.click.button.group.color.background.default};
  color: ${({ theme }) => theme.click.button.group.color.text.default};
  font: ${({ theme }) => theme.click.button.group.typography.label.default};
  padding: ${({ theme, $type }) =>
    `${theme.click.button.group.space.button[$type].y} ${theme.click.button.group.space.button[$type].x}`};
  ${({ $fillWidth }) => ($fillWidth ? "flex: 1;" : "")};
  border-radius: ${({ theme, $type }) =>
    theme.click.button.group.radii.button[$type].all};
  cursor: pointer;
  border: none;

  &[aria-pressed="true"] {
    background: ${({ theme }) => theme.click.button.group.color.background.active};
    font: ${({ theme }) => theme.click.button.group.typography.label.active};
    color: ${({ theme }) => theme.click.button.group.color.text.active};
  }

  &:hover {
    background: ${({ theme }) => theme.click.button.group.color.background.hover};
    font: ${({ theme }) => theme.click.button.group.typography.label.hover};
    color: ${({ theme }) => theme.click.button.group.color.text.hover};
  }

  &:disabled {
    cursor: not-allowed;
    font: ${({ theme }) => theme.click.button.group.typography.label.disabled};
    color: ${({ theme }) => theme.click.button.group.color.text.disabled};
    background: ${({ theme, $active }) =>
      theme.click.button.group.color.background[
        $active ? "disabled-active" : "disabled"
      ]};

    &:active,
    &:focus,
    &[aria-pressed="true"] {
      color: ${({ theme }) => theme.click.button.group.color.text.disabled};
    }
  }

  &:active,
  &:focus,
  &[aria-pressed="true"] {
    background: ${({ theme }) => theme.click.button.group.color.background.active};
    font: ${({ theme }) => theme.click.button.group.typography.label.active};
    color: ${({ theme }) => theme.click.button.group.color.text.active};
    &:disabled {
      background: ${({ theme }) =>
        theme.click.button.group.color.background["disabled-active"]};
    }
  }
`;
