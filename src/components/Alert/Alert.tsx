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
  dismissible?: boolean;
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
  showIcon = true,
  dismissible,
  ...delegated
}: AlertProps) => {
  const [isVisible, setIsVisible] = useState(true);

  return isVisible ? (
    <Wrapper
      $size={size}
      $state={state}
      data-testid="click-alert"
      {...delegated}
    >
      {showIcon && (
        <IconWrapper
          $state={state}
          $size={size}
        >
          <StyledIcon
            $size={size}
            name={stateIconMap[state]}
          />
        </IconWrapper>
      )}
      <TextWrapper
        $state={state}
        $size={size}
      >
        {title && <Title $size={size}>{title}</Title>}
        <Text $size={size}>{text}</Text>
      </TextWrapper>
      {dismissible && (
        <DismissWrapper
          data-testid="click-alert-dismiss-button"
          onClick={() => setIsVisible(false)}
        >
          <Icon name="cross" />
        </DismissWrapper>
      )}
    </Wrapper>
  ) : null;
};

const Wrapper = styled.div<{
  $state: AlertState;
  $size: AlertSize;
}>`
  display: flex;
  border-radius: ${props => props.theme.click.alert.radii.end};
  background-color: ${({ $state = "neutral", theme }) =>
    theme.click.alert.color.background[$state]};
  color: ${({ $state = "neutral", theme }) => theme.click.alert.color.text[$state]};
`;

const IconWrapper = styled.div<{ $state: AlertState; $size: AlertSize }>`
  display: flex;
  align-items: center;
  ${({ $state = "neutral", $size, theme }) => `
    background-color: ${theme.click.alert.color.iconBackground[$state]}};
    color: ${theme.click.alert.color.iconForeground[$state]};
    border-top-left-radius: ${theme.click.alert.radii.end};
    border-bottom-left-radius: ${theme.click.alert.radii.end};
    padding: ${theme.click.alert[$size].space.y} ${theme.click.alert[$size].space.x};
  `}
`;

const StyledIcon = styled(Icon)<{ $size: AlertSize }>`
  ${({ $size, theme }) => `
    height: ${theme.click.alert[$size].icon.height};
    width: ${theme.click.alert[$size].icon.width};
  `}
`;
const TextWrapper = styled.div<{ $state: AlertState; $size: AlertSize }>`
  display: flex;
  flex-flow: column;
  ${({ $size, theme }) => `
    gap: ${theme.click.alert[$size].space.gap};
    padding: ${theme.click.alert[$size].space.y} ${theme.click.alert[$size].space.x};
  `}
`;
const Title = styled.h6<{ $size: AlertSize }>`
  margin: 0;
  font: ${({ theme, $size }) => theme.click.alert[$size].typography.title.default};
`;
const Text = styled.p<{ $size: AlertSize }>`
  margin: 0;
  font: ${({ theme, $size }) => theme.click.alert[$size].typography.text.default};
`;

const DismissWrapper = styled.button`
  display: flex;
  align-items: center;
  margin-left: auto;
  border: none;
  background-color: transparent;
  color: inherit;
`;

const DangerAlert = (props: AlertProps) => (
  <Alert
    {...props}
    state="danger"
  />
);

const InfoAlert = (props: AlertProps) => (
  <Alert
    {...props}
    state="info"
  />
);

const SuccessAlert = (props: AlertProps) => (
  <Alert
    {...props}
    state="success"
  />
);

const WarningAlert = (props: AlertProps) => (
  <Alert
    {...props}
    state="warning"
  />
);

export { Alert, DangerAlert, InfoAlert, SuccessAlert, WarningAlert };
