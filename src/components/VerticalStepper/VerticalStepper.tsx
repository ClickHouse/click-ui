"use client";

import { HTMLAttributes, ReactNode, createContext, useContext } from "react";
import clsx from "clsx";
import { Icon } from "@/components";
import { capitalize } from "../../utils/capitalize";
import styles from "./VerticalStepper.module.scss";

type StepperType = "numbered" | "bulleted";
type ContextProps = {
  type: StepperType;
};

const StepperContext = createContext<ContextProps>({
  type: "numbered",
});

export interface VerticalStepperProps extends HTMLAttributes<HTMLDivElement> {
  /** The type of stepper - numbered shows step numbers, bulleted shows dots */
  type?: StepperType;
}

const VerticalStepper = ({
  children,
  type = "numbered",
  className,
  ...props
}: VerticalStepperProps) => {
  const value = {
    type,
  };
  return (
    <div
      className={clsx(styles.cuiStepRoot, className)}
      {...props}
    >
      <StepperContext.Provider value={value}>{children}</StepperContext.Provider>
    </div>
  );
};

export interface VerticalStepProps extends HTMLAttributes<HTMLButtonElement> {
  /** The status of this step - active, complete, or incomplete */
  status?: "active" | "complete" | "incomplete";
  /** Whether the step content is collapsed */
  collapsed?: boolean;
  /** The label text displayed for this step */
  label?: ReactNode;
  /** Whether the step is disabled */
  disabled?: boolean;
}

const VerticalStep = ({
  status = "incomplete",
  children,
  label,
  collapsed = true,
  disabled,
  className,
  ...props
}: VerticalStepProps) => {
  const { type } = useContext(StepperContext);
  const isOpen = !collapsed || status === "active";

  const typeClass = `cuiType${capitalize(type)}`;
  const statusClass = `cuiStatus${capitalize(status)}`;
  const openClass = isOpen ? 'cuiIsOpen' : undefined;

  return (
    <div
      className={clsx(styles.cuiStepItem, styles[typeClass], styles[statusClass], openClass && styles[openClass])}
      data-cui-type={type}
      data-cui-status={status}
    >
      <button
        disabled={status === "incomplete" || disabled}
        className={clsx(styles.cuiStepTrigger, styles[statusClass], className)}
        data-cui-status={status}
        {...props}
      >
        <div
          className={clsx(styles.cuiStepBubble, styles[typeClass], styles[statusClass])}
          data-cui-type={type}
          data-cui-status={status}
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
            className={clsx(styles.cuiStepLabel, styles[typeClass], styles[statusClass])}
            data-cui-type={type}
            data-cui-status={status}
          >
            {label}
          </div>
        )}
      </button>
      {isOpen && (
        <div
          className={clsx(styles.cuiStepContent, styles[typeClass])}
          data-cui-type={type}
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
