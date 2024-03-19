import { ReactNode } from "react";
import { HorizontalDirection, Icon, IconName } from "@/components";
import { IconSize } from "@/components/Icon/types";
import styled from "styled-components";
import { EllipsisContent } from "../EllipsisContent/EllipsisContent";

const LabelContainer = styled.div<{ $hasIcon: boolean; $iconDir: HorizontalDirection }>`
  display: grid;
  grid-template-columns: ${({ $hasIcon, $iconDir }) =>
    `${$hasIcon && $iconDir === "start" ? "auto " : ""}1fr${
      $hasIcon && $iconDir === "end" ? " auto" : ""
    }`};
  align-items: center;
  justify-content: flex-start;

  width: 100%;
  width: -webkit-fill-available;
  width: fill-available;
  width: stretch;
  gap: ${({ theme }) => theme.click.sidebar.navigation.item.default.space.gap};
`;

const IconWrapper = ({
  icon,
  iconDir = "start",
  size = "sm",
  width,
  height,
  children,
  ...props
}: {
  icon?: IconName;
  iconDir?: HorizontalDirection;
  children: ReactNode;
  size?: IconSize;
  width?: number | string;
  height?: number | string;
}) => {
  return (
    <LabelContainer
      $hasIcon={typeof icon === "string"}
      $iconDir={iconDir}
      {...props}
    >
      {icon && iconDir === "start" && (
        <Icon
          name={icon}
          size={size}
          width={width}
          height={height}
        />
      )}
      <EllipsisContent>{children}</EllipsisContent>
      {icon && iconDir === "end" && (
        <Icon
          name={icon}
          size={size}
          width={width}
          height={height}
        />
      )}
    </LabelContainer>
  );
};
export default IconWrapper;
