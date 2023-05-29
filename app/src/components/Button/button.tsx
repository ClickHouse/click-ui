import { CSSProperties, ReactNode } from "react";
import styled from "styled-components";

type ButtonType = "primary" | "secondary";

export interface ButtonProps {
  className: string;
  type?: ButtonType;
}

const BaseButton = styled.button<ButtonProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5.5px 16px;
  gap: 8px;
  cursor: pointer;
`;

const StyledButton = styled(BaseButton)<ButtonProps>`
  border: ${props =>
    props.theme.click.button.basic.color[props.type || "primary"].stroke
      .default};
  background-color: ${props =>
    props.theme.click.button.basic.color[props.type || "primary"].background
      .default};
  color: ${props =>
    props.theme.click.button.basic.color[props.type || "primary"].text.default};

  &:active {
    border: ${props =>
      props.theme.click.button.basic.color[props.type || "primary"].stroke
        .active};
    background-color: ${props =>
      props.theme.click.button.basic.color[props.type || "primary"].background
        .active};
  }

  &:hover {
    border: ${props =>
      props.theme.click.button.basic.color[props.type || "primary"].stroke
        .hover};
    background-color: ${props =>
      props.theme.click.button.basic.color[props.type || "primary"].background
        .hover};
  }
`;

export default StyledButton;
