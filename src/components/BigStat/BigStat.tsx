import styled from "styled-components";

export type bigStatState = "default";

export interface BigStatProps {
  label: string;
  largeValue: string;
  state?: bigStatState;
}

const Wrapper = styled.div<Pick<BigStatProps, "state">>`
  background-color: ${({ state = "default", theme }) =>
    theme.click["big-stat"].color.background[state]};
  border-radius: ${props => props.theme.click["big-stat"].radii.all};
  border: ${({ state = "default", theme }) =>
    `${theme.click["big-stat"].stroke} solid ${theme.click["big-stat"].color.stroke[state]}`};
  gap: ${props => props.theme.click["big-stat"].space.gap};
  padding: ${props => props.theme.click["big-stat"].space.all};

  display: flex;
  flex-direction: column;
`;

const Label = styled.div<Pick<BigStatProps, "state">>`
  color: ${({ state = "default", theme }) =>
    theme.click["big-stat"].color.label[state]};
  font: ${({ state = "default", theme }) =>
    theme.click.bigStat.typography.lg.label[state]};
`;

const LargeValue = styled.div<Pick<BigStatProps, "state">>`
  color: ${({ state = "default", theme }) =>
    theme.click["big-stat"].color["large-value"][state]};
  font: ${({ state = "default", theme }) =>
    theme.click.bigStat.typography.lg.title[state]};
`;

export const BigStat = ({
  label,
  largeValue,
  state = "default",
}: BigStatProps) => (
  <Wrapper state={state}>
    <Label state={state}>{label}</Label>
    <LargeValue state={state}>{largeValue}</LargeValue>
  </Wrapper>
);
