import { Button, Checkbox } from "@/components";
import { GridCenter } from "@/components/commonElement";
import { Text } from "@/components/Typography/Text/Text";
import { Title } from "@/components/Typography/Title/Title";
import { Popover } from "./Popover";

const PopoverComponent = ({
  open,
  modal,
  showArrow,
  showClose,
  forceMount,
  side,
}: {
  open: "default" | "open" | "closed";
  modal: boolean;
  showArrow: boolean;
  showClose: boolean;
  forceMount?: boolean;
  side: "top" | "right" | "left" | "bottom";
}) => (
  <GridCenter>
    <Popover
      open={open === "default" ? undefined : open === "open"}
      modal={modal}
    >
      <Popover.Trigger>Click Here</Popover.Trigger>
      <Popover.Content
        side={side}
        showArrow={showArrow}
        showClose={showClose}
        forceMount={forceMount ? true : undefined}
      >
        <Title type="h2">Content popover</Title>
        <br />
        <Text>Click on the input element below.</Text>
        <br />
        <Checkbox label="This is a sample data to experiment the popover" />
      </Popover.Content>
    </Popover>
    <Popover
      open={open === "default" ? undefined : open === "open"}
      modal={modal}
    >
      <Popover.Trigger>
        <Button>Click Here Button</Button>
      </Popover.Trigger>
      <Popover.Content
        side={side}
        showArrow={showArrow}
        showClose={showClose}
        forceMount={forceMount ? true : undefined}
      >
        <Title type="h2">Content popover</Title>
        <br />
        <Text>Click on the input element below.</Text>
        <br />
        <Checkbox label="This is a sample data to experiment the popover" />
      </Popover.Content>
    </Popover>
  </GridCenter>
);

export default {
  component: PopoverComponent,
  title: "Display/Popover",
  tags: ["autodocs", "form-field", "popover"],
  argTypes: {
    open: { control: "inline-radio", options: ["default", "open", "closed"] },
    modal: { control: "boolean" },
    showArrow: { control: "boolean" },
    showClose: { control: "boolean" },
    forceMount: { control: "boolean" },
    side: { control: "select", options: ["top", "right", "left", "bottom"] },
  },
};

export const Playground = {
  args: {
    open: "default",
    showArrow: true,
    showClose: true,
    side: "bottom",
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
          <Popover open={true}>
            <Popover.Trigger>With Arrow</Popover.Trigger>
            <Popover.Content
              side="bottom"
              showArrow={true}
              showClose={false}
              forceMount={true}
            >
              <Title type="h2">Popover with Arrow</Title>
              <br />
              <Text>This popover has an arrow pointing to the trigger.</Text>
              <br />
              <Checkbox label="Sample checkbox" />
            </Popover.Content>
          </Popover>

          <Popover open={true}>
            <Popover.Trigger>Without Arrow</Popover.Trigger>
            <Popover.Content
              side="bottom"
              showArrow={false}
              showClose={false}
              forceMount={true}
            >
              <Title type="h2">Popover without Arrow</Title>
              <br />
              <Text>This popover has no arrow.</Text>
              <br />
              <Checkbox label="Sample checkbox" />
            </Popover.Content>
          </Popover>
        </div>
      </section>

      <section>
        <h3>Close Button Variants</h3>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <Popover open={true}>
            <Popover.Trigger>With Close Button</Popover.Trigger>
            <Popover.Content
              side="bottom"
              showArrow={true}
              showClose={true}
              forceMount={true}
            >
              <Title type="h2">Closeable Popover</Title>
              <br />
              <Text>This popover has a close button in the top right.</Text>
              <br />
              <Checkbox label="Sample checkbox" />
            </Popover.Content>
          </Popover>

          <Popover open={true}>
            <Popover.Trigger>Without Close Button</Popover.Trigger>
            <Popover.Content
              side="bottom"
              showArrow={true}
              showClose={false}
              forceMount={true}
            >
              <Title type="h2">No Close Button</Title>
              <br />
              <Text>This popover has no close button.</Text>
              <br />
              <Checkbox label="Sample checkbox" />
            </Popover.Content>
          </Popover>
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
          <Popover open={true}>
            <Popover.Trigger>Top</Popover.Trigger>
            <Popover.Content
              side="top"
              showArrow={true}
              showClose={false}
              forceMount={true}
            >
              <Title type="h2">Top Position</Title>
              <br />
              <Text>Popover positioned above trigger.</Text>
            </Popover.Content>
          </Popover>

          <Popover open={true}>
            <Popover.Trigger>Bottom</Popover.Trigger>
            <Popover.Content
              side="bottom"
              showArrow={true}
              showClose={false}
              forceMount={true}
            >
              <Title type="h2">Bottom Position</Title>
              <br />
              <Text>Popover positioned below trigger.</Text>
            </Popover.Content>
          </Popover>

          <Popover open={true}>
            <Popover.Trigger>Left</Popover.Trigger>
            <Popover.Content
              side="left"
              showArrow={true}
              showClose={false}
              forceMount={true}
            >
              <Title type="h2">Left Position</Title>
              <br />
              <Text>Popover positioned to the left.</Text>
            </Popover.Content>
          </Popover>

          <Popover open={true}>
            <Popover.Trigger>Right</Popover.Trigger>
            <Popover.Content
              side="right"
              showArrow={true}
              showClose={false}
              forceMount={true}
            >
              <Title type="h2">Right Position</Title>
              <br />
              <Text>Popover positioned to the right.</Text>
            </Popover.Content>
          </Popover>
        </div>
      </section>

      <section>
        <h3>Modal Variants</h3>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <Popover
            open={true}
            modal={true}
          >
            <Popover.Trigger>Modal Popover</Popover.Trigger>
            <Popover.Content
              side="bottom"
              showArrow={true}
              showClose={true}
              forceMount={true}
            >
              <Title type="h2">Modal Popover</Title>
              <br />
              <Text>This is a modal popover that traps focus.</Text>
              <br />
              <Checkbox label="Sample checkbox" />
            </Popover.Content>
          </Popover>

          <Popover
            open={true}
            modal={false}
          >
            <Popover.Trigger>Non-Modal Popover</Popover.Trigger>
            <Popover.Content
              side="bottom"
              showArrow={true}
              showClose={true}
              forceMount={true}
            >
              <Title type="h2">Non-Modal</Title>
              <br />
              <Text>This popover does not trap focus.</Text>
              <br />
              <Checkbox label="Sample checkbox" />
            </Popover.Content>
          </Popover>
        </div>
      </section>

      <section>
        <h3>Trigger Variants</h3>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <Popover open={true}>
            <Popover.Trigger>Text Trigger</Popover.Trigger>
            <Popover.Content
              side="bottom"
              showArrow={true}
              forceMount={true}
            >
              <Title type="h2">Text Trigger</Title>
              <br />
              <Text>Triggered by plain text.</Text>
            </Popover.Content>
          </Popover>

          <Popover open={true}>
            <Popover.Trigger>
              <Button>Button Trigger</Button>
            </Popover.Trigger>
            <Popover.Content
              side="bottom"
              showArrow={true}
              forceMount={true}
            >
              <Title type="h2">Button Trigger</Title>
              <br />
              <Text>Triggered by a button component.</Text>
            </Popover.Content>
          </Popover>
        </div>
      </section>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: [".cuiMenuPanel", ".cuiTrigger"],
      focus: [".cuiMenuPanel", ".cuiTrigger"],
      focusVisible: [".cuiMenuPanel", ".cuiTrigger"],
    },
  },
};
