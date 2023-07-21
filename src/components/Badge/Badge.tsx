import styled from "styled-components";

export type BadgeState =
  | "default"
  | "success"
  | "neutral"
  | "danger"
  | "disabled";

export type BadgeSize = "sm" | "md";

export interface BadgeProps {
  text: string;
  state?: BadgeState;
  size?: BadgeSize;
}

const Wrapper = styled.div<Pick<BadgeProps, "state"|"size">>`

  background-color: ${({ state = "default", theme }) =>
    theme.click.badge.color.background[state]};
  color: ${({ state = "default", theme }) =>
    theme.click.badge.color.text[state]};
  font: ${({ size = "md", theme }) => 
    theme.click.badge.typography.label[size].default};
  border-radius: ${props => props.theme.click.badge.radii.all};
  border: ${({ state = "default", theme }) =>
    `${theme.click.badge.stroke} solid ${theme.click.badge.color.stroke[state]}`};
  padding: ${({ size = "md", theme }) => 
    theme.click.badge.space[size].y} ${({ size = "md", theme }) => theme.click.badge.space[size].x};
  display: inline-block;
`;

export const Badge = ({ text, state = "default", size = "md" }: BadgeProps) => (
  <Wrapper state={state} size={size}>{text}</Wrapper>
);
