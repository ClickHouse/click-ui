import styled from "styled-components";

type ButtonType = "primary" | "secondary";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type?: ButtonType;
  label?: string;
}

export interface StyledButtonProps {
  styleType: ButtonType;
}

export const Button = ({
  type = "primary",
  label,
  children,
  ...delegated
}: ButtonProps) => (
  <StyledButton styleType={type} {...delegated}>
    {label ? label : children}
  </StyledButton>
);

const BaseButton = styled.button<StyledButtonProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  padding-left: ${props => props.theme.click.button.basic.space.x};
  padding-right: ${props => props.theme.click.button.basic.space.x};
  padding-top: ${props => props.theme.click.button.basic.space.y};
  padding-bottom: ${props => props.theme.click.button.basic.space.y};
  border-radius: ${props => props.theme.click.button.radii.all};
  gap: ${props => props.theme.click.button.basic.space.gap};
  cursor: pointer;
`;

const StyledButton = styled(BaseButton)`
  border: ${props =>
    props.theme.click.button.basic.color[props.styleType].stroke.default};
  background-color: ${props =>
    props.theme.click.button.basic.color[props.styleType].background.default};
  color: ${props =>
    props.theme.click.button.basic.color[props.styleType].text.default};
  font: ${props => props.theme.click.button.basic.typography.label.default};

  &:active {
    border: ${props =>
      props.theme.click.button.basic.color[props.styleType].stroke.active};
    background-color: ${props =>
      props.theme.click.button.basic.color[props.styleType].background.active};
    font: ${props => props.theme.click.button.basic.typography.label.active};
  }

  &:hover {
    border: ${props =>
      props.theme.click.button.basic.color[props.styleType].stroke.hover};
    background-color: ${props =>
      props.theme.click.button.basic.color[props.styleType].background.hover};
    font: ${props => props.theme.click.button.basic.typography.label.hover};
  }

  &[disabled] {
    background-color: ${props =>
      props.theme.click.button.basic.color.disabled.background.default};
    color: ${props =>
      props.theme.click.button.basic.color.disabled.text.default};
  }
`;
