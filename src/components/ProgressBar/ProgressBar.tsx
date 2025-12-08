import { HTMLAttributes, ReactNode } from "react";
import { styled } from "styled-components";
import { IconButton } from "@/components";

interface CommonProgressBarProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** The current progress value (0-100) */
  progress: number;
  /** Optional label to display */
  label?: ReactNode;
  /** Optional error message to display */
  error?: ReactNode;
  /** The orientation of the progress bar - horizontal fills width, vertical fills height */
  orientation?: "vertical" | "horizontal";
  /** The direction of progress fill - start fills from left/top, end fills from right/bottom */
  dir?: "start" | "end";
}

interface DefaultProgressBar extends CommonProgressBarProps {
  /** The type of progress bar - "default" shows text and close button */
  type?: "default";
  /** Message to display when progress reaches 100% */
  successMessage?: ReactNode;
}

interface SmallProgressBar extends CommonProgressBarProps {
  /** The type of progress bar - "small" shows only the progress indicator */
  type: "small";
  successMessage?: never;
  dismissable?: never;
  onCancel?: never;
}

interface DismissableProgressBar {
  /** When true, shows a close button to cancel the progress */
  dismissable: true;
  /** Callback function when the close button is clicked */
  onCancel: () => void;
}

interface NonDismissableProgressBar {
  /** When false or undefined, the close button is hidden */
  dismissable?: false;
  onCancel?: never;
}

export type ProgressBarProps =
  | (DefaultProgressBar & (DismissableProgressBar | NonDismissableProgressBar))
  | SmallProgressBar;

type Orientation = "horizontal" | "vertical";
type Direction = "start" | "end";

const getGradientDirection = (
  orientation: Orientation,
  dir: Direction
): string => {
  if (orientation === "vertical") {
    return dir === "start" ? "to bottom" : "to top";
  }
  return dir === "start" ? "to right" : "to left";
};

const createGradient = (
  gradientDir: string,
  accentColor: string,
  bgColor: string,
  progress: number
) =>
  `linear-gradient(${gradientDir}, ${accentColor} 0%, ${accentColor} ${progress}%, ${bgColor} ${progress}%, ${bgColor} 100%)`;

// The tokens are copied from dataloading page and may need to change on the new component creation in figma
const ProgressContainer = styled.div<{
  $progress: number;
  $completed: boolean;
  $type: "small" | "default";
  $orientation: Orientation;
  $dir: Direction;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  transition: all 100ms ease-in-out;
  min-height: 2px;
  ${({ $orientation }) =>
    $orientation === "vertical"
      ? `
    flex-direction: column;
    width: auto;
    height: 100%;
  `
      : `
    width: 100%;
    width: -webkit-fill-available;
    width: fill-available;
    width: stretch;
  `}
  ${({ theme, $completed, $progress, $type, $orientation, $dir }) => {
    const gradientDir = getGradientDirection($orientation, $dir);
    return `
    background: ${
      $completed && $type === "default"
        ? theme.click.field.color.background.default
        : createGradient(
            gradientDir,
            theme.global.color.accent.default,
            theme.click.field.color.background.default,
            $progress
          )
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
          : createGradient(
              gradientDir,
              theme.global.color.accent.default,
              theme.click.field.color.background.hover,
              $progress
            )
      };
      background-size: calc(100% + 2px);
      background-position: center;
    }
    &:focus-within, &:focus {
      border: 1px solid ${theme.click.field.color.stroke.active};
      background: ${
        $completed
          ? theme.click.field.color.background.active
          : createGradient(
              gradientDir,
              theme.global.color.accent.default,
              theme.click.field.color.background.active,
              $progress
            )
      };
      background-size: calc(100% + 2px);
      background-position: center;
    }
  `;
  }};
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
  orientation = "horizontal",
  dir = "start",
  ...props
}: ProgressBarProps) => {
  const completed = progress === 100;

  return (
    <ProgressContainer
      $completed={completed}
      $progress={progress}
      $type={type}
      $orientation={orientation}
      $dir={dir}
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
