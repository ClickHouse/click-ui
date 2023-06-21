import * as RadixAccordion from "@radix-ui/react-accordion";
import styled from "styled-components";

type Size = "small" | "medium" | "large";

export interface AccordionProps {
  title: string;
  size?: Size;
  children: React.ReactNode;
}

interface RootProps extends RadixAccordion.AccordionSingleProps {
  size?: Size;
}
export const Accordion = ({ title, size, children }: AccordionProps) => (
  <AccordionRoot type="single" collapsible size={size}>
    <AccordionItem value="item">
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  </AccordionRoot>
);

const AccordionRoot = styled(RadixAccordion.Root)<RootProps>`
  width: ${props => props.theme.click.accordion};
`;

const AccordionItem = styled(RadixAccordion.Item)``;

const AccordionTrigger = styled(RadixAccordion.Trigger)``;

const AccordionContent = styled(RadixAccordion.Content)``;
