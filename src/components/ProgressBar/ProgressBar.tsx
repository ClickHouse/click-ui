import { HTMLAttributes, ReactNode } from "react";
import { styled } from "styled-components";
import { IconButton } from "@/components";

interface CommonProgressBarProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  progress: number;
  label?: ReactNode;
  error?: ReactNode;
  orientation?: "vertical" | "horizontal";
  dir?: "start" | "end";
}

interface DefaultProgressBar extends CommonProgressBarProps {
  type?: "default";
  successMessage?: ReactNode;
}

interface SmallProgressBar extends CommonProgressBarProps {
  type: "small";
  successMessage?: never;
  dismissable?: never;
  onCancel?: never;
}

interface DismissableProgressBar {
  dismissable: true;
  onCancel: () => void;
}

interface NonDismissableProgressBar {
  dismissable?: false;
  onCancel?: never;
}

export type ProgressBarProps =
  | (DefaultProgressBar & (DismissableProgressBar | NonDismissableProgressBar))
  | SmallProgressBar;

// The tokens are copied from dataloading page and may need to change on the new component creation in figma
const ProgressContainer = styled.div<{
  $progress: number;
  $completed: boolean;
  $type: "small" | "default";
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  transition: all 100ms ease-in-out;
  width: 100%;
  width: -webkit-fill-available;
  width: fill-available;
  width: stretch;
  min-height: 2px;
  ${({ theme, $completed, $progress, $type }) => `
    background: ${
      $completed && $type === "default"
        ? theme.click.field.color.background.default
        : `linear-gradient(to right, ${theme.global.color.accent.default} 0%, ${theme.global.color.accent.default} ${$progress}%, ${theme.click.field.color.background.default} ${$progress}%,  ${theme.click.field.color.background.default} 100%)`
    };
    background-size: calc(100% + 2px);
    background-position: center;
    gap: ${theme.click.field.space.gap};
    border-radius: ${theme.click.field.radii.all};
    font: ${theme.typography.styles.product.text.normal.sm};
    padding: ${$type === "default" ? "0.25rem" : 0} ${theme.click.field.space.x};
    padding-right: 0;
    color: ${theme.global.color.accent.default};
    border: 1px solid ${theme.click.field.color.stroke.default};
    &:hover {
      border: 1px solid ${theme.click.field.color.stroke.hover};
      background: ${
        $completed
          ? theme.click.field.color.background.hover
          : `linear-gradient(to right, ${theme.global.color.accent.default} 0%, ${theme.global.color.accent.default} ${$progress}%, ${theme.click.field.color.background.hover} ${$progress}%,  ${theme.click.field.color.background.hover} 100%)`
      };
      background-size: calc(100% + 2px);
      background-position: center;
    }
    &:focus-within, &:focus {
      border: 1px solid ${theme.click.field.color.stroke.active};
      background: ${
        $completed
          ? theme.click.field.color.background.active
          : `linear-gradient(to right, ${theme.global.color.accent.default} 0%, ${theme.global.color.accent.default} ${$progress}%, ${theme.click.field.color.background.active} ${$progress}%,  ${theme.click.field.color.background.active} 100%)`
      };
      background-size: calc(100% + 2px);
      background-position: center;
    }
  `};
`;

const ProgressText = styled.span<{ $completed: boolean }>`
  width: 100%;
  font: inherit;
  mix-blend-mode: difference;
`;

const ProgressCloseButton = styled.button<{ $dismissable?: boolean }>`
  mix-blend-mode: difference;
  border: 0;
  visibility: ${({ $dismissable }) => ($dismissable ? "visible" : "hidden")};
`;

export const ProgressBar = ({
  progress,
  type = "default",
  dismissable = false,
  onCancel,
  successMessage,
  ...props
}: ProgressBarProps) => {
  const completed = progress === 100;

  return (
    <ProgressContainer
      $completed={completed}
      $progress={progress}
      $type={type}
      {...props}
    >
      {type === "default" && (
        <>
          <ProgressText $completed={completed}>
            {successMessage && completed ? successMessage : `${progress}%`}
          </ProgressText>
          <ProgressCloseButton
            as={IconButton}
            size="sm"
            type="ghost"
            icon="cross"
            $dismissable={dismissable}
            onClick={onCancel}
            data-testid="progressbar-close"
          />
        </>
      )}
    </ProgressContainer>
  );
};
