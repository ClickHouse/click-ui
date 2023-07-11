import { Icon } from "@/components";
import { IconName } from "@/components/Icon/types";
import { useState } from "react";
import styled from "styled-components";

type AlertSize = "small" | "medium";
type AlertState = "neutral" | "success" | "warning" | "danger" | "info";
export type AlertProps = {
  state?: AlertState;
  title?: string;
  text: string;
  size?: AlertSize;
  showIcon?: boolean;
  dismissable?: boolean;
};

const stateIconMap: Record<AlertState, IconName> = {
  neutral: "information",
  success: "check",
  warning: "warning",
  danger: "warning",
  info: "information",
};
const Alert = ({
  text,
  title = "",
  size = "small",
  state = "neutral",
  showIcon,
  dismissable,
  ...delegated
}: AlertProps) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <Wrapper
      isVisible={isVisible}
      size={size}
      state={state}
      data-testid="click-alert"
      {...delegated}
    >
      {showIcon && (
        <IconWrapper state={state} size={size}>
          <StyledIcon size={size} name={stateIconMap[state]} />
        </IconWrapper>
      )}
      <TextWrapper state={state} size={size}>
        {title && <Title size={size}>{title}</Title>}
        <Text size={size}>{text}</Text>
      </TextWrapper>
      {dismissable && (
        <DismissWrapper
          data-testid="click-alert-dismiss-button"
          state={state}
          onClick={() => setIsVisible(false)}
        >
          <Icon name="cross" />
        </DismissWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div<{
  isVisible: boolean;
  state: AlertState;
  size: AlertSize;
}>`
  display: ${props => (props.isVisible ? "flex" : "none")};
  border-radius: ${props => props.theme.click.alert.radii.end};
  background-color: ${({ state = "neutral", theme }) =>
    theme.click.alert.color.background[state]};
  color: ${({ state = "neutral", theme }) =>
    theme.click.alert.color.text[state]};
`;

const IconWrapper = styled.div<{ state: AlertState; size: AlertSize }>`
  display: flex;
  align-items: center;
  background-color: ${({ state = "neutral", theme }) =>
    theme.click.alert.color.iconBackground[state]};
  color: ${({ state = "neutral", theme }) =>
    theme.click.alert.color.iconForeground[state]};
  border-top-left-radius: ${props => props.theme.click.alert.radii.end};
  border-bottom-left-radius: ${props => props.theme.click.alert.radii.end};
  padding: ${props =>
    `${props.theme.click.alert[props.size].space.y} ${
      props.theme.click.alert[props.size].space.x
    }`};
`;

const StyledIcon = styled(Icon)<{ size: AlertSize }>`
  height: ${props => props.theme.click.alert[props.size].icon.height};
  width: ${props => props.theme.click.alert[props.size].icon.width};
`;
const TextWrapper = styled.div<{ state: AlertState; size: AlertSize }>`
  display: flex;
  flex-flow: column;
  gap: ${props => props.theme.click.alert[props.size].space.gap};
  padding: ${props =>
    `${props.theme.click.alert[props.size].space.y} ${
      props.theme.click.alert[props.size].space.x
    }`};
`;
const Title = styled.h6<{ size: AlertSize }>`
  margin: 0;
  font: ${props =>
    props.theme.click.alert[props.size].typography.title.default};
`;
const Text = styled.p<{ size: AlertSize }>`
  margin: 0;
  font: ${props => props.theme.click.alert[props.size].typography.text.default};
`;

const DismissWrapper = styled.button<{ state: AlertState }>`
  display: flex;
  align-items: center;
  margin-left: auto;
  border: none;
  background-color: transparent;
  color: inherit;
`;

export { Alert };
