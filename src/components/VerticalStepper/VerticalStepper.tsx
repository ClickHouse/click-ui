import { HTMLAttributes, ReactNode, createContext, useContext } from "react";
import { styled } from "styled-components";
import { Icon } from "@/components";

type StepperType = "numbered" | "bulleted";
type StepStatus = "active" | "complete" | "incomplete";
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

const StepRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  counter-reset: vertical-stepper;
  width: 100%;
`;

const VerticalStepper = ({
  children,
  type = "numbered",
  ...props
}: VerticalStepperProps) => {
  const value = {
    type,
  };
  return (
    <StepRoot {...props}>
      <StepperContext.Provider value={value}>{children}</StepperContext.Provider>
    </StepRoot>
  );
};
const StepItem = styled.div<{
  $type: StepperType;
  $status: StepStatus;
  $isOpen: boolean;
}>`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  padding: 0;
  ${({ theme, $type, $status, $isOpen }) => `
    row-gap: ${theme.click.stepper.vertical[$type].content.space.gap.y};
    column-gap: ${theme.click.stepper.vertical[$type].content.space.gap.x};
    padding-bottom: ${
      theme.click.stepper.vertical[$type].content.space.bottom[
        $isOpen ? "active" : "default"
      ]
    };
    box-sizing: content-box;
    &:not(:last-of-type) {
      &::before{
        content: "";
        position: absolute;
        top: ${theme.click.stepper.vertical[$type].step.size.height};
        height: 100%;
        left: calc(${theme.click.stepper.vertical[$type].step.size.width}  / 2 );
        width: ${theme.click.stepper.vertical[$type].connector.size.width};
        background: ${
          theme.click.stepper.vertical[$type].connector.color.stroke[$status]
        };
        box-sizing: content-box;
      }
    }
  `}
`;

const StepTrigger = styled.button<{
  $status: StepStatus;
}>`
  ${({ $status }) => `
    display: flex;
    align-items: center;
    padding: 0;
    width: 100%;
    background: transparent;
    border: none;
    gap: inherit;
    cursor: ${
      $status === "active"
        ? "default"
        : $status === "complete"
          ? "pointer"
          : "not-allowed"
    };
    flex-direction: row;
  `}
`;

const StepBubble = styled.div<{ $type: StepperType; $status: StepStatus }>`
  ${({ theme, $type, $status }) => `
    display: grid;
    place-items: center;
    position: relative;
    width: ${theme.click.stepper.vertical[$type].step.size.width};
    height: ${theme.click.stepper.vertical[$type].step.size.width};
    border-radius: ${theme.click.stepper.vertical[$type].step.radii.default};
    background: ${theme.click.stepper.vertical[$type].step.color.background[$status]};
    border: 2px solid ${theme.click.stepper.vertical[$type].step.color.stroke[$status]};
    font: ${theme.click.stepper.vertical.numbered.step.typography.number.default};
    color: ${theme.click.stepper.vertical[$type].step.color.icon[$status]};
    counter-increment: vertical-stepper;
    box-sizing: content-box;
    ${
      $type === "numbered" && $status !== "complete"
        ? `
        &::before {
          box-sizing: content-box;
          font: inherit;
          color: inherit;
          content: counter(vertical-stepper);
        }
    `
        : ""
    }
      ${
        $status == "complete" && $type === "bulleted"
          ? `
      &::after {
        box-sizing: content-box;
        content: "";
        position: absolute;
        width: 50%;
        height: 50%;
        border-radius: inherit;
        background: ${theme.click.stepper.vertical.bulleted.step.color.icon.complete}
      }
      `
          : ""
      };
  `}
`;

const CheckIcon = styled(Icon)`
  color: inherit;
  path {
    stroke-width: 3;
  }
`;
const StepLabel = styled.div<{ $type: StepperType; $status: StepStatus }>`
  display: flex;
  flex-direction: column;
  ${({ theme, $type, $status }) => `
    font: ${theme.click.stepper.vertical[$type].typography.title.default};
    color: ${theme.click.stepper.vertical[$type].color.title[$status]};
    gap: inherit;
  `})
`;

const StepContent = styled.div<{ $type: StepperType }>`
  display: flex;
  width: 100%;
  flex-direction: column;
  ${({ theme, $type }) => `
    padding-left: ${theme.click.stepper.vertical[$type].content.space.left};
  `}
`;

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
  ...props
}: VerticalStepProps) => {
  const { type } = useContext(StepperContext);
  const isOpen = !collapsed || status === "active";
  return (
    <StepItem
      $type={type}
      $status={status}
      $isOpen={isOpen}
    >
      <StepTrigger
        $status={status}
        disabled={status === "incomplete" || disabled}
        {...props}
      >
        <StepBubble
          $type={type}
          $status={status}
        >
          {type === "numbered" && status === "complete" ? (
            <CheckIcon
              name="check"
              size="xs"
            />
          ) : null}
        </StepBubble>
        {label && (
          <StepLabel
            $type={type}
            $status={status}
          >
            {label}
          </StepLabel>
        )}
      </StepTrigger>
      {isOpen && <StepContent $type={type}>{children}</StepContent>}
    </StepItem>
  );
};
VerticalStep.displayName = "VerticalStepper.Step";
VerticalStepper.Step = VerticalStep;

export default VerticalStepper;
