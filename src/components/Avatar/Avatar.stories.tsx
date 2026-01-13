import { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  title: "Display/Avatar",
  tags: ["avatar", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Playground: Story = {
  args: {
    text: "CM",
  },
};

export const Variations: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: ".cuiAvatarRoot",
      focus: ".cuiAvatarRoot",
      active: ".cuiAvatarRoot",
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <section>
        <h3>Text Sizes</h3>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Avatar
            text="JD"
            textSize="sm"
          />
          <Avatar
            text="JD"
            textSize="md"
          />
        </div>
      </section>

      <section>
        <h3>Different Initials</h3>
        <div
          style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}
        >
          <Avatar text="AB" />
          <Avatar text="John Doe" />
          <Avatar text="Jane Smith" />
          <Avatar text="X" />
          <Avatar text="Michael Johnson" />
          <Avatar text="Sarah Williams" />
        </div>
      </section>

      <section>
        <h3>With Images</h3>
        <div
          style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}
        >
          <Avatar
            text="JD"
            src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=128&h=128&fit=crop"
          />
          <Avatar
            text="JS"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&h=128&fit=crop"
          />
          <Avatar
            text="FB"
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=128&h=128&fit=crop"
          />
        </div>
      </section>

      <section>
        <h3>Image Fallback</h3>
        <div
          style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}
        >
          <Avatar
            text="FB"
            src="invalid-url.jpg"
          />
          <Avatar
            text="Fallback Text"
            src="https://invalid-url-that-does-not-exist.jpg"
          />
        </div>
      </section>

      <section>
        <h3>Size Variations with Text Size</h3>
        <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "0.75rem" }}>Small Text</span>
            <Avatar
              text="SM"
              textSize="sm"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "0.75rem" }}>Medium Text</span>
            <Avatar
              text="MD"
              textSize="md"
            />
          </div>
        </div>
      </section>

      <section>
        <h3>Various Name Formats</h3>
        <div
          style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}
        >
          <Avatar text="a" />
          <Avatar text="ab" />
          <Avatar text="abc" />
          <Avatar text="First Last" />
          <Avatar text="First Middle Last" />
          <Avatar text="Very Long Name Here" />
          <Avatar text="   Spaces   Around   " />
        </div>
      </section>

      <section>
        <h3>Custom Styling</h3>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Avatar
            text="CS"
            style={{ width: "48px", height: "48px" }}
          />
          <Avatar
            text="CS"
            style={{ width: "64px", height: "64px" }}
          />
          <Avatar
            text="CS"
            style={{ width: "80px", height: "80px" }}
          />
        </div>
      </section>

      <section>
        <h3>Image with Different Sizes</h3>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Avatar
            text="IS"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop"
            style={{ width: "48px", height: "48px" }}
          />
          <Avatar
            text="IS"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop"
            style={{ width: "64px", height: "64px" }}
          />
          <Avatar
            text="IS"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop"
            style={{ width: "80px", height: "80px" }}
          />
        </div>
      </section>
    </div>
  ),
};
