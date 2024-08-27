import * as RadixAccordion from "@radix-ui/react-accordion";
import styled from "styled-components";
import { IconSize } from "@/components/Icon/types";
import { Container, Icon, IconName, Spacer, Text } from "@/components";
import {
  createContext,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  useContext,
} from "react";
import { GapOptions, PaddingOptions } from "../Container/Container";
import { SizeType as SpacerSizeType } from "../Spacer/Spacer";

type Size = "sm" | "md" | "lg";
type Color = "default" | "link";

type MarkAsCompletedFunctionType = (value: string) => void | Promise<void>;

interface MultiAccordionCommonProps {
  children: React.ReactNode;
  size?: Size;
  fillWidth?: boolean;
  gap?: GapOptions;
  padding?: PaddingOptions;
  showBorder?: boolean;
  showCheck?: boolean;
  markAsCompleted?: MarkAsCompletedFunctionType;
}

export type MultiAccordionProps = MultiAccordionCommonProps &
  (
    | Omit<RadixAccordion.AccordionMultipleProps, "children">
    | Omit<RadixAccordion.AccordionSingleProps, "children">
  );

interface MultiAccordionContextProps {
  size: Size;
  fillWidth: boolean;
  padding: PaddingOptions;
  showBorder: boolean;
  showCheck: boolean;
  markAsCompleted?: MarkAsCompletedFunctionType;
}

const MultiAccordionContext = createContext<MultiAccordionContextProps>({
  size: "md",
  fillWidth: false,
  padding: "none",
  showBorder: false,
  showCheck: false,
});

export const MultiAccordion = ({
  size = "md",
  children,
  fillWidth = false,
  showCheck = false,
  padding = "none",
  showBorder = false,
  gap = "md",
  markAsCompleted,
  ...delegated
}: MultiAccordionProps) => {
  const contextValue = {
    size,
    fillWidth,
    padding,
    showBorder,
    showCheck,
    markAsCompleted,
  };

  return (
    <AccordionRoot
      $fillWidth={fillWidth}
      $gap={gap}
      {...delegated}
    >
      <MultiAccordionContext.Provider value={contextValue}>
        {children}
      </MultiAccordionContext.Provider>
    </AccordionRoot>
  );
};
interface MultiAccordionItemProps
  extends Omit<RadixAccordion.AccordionItemProps, "title"> {
  title: ReactNode;
  color?: Color;
  icon?: IconName;
  iconSize?: IconSize;
  gap?: SpacerSizeType;
  isCompleted?: boolean;
}

const MultiAccordionItem = ({
  value,
  title,
  color,
  icon,
  iconSize,
  gap,
  children,
  isCompleted = false,
  ...props
}: MultiAccordionItemProps): ReactElement => {
  const { fillWidth, size, padding, showBorder, showCheck, markAsCompleted } =
    useContext(MultiAccordionContext);

  const onClickStatus: MouseEventHandler<HTMLOrSVGElement> = e => {
    e.preventDefault();
    if (typeof markAsCompleted === "function") {
      markAsCompleted(value);
    }
  };

  return (
    <AccordionItem
      value={value}
      $showBorder={showBorder}
      $fillWidth={fillWidth}
      {...props}
    >
      <AccordionTrigger
        $size={size}
        color={color}
        $padding={padding}
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
        <Container
          isResponsive={false}
          gap="sm"
          alignItems="center"
          fillWidth
          justifyContent="space-between"
          component="span"
        >
          <Text
            component="span"
            size={size}
            fillWidth={fillWidth}
          >
            {title}
          </Text>
          {showCheck && (
            <CustomIcon
              name={isCompleted ? "check-in-circle" : "circle"}
              $isCompleted={isCompleted}
              size="lg"
              aria-label="accordion icon status"
              onClick={onClickStatus}
              data-icon="accordion-status"
              data-testid="accordion-status-icon"
            />
          )}
        </Container>
      </AccordionTrigger>
      <AccordionContent $padding={padding}>
        <Spacer size={gap} />
        {children}
      </AccordionContent>
    </AccordionItem>
  );
};

MultiAccordionItem.displayName = "MultiAccordion.Item";
MultiAccordion.Item = MultiAccordionItem;

interface StyledAccordionRootProps {
  $fillWidth: boolean;
  $gap: GapOptions;
}

const AccordionRoot = styled(RadixAccordion.Root)<StyledAccordionRootProps>`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: ${({ theme, $gap }) => theme.click.container.gap[$gap]};
  ${({ $fillWidth }) => $fillWidth && "width: 100%"};
`;

interface StyledAccordionItemProps {
  $fillWidth: boolean;
  $showBorder: boolean;
}

const AccordionItem = styled(RadixAccordion.Item)<StyledAccordionItemProps>`
  ${({ theme, $showBorder }) => `
    border: ${
      $showBorder ? `1px solid ${theme.click.global.color.stroke.default}` : "none"
    };
    border-radius: ${theme.border.radii[1]};
  `};
  ${({ $fillWidth }) => $fillWidth && "width: 100%"};
`;

interface StyledAccordionTriggerProps {
  $size?: Size;
  color?: Color;
  $padding: PaddingOptions;
}

const AccordionTrigger = styled(RadixAccordion.Trigger)<StyledAccordionTriggerProps>`
  width: 100%;
  border: none;
  padding: 0;
  background-color: transparent;
  display: flex;
  align-items: center;
  ${({ theme, $size = "md", $padding, color = "default" }) => `
    padding: ${theme.click.container.space[$padding]};
    gap: ${theme.click.accordion[$size].space.gap};
    color: ${theme.click.accordion.color[color].label.default};
    font: ${theme.click.accordion[$size].typography.label.default};

    &:active {
      color: ${theme.click.accordion.color[color].label.active};
      font: ${theme.click.accordion[$size].typography.label.active};
    }

    &:hover {
      color: ${theme.click.accordion.color[color].label.hover};
      background: ${theme.click.global.color.stroke.default};
      font: ${theme.click.accordion[$size].typography.label.hover};
      cursor: pointer;
    }

  [data-icon="accordion-status"] {
    color: ${theme.global.color.stroke.intense};
  }
  `};
  &[data-state="open"] [data-icon="accordion-status"] {
    color: ${({ theme }): string => theme.global.color.accent.default};
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

const CustomIcon = styled(Icon)<{ $isCompleted: boolean }>`
  ${({ $isCompleted, theme }) =>
    $isCompleted &&
    `
        svg path {
          stroke: ${theme.global.color.background.default} !important;
          &:first-of-type {
            stroke: ${theme.global.color.accent.default} !important;
          }
          fill: ${theme.global.color.accent.default} !important;;
        }
      `}
`;

const AccordionContent = styled(RadixAccordion.Content)<{ $padding: PaddingOptions }>`
  padding: ${({ theme, $padding }): string => theme.click.container.space[$padding]};
  padding-top: 0;
`;
