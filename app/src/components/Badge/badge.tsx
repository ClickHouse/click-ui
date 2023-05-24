import React from "react";
import styled from "styled-components";

export type BadgeState = "default" | "success" | "neutral" | "danger" | "disabled";

export interface BadgeProps {
    text: string;
    state?: BadgeState;
}

const Wrapper = styled.div<Pick<BadgeProps, 'state'>>`
  background-color: ${({state}) => `var(--click-badge-color-background-${state})`};
  color: ${({state}) => `var(--click-badge-color-text-${state})`};
  font: var(--click-badge-typography-label-default);
  border-radius: var(--click-badge-radii-all);
  border: ${({state}) => `var(--sizes-1) solid var(--click-badge-color-stroke-${state})`};
  padding: var(--click-badge-space-y) var(--click-badge-space-x);

  display: inline-block;
`;

export function Badge({text, state = "default"}: BadgeProps) {
    return <Wrapper state={state}>{text}</Wrapper>
}

