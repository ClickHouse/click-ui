import { ReactNode } from "react";
import { styled } from "styled-components";
import { Icon, IconDir, IconName } from "@/components";

const LabelContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.click.sidebar.navigation.item.default.space.gap};
`;

export const IconWrapper = ({
  icon,
  iconDir,
  children,
}: {
  icon?: IconName;
  iconDir?: IconDir;
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
      {children}
      {icon && iconDir === "end" && (
        <Icon
          name={icon}
          size="sm"
        />
      )}
    </LabelContainer>
  );
};
