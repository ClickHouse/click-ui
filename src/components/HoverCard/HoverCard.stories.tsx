import { Checkbox } from "../Checkbox/Checkbox";
import { Spacer } from "../Spacer/Spacer";
import { Text } from "../Typography/Text/Text";
import { Title } from "../Typography/Title/Title";
import { HoverCard } from "./HoverCard";

const HoverCardComponent = ({
  open,
  showArrow,
  forceMount,
  title,
  openDelay,
  closeDelay,
}: {
  open: "default" | "open" | "closed";
  showArrow: boolean;
  forceMount?: boolean;
  title?: string;
  openDelay?: number;
  closeDelay?: number;
}) => (
  <HoverCard
    open={open === "default" ? undefined : open === "open"}
    openDelay={openDelay}
    closeDelay={closeDelay}
  >
    <HoverCard.Trigger>Hover Here</HoverCard.Trigger>
    <HoverCard.Content
      showArrow={showArrow}
      forceMount={forceMount ? true : undefined}
      title={title}
    >
      <Title
        color="default"
        size="sm"
        type="h5"
      >
        Hover Title
      </Title>
      <Spacer />
      <Text>Click on the input element below.</Text>
      <Spacer />
      <Checkbox label="This is a sample data to experiment the popover" />
    </HoverCard.Content>
  </HoverCard>
);

export default {
  component: HoverCardComponent,
  title: "Display/HoverCard",
  tags: ["form-field", "hover-card", "autodocs"],
  argTypes: {
    open: { control: "radio", options: ["default", "open", "closed"] },
    showArrow: { control: "boolean" },
    forceMount: { control: "boolean" },
    openDelay: { control: "number" },
    closeDelay: { control: "number" },
  },
};

export const Playground = {
  args: {
    open: "default",
  },
};
