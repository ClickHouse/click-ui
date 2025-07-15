import { HTMLAttributes, ReactNode } from "react";
import { DefaultTheme, styled } from "styled-components";

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
    const position: ButtonPosition =
      index === 0 ? "left" : index === lastIndex ? "right" : "center";
    return (
      <Button
        key={value}
        $active={value === selected}
        $position={position}
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
  $type?: ButtonGroupType;
}

const ButtonGroupWrapper = styled.div<{ $fillWidth?: boolean; $type?: ButtonGroupType }>`
  display: inline-flex;
  box-sizing: border-box;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: ${({ theme, $type = "default" }) =>
    `${theme.click.button.group.space.panel[$type].x} ${theme.click.button.group.space.panel[$type].y}`};
  gap: ${({ theme, $type = "default" }) =>
    theme.click.button.group.space.panel[$type].gap};
  border: 1px solid
    ${({ theme, $type = "default" }) =>
      theme.click.button.group.color.panel.stroke[$type]};
  background: ${({ theme }) => theme.click.button.group.color.background.panel};
  border-radius: ${({ theme }) => theme.click.button.group.radii.panel.all};
  width: ${({ $fillWidth }) => ($fillWidth ? "100%" : "auto")};
`;

const Button = styled.button.attrs<ButtonProps>((props: ButtonProps) => ({
  "aria-pressed": props.$active,
}))`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: ${({ $active, theme }: ButtonProps) =>
    $active
      ? theme.click.button.group.color.background.active
      : theme.click.button.group.color.background.default};
  color: ${({ theme }) => theme.click.button.group.color.text.default};
  font: ${({ theme }) => theme.click.button.group.typography.label.default};
  padding: ${({ theme, $type = "default" }) =>
    `${theme.click.button.group.space.button[$type].y} ${theme.click.button.group.space.button[$type].x}`};
  ${({ $fillWidth = false }) => ($fillWidth ? "flex: 1;" : "")};
  border-radius: ${({ theme, $type = "default" }) =>
    theme.click.button.group.radii.button[$type].all};
  cursor: pointer;
  border: none;

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
