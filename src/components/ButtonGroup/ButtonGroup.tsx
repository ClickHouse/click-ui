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
  fillWidth = false,
  onClick,
  type = "default",
  ...props
}: ButtonGroupProps) => {
  const buttons = options.map(({ value, label, ...props }) => (
    <Button
      key={value}
      $active={value === selected}
      $fillWidth={fillWidth}
      $type={type}
      onClick={() => onClick?.(value)}
      role="button"
      {...props}
    >
      {label}
    </Button>
  ));

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
  // TODO create a token
  --outer-spacing: ${({ $type }) => ($type === "default" ? "3px" : "0")};

  box-sizing: border-box;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: var(--outer-spacing);
  // TODO remove extra token?
  // TODO make gap match outer spacing
  gap: ${({ theme }) => theme.click.button.group.space.gap.borderless};
  border: 1px solid
    ${({ theme, $type }) => theme.click.button.group.color.panel.stroke[$type]};
  background: ${({ theme }) => theme.click.button.group.color.background.panel};
  border-radius: ${({ theme }) => theme.click.button.group.radii.all};
  width: ${({ $fillWidth }) => ($fillWidth ? "100%" : "auto")};
`;

interface ButtonProps {
  $active: boolean;
  theme: DefaultTheme;
  $fillWidth: boolean;
  $type: ButtonGroupType;
}

const Button = styled.button.attrs<ButtonProps>((props: ButtonProps) => ({
  "aria-pressed": props.$active,
}))`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  background: ${({ $active, theme }: ButtonProps) =>
    $active
      ? theme.click.button.group.color.background.active // TODO light theme background is barely visible
      : theme.click.button.group.color.background.default};
  color: ${({ theme }) => theme.click.button.group.color.text.default};
  // TODO why specify font?? we only need base font-size and line-height
  font: ${({ theme }) => theme.click.button.group.typography.label.default};
  // TODO token for line-height
  line-height: ${({ $type }) =>
    $type === "default" ? "calc(150% - 2 * var(--outer-spacing))" : "150%"};
  padding: ${({ theme }) => theme.click.button.basic.space.y}
    ${({ theme }) => theme.click.button.basic.space.x};
  gap: ${({ theme }) => theme.click.button.basic.space.group};
  ${({ $fillWidth }) => ($fillWidth ? "flex: 1;" : "")};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.click.button.group.color.background.hover};
    color: ${({ theme }) => theme.click.button.group.color.text.hover};
  }

  &:disabled {
    cursor: not-allowed;
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
    color: ${({ theme }) => theme.click.button.group.color.text.active};
    &:disabled {
      background: ${({ theme }) =>
        theme.click.button.group.color.background["disabled-active"]};
    }
  }

  // TODO update radii for default/borderless
  // TODO remove css variables for radii?
  border-radius: ${({ theme, $type }) =>
    $type === "default"
      ? `calc(${theme.click.button.group.radii.all} - var(--outer-spacing))`
      : theme.click.button.group.radii.all};
`;
