import { Children, FunctionComponent, ReactNode, isValidElement } from "react";
import {
  AccordionItemProps,
  AccordionMultipleProps,
  Content,
  Item,
  Root,
  Trigger,
} from "@radix-ui/react-accordion";
import styled from "styled-components";
import { Icon } from "..";

type StepperType = "numbered" | "bulleted";
type StepState = "active" | "complete" | "incomplete";
const StepRoot = styled(Root)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const StepItem = styled(Item)<{
  $type: StepperType;
  $state: StepState;
}>`
  position: relative;
  width: 100%;
  padding: 0;
  ${({ theme, $type, $state }) => `
    &[data-orientation="vertical"]:not(:last-of-type) {
      &::before{
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: calc(calc(calc(${theme.click.stepper.vertical[$type].step.size.width} -  ${theme.click.stepper.vertical[$type].connector.size.width}) / 2 ) + 2px);
        width: ${theme.click.stepper.vertical[$type].connector.size.width};
        background: ${theme.click.stepper.vertical[$type].connector.color.stroke[$state]}
      }
    }
  `}
`;

const StepTrigger = styled(Trigger)<{
  $type: StepperType;
  $state: StepState;
}>`
  ${({ theme, $type, $state }) => `
    display: flex;
    padding: 0;
    width: 100%;
    background: transparent;
    border: none;
    &[data-orientation="vertical"]{
      flex-direction: row;
      font:  ${theme.click.stepper.vertical[$type].typography.title.default};
      color:  ${theme.click.stepper.vertical[$type].color.title[$state]};
      gap: ${theme.click.stepper.vertical.numbered.content.space.gap.y} ${theme.click.stepper.vertical.numbered.content.space.gap.x};
    }
  `}
`;

const StepBubble = styled.div<{ $type: StepperType; $state: StepState }>`
  ${({ theme, $type, $state }) => `
    display: grid;
    place-items: center;
    position: relative;
    width: ${theme.click.stepper.vertical[$type].step.size.width};
    height: ${theme.click.stepper.vertical[$type].step.size.width};
    border-radius: ${theme.click.stepper.vertical[$type].step.radii.default};
    background: ${theme.click.stepper.vertical[$type].step.color.background[$state]};
    border: 2px solid ${theme.click.stepper.vertical[$type].step.color.stroke[$state]};
      font: ${theme.click.stepper.vertical.numbered.step.typography.number.default};
      ${
        $state == "complete" && $type === "bulleted"
          ? `
      &::after {
        content: "";
        position: absolute;
        width: 50%;
        height: 50%;
        border-radius: inherit;
        background: ${theme.click.stepper.vertical.bulleted.step.color.stroke[$state]}
      }
      `
          : ""
      };
  `}
`;

const StepContent = styled(Content)<{ $type: StepperType; $state: StepState }>`
  display: flex;
  width: 100%;
  flex-direction: column;
  ${({ theme, $type }) => `
    padding-left: calc(${theme.click.stepper.vertical[$type].step.size.width} + ${theme.click.stepper.vertical.numbered.content.space.gap.x});
  `}
`;

interface StepperWrapperProps extends AccordionItemProps {
  completed: boolean;
  active: boolean;
  label: ReactNode;
  type: StepperType;
  index: number;
}
const StepperWrapper = ({
  index,
  completed,
  type,
  children,
  label,
  active,
  ...props
}: StepperWrapperProps) => {
  console.log(active);
  const state = active ? "active" : completed ? "complete" : "incomplete";
  return (
    <StepItem
      {...props}
      $type={type}
      $state={state}
    >
      <StepTrigger
        $type={type}
        $state={state}
      >
        <StepBubble
          $type={type}
          $state={state}
        >
          {type === "numbered" ? (
            completed ? (
              <Icon
                name="check"
                size="xs"
              />
            ) : (
              index + 1
            )
          ) : null}
        </StepBubble>
        {label && <div>{label}</div>}
      </StepTrigger>
      <StepContent
        $type={type}
        $state={state}
      >
        {children}
      </StepContent>
    </StepItem>
  );
};
interface StepProps {
  children: ReactNode;
  label: ReactNode;
  forceOpen?: boolean;
}
interface CommonStepperProps
  extends Omit<AccordionMultipleProps, "orientation" | "children" | "type"> {
  activeIndex?: number;
  children: ReactNode;
  type?: "numbered" | "bulleted";
}
interface VerticalStepperProps extends CommonStepperProps {
  orientation?: "vertical";
  showAll?: boolean;
}

export type StepperProps = VerticalStepperProps;

const Stepper = ({
  orientation = "vertical",
  children,
  activeIndex,
  type = "numbered",
  showAll,
  ...props
}: StepperProps) => {
  const selectedItems: Array<string> = [];
  const childrens = Children.toArray(children).map((step, index: number) => {
    if (isValidElement(step) && step && typeof step === "object") {
      const displayName = (step.type as FunctionComponent).displayName;
      if (displayName !== "Stepper.Step") {
        throw new Error("All the children must be of type 'Stepper.Step'");
      }
      const completed = activeIndex ? index < activeIndex : false;

      if (
        showAll ||
        (completed && step.props.forceOpen === true) ||
        activeIndex === index
      ) {
        selectedItems.push(`item-${index}`);
      }

      return (
        <StepperWrapper
          key={`step-${index}`}
          index={index}
          orientation={orientation}
          completed={completed}
          active={activeIndex === index}
          value={`item-${index}`}
          type={type}
          disabled={(activeIndex ? index > activeIndex : false) || step.props.disabled}
          {...step.props}
        />
      );
    }
  });

  return (
    <StepRoot
      type="multiple"
      orientation={orientation}
      value={selectedItems}
      {...props}
    >
      {childrens}
    </StepRoot>
  );
};

const Step = ({ children }: StepProps) => children;
Step.displayName = "Stepper.Step";
Stepper.Step = Step;

export default Stepper;
