import styled from "styled-components";

export type bigStatState = "default";
export type bigStatSize = "sm" | "lg";

export interface BigStatProps {
  label: React.ReactNode;
  title: React.ReactNode;
  state?: bigStatState;
  size?: bigStatSize;
}

//* Use this component to highlight important pieces of information. */
export const BigStat = ({
  label = "Label",
  title = "Title",
  size,
  state,
}: BigStatProps) => (
  <Wrapper state={state} size={size}>
    <Label state={state} size={size}>{label}</Label>
    <Title state={state} size={size}>{title}</Title>
  </Wrapper>
);

const Wrapper = styled.div<Pick<BigStatProps, "state" | "size">>`
  background-color: ${({ state = "default", theme }) =>
    theme.click.bigStat.color.background[state]};
  border-radius: ${props => props.theme.click.bigStat.radii.all};
  border: ${({ state = "default", theme }) =>
    `${theme.click.bigStat.stroke} solid ${theme.click.bigStat.color.stroke[state]}`};
  gap: ${props => props.theme.click.bigStat.space.gap};
  padding: ${props => props.theme.click.bigStat.space.all};
  display: flex;
  flex-direction: ${({ size }) => size === "sm" ? "column-reverse" : "column"}
`;

const Label = styled.div<Pick<BigStatProps, "state" | "size">>`
  color: ${({ state = "default", theme }) => theme.click.bigStat.color.label[state]};
  font: ${({ state = "default", size = "lg", theme }) =>
    theme.click.bigStat.typography[size].label[state]};
`;

const Title = styled.div<Pick<BigStatProps, "state" | "size">>`
  color: ${({ state = "default", theme }) =>
    theme.click.bigStat.color.title[state]};
  font: ${({ state = "default", size="lg", theme }) =>
    theme.click.bigStat.typography[size].title[state]};
`;
