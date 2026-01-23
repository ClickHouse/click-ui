import { styled } from "styled-components";
import { HorizontalDirection } from "@/components";
import { HTMLAttributes, MouseEvent, ReactNode } from "react";
import { ImageName } from "@/components/Icon/types";
import { Icon } from "@/components/Icon/Icon";
import IconWrapper from "@/components/IconWrapper/IconWrapper";

export type BadgeState =
  | "default"
  | "success"
  | "neutral"
  | "danger"
  | "disabled"
  | "warning"
  | "info";

export type BadgeSize = "sm" | "md";
export type BadgeType = "opaque" | "solid";

export interface CommonBadgeProps extends HTMLAttributes<HTMLDivElement> {
  /** The text content to display in the badge */
  text: ReactNode;
  /** The visual state of the badge */
  state?: BadgeState;
  /** The size of the badge */
  size?: BadgeSize;
  /** The type/style of the badge - opaque has a lighter background, solid has a filled background */
  type?: BadgeType;
  /** Optional icon to display alongside the text */
  icon?: ImageName;
  /** The direction of the icon relative to the text */
  iconDir?: HorizontalDirection;
  /** Whether to truncate content with ellipsis when it overflows */
  ellipsisContent?: boolean;
}

export interface DismissibleBadge extends CommonBadgeProps {
  /** When true, displays a close button on the badge */
  dismissible: true;
  /** Callback function when the close button is clicked */
  onClose: (e: MouseEvent<HTMLOrSVGElement>) => void;
}

export interface NonDismissibleBadge extends CommonBadgeProps {
  /** When false or undefined, the close button is hidden */
  dismissible?: never;
  onClose?: never;
}

const Wrapper = styled.div<{ $state?: BadgeState; $size?: BadgeSize; $type?: BadgeType }>`
  display: inline-flex;
  ${({ $state = "default", $size = "md", $type = "opaque", theme }) => `
    background-color: ${theme.click.badge[$type].color.background[$state]};
    color: ${theme.click.badge[$type].color.text[$state]};
    font: ${theme.click.badge.typography.label[$size].default};
    border-radius: ${theme.click.badge.radii.all};
    border: ${theme.click.badge.stroke} solid ${theme.click.badge[$type].color.stroke[$state]};
    padding: ${theme.click.badge.space[$size].y} ${theme.click.badge.space[$size].x};
  `}
`;

const Content = styled.div<{ $state?: BadgeState; $size?: BadgeSize }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ $size = "md", theme }) => theme.click.badge.space[$size].gap};
  max-width: 100%;
  justify-content: flex-start;
`;

const SvgContainer = styled.svg<{
  $state?: BadgeState;
  $size?: BadgeSize;
  $type?: BadgeType;
}>`
  ${({ $state = "default", $size = "md", $type = "opaque", theme }) => `
    color: ${theme.click.badge[$type].color.text[$state]};
    height: ${theme.click.badge.icon[$size].size.height};
    width: ${theme.click.badge.icon[$size].size.width};
  `}
`;
const BadgeContent = styled.div<{
  $state?: BadgeState;
  $size?: BadgeSize;
  $type?: BadgeType;
}>`
  width: auto;
  overflow: hidden;
  svg {
    ${({ $state = "default", $size = "md", $type = "opaque", theme }) => `
    color: ${theme.click.badge[$type].color.text[$state]};
    height: ${theme.click.badge.icon[$size].size.height};
    width: ${theme.click.badge.icon[$size].size.width};
    gap: inherit;
  `}
  }
`;

export type BadgeProps = NonDismissibleBadge | DismissibleBadge;

export const Badge = ({
  icon,
  iconDir,
  text,
  state = "default",
  size,
  type,
  dismissible,
  onClose,
  ellipsisContent = true,
  ...props
}: BadgeProps) => (
  <Wrapper
    $state={state}
    $size={size}
    $type={type}
    {...props}
  >
    <Content data-testid={`${ellipsisContent ? "ellipsed" : "normal"}-badge-content`}>
      <BadgeContent
        as={IconWrapper}
        icon={icon}
        iconDir={iconDir}
        size={size}
        $state={state}
        ellipsisContent={ellipsisContent}
      >
        {text}
      </BadgeContent>
      {dismissible && (
        <SvgContainer
          name="cross"
          $state={state}
          as={Icon}
          onClick={onClose}
          aria-label="close"
        />
      )}
    </Content>
  </Wrapper>
);
