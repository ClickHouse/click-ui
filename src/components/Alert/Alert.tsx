import { Icon } from "@/components";
import { IconName } from "@/components/Icon/types";
import { useState, ReactNode } from "react";
import { styled } from "styled-components";

type AlertType = "default" | "banner";
type AlertSize = "small" | "medium";
type AlertState = "neutral" | "success" | "warning" | "danger" | "info";
export type AlertProps = {
  state?: AlertState;
  title?: ReactNode;
  text: ReactNode;
  size?: AlertSize;
  type?: AlertType;
  showIcon?: boolean;
  dismissible?: boolean;
  fillWidth?: boolean;
  customIcon?: IconName;
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
  type = "default",
  showIcon = true,
  dismissible,
  customIcon,
  fillWidth = false,
  ...delegated
}: AlertProps) => {
  const [isVisible, setIsVisible] = useState(true);

  return isVisible ? (
    <Wrapper
      $size={size}
      $state={state}
      $type={type}
      data-testid="click-alert"
      {...delegated}
    >
      {dismissible && type === "banner" && <DismissWrapper></DismissWrapper>}
      {showIcon && (
        <IconWrapper
          $state={state}
          $size={size}
          $type={type}
        >
          <StyledIcon
            $size={size}
            size="sm"
            aria-hidden
            name={customIcon || stateIconMap[state]}
          />
        </IconWrapper>
      )}
      <TextWrapper
        $state={state}
        $size={size}
        $fillWidth={fillWidth}
      >
        {title && <Title $size={size}>{title}</Title>}
        <Text $size={size}>{text}</Text>
      </TextWrapper>
      {dismissible && (
        <DismissWrapper
          data-testid="click-alert-dismiss-button"
          onClick={() => setIsVisible(false)}
        >
          <Icon
            name="cross"
            aria-label="close"
          />
        </DismissWrapper>
      )}
    </Wrapper>
  ) : null;
};

interface WrapperProps {
  $state: AlertState;
  $size: AlertSize;
  $type: AlertType;
}

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  border-radius: ${({ $type, theme }) =>
    $type === "banner" ? theme.sizes[0] : theme.click.alert.radii.end};
  justify-content: ${({ $type }) => ($type === "banner" ? "center" : "start")};
  overflow: hidden;
  background-color: ${({ $state = "neutral", theme }) =>
    theme.click.alert.color.background[$state]};
  color: ${({ $state = "neutral", theme }) => theme.click.alert.color.text[$state]};
  width: 100%;
`;

interface IconWrapperProps {
  $state: AlertState;
  $size: AlertSize;
  $type: AlertType;
}
const IconWrapper = styled.div<IconWrapperProps>`
  display: flex;
  align-items: center;
  background-color: ${({ $state = "neutral", $type, theme }) =>
    $type === "banner" ? "none" : theme.click.alert.color.iconBackground[$state]};
  ${({ $state = "neutral", $size, theme }) => `
    color: ${theme.click.alert.color.iconForeground[$state]};
    padding: ${theme.click.alert[$size].space.y} ${theme.click.alert[$size].space.x};
  `}
`;

const StyledIcon = styled(Icon)<{ $size: AlertSize }>`
  ${({ $size, theme }) => `
    height: ${theme.click.alert[$size].icon.height};
    width: ${theme.click.alert[$size].icon.width};
  `}
`;

interface TextWrapperProps {
  $state: AlertState;
  $size: AlertSize;
  $fillWidth: boolean;
}

const TextWrapper = styled.div<TextWrapperProps>`
  display: flex;
  flex-flow: column;
  word-break: break-word;
  ${({ $fillWidth }) => $fillWidth && "width: 100%;"};
  ${({ $size, theme }) => `
    gap: ${theme.click.alert[$size].space.gap};
    padding: ${theme.click.alert[$size].space.y} ${theme.click.alert[$size].space.x};
    a {
      font: inherit;
      color: inherit;
      text-decoration: underline;
    }
  `}
`;

const Title = styled.h6<{ $size: AlertSize }>`
  margin: 0;
  font: ${({ theme, $size }) => theme.click.alert[$size].typography.title.default};
`;
const Text = styled.div<{ $size: AlertSize }>`
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
  cursor: pointer;
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
