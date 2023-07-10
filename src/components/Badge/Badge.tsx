import styled from "styled-components";

export type BadgeState =
  | "default"
  | "success"
  | "neutral"
  | "danger"
  | "disabled";

export interface BadgeProps {
  text: string;
  state?: BadgeState;
}

const Wrapper = styled.div<Pick<BadgeProps, "state">>`
  background-color: ${({ state = "default", theme }) =>
    theme.click.badge.color.background[state]};
  color: ${({ state = "default", theme }) =>
    theme.click.badge.color.text[state]};
  font: ${props => props.theme.click.badge.typography.label.default};
  border-radius: ${props => props.theme.click.badge.radii.all};
  border: ${({ state = "default", theme }) =>
    `${theme.click.badge.stroke} solid ${theme.click.badge.color.stroke[state]}`};
  padding: ${props =>
    `${props.theme.click.badge.space.y} ${props.theme.click.badge.space.x}`};
  display: inline-block;
`;

export const Badge = ({ text, state = "default" }: BadgeProps) => (
  <Wrapper state={state}>{text}</Wrapper>
);
