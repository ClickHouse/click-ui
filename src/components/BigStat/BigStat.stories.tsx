import { Meta, StoryObj } from "@storybook/react-vite";
import { BigStat } from "./BigStat";

const meta: Meta<typeof BigStat> = {
  component: BigStat,
  title: "Display/Big Stat",
  tags: ["big-stat", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof BigStat>;

export const Playground: Story = {
  args: {
    label: "Percentage complete",
    title: "100%",
    state: "default",
    size: "lg",
    spacing: "sm",
    order: "titleTop",
    height: "",
    fillWidth: false,
    maxWidth: "300px",
    error: false,
  },
};

export const Variations: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "2rem", padding: "1rem" }}
    >
      <section>
        <h3>Sizes</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <BigStat
            label="Small Size"
            title="42"
            size="sm"
          />
          <BigStat
            label="Large Size"
            title="100%"
            size="lg"
          />
        </div>
      </section>

      <section>
        <h3>States</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <BigStat
            label="Default State"
            title="1,234"
            state="default"
          />
          <BigStat
            label="Muted State"
            title="567"
            state="muted"
          />
          <BigStat
            label="Error State"
            title="0"
            error={true}
          />
        </div>
      </section>

      <section>
        <h3>Spacing</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <BigStat
            label="Small Spacing"
            title="42"
            spacing="sm"
          />
          <BigStat
            label="Large Spacing"
            title="42"
            spacing="lg"
          />
        </div>
      </section>

      <section>
        <h3>Order</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <BigStat
            label="Title on Top"
            title="100%"
            order="titleTop"
          />
          <BigStat
            label="Title on Bottom"
            title="100%"
            order="titleBottom"
          />
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
          <BigStat
            label="Auto Width"
            title="42"
            fillWidth={false}
          />
          <BigStat
            label="Fill Width"
            title="100%"
            fillWidth={true}
          />
          <BigStat
            label="Max Width 200px"
            title="567"
            fillWidth={false}
            maxWidth="200px"
          />
        </div>
      </section>

      <section>
        <h3>Size & State Combinations</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <BigStat
            label="Small Default"
            title="1,234"
            size="sm"
            state="default"
          />
          <BigStat
            label="Small Muted"
            title="567"
            size="sm"
            state="muted"
          />
          <BigStat
            label="Large Default"
            title="98.5%"
            size="lg"
            state="default"
          />
          <BigStat
            label="Large Muted"
            title="42"
            size="lg"
            state="muted"
          />
        </div>
      </section>

      <section>
        <h3>Custom Heights</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <BigStat
            label="Small Height"
            title="42"
            height="4rem"
          />
          <BigStat
            label="Default Height"
            title="100"
            height="6rem"
          />
          <BigStat
            label="Large Height"
            title="99%"
            height="10rem"
          />
        </div>
      </section>

      <section>
        <h3>Complex Combinations</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <BigStat
            label="Completion Rate"
            title="95.5%"
            size="lg"
            spacing="lg"
            state="default"
            order="titleTop"
            height="8rem"
          />
          <BigStat
            label="Error Count"
            title="3"
            size="sm"
            spacing="sm"
            error={true}
            order="titleBottom"
            height="8rem"
          />
          <BigStat
            label="Active Users"
            title="2,451"
            size="lg"
            spacing="sm"
            state="default"
            order="titleTop"
            fillWidth={true}
          />
          <BigStat
            label="Response Time"
            title="125ms"
            size="sm"
            spacing="lg"
            state="muted"
            order="titleBottom"
            fillWidth={true}
          />
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
