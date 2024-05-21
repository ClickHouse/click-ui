import * as RadixAccordion from "@radix-ui/react-accordion";
import styled from "styled-components";
import { IconSize } from "@/components/Icon/types";
import { Icon, IconName, Spacer, Text } from "@/components";

type Size = "sm" | "md" | "lg";
type Gap = "sm" | "md" | "lg";
type Color = "default" | "link";

export interface AccordionProps
  extends SizeProp,
    Omit<RadixAccordion.AccordionSingleProps, "type" | "collapsible"> {
  title: string;
  color?: Color;
  icon?: IconName;
  iconSize?: IconSize;
  gap?: Gap;
  children: React.ReactNode;
  fillWidth?: boolean;
}

interface SizeProp {
  size?: Size;
}

const Accordion = ({
  title,
  size = "md",
  color,
  icon,
  iconSize,
  gap,
  children,
  fillWidth = false,
  ...delegated
}: AccordionProps) => (
  <RadixAccordion.Root
    type="single"
    collapsible
    className="asasas"
    {...delegated}
  >
    <RadixAccordion.Item value="item">
      <AccordionTrigger
        $size={size}
        color={color}
        $fillWidth={fillWidth}
      >
        <AccordionIconsWrapper>
          <AccordionIconWrapper>
            <Icon
              name="chevron-right"
              size={iconSize || size}
              aria-label="accordion icon"
            />
          </AccordionIconWrapper>
          {icon ? (
            <Icon
              name={icon}
              size={iconSize || size}
            />
          ) : null}
        </AccordionIconsWrapper>
        <Text
          component="div"
          size={size}
        >
          {title}
        </Text>
      </AccordionTrigger>
      <AccordionContent>
        <Spacer size={gap} />
        {children}
      </AccordionContent>
    </RadixAccordion.Item>
  </RadixAccordion.Root>
);

const AccordionTrigger = styled(RadixAccordion.Trigger)<{
  $size?: Size;
  color?: Color;
  $fillWidth: boolean;
}>`
  border: none;
  padding: 0;
  background-color: transparent;
  display: flex;
  align-items: center;
  ${({ theme, $size = "md", color = "default" }) => `
    gap: ${theme.click.accordion[$size].space.gap};
    color: ${theme.click.accordion.color[color].label.default};
    font: ${theme.click.accordion[$size].typography.label.default};

    &:active {
      color: ${theme.click.accordion.color[color].label.active};
      font: ${theme.click.accordion[$size].typography.label.active};
    }

    &:hover {
      color: ${theme.click.accordion.color[color].label.hover};
      font: ${theme.click.accordion[$size].typography.label.hover};
      cursor: pointer;
    }
  `}
  ${({ $fillWidth }) => $fillWidth && "width: 100%"};
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
