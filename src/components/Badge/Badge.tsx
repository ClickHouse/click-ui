import styled from "styled-components";
import { Icon } from "@/components";
import { ReactNode } from "react";
export type BadgeState =
  | "default"
  | "success"
  | "neutral"
  | "danger"
  | "disabled"
  | "warning"
  | "info";

export type BadgeSize = "sm" | "md";

export interface CommonBadgeProps {
  text: ReactNode;
  state?: BadgeState;
  size?: BadgeSize;
}

export interface DismissibleBadge extends CommonBadgeProps {
  dismissible: true;
  onClose: () => void;
}

export interface NonDismissibleBadge extends CommonBadgeProps {
  dismissible?: never;
  onClose?: never;
}

const Wrapper = styled.div<{ $state?: BadgeState; $size?: BadgeSize }>`
  display: inline-block;
  ${({ $state = "default", $size = "md", theme }) => `
    background-color: ${theme.click.badge.color.background[$state]};
    color: ${theme.click.badge.color.text[$state]};
    font: ${theme.click.badge.typography.label[$size].default};
    border-radius: ${theme.click.badge.radii.all};
    border: ${theme.click.badge.stroke} solid ${theme.click.badge.color.stroke[$state]};
    padding: ${theme.click.badge.space[$size].y} ${theme.click.badge.space[$size].x};
  `}
`;

const Content = styled.div<{ $state?: BadgeState; $size?: BadgeSize }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ $size = "md", theme }) => theme.click.badge.space[$size].gap};
`;

const CrossContainer = styled.svg<{ $state?: BadgeState; $size?: BadgeSize }>`
  ${({ $state = "default", $size = "md", theme }) => `
    color: ${theme.click.badge.color.text[$state]};
    height: ${theme.click.badge.icon[$size].size.height};
    width: ${theme.click.badge.icon[$size].size.width};
  `}
`;

export type BadgeProps = NonDismissibleBadge | DismissibleBadge;

export const Badge = ({
  text,
  state = "default",
  size,
  dismissible,
  onClose,
}: BadgeProps) => (
  <Wrapper
    $state={state}
    $size={size}
  >
    <Content>
      {text}
      {dismissible && (
        <CrossContainer
          name="cross"
          $state={state}
          as={Icon}
          onClick={onClose}
          aria-label="close"
        />
      )}
    </Content>
  </Wrapper>
);
