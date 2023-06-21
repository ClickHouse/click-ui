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
export const Accordion = ({
  title,
  size = "medium",
  children,
}: AccordionProps) => (
  <AccordionRoot type="single" collapsible size={size}>
    <AccordionItem value="item">
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  </AccordionRoot>
);

const AccordionRoot = styled(RadixAccordion.Root)<RootProps>`
  color: ${props => props.theme.click.accordion.color.label.default};
`;

const AccordionItem = styled(RadixAccordion.Item)``;

const AccordionTrigger = styled(RadixAccordion.Trigger)``;

const AccordionContent = styled(RadixAccordion.Content)``;
