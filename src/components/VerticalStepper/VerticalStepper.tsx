"use client";

import { HTMLAttributes, ReactNode, createContext, useContext } from "react";
import clsx from "clsx";
import { Icon } from "@/components";
import styles from "./VerticalStepper.module.scss";

type StepperType = "numbered" | "bulleted";
type ContextProps = {
  type: StepperType;
};

const StepperContext = createContext<ContextProps>({
  type: "numbered",
});

export interface VerticalStepperProps extends HTMLAttributes<HTMLDivElement> {
  type?: StepperType;
}

const VerticalStepper = ({
  children,
  type = "numbered",
  ...props
}: VerticalStepperProps) => {
  const value = {
    type,
  };
  return (
    <div
      className={styles.cuiStepRoot}
      {...props}
    >
      <StepperContext.Provider value={value}>{children}</StepperContext.Provider>
    </div>
  );
};

export interface VerticalStepProps extends HTMLAttributes<HTMLButtonElement> {
  status?: "active" | "complete" | "incomplete";
  collapsed?: boolean;
  label?: ReactNode;
  disabled?: boolean;
}

const VerticalStep = ({
  status = "incomplete",
  children,
  label,
  collapsed = true,
  disabled,
  ...props
}: VerticalStepProps) => {
  const { type } = useContext(StepperContext);
  const isOpen = !collapsed || status === "active";
  return (
    <div
      className={clsx(styles.cuiStepItem, {
        [styles.cuiNumbered]: type === "numbered",
        [styles.cuiBulleted]: type === "bulleted",
        [styles.cuiComplete]: status === "complete",
        [styles.cuiActive]: status === "active" || isOpen,
        [styles.cuiIncomplete]: status === "incomplete",
      })}
    >
      <button
        disabled={status === "incomplete" || disabled}
        className={clsx(styles.cuiStepTrigger, {
          [styles.cuiComplete]: status === "complete",
          [styles.cuiActive]: status === "active",
          [styles.cuiIncomplete]: status === "incomplete",
        })}
        {...props}
      >
        <div
          className={clsx(styles.cuiStepBubble, {
            [styles.cuiNumbered]: type === "numbered",
            [styles.cuiBulleted]: type === "bulleted",
            [styles.cuiComplete]: status === "complete",
            [styles.cuiActive]: status === "active",
            [styles.cuiIncomplete]: status === "incomplete",
          })}
        >
          {type === "numbered" && status === "complete" ? (
            <Icon
              name="check"
              size="xs"
              className={styles.cuiCheckIcon}
            />
          ) : null}
        </div>
        {label && (
          <div
            className={clsx(styles.cuiStepLabel, {
              [styles.cuiNumbered]: type === "numbered",
              [styles.cuiBulleted]: type === "bulleted",
              [styles.cuiComplete]: status === "complete",
              [styles.cuiActive]: status === "active",
              [styles.cuiIncomplete]: status === "incomplete",
            })}
          >
            {label}
          </div>
        )}
      </button>
      {isOpen && (
        <div
          className={clsx(styles.cuiStepContent, {
            [styles.cuiNumbered]: type === "numbered",
            [styles.cuiBulleted]: type === "bulleted",
          })}
        >
          {children}
        </div>
      )}
    </div>
  );
};
VerticalStep.displayName = "VerticalStepper.Step";
VerticalStepper.Step = VerticalStep;

export default VerticalStepper;
