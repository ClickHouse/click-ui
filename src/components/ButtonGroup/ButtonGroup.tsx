import { HTMLAttributes, ReactNode } from "react";
import styled, { DefaultTheme } from "styled-components";

type ButtonGroupType = "default" | "borderless";
export interface ButtonGroupElementProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, "children"> {
  value: string;
  label?: ReactNode;
}

export interface ButtonGroupProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onClick"> {
  options: Array<ButtonGroupElementProps>;
  selected?: string;
  onClick?: (value: string) => void;
  fillWidth?: boolean;
  type?: ButtonGroupType;
}

export const ButtonGroup = ({
  options,
  selected,
  fillWidth,
  onClick,
  type,
  ...props
}: ButtonGroupProps) => {
  const lastIndex = options.length - 1;
  const btns = options.map(({ value, label, ...props }, index) => {
    return (
      <Button
        key={value}
        $active={value === selected}
        $fillWidth={fillWidth}
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
      {btns}
    </ButtonGroupWrapper>
  );
};

interface ButtonProps {
  $active: boolean;
  theme: DefaultTheme;
  $fillWidth?: boolean;
  $type?: ButtonGroupType;
}

const ButtonGroupWrapper = styled.div<{ $fillWidth?: boolean; $type?: ButtonGroupType }>`
  box-sizing: border-box;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: ${({ theme }) => theme.click.button.group.space.gap};
  width: ${({ $fillWidth }) => ($fillWidth ? "100%" : "auto")};
  border: 1px solid
    ${({ theme, $type = "default" }) =>
      theme.click.button.group.color.panel.stroke[$type]};
  border-radius: ${({ theme }) => theme.click.button.group.radii.all};
`;

const Button = styled.button<ButtonProps>`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  background: ${({ $active, theme }: ButtonProps) =>
    $active
      ? theme.click.button.group.color.background.active
      : theme.click.button.group.color.background.default};
  color: ${({ theme }) => theme.click.button.group.color.text.default};
  font: ${({ theme }) => theme.click.button.group.typography.label.default};
  border-radius: ${({ theme }) => theme.click.button.group.radii.all};
  padding: ${({ theme }) => theme.click.button.basic.space.y}
    ${({ theme }) => theme.click.button.basic.space.x};
  gap: ${({ theme }) => theme.click.button.basic.space.group};
  ${({ $fillWidth = false }) => ($fillWidth ? "flex: 1;" : "")}
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.click.button.group.color.background.hover};
    font: ${({ theme }) => theme.click.button.group.typography.label.hover};
  }

  &:disabled {
    cursor: not-allowed;
    font: ${({ theme }) => theme.click.button.group.typography.label.disabled};
    background: ${({ theme, $active }) =>
      theme.click.button.group.color.background[
        $active ? "disabled-active" : "disabled"
      ]};
  }

  &:active,
  &:focus {
    background: ${({ theme }) => theme.click.button.group.color.background.active};
    font: ${({ theme }) => theme.click.button.group.typography.label.active};
    &:disabled {
      background: ${({ theme }) =>
        theme.click.button.group.color.background["disabled-active"]};
    }
  }
`;
