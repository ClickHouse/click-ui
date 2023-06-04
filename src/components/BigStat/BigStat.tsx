import styled from "styled-components";

export type bigStatState = "default";

export interface BigStatProps {
    label: string;
    largeValue: string;
    state?: bigStatState;
}

const Wrapper = styled.div<Pick<BigStatProps, "state">>`
  background-color: ${({state}) => `var(--click-big-stat-color-background-${state})`};
  border-radius: var(--click-big-stat-radii-all);
  border: ${({state}) => `var(--click-big-stat-stroke) solid var(--click-big-stat-color-stroke-${state})`};
  gap: var(--click-big-stat-space-gap);
  padding: var(--click-big-stat-space-all);
  display: flex;
  flex-direction: column;
`;

const Label = styled.div<Pick<BigStatProps, "state">>`
  color: ${({state}) => `var(--click-big-stat-color-label-${state})`};
  font: ${({state}) => `var(--click-big-stat-typography-label-${state})`};
`;

const LargeValue = styled.div<Pick<BigStatProps, "state">>`
  color: ${({state}) => `var(--click-big-stat-color-large-value-${state})`};
  font: ${({state}) => `var(--click-big-stat-typography-title-${state})`};
`;

export function BigStat({label, largeValue, state = "default"}: BigStatProps) {
  return <Wrapper state={state}>
    <Label state={state}>{label}</Label>
    <LargeValue state={state}>{largeValue}</LargeValue>
  </Wrapper>
}

