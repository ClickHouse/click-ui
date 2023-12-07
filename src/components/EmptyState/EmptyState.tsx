import { HTMLAttributes, ReactNode } from "react";
import styled from "styled-components";
import { Button, Icon, IconName, Panel, Spacer, Text, Title } from "@/components";

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  icon: IconName;
  title: string;
  description: ReactNode;
  primaryActionLabel?: string;
  primaryActionIcon?: IconName;
  primaryAction?: (() => void) | (() => Promise<void>);
  secondaryActionLabel?: string;
  secondaryActionIcon?: IconName;
  secondaryAction?: (() => void) | (() => Promise<void>);
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  text-align: center;
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spaces[4]};
`;

export const EmptyState = ({
  title,
  description,
  icon,
  primaryAction,
  primaryActionLabel,
  primaryActionIcon = "plus",
  secondaryAction,
  secondaryActionLabel,
  secondaryActionIcon = "plus",
}: EmptyStateProps) => {
  return (
    <Wrapper>
      <Panel
        orientation="vertical"
        radii="none"
        padding="xl"
        width="500px"
      >
        <Icon
          name={icon}
          size="xxl"
        />
        <Spacer size="sm" />
        <Title type="h3">{title}</Title>

        <Text>{description}</Text>
        <Spacer size="sm" />
        <Actions>
          {secondaryActionLabel && (
            <Button
              label={secondaryActionLabel}
              iconLeft={secondaryActionIcon}
              type="secondary"
              onClick={() => {
                if (secondaryAction) {
                  secondaryAction();
                }
              }}
            />
          )}
          {primaryActionLabel && (
            <Button
              label={primaryActionLabel}
              iconLeft={primaryActionIcon}
              onClick={() => {
                if (primaryAction) {
                  primaryAction();
                }
              }}
            />
          )}
        </Actions>
      </Panel>
    </Wrapper>
  );
};
