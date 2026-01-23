import {
  CardPrimaryTopBadge,
  TopBadgeWrapper,
} from "./CardPrimaryTopBadge";
import { ComponentType, FC } from "react";

export interface WithTopBadgeProps {
  topBadgeText?: string;
  isSelected?: boolean;
}

export const withTopBadge =
  <P extends object>(Component: ComponentType<P>): FC<P & WithTopBadgeProps> =>
  ({ topBadgeText, ...props }: P & WithTopBadgeProps) => {
    return (
      <TopBadgeWrapper
        alignItems="stretch"
        fillWidth
      >
        <Component {...(props as P)} />
        {topBadgeText && (
          <CardPrimaryTopBadge
            data-testid="card-top-badge"
            text={topBadgeText}
            $isSelected={props.isSelected || false}
          />
        )}
      </TopBadgeWrapper>
    );
  };
