import { Meta, StoryObj } from "@storybook/react-vite";
import { Logo } from "./Logo";
import LogosLight from "./LogosLight";
import { LogoName } from "./types";
import { IconSize } from "@/components/Icon/types";

const meta: Meta<typeof Logo> = {
  component: Logo,
  title: "Display/Logo",
  tags: ["LOGO", "autodocs"],
  argTypes: {
    name: {
      options: Object.keys(LogosLight),
      control: { type: "select" },
    },
    size: {
      options: ["xs", "sm", "md", "lg", "xl", "xxl"],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Logo>;

export const Playground: Story = {
  args: {
    name: "aws",
    width: "",
    height: "",
    size: "xl",
  },
};

export const Variations: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: "svg",
      focus: "svg",
      active: "svg",
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <section>
        <h3>Sizes</h3>
        <div
          style={{ display: "flex", gap: "2rem", alignItems: "center", flexWrap: "wrap" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              alignItems: "center",
            }}
          >
            <Logo
              name="aws"
              size="xs"
            />
            <span style={{ fontSize: "0.75rem" }}>XS</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              alignItems: "center",
            }}
          >
            <Logo
              name="aws"
              size="sm"
            />
            <span style={{ fontSize: "0.75rem" }}>SM</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              alignItems: "center",
            }}
          >
            <Logo
              name="aws"
              size="md"
            />
            <span style={{ fontSize: "0.75rem" }}>MD</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              alignItems: "center",
            }}
          >
            <Logo
              name="aws"
              size="lg"
            />
            <span style={{ fontSize: "0.75rem" }}>LG</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              alignItems: "center",
            }}
          >
            <Logo
              name="aws"
              size="xl"
            />
            <span style={{ fontSize: "0.75rem" }}>XL</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              alignItems: "center",
            }}
          >
            <Logo
              name="aws"
              size="xxl"
            />
            <span style={{ fontSize: "0.75rem" }}>XXL</span>
          </div>
        </div>
      </section>

      <section>
        <h3>Theme Variants (Light)</h3>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            flexWrap: "wrap",
            padding: "1rem",
            background: "#f5f5f5",
          }}
        >
          <Logo
            name="aws"
            theme="light"
          />
          <Logo
            name="azure"
            theme="light"
          />
          <Logo
            name="gcp"
            theme="light"
          />
          <Logo
            name="github"
            theme="light"
          />
          <Logo
            name="kubenetes"
            theme="light"
          />
        </div>
      </section>

      <section>
        <h3>Theme Variants (Dark)</h3>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            flexWrap: "wrap",
            padding: "1rem",
            background: "#1a1a1a",
          }}
        >
          <Logo
            name="aws"
            theme="dark"
          />
          <Logo
            name="azure"
            theme="dark"
          />
          <Logo
            name="gcp"
            theme="dark"
          />
          <Logo
            name="github"
            theme="dark"
          />
          <Logo
            name="kubenetes"
            theme="dark"
          />
        </div>
      </section>

      <section>
        <h3>Common Logos</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
            gap: "1rem",
          }}
        >
          {Object.keys(LogosLight)
            .slice(0, 20)
            .map(logoName => (
              <div
                key={logoName}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  alignItems: "center",
                  padding: "0.5rem",
                  border: "1px solid #e0e0e0",
                  borderRadius: "4px",
                }}
              >
                <Logo
                  name={logoName as LogoName}
                  size="md"
                />
                <span style={{ fontSize: "0.75rem", textAlign: "center" }}>
                  {logoName}
                </span>
              </div>
            ))}
        </div>
      </section>

      <section>
        <h3>Custom Dimensions</h3>
        <div
          style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}
        >
          <Logo
            name="aws"
            width={50}
          />
          <Logo
            name="aws"
            width={100}
          />
          <Logo
            name="aws"
            width={150}
          />
          <Logo
            name="aws"
            height={40}
          />
          <Logo
            name="aws"
            height={60}
          />
        </div>
      </section>

      <section>
        <h3>Size Comparison</h3>
        <div style={{ display: "flex", gap: "2rem", alignItems: "flex-end" }}>
          {(["xs", "sm", "md", "lg", "xl", "xxl"] as const).map(size => (
            <div
              key={size}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                alignItems: "center",
              }}
            >
              <Logo
                name="github"
                size={size as IconSize}
              />
              <span style={{ fontSize: "0.75rem" }}>{size.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  ),
};
