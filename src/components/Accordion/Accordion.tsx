import * as RadixAccordion from "@radix-ui/react-accordion";
import styled from "styled-components";
import { IconName, IconSize } from "@/components/Icon/types";
import { Icon } from "@/components";

type Size = "sm" | "md" | "lg";

export interface AccordionProps
  extends SizeProp,
    Omit<RadixAccordion.AccordionSingleProps, "type" | "collapsible"> {
  title: string;
  icon?: IconName;
  iconSize?: IconSize;
  children: React.ReactNode;
}

interface SizeProp {
  size?: Size;
}

const Accordion = ({
  title,
  size = "md",
  icon,
  iconSize,
  children,
  ...delegated
}: AccordionProps) => (
  <RadixAccordion.Root
    type="single"
    collapsible
    {...delegated}
  >
    <RadixAccordion.Item value="item">
      <AccordionTrigger $size={size}>
        <AccordionIconsWrapper>
          <AccordionIconWrapper>
            <Icon
              name="chevron-right"
              size={iconSize || size}
            />
          </AccordionIconWrapper>
          {icon ? (
            <Icon
              name={icon}
              size={iconSize || size}
            />
          ) : null}
        </AccordionIconsWrapper>
        <p>{title}</p>
      </AccordionTrigger>
      <AccordionContent>{children}</AccordionContent>
    </RadixAccordion.Item>
  </RadixAccordion.Root>
);

const AccordionTrigger = styled(RadixAccordion.Trigger)<{
  $size?: Size;
}>`
  border: none;
  padding: 0;
  background-color: transparent;
  display: flex;
  align-items: center;
  ${({ theme, $size = "md" }) => `
    gap: ${theme.click.accordion[$size].space.gap};
    color: ${theme.click.accordion.color.label.default};
    font: ${theme.click.accordion[$size].typography.label.default};

    &:active {
      color: ${theme.click.accordion.color.label.active};
      font: ${theme.click.accordion[$size].typography.label.active};
    }

    &:hover {
      color: ${theme.click.accordion.color.label.hover};
      font: ${theme.click.accordion[$size].typography.label.hover};
      cursor: pointer;
    }
  `}
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
  ${AccordionTrigger} {
    gap: ${({ theme }) => theme.click.sidebar.navigation.item.default.space.gap};
  }
  p {
    margin: 0;
  }

  ${AccordionIconWrapper} {
    visibility: hidden;
  }

  &:hover ${AccordionIconWrapper} {
    visibility: revert;
  }
  &:active ${AccordionIconWrapper} {
    visibility: revert;
  }

  ${AccordionTrigger}[data-state='open'] ${AccordionIconWrapper} {
    visibility: revert;
  }
`;
// This allows the Accordion to be referenced inside other
// components css
const AccordionToExport = styled(Accordion)``;
export { AccordionToExport as Accordion, SidebarAccordion };
