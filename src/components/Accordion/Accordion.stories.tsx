import { Meta, StoryObj } from "@storybook/react-vite";
import { Panel } from "@/components";
import { Accordion } from "./Accordion";
import { Spacer } from "@/components/Spacer/Spacer";
import { Text } from "@/components/Typography/Text/Text";
import { Title } from "@/components/Typography/Title/Title";

const meta: Meta<typeof Accordion> = {
  component: Accordion,
  title: "Accordion/Accordion",
  tags: ["accordion", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof Accordion>;

const children = (
  <Panel color="muted">
    <Title type="h2">Content</Title>
    <Spacer />
    <Text>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
      Ipsum has been the industry's standard Lorem Ipsum is simply dummy text of the
      printing and typesetting industry. Lorem Ipsum has been the industry's standard
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
      Ipsum has been the industry's standard.
    </Text>
  </Panel>
);

export const Playground: Story = {
  args: {
    title: "Accordion title",
    size: "md",
    gap: "md",
    color: "default",
    fillWidth: false,
    children,
  },
};

export const Variations: Story = {
  render: () => (
    <div
      style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "2rem" }}
    >
      <section>
        <h3>Sizes</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Accordion
            size="sm"
            title="Small Size Accordion"
          >
            <Panel color="muted">
              <Text>Small accordion content</Text>
            </Panel>
          </Accordion>
          <Accordion
            size="md"
            title="Medium Size Accordion"
          >
            <Panel color="muted">
              <Text>Medium accordion content</Text>
            </Panel>
          </Accordion>
          <Accordion
            size="lg"
            title="Large Size Accordion"
          >
            <Panel color="muted">
              <Text>Large accordion content</Text>
            </Panel>
          </Accordion>
        </div>
      </section>

      <section>
        <h3>Colors</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Accordion
            color="default"
            title="Default Color"
          >
            <Panel color="muted">
              <Text>Default color accordion content</Text>
            </Panel>
          </Accordion>
          <Accordion
            color="link"
            title="Link Color"
          >
            <Panel color="muted">
              <Text>Link color accordion content</Text>
            </Panel>
          </Accordion>
        </div>
      </section>

      <section>
        <h3>With Icon</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Accordion
            title="Accordion with Icon"
            icon="code"
          >
            <Panel color="muted">
              <Text>Accordion with code icon</Text>
            </Panel>
          </Accordion>
          <Accordion
            title="Different Icon"
            icon="table"
          >
            <Panel color="muted">
              <Text>Accordion with table icon</Text>
            </Panel>
          </Accordion>
          <Accordion
            title="Large Icon"
            icon="user"
            iconSize="lg"
          >
            <Panel color="muted">
              <Text>Accordion with large icon</Text>
            </Panel>
          </Accordion>
        </div>
      </section>

      <section>
        <h3>Gap Variants</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Accordion
            title="Small Gap"
            gap="sm"
          >
            <Panel color="muted">
              <Text>Small gap between header and content</Text>
            </Panel>
          </Accordion>
          <Accordion
            title="Medium Gap"
            gap="md"
          >
            <Panel color="muted">
              <Text>Medium gap between header and content</Text>
            </Panel>
          </Accordion>
          <Accordion
            title="Large Gap"
            gap="lg"
          >
            <Panel color="muted">
              <Text>Large gap between header and content</Text>
            </Panel>
          </Accordion>
        </div>
      </section>

      <section>
        <h3>Fill Width</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Accordion
            title="Fill Width Accordion"
            fillWidth
          >
            <Panel color="muted">
              <Text>This accordion fills the full width</Text>
            </Panel>
          </Accordion>
          <Accordion
            title="Default Width"
            fillWidth={false}
          >
            <Panel color="muted">
              <Text>This accordion has default width</Text>
            </Panel>
          </Accordion>
        </div>
      </section>

      <section>
        <h3>Default Open State</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Accordion title="Closed by Default">
            <Panel color="muted">
              <Text>This accordion is closed by default</Text>
            </Panel>
          </Accordion>
          <Accordion
            title="Open by Default"
            defaultValue="item"
          >
            <Panel color="muted">
              <Text>This accordion is open by default</Text>
            </Panel>
          </Accordion>
        </div>
      </section>

      <section>
        <h3>Complex Content</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Accordion
            title="Accordion with Rich Content"
            icon="code"
            size="lg"
          >
            <Panel color="muted">
              <Title type="h2">Content</Title>
              <Spacer />
              <Text>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard Lorem Ipsum is simply dummy
                text of the printing and typesetting industry.
              </Text>
            </Panel>
          </Accordion>
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
    },
    chromatic: {
      delay: 300,
    },
  },
};
