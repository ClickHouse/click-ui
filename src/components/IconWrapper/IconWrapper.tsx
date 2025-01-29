import { ReactNode } from "react";
import { HorizontalDirection, IconName } from "@/components";
import { styled } from "styled-components";
import { EllipsisContent } from "../EllipsisContent/EllipsisContent";
import { Icon } from "@/components/Icon/Icon";
import { IconSize } from "@/components/Icon/types";

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

interface IconWrapperProps {
  icon?: IconName;
  iconDir?: HorizontalDirection;
  size?: IconSize;
  width?: number | string;
  height?: number | string;
  children: ReactNode;
  ellipsisContent?: boolean;
}

const IconWrapper = ({
  icon,
  iconDir = "start",
  size = "sm",
  width,
  height,
  children,
  ellipsisContent = true,
  ...props
}: IconWrapperProps) => {
  const TextWrapper = ellipsisContent ? EllipsisContent : "div";
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
      <TextWrapper>{children}</TextWrapper>
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
