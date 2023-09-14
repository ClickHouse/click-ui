import styled from "styled-components";
import { HorizontalDirection, Icon, IconName } from "@/components";
import { MouseEvent, ReactNode } from "react";
import { EllipsisContainer } from "../commonElement";
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
  icon?: IconName;
  iconDir?: HorizontalDirection;
}

export interface DismissibleBadge extends CommonBadgeProps {
  dismissible: true;
  onClose: (e: MouseEvent<HTMLOrSVGElement>) => void;
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

const SvgContainer = styled.svg<{ $state?: BadgeState; $size?: BadgeSize }>`
  ${({ $state = "default", $size = "md", theme }) => `
    color: ${theme.click.badge.color.text[$state]};
    height: ${theme.click.badge.icon[$size].size.height};
    width: ${theme.click.badge.icon[$size].size.width};
  `}
`;
const BadgeContent = styled(EllipsisContainer)<{
  $state?: BadgeState;
  $size?: BadgeSize;
}>`
  svg {
    ${({ $state = "default", $size = "md", theme }) => `
    color: ${theme.click.badge.color.text[$state]};
    height: ${theme.click.badge.icon[$size].size.height};
    width: ${theme.click.badge.icon[$size].size.width};
    gap: inherit;
  `}
  }
`;

export type BadgeProps = NonDismissibleBadge | DismissibleBadge;

export const Badge = ({
  icon,
  iconDir,
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
      {icon && iconDir === "start" && (
        <SvgContainer
          as={Icon}
          name={icon}
          $state={state}
          $size={size}
        />
      )}
      <BadgeContent>{text}</BadgeContent>
      {icon && iconDir === "end" && (
        <SvgContainer
          as={Icon}
          name={icon}
          $state={state}
          $size={size}
        />
      )}

      {dismissible && (
        <SvgContainer
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
