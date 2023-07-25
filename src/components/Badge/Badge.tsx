import styled from "styled-components";
import { Icon } from "../Icon/Icon";
export type BadgeState =
  | "default"
  | "success"
  | "neutral"
  | "danger"
  | "disabled"
  | "warning"
  | "info";

export type BadgeSize = "sm" | "md";

export interface BadgeProps {
  text: string;
  state?: BadgeState;
  size?: BadgeSize;
  dismissable?: boolean;
}

const Wrapper = styled.div<Pick<BadgeProps, "state" | "size">>`
  background-color: ${({ state = "default", theme }) =>
    theme.click.badge.color.background[state]};
  color: ${({ state = "default", theme }) => theme.click.badge.color.text[state]};
  font: ${({ size = "md", theme }) => theme.click.badge.typography.label[size].default};
  border-radius: ${({ theme }) => theme.click.badge.radii.all};
  border: ${({ state = "default", theme }) =>
    `${theme.click.badge.stroke} solid ${theme.click.badge.color.stroke[state]}`};
  padding: ${({ size = "md", theme }) => theme.click.badge.space[size].y}
    ${({ size = "md", theme }) => theme.click.badge.space[size].x};
  display: inline-block;
`;

const Content = styled.div<Pick<BadgeProps, "state" | "size">>`
  display: inline-flex;
  align-items: center;
  gap: ${({ size = "md", theme }) => theme.click.badge.space[size].gap};
`;

const CrossContainer = styled.svg<Pick<BadgeProps, "state" | "size">>`
  color: ${({ state = "default", theme }) => theme.click.badge.color.text[state]};
  height: ${({ size = "md", theme }) => theme.click.badge.icon[size].size.height};
  width: ${({ size = "md", theme }) => theme.click.badge.icon[size].size.width};
`;

export const Badge = ({
  text,
  state = "default",
  size = "md",
  dismissable = true,
}: BadgeProps) => (
  <Wrapper
    state={state}
    size={size}
  >
    <Content>
      {text}
      {dismissable && (
        <CrossContainer
          name="cross"
          state={state}
          as={Icon}
        />
      )}
    </Content>
  </Wrapper>
);
