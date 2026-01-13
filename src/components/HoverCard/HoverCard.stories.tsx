import { Checkbox } from "@/components/Checkbox/Checkbox";
import { Spacer } from "@/components/Spacer/Spacer";
import { Text } from "@/components/Typography/Text/Text";
import { Title } from "@/components/Typography/Title/Title";
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

export const Variations = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "3rem", padding: "2rem" }}
    >
      <section>
        <h3>Arrow Variants</h3>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <HoverCard open={true}>
            <HoverCard.Trigger>Hover with Arrow</HoverCard.Trigger>
            <HoverCard.Content
              showArrow={true}
              forceMount={true}
            >
              <Title
                color="default"
                size="sm"
                type="h5"
              >
                With Arrow
              </Title>
              <Spacer />
              <Text>This hover card has an arrow pointing to the trigger.</Text>
              <Spacer />
              <Checkbox label="Sample checkbox" />
            </HoverCard.Content>
          </HoverCard>

          <HoverCard open={true}>
            <HoverCard.Trigger>Hover without Arrow</HoverCard.Trigger>
            <HoverCard.Content
              showArrow={false}
              forceMount={true}
            >
              <Title
                color="default"
                size="sm"
                type="h5"
              >
                Without Arrow
              </Title>
              <Spacer />
              <Text>This hover card has no arrow.</Text>
              <Spacer />
              <Checkbox label="Sample checkbox" />
            </HoverCard.Content>
          </HoverCard>
        </div>
      </section>

      <section>
        <h3>Position Variants</h3>
        <div
          style={{
            display: "flex",
            gap: "2rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <HoverCard open={true}>
            <HoverCard.Trigger>Top</HoverCard.Trigger>
            <HoverCard.Content
              showArrow={true}
              side="top"
              forceMount={true}
            >
              <Title
                color="default"
                size="sm"
                type="h5"
              >
                Top Position
              </Title>
              <Spacer />
              <Text>Hover card positioned above trigger.</Text>
            </HoverCard.Content>
          </HoverCard>

          <HoverCard open={true}>
            <HoverCard.Trigger>Bottom</HoverCard.Trigger>
            <HoverCard.Content
              showArrow={true}
              side="bottom"
              forceMount={true}
            >
              <Title
                color="default"
                size="sm"
                type="h5"
              >
                Bottom Position
              </Title>
              <Spacer />
              <Text>Hover card positioned below trigger.</Text>
            </HoverCard.Content>
          </HoverCard>

          <HoverCard open={true}>
            <HoverCard.Trigger>Left</HoverCard.Trigger>
            <HoverCard.Content
              showArrow={true}
              side="left"
              forceMount={true}
            >
              <Title
                color="default"
                size="sm"
                type="h5"
              >
                Left Position
              </Title>
              <Spacer />
              <Text>Hover card positioned to the left.</Text>
            </HoverCard.Content>
          </HoverCard>

          <HoverCard open={true}>
            <HoverCard.Trigger>Right</HoverCard.Trigger>
            <HoverCard.Content
              showArrow={true}
              side="right"
              forceMount={true}
            >
              <Title
                color="default"
                size="sm"
                type="h5"
              >
                Right Position
              </Title>
              <Spacer />
              <Text>Hover card positioned to the right.</Text>
            </HoverCard.Content>
          </HoverCard>
        </div>
      </section>

      <section>
        <h3>Delay Variants</h3>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <HoverCard
            open={true}
            openDelay={0}
          >
            <HoverCard.Trigger>Instant Open</HoverCard.Trigger>
            <HoverCard.Content
              showArrow={true}
              forceMount={true}
            >
              <Title
                color="default"
                size="sm"
                type="h5"
              >
                No Delay
              </Title>
              <Spacer />
              <Text>Opens immediately with 0ms delay.</Text>
            </HoverCard.Content>
          </HoverCard>

          <HoverCard
            open={true}
            openDelay={500}
          >
            <HoverCard.Trigger>Delayed Open</HoverCard.Trigger>
            <HoverCard.Content
              showArrow={true}
              forceMount={true}
            >
              <Title
                color="default"
                size="sm"
                type="h5"
              >
                With Delay
              </Title>
              <Spacer />
              <Text>Opens after 500ms delay.</Text>
            </HoverCard.Content>
          </HoverCard>
        </div>
      </section>

      <section>
        <h3>Content Variants</h3>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <HoverCard open={true}>
            <HoverCard.Trigger>Simple Content</HoverCard.Trigger>
            <HoverCard.Content
              showArrow={true}
              forceMount={true}
            >
              <Text>Simple text content in hover card.</Text>
            </HoverCard.Content>
          </HoverCard>

          <HoverCard open={true}>
            <HoverCard.Trigger>Rich Content</HoverCard.Trigger>
            <HoverCard.Content
              showArrow={true}
              forceMount={true}
            >
              <Title
                color="default"
                size="sm"
                type="h5"
              >
                Rich Content
              </Title>
              <Spacer />
              <Text>
                Hover cards can contain multiple elements including titles, text, and
                interactive components.
              </Text>
              <Spacer />
              <Checkbox label="Interactive checkbox" />
            </HoverCard.Content>
          </HoverCard>
        </div>
      </section>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: [".cuiTrigger"],
      focus: [".cuiTrigger"],
      focusVisible: [".cuiTrigger"],
    },
  },
};
