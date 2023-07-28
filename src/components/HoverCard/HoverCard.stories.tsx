import { Checkbox } from "..";
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
      <div>
        Click on the input element below
        <Checkbox />
        <div>This is a sample data to experiment the popover</div>
      </div>
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

export const Default = {
  args: {
    open: "default",
  },
};
