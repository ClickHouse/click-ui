import { Icon, type IconName } from '@/components/Icon';
import { useState, useCallback } from 'react';
import { styled } from 'styled-components';
import { AlertProps } from './Alert.types';

type AlertType = 'default' | 'banner';
type AlertSize = 'small' | 'medium';
type AlertState = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

const stateIconMap: Record<AlertState, IconName> = {
  neutral: 'information',
  success: 'check',
  warning: 'warning',
  danger: 'warning',
  info: 'information',
};

export const Alert = ({
  text,
  title = '',
  size = 'small',
  state = 'neutral',
  type = 'default',
  showIcon = true,
  dismissible,
  onDismiss,
  customIcon,
  ...delegated
}: AlertProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = useCallback(() => {
    setIsVisible(false);
    onDismiss?.();
  }, [onDismiss]);

  return isVisible ? (
    <Wrapper
      $size={size}
      $state={state}
      $type={type}
      data-testid="click-alert"
      {...delegated}
    >
      {dismissible && type === 'banner' && <DismissWrapper></DismissWrapper>}
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
      >
        {title && <Title $size={size}>{title}</Title>}
        <Text $size={size}>{text}</Text>
      </TextWrapper>
      {dismissible && (
        <DismissWrapper
          data-testid="click-alert-dismiss-button"
          onClick={handleDismiss}
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

const Wrapper = styled.div<{
  $state: AlertState;
  $size: AlertSize;
  $type: AlertType;
}>`
  display: flex;
  border-radius: ${({ $type, theme }) =>
    $type === 'banner' ? theme.sizes[0] : theme.click.alert.radii.end};
  justify-content: ${({ $type }) => ($type === 'banner' ? 'center' : 'start')};
  overflow: hidden;
  background-color: ${({ $state = 'neutral', theme }) =>
    theme.click.alert.color.background[$state]};
  color: ${({ $state = 'neutral', theme }) => theme.click.alert.color.text[$state]};
  width: 100%;
`;

const IconWrapper = styled.div<{
  $state: AlertState;
  $size: AlertSize;
  $type: AlertType;
}>`
  display: flex;
  align-items: center;
  background-color: ${({ $state = 'neutral', $type, theme }) =>
    $type === 'banner' ? 'none' : theme.click.alert.color.iconBackground[$state]};
  ${({ $state = 'neutral', $size, theme }) => `
    color: ${theme.click.alert.color.iconForeground[$state]};
    padding: ${theme.click.alert[$size].space.y} 0 ${theme.click.alert[$size].space.y} ${theme.click.alert[$size].space.x};
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
  word-break: break-word;
  ${({ $size, theme }) => `
    gap: ${theme.click.alert[$size].space.gap};
    padding: ${theme.click.alert[$size].space.y} ${theme.click.alert[$size].space.x};
    `}

  a,
  a:focus,
  a:visited,
  a:hover {
    font: inherit;
    color: inherit;
    text-decoration: underline;
  }
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

export const DangerAlert = (props: AlertProps) => (
  <Alert
    {...props}
    state="danger"
  />
);

export const InfoAlert = (props: AlertProps) => (
  <Alert
    {...props}
    state="info"
  />
);

export const SuccessAlert = (props: AlertProps) => (
  <Alert
    {...props}
    state="success"
  />
);

export const WarningAlert = (props: AlertProps) => (
  <Alert
    {...props}
    state="warning"
  />
);
