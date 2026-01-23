import { ReactNode } from "react";
import { styled } from "styled-components";
import { Icon } from "@/components/Icon/Icon";
import type { HorizontalDirection } from "@/components/types";
import type { IconName } from "@/components/Icon/types";

const LabelContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  width: -webkit-fill-available;
  width: fill-available;
  width: stretch;
  flex: 1;
  gap: ${({ theme }) => theme.click.sidebar.navigation.item.default.space.gap};
  overflow: hidden;
`;

const EllipsisContainer = styled.span`
  display: flex;
  white-space: nowrap;
  overflow: hidden;
  justify-content: flex-start;
  gap: inherit;
  flex: 1;
  & > *:not(button) {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const IconWrapper = ({
  icon,
  iconDir = "start",
  children,
}: {
  icon?: IconName;
  iconDir?: HorizontalDirection;
  children: ReactNode;
}) => {
  return (
    <LabelContainer>
      {icon && iconDir === "start" && (
        <Icon
          name={icon}
          size="sm"
        />
      )}
      <EllipsisContainer>{children}</EllipsisContainer>
      {icon && iconDir === "end" && (
        <Icon
          name={icon}
          size="sm"
        />
      )}
    </LabelContainer>
  );
};
