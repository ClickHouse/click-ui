import { assert } from "console";
import React from "react";
import styled from "styled-components";

export interface ButtonGroupProps {
  labels: string[];
}

const ButtonGroup = ({ labels }: ButtonGroupProps) => {
  assert(labels.length > 1);
  const btns = labels.map((label, index) => {
    if (index === 0) {
      return <ButtonLeft>{label}</ButtonLeft>;
    } else if (index === labels.length - 1) {
      return <ButtonRight>{label}</ButtonRight>;
    } else {
      return <ButtonCenter>{label}</ButtonCenter>;
    }
  });
  return <ButtonGroupWrapper>{btns}</ButtonGroupWrapper>;
};

const ButtonGroupWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 1px;
  background: #282828;
  border: 1px solid rgba(65, 65, 65, 0.3);
  border-radius: 4px;
`;

const ButtonCommon = styled.button`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5.5px 16px;
  gap: 10px;

  background: #282828;
`;

const ButtonHoverCommon = styled(ButtonCommon)`
  background: #2f2f2f;
`;

const ButtonActiveCommon = styled(ButtonCommon)`
  background: #383838;
  border: 1px solid rgba(65, 65, 65, 0.3);
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

const ButtonLeftHover = styled(ButtonHoverCommon)`
  border-radius: 4px 0px 0px 4px;
`;

const ButtonCenterHover = styled(ButtonHoverCommon)`
  /* State=Center - Hover */
`;

const ButtonRightHover = styled(ButtonHoverCommon)`
  border-radius: 0px 4px 4px 0px;
`;

const ButtonLeftActive = styled(ButtonActiveCommon)`
  border-radius: 4px 0px 0px 4px;
`;

const ButtonCenterActive = styled(ButtonActiveCommon)`
  /* State=Center - Active */
`;

const ButtonRightActive = styled(ButtonActiveCommon)`
  border-radius: 0px 4px 4px 0px;
`;

export default ButtonGroup;
