import * as RadixAccordion from "@radix-ui/react-accordion";
import styled from "styled-components";
import { IconName } from "@/components/Icon/types";
import { Icon } from "@/components";

type Size = "small" | "medium" | "large";
export interface AccordionProps extends SizeProp {
  title: string;
  icon?: IconName;
  iconSize?: Size;
  children: React.ReactNode;
}

interface TriggerProps extends RadixAccordion.AccordionTriggerProps, SizeProp {}
interface SizeProp {
  size?: Size;
}

const Accordion = ({
  title,
  size = "medium",
  icon,
  iconSize,
  children,
  ...delegated
}: AccordionProps) => (
  <AccordionRoot type="single" collapsible>
    <AccordionItem value="item">
      <AccordionTrigger size={size} {...delegated}>
        <AccordionIconsWrapper>
          <AccordionIconWrapper>
            <Icon name="chevron-right" />
          </AccordionIconWrapper>
          {icon ? <Icon name={icon} size={iconSize || size} /> : null}
        </AccordionIconsWrapper>
        <p>{title}</p>
      </AccordionTrigger>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  </AccordionRoot>
);

const AccordionRoot = styled(RadixAccordion.Root)``;

const AccordionItem = styled(RadixAccordion.Item)``;

const AccordionTrigger = styled(RadixAccordion.Trigger)<TriggerProps>`
  border: none;
  padding: 0;
  background-color: transparent;
  display: flex;
  align-items: center;
  gap: ${props =>
    props.theme.click.accordion[props.size || "medium"].space.gap};

  color: ${props => props.theme.click.accordion.color.label.default};
  font: ${props =>
    props.theme.click.accordion[props.size || "medium"].typography.label
      .default};

  &:active {
    color: ${props => props.theme.click.accordion.color.label.active};
    font: ${props =>
      props.theme.click.accordion[props.size || "medium"].typography.label
        .active};
  }

  &:hover {
    color: ${props => props.theme.click.accordion.color.label.hover};
  }
`;

const AccordionIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 200ms cubic-bezier(0.87, 0, 0.13, 1);

  ${AccordionTrigger}[data-state='open'] & {
    transform: rotate(90deg);
  }
`;
const AccordionIconsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AccordionContent = styled(RadixAccordion.Content)``;

const SidebarAccordion = styled(Accordion)`
  p {
    margin: 0;
  }
`;
// This allows the Accordion to be referenced inside other
// components css
const AccordionToExport = styled(Accordion)``;
export { AccordionToExport as Accordion, SidebarAccordion };
