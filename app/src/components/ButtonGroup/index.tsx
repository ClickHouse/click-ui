import React from "react";
import styled from "styled-components";

export interface ButtonGroupProps {
  labels: string[];
  activeIndex?: number;
}

const ButtonGroup = ({ labels, activeIndex }: ButtonGroupProps) => {
  const btns = labels.map((label, index) => {
    if (index === 0) {
      return (
        <ButtonLeft key={index} active={index === activeIndex}>
          {label}
        </ButtonLeft>
      );
    } else if (index === labels.length - 1) {
      return (
        <ButtonRight key={index} active={index === activeIndex}>
          {label}
        </ButtonRight>
      );
    } else {
      return (
        <ButtonCenter key={index} active={index === activeIndex}>
          {label}
        </ButtonCenter>
      );
    }
  });
  return <ButtonGroupWrapper>{btns}</ButtonGroupWrapper>;
};

interface ButtonProps {
  active: boolean;
}

const ButtonGroupWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 1px;
  border: 1px solid rgba(65, 65, 65, 0.3);
  border-radius: 4px;
  background: var(--click/button/group/color/stroke/panel);
`;

const ButtonCommon = styled.button<ButtonProps>`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5.5px 16px;
  gap: 10px;

  background: ${({ active }: ButtonProps) =>
    active
      ? "var(--click-button-group-color-background-active)"
      : "var(--click-button-group-color-background-default)"};

  &:hover {
    background: var(--click-button-group-color-background-hover);
  }
`;

const ButtonLeft = styled(ButtonCommon)`
  border-radius: 4px 0px 0px 4px;
`;

const ButtonCenter = styled(ButtonCommon)`
  /* State=Center - Default */
`;

const ButtonRight = styled(ButtonCommon)`
  border-radius: 0px 4px 4px 0px;
`;

export default ButtonGroup;
