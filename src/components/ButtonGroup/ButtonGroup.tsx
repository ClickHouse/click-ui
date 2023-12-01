import { HTMLAttributes, ReactNode } from "react";
import styled, { DefaultTheme } from "styled-components";

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
}

export const ButtonGroup = ({
  options,
  selected,
  fillWidth,
  onClick,
  ...props
}: ButtonGroupProps) => {
  const lastIndex = options.length - 1;
  const btns = options.map(({ value, label, ...props }, index) => {
    const position: ButtonPosition =
      index === 0 ? "left" : index === lastIndex ? "right" : "center";
    return (
      <Button
        key={value}
        $active={value === selected}
        $position={position}
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
      {...props}
    >
      {btns}
    </ButtonGroupWrapper>
  );
};

type ButtonPosition = "left" | "center" | "right";

interface ButtonProps {
  $active: boolean;
  $position: ButtonPosition;
  theme: DefaultTheme;
  $fillWidth?: boolean;
}

const ButtonGroupWrapper = styled.div<{ $fillWidth?: boolean }>`
  box-sizing: border-box;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  border: 1px solid ${({ theme }) => theme.click.button.group.color.stroke.panel};
  background: ${({ theme }) => theme.click.button.group.color.background.panel};
  border-radius: ${({ theme }) => theme.click.button.group.radii.end};
  width: ${({ $fillWidth }) => ($fillWidth ? "100%" : "auto")};
`;

const endRadii = "var(--click-button-button-group-radii-end)";
const leftBorderRadius = `${endRadii} 0px 0px ${endRadii}`;
const rightBorderRadius = `0px ${endRadii} ${endRadii} 0px`;
const centerBorderRadius = "var(--click-button-button-group-radii-center)";

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
  border-radius: ${({ theme }) => theme.click.button.group.radii.end};
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

  border-radius: ${({ $position }: ButtonProps) =>
    $position === "left"
      ? leftBorderRadius
      : $position === "right"
      ? rightBorderRadius
      : centerBorderRadius};
`;
