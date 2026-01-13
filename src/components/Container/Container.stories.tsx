import { Container } from "./Container";
import { Text } from "@/components";
import styles from "./Container.stories.module.scss";

const ContainerExample = ({ ...props }) => {
  return (
    <div className={styles.cuiGridCenter}>
      <Container
        {...props}
        style={{ border: "1px solid grey" }}
      >
        <Text>Parent container</Text>
        <Container
          {...props}
          style={{ border: "1px solid grey" }}
        >
          <Text>Child</Text>
        </Container>
        <Container
          {...props}
          style={{ border: "1px solid grey" }}
        >
          <Text>Child</Text>
        </Container>
        <Container
          {...props}
          style={{ border: "1px solid grey" }}
        >
          <Text>Child</Text>
        </Container>
      </Container>
    </div>
  );
};

export default {
  component: ContainerExample,
  title: "Layout/Container",
  tags: ["container", "autodocs"],
  argTypes: {
    alignItems: { control: "select", options: ["start", "center", "end", "stretch"] },
    fillWidth: { control: "boolean" },
    gap: {
      control: "select",
      options: ["none", "xxs", "xs", "sm", "md", "lg", "xl", "xxl"],
    },
    grow: {
      control: "select",
      options: ["0", "1", "2", "3", "4", "5", "6"],
    },
    shrink: {
      control: "select",
      options: ["0", "1", "2", "3", "4", "5", "6"],
    },
    isResponsive: { control: "boolean" },
    justifyContent: {
      control: "select",
      options: [
        "center",
        "space-between",
        "space-around",
        "space-evenly",
        "start",
        "end",
        "left",
        "right",
      ],
    },
    orientation: { control: "radio", options: ["horizontal", "vertical"] },
    padding: {
      control: "select",
      options: ["none", "xxs", "xs", "sm", "md", "lg", "xl", "xxl"],
    },
    wrap: {
      control: "select",
      options: ["nowrap", "wrap", "wrap-reverse"],
    },
  },
};

export const Playground = {
  args: {
    alignItems: "center",
    fillWidth: false,
    gap: "none",
    grow: "0",
    isResponsive: true,
    justifyContent: "start",
    maxWidth: "auto",
    minWidth: "auto",
    orientation: "horizontal",
    padding: "none",
    shrink: "0",
    wrap: "nowrap",
  },
};

export const Variations = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "2rem", padding: "1rem" }}
    >
      <section>
        <h3>Orientation</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <Container
            orientation="horizontal"
            style={{ border: "1px solid grey" }}
          >
            <Text>Horizontal</Text>
            <Text>Layout</Text>
            <Text>Example</Text>
          </Container>
          <Container
            orientation="vertical"
            style={{ border: "1px solid grey" }}
          >
            <Text>Vertical</Text>
            <Text>Layout</Text>
            <Text>Example</Text>
          </Container>
        </div>
      </section>

      <section>
        <h3>Gap Options</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <Container
            gap="none"
            style={{ border: "1px solid grey" }}
          >
            <Text>No</Text>
            <Text>Gap</Text>
          </Container>
          <Container
            gap="xs"
            style={{ border: "1px solid grey" }}
          >
            <Text>XS</Text>
            <Text>Gap</Text>
          </Container>
          <Container
            gap="sm"
            style={{ border: "1px solid grey" }}
          >
            <Text>SM</Text>
            <Text>Gap</Text>
          </Container>
          <Container
            gap="md"
            style={{ border: "1px solid grey" }}
          >
            <Text>MD</Text>
            <Text>Gap</Text>
          </Container>
          <Container
            gap="lg"
            style={{ border: "1px solid grey" }}
          >
            <Text>LG</Text>
            <Text>Gap</Text>
          </Container>
          <Container
            gap="xl"
            style={{ border: "1px solid grey" }}
          >
            <Text>XL</Text>
            <Text>Gap</Text>
          </Container>
        </div>
      </section>

      <section>
        <h3>Padding Options</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <Container
            padding="none"
            style={{ border: "1px solid grey" }}
          >
            <Text>No Padding</Text>
          </Container>
          <Container
            padding="xs"
            style={{ border: "1px solid grey" }}
          >
            <Text>XS Padding</Text>
          </Container>
          <Container
            padding="sm"
            style={{ border: "1px solid grey" }}
          >
            <Text>SM Padding</Text>
          </Container>
          <Container
            padding="md"
            style={{ border: "1px solid grey" }}
          >
            <Text>MD Padding</Text>
          </Container>
          <Container
            padding="lg"
            style={{ border: "1px solid grey" }}
          >
            <Text>LG Padding</Text>
          </Container>
          <Container
            padding="xl"
            style={{ border: "1px solid grey" }}
          >
            <Text>XL Padding</Text>
          </Container>
        </div>
      </section>

      <section>
        <h3>Alignment Options</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <Container
            alignItems="start"
            style={{ border: "1px solid grey", height: "100px" }}
          >
            <Text>Start</Text>
            <Text>Aligned</Text>
          </Container>
          <Container
            alignItems="center"
            style={{ border: "1px solid grey", height: "100px" }}
          >
            <Text>Center</Text>
            <Text>Aligned</Text>
          </Container>
          <Container
            alignItems="end"
            style={{ border: "1px solid grey", height: "100px" }}
          >
            <Text>End</Text>
            <Text>Aligned</Text>
          </Container>
          <Container
            alignItems="stretch"
            style={{ border: "1px solid grey", height: "100px" }}
          >
            <Text>Stretch</Text>
            <Text>Aligned</Text>
          </Container>
        </div>
      </section>

      <section>
        <h3>Justify Content Options</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <Container
            justifyContent="start"
            style={{ border: "1px solid grey" }}
          >
            <Text>Start</Text>
            <Text>Justified</Text>
          </Container>
          <Container
            justifyContent="center"
            style={{ border: "1px solid grey" }}
          >
            <Text>Center</Text>
            <Text>Justified</Text>
          </Container>
          <Container
            justifyContent="end"
            style={{ border: "1px solid grey" }}
          >
            <Text>End</Text>
            <Text>Justified</Text>
          </Container>
          <Container
            justifyContent="space-between"
            style={{ border: "1px solid grey" }}
          >
            <Text>Space</Text>
            <Text>Between</Text>
          </Container>
          <Container
            justifyContent="space-around"
            style={{ border: "1px solid grey" }}
          >
            <Text>Space</Text>
            <Text>Around</Text>
          </Container>
          <Container
            justifyContent="space-evenly"
            style={{ border: "1px solid grey" }}
          >
            <Text>Space</Text>
            <Text>Evenly</Text>
          </Container>
        </div>
      </section>

      <section>
        <h3>Wrap Options</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <Container
            wrap="nowrap"
            style={{ border: "1px solid grey", maxWidth: "300px" }}
          >
            <Text>No</Text>
            <Text>Wrap</Text>
            <Text>Example</Text>
            <Text>With</Text>
            <Text>Many</Text>
            <Text>Items</Text>
          </Container>
          <Container
            wrap="wrap"
            style={{ border: "1px solid grey", maxWidth: "300px" }}
          >
            <Text>Wrap</Text>
            <Text>Example</Text>
            <Text>With</Text>
            <Text>Many</Text>
            <Text>Items</Text>
            <Text>That</Text>
            <Text>Will</Text>
            <Text>Wrap</Text>
          </Container>
        </div>
      </section>

      <section>
        <h3>Grow & Shrink Options</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <Container style={{ border: "1px solid grey" }}>
            <Container
              grow="1"
              style={{ border: "1px solid red", padding: "0.5rem" }}
            >
              <Text>Grow 1</Text>
            </Container>
            <Container
              grow="2"
              style={{ border: "1px solid blue", padding: "0.5rem" }}
            >
              <Text>Grow 2</Text>
            </Container>
            <Container
              grow="3"
              style={{ border: "1px solid green", padding: "0.5rem" }}
            >
              <Text>Grow 3</Text>
            </Container>
          </Container>
          <Container style={{ border: "1px solid grey", width: "300px" }}>
            <Container
              shrink="0"
              style={{ border: "1px solid red", padding: "0.5rem", minWidth: "150px" }}
            >
              <Text>Shrink 0</Text>
            </Container>
            <Container
              shrink="1"
              style={{ border: "1px solid blue", padding: "0.5rem", minWidth: "150px" }}
            >
              <Text>Shrink 1</Text>
            </Container>
          </Container>
        </div>
      </section>

      <section>
        <h3>Width Options</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <Container
            fillWidth={false}
            style={{ border: "1px solid grey" }}
          >
            <Text>Auto Width</Text>
          </Container>
          <Container
            fillWidth={true}
            style={{ border: "1px solid grey" }}
          >
            <Text>Fill Width</Text>
          </Container>
          <Container
            fillWidth={false}
            maxWidth="300px"
            style={{ border: "1px solid grey" }}
          >
            <Text>Max Width 300px</Text>
          </Container>
          <Container
            fillWidth={false}
            minWidth="400px"
            style={{ border: "1px solid grey" }}
          >
            <Text>Min Width 400px</Text>
          </Container>
        </div>
      </section>

      <section>
        <h3>Height Options</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <Container
            fillHeight={true}
            style={{ border: "1px solid grey", height: "150px" }}
          >
            <Text>Fill Height</Text>
          </Container>
          <Container
            maxHeight="100px"
            style={{ border: "1px solid grey", overflow: "auto" }}
          >
            <Text>Max Height 100px with scrolling content</Text>
            <Text>Line 2</Text>
            <Text>Line 3</Text>
            <Text>Line 4</Text>
          </Container>
        </div>
      </section>

      <section>
        <h3>Responsive Container</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <Container
            isResponsive={true}
            gap="md"
            style={{ border: "1px solid grey" }}
          >
            <Text>Responsive</Text>
            <Text>Container</Text>
            <Text>That stacks on mobile</Text>
          </Container>
          <Container
            isResponsive={false}
            gap="md"
            style={{ border: "1px solid grey" }}
          >
            <Text>Non-responsive</Text>
            <Text>Container</Text>
            <Text>Stays horizontal</Text>
          </Container>
        </div>
      </section>

      <section>
        <h3>Complex Nested Example</h3>
        <div style={{ marginTop: "1rem" }}>
          <Container
            orientation="vertical"
            gap="md"
            padding="md"
            style={{ border: "2px solid grey" }}
          >
            <Text>Parent Container (Vertical)</Text>
            <Container
              orientation="horizontal"
              gap="sm"
              padding="sm"
              style={{ border: "1px solid blue" }}
            >
              <Text>Child 1</Text>
              <Text>Child 2</Text>
              <Text>Child 3</Text>
            </Container>
            <Container
              orientation="horizontal"
              gap="lg"
              padding="md"
              justifyContent="space-between"
              style={{ border: "1px solid green" }}
            >
              <Text>Child A</Text>
              <Text>Child B</Text>
            </Container>
          </Container>
        </div>
      </section>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {},
  },
};
