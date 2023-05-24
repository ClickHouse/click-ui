import React from "react";
import styled from "styled-components";

const ButtonGroup = ({ children, className, ...props }) => {
  return <button/>;
};

const ButtonLeft = styled.button`
/* State=Left - Default */


/* Auto layout */

display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 5.5px 16px;
gap: 10px;

position: absolute;
width: 88px;
height: 30px;
left: 20px;
top: 24px;

/* click/button/group/color/background/default */

background: #282828;
border-radius: 4px 0px 0px 4px;
`;

const ButtonCenter = styled.button`
/* State=Center - Default */


/* Auto layout */

display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 5.5px 16px;
gap: 10px;

position: absolute;
width: 78px;
height: 30px;
left: 131px;
top: 24px;

/* click/button/group/color/background/default */

background: #282828;
`;

const ButtonRight = styled.button`
/* State=Right - Default */


/* Auto layout */

display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 5.5px 16px;
gap: 10px;

position: absolute;
width: 96px;
height: 30px;
left: 231px;
top: 24px;

/* click/button/group/color/background/default */

background: #282828;
border-radius: 0px 4px 4px 0px;
`;

const ButtonLeftHover = styled.button`
/* State=Left - Hover */


/* Auto layout */

display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 5.5px 16px;
gap: 10px;

position: absolute;
width: 88px;
height: 30px;
left: 20px;
top: 72px;

/* click/button/group/color/background/hover */

background: #2F2F2F;
border-radius: 4px 0px 0px 4px;
`;

const ButtonCenterHover = styled.button`
/* State=Center - Hover */


/* Auto layout */

display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 5.5px 16px;
gap: 10px;

position: absolute;
width: 78px;
height: 30px;
left: 131px;
top: 72px;

/* click/button/group/color/background/hover */

background: #2F2F2F;
`;

const ButtonRightHover = styled.button`
/* State=Right - Hover */


/* Auto layout */

display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 5.5px 16px;
gap: 10px;

position: absolute;
width: 96px;
height: 30px;
left: 231px;
top: 72px;

/* click/button/group/color/background/hover */

background: #2F2F2F;
border-radius: 0px 4px 4px 0px;
`;

const ButtonRightActive = styled.button`
  box-sizing: border-box;

  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5.5px 16px;
  gap: 10px;

  position: absolute;
  width: 88px;
  height: 30px;
  left: 20px;
  top: 124px;

  /* click/button/group/color/background/active */

  background: #383838;
  /* click/button/group/color/stroke/panel */

  border: 1px solid rgba(65, 65, 65, 0.3);
  border-radius: 4px 0px 0px 4px;
`;

const ButtonCenterActive = styled.button`
  /* State=Center - Active */

  box-sizing: border-box;

  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5.5px 16px;
  gap: 10px;

  position: absolute;
  width: 79px;
  height: 30px;
  left: 130px;
  top: 124px;

  /* click/button/group/color/background/active */

  background: #383838;
  /* click/button/group/color/stroke/panel */

  border: 1px solid rgba(65, 65, 65, 0.3);
`;

const ButtonLeftActive = styled.button`
  * State=Right - Active */

  box-sizing: border-box;

  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5.5px 16px;
  gap: 10px;

  position: absolute;
  width: 97px;
  height: 30px;
  left: 230px;
  top: 124px;

  /* click/button/group/color/stroke/panel */

  border: 1px solid rgba(65, 65, 65, 0.3);
  border-radius: 0px 4px 4px 0px;
`;

export default ButtonGroup;
