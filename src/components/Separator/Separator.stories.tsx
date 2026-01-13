import { Meta, StoryObj } from "@storybook/react-vite";
import Separator from "./Separator";

const meta: Meta<typeof Separator> = {
  component: Separator,
  title: "Display/Separator",
  tags: ["separator", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof Separator>;

export const Playground: Story = {
  args: {
    size: "xs",
    orientation: "horizontal",
  },
};

export const Variations: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: ".cuiSeparator",
      focus: ".cuiSeparator",
      active: ".cuiSeparator",
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <section>
        <h3>Horizontal Sizes</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <span
              style={{ fontSize: "0.75rem", display: "block", marginBottom: "0.25rem" }}
            >
              XS
            </span>
            <Separator
              size="xs"
              orientation="horizontal"
            />
          </div>
          <div>
            <span
              style={{ fontSize: "0.75rem", display: "block", marginBottom: "0.25rem" }}
            >
              SM
            </span>
            <Separator
              size="sm"
              orientation="horizontal"
            />
          </div>
          <div>
            <span
              style={{ fontSize: "0.75rem", display: "block", marginBottom: "0.25rem" }}
            >
              MD
            </span>
            <Separator
              size="md"
              orientation="horizontal"
            />
          </div>
          <div>
            <span
              style={{ fontSize: "0.75rem", display: "block", marginBottom: "0.25rem" }}
            >
              LG
            </span>
            <Separator
              size="lg"
              orientation="horizontal"
            />
          </div>
          <div>
            <span
              style={{ fontSize: "0.75rem", display: "block", marginBottom: "0.25rem" }}
            >
              XL
            </span>
            <Separator
              size="xl"
              orientation="horizontal"
            />
          </div>
          <div>
            <span
              style={{ fontSize: "0.75rem", display: "block", marginBottom: "0.25rem" }}
            >
              XXL
            </span>
            <Separator
              size="xxl"
              orientation="horizontal"
            />
          </div>
        </div>
      </section>

      <section>
        <h3>Vertical Sizes</h3>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Separator
              size="xs"
              orientation="vertical"
              style={{ height: "100px" }}
            />
            <span style={{ fontSize: "0.75rem" }}>XS</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Separator
              size="sm"
              orientation="vertical"
              style={{ height: "100px" }}
            />
            <span style={{ fontSize: "0.75rem" }}>SM</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Separator
              size="md"
              orientation="vertical"
              style={{ height: "100px" }}
            />
            <span style={{ fontSize: "0.75rem" }}>MD</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Separator
              size="lg"
              orientation="vertical"
              style={{ height: "100px" }}
            />
            <span style={{ fontSize: "0.75rem" }}>LG</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Separator
              size="xl"
              orientation="vertical"
              style={{ height: "100px" }}
            />
            <span style={{ fontSize: "0.75rem" }}>XL</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Separator
              size="xxl"
              orientation="vertical"
              style={{ height: "100px" }}
            />
            <span style={{ fontSize: "0.75rem" }}>XXL</span>
          </div>
        </div>
      </section>

      <section>
        <h3>Orientations</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>Horizontal</h4>
            <Separator
              size="sm"
              orientation="horizontal"
            />
          </div>
          <div>
            <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>Vertical</h4>
            <Separator
              size="sm"
              orientation="vertical"
              style={{ height: "100px" }}
            />
          </div>
        </div>
      </section>

      <section>
        <h3>Decorative vs Semantic</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <span
              style={{ fontSize: "0.75rem", display: "block", marginBottom: "0.5rem" }}
            >
              Decorative (role="none")
            </span>
            <Separator
              size="sm"
              orientation="horizontal"
              decorative={true}
            />
          </div>
          <div>
            <span
              style={{ fontSize: "0.75rem", display: "block", marginBottom: "0.5rem" }}
            >
              Semantic (role="separator")
            </span>
            <Separator
              size="sm"
              orientation="horizontal"
              decorative={false}
            />
          </div>
        </div>
      </section>

      <section>
        <h3>Usage in Content</h3>
        <div>
          <p style={{ margin: "0 0 1rem 0" }}>Content above separator</p>
          <Separator
            size="xs"
            orientation="horizontal"
          />
          <p style={{ margin: "1rem 0" }}>Content below separator</p>
          <Separator
            size="sm"
            orientation="horizontal"
          />
          <p style={{ margin: "1rem 0 0 0" }}>More content</p>
        </div>
      </section>

      <section>
        <h3>Different Heights (Vertical)</h3>
        <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
          <Separator
            size="sm"
            orientation="vertical"
            style={{ height: "50px" }}
          />
          <Separator
            size="sm"
            orientation="vertical"
            style={{ height: "100px" }}
          />
          <Separator
            size="sm"
            orientation="vertical"
            style={{ height: "150px" }}
          />
          <Separator
            size="sm"
            orientation="vertical"
            style={{ height: "200px" }}
          />
        </div>
      </section>
    </div>
  ),
};
