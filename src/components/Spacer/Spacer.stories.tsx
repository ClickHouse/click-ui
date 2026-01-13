import { Meta, StoryObj } from "@storybook/react-vite";
import { Spacer } from "./Spacer";

const meta: Meta<typeof Spacer> = {
  component: Spacer,
  title: "Display/Spacer",
  tags: ["spacer", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof Spacer>;

export const Playground: Story = {
  args: {
    size: "xxl",
  },
};

export const Variations: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: ".cuiSpacer",
      focus: ".cuiSpacer",
      active: ".cuiSpacer",
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <section>
        <h3>All Sizes</h3>
        <div style={{ border: "1px dashed #ccc", padding: "1rem" }}>
          <div style={{ background: "#e3f2fd", padding: "0.5rem" }}>Content Before</div>
          <div>
            <span style={{ fontSize: "0.75rem", color: "#666" }}>XS Spacer</span>
            <Spacer size="xs" />
          </div>
          <div style={{ background: "#e3f2fd", padding: "0.5rem" }}>Content After XS</div>

          <div style={{ marginTop: "1rem" }}>
            <span style={{ fontSize: "0.75rem", color: "#666" }}>SM Spacer</span>
            <Spacer size="sm" />
          </div>
          <div style={{ background: "#e3f2fd", padding: "0.5rem" }}>Content After SM</div>

          <div style={{ marginTop: "1rem" }}>
            <span style={{ fontSize: "0.75rem", color: "#666" }}>MD Spacer</span>
            <Spacer size="md" />
          </div>
          <div style={{ background: "#e3f2fd", padding: "0.5rem" }}>Content After MD</div>

          <div style={{ marginTop: "1rem" }}>
            <span style={{ fontSize: "0.75rem", color: "#666" }}>LG Spacer</span>
            <Spacer size="lg" />
          </div>
          <div style={{ background: "#e3f2fd", padding: "0.5rem" }}>Content After LG</div>

          <div style={{ marginTop: "1rem" }}>
            <span style={{ fontSize: "0.75rem", color: "#666" }}>XL Spacer</span>
            <Spacer size="xl" />
          </div>
          <div style={{ background: "#e3f2fd", padding: "0.5rem" }}>Content After XL</div>

          <div style={{ marginTop: "1rem" }}>
            <span style={{ fontSize: "0.75rem", color: "#666" }}>XXL Spacer</span>
            <Spacer size="xxl" />
          </div>
          <div style={{ background: "#e3f2fd", padding: "0.5rem" }}>
            Content After XXL
          </div>
        </div>
      </section>

      <section>
        <h3>Size Comparison</h3>
        <div style={{ border: "1px dashed #ccc", padding: "1rem" }}>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  background: "#fff3e0",
                  padding: "0.5rem",
                  marginBottom: "0.25rem",
                }}
              >
                Top
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "0.75rem", writingMode: "vertical-rl" }}>
                  XS
                </span>
                <div style={{ flex: 1, border: "1px solid #ddd", background: "#fafafa" }}>
                  <Spacer size="xs" />
                </div>
              </div>
              <div
                style={{ background: "#fff3e0", padding: "0.5rem", marginTop: "0.25rem" }}
              >
                Bottom
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <div
                style={{
                  background: "#f3e5f5",
                  padding: "0.5rem",
                  marginBottom: "0.25rem",
                }}
              >
                Top
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "0.75rem", writingMode: "vertical-rl" }}>
                  MD
                </span>
                <div style={{ flex: 1, border: "1px solid #ddd", background: "#fafafa" }}>
                  <Spacer size="md" />
                </div>
              </div>
              <div
                style={{ background: "#f3e5f5", padding: "0.5rem", marginTop: "0.25rem" }}
              >
                Bottom
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <div
                style={{
                  background: "#e8f5e9",
                  padding: "0.5rem",
                  marginBottom: "0.25rem",
                }}
              >
                Top
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "0.75rem", writingMode: "vertical-rl" }}>
                  XXL
                </span>
                <div style={{ flex: 1, border: "1px solid #ddd", background: "#fafafa" }}>
                  <Spacer size="xxl" />
                </div>
              </div>
              <div
                style={{ background: "#e8f5e9", padding: "0.5rem", marginTop: "0.25rem" }}
              >
                Bottom
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3>Practical Usage</h3>
        <div style={{ maxWidth: "600px" }}>
          <h4 style={{ fontSize: "1.25rem", margin: "0" }}>Page Title</h4>
          <Spacer size="md" />
          <p style={{ margin: "0" }}>
            This is a paragraph with consistent spacing using the Spacer component.
          </p>
          <Spacer size="lg" />
          <h5 style={{ fontSize: "1rem", margin: "0" }}>Section Heading</h5>
          <Spacer size="sm" />
          <p style={{ margin: "0" }}>
            Another paragraph with appropriate spacing below the heading.
          </p>
          <Spacer size="xl" />
          <button style={{ padding: "0.5rem 1rem" }}>Action Button</button>
        </div>
      </section>

      <section>
        <h3>Custom Styling</h3>
        <div>
          <div style={{ background: "#e3f2fd", padding: "0.5rem" }}>Content</div>
          <Spacer
            size="md"
            className="custom-spacer"
            style={{ background: "#ffebee" }}
          />
          <div style={{ background: "#e3f2fd", padding: "0.5rem" }}>Content</div>
        </div>
      </section>
    </div>
  ),
};
