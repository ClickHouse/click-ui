import { Meta, StoryObj } from "@storybook/react-vite";
import { ProgressBar } from "./ProgressBar";

const meta: Meta<typeof ProgressBar> = {
  component: ProgressBar,
  title: "Display/ProgressBar",
  tags: ["progressBar", "autodocs"],
  argTypes: {
    dismissable: {
      if: { arg: "type", eq: "default" },
    },
    onCancel: {
      if: { arg: "dismissable", truthy: true },
    },
    successMessage: {
      if: { arg: "type", eq: "default" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Playground: Story = {
  args: {
    progress: 60,
    type: "default",
    orientation: "horizontal",
    dir: "start",
    dismissable: true,
    onCancel: () => console.log("onCancel clicked"),
    successMessage: "Progress completed",
  },
};

export const Variations: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: ".cuiProgressContainer",
      focus: ".cuiProgressContainer",
      active: ".cuiProgressContainer",
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <section>
        <h3>Types</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <ProgressBar
            progress={45}
            type="default"
          />
          <ProgressBar
            progress={65}
            type="small"
          />
        </div>
      </section>

      <section>
        <h3>Progress States</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <ProgressBar
            progress={0}
            type="default"
          />
          <ProgressBar
            progress={25}
            type="default"
          />
          <ProgressBar
            progress={50}
            type="default"
          />
          <ProgressBar
            progress={75}
            type="default"
          />
          <ProgressBar
            progress={100}
            type="default"
          />
        </div>
      </section>

      <section>
        <h3>With Success Message</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <ProgressBar
            progress={100}
            type="default"
            successMessage="Upload complete!"
          />
          <ProgressBar
            progress={100}
            type="default"
            successMessage="Processing finished"
          />
        </div>
      </section>

      <section>
        <h3>Dismissable</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <ProgressBar
            progress={45}
            type="default"
            dismissable
            onCancel={() => console.log("Cancelled")}
          />
          <ProgressBar
            progress={100}
            type="default"
            successMessage="Complete!"
            dismissable
            onCancel={() => console.log("Cancelled")}
          />
        </div>
      </section>

      <section>
        <h3>Orientations (Horizontal)</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <ProgressBar
            progress={30}
            type="small"
            orientation="horizontal"
            dir="start"
          />
          <ProgressBar
            progress={60}
            type="small"
            orientation="horizontal"
            dir="end"
          />
        </div>
      </section>

      <section>
        <h3>Orientations (Vertical)</h3>
        <div style={{ display: "flex", gap: "2rem" }}>
          <div>
            <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>Start</h4>
            <ProgressBar
              progress={40}
              type="small"
              orientation="vertical"
              dir="start"
              style={{ height: "150px" }}
            />
          </div>
          <div>
            <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>End</h4>
            <ProgressBar
              progress={70}
              type="small"
              orientation="vertical"
              dir="end"
              style={{ height: "150px" }}
            />
          </div>
        </div>
      </section>

      <section>
        <h3>Small Type Variations</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <ProgressBar
            progress={20}
            type="small"
          />
          <ProgressBar
            progress={40}
            type="small"
          />
          <ProgressBar
            progress={60}
            type="small"
          />
          <ProgressBar
            progress={80}
            type="small"
          />
          <ProgressBar
            progress={100}
            type="small"
          />
        </div>
      </section>

      <section>
        <h3>Custom Widths</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          <ProgressBar
            progress={50}
            type="small"
            style={{ width: "200px" }}
          />
          <ProgressBar
            progress={50}
            type="small"
            style={{ width: "400px" }}
          />
          <ProgressBar
            progress={50}
            type="small"
            style={{ width: "600px" }}
          />
        </div>
      </section>

      <section>
        <h3>Complete vs Incomplete</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <span
              style={{ fontSize: "0.875rem", display: "block", marginBottom: "0.5rem" }}
            >
              Incomplete (50%)
            </span>
            <ProgressBar
              progress={50}
              type="default"
            />
          </div>
          <div>
            <span
              style={{ fontSize: "0.875rem", display: "block", marginBottom: "0.5rem" }}
            >
              Complete (100%)
            </span>
            <ProgressBar
              progress={100}
              type="default"
            />
          </div>
        </div>
      </section>
    </div>
  ),
};
