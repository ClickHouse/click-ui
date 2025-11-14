"use client";

import { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { capitalize } from "@/utils/capitalize";
import { IconButton } from "@/components";
import styles from "./ProgressBar.module.scss";

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

export const ProgressBar = ({
  progress,
  type = "default",
  dismissable = false,
  onCancel,
  successMessage,
  style,
  ...props
}: ProgressBarProps) => {
  const completed = progress === 100;
  const typeClass = `cuiType${capitalize(type)}`;
  const statusClass = completed ? "cuiStatusComplete" : "cuiStatusIncomplete";

  return (
    <div
      className={clsx(styles.cuiProgressContainer, styles[typeClass], styles[statusClass])}
      data-cui-type={type}
      data-cui-status={completed ? "complete" : "incomplete"}
      style={
        {
          ...style,
          "--progress": `${progress}%`,
        } as React.CSSProperties
      }
      {...props}
    >
      {type === "default" && (
        <>
          <span className={styles.cuiProgressText}>
            {successMessage && completed ? successMessage : `${progress}%`}
          </span>
          <button
            className={clsx(styles.cuiProgressCloseButton, {
              [styles.cuiVisible]: dismissable,
            })}
            data-cui-visible={dismissable ? "true" : undefined}
            onClick={onCancel}
            data-testid="progressbar-close"
          >
            <IconButton
              size="sm"
              type="ghost"
              icon="cross"
            />
          </button>
        </>
      )}
    </div>
  );
};
