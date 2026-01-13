import { Meta, StoryObj } from "@storybook/react-vite";
import { Link } from "./Link";

const meta: Meta<typeof Link> = {
  component: Link,
  title: "Typography/Link",
  tags: ["link", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Playground: Story = {
  args: {
    size: "md",
    weight: "normal",
    href: "https://www.google.com",
    children: "Try me!",
  },
};

export const Variations: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: ".cuiLink",
      focus: ".cuiLink",
      active: ".cuiLink",
      focusVisible: ".cuiLink",
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <section>
        <h3>Sizes</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <Link
            size="xs"
            href="#"
          >
            Extra Small Link - xs
          </Link>
          <Link
            size="sm"
            href="#"
          >
            Small Link - sm
          </Link>
          <Link
            size="md"
            href="#"
          >
            Medium Link - md
          </Link>
          <Link
            size="lg"
            href="#"
          >
            Large Link - lg
          </Link>
          <Link
            size="xl"
            href="#"
          >
            Extra Large Link - xl
          </Link>
        </div>
      </section>

      <section>
        <h3>Weights</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <Link
            weight="normal"
            href="#"
          >
            Normal Weight
          </Link>
          <Link
            weight="medium"
            href="#"
          >
            Medium Weight
          </Link>
          <Link
            weight="semibold"
            href="#"
          >
            Semibold Weight
          </Link>
          <Link
            weight="bold"
            href="#"
          >
            Bold Weight
          </Link>
        </div>
      </section>

      <section>
        <h3>With Icons</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <Link
            href="#"
            icon="popout"
          >
            Link with External Icon
          </Link>
          <Link
            href="#"
            icon="arrow-right"
          >
            Link with Arrow Right
          </Link>
          <Link
            href="#"
            icon="chevron-right"
          >
            Link with Chevron Right
          </Link>
          <Link
            size="sm"
            href="#"
            icon="popout"
          >
            Small Link with Icon
          </Link>
          <Link
            size="lg"
            href="#"
            icon="popout"
          >
            Large Link with Icon
          </Link>
        </div>
      </section>

      <section>
        <h3>Size & Weight Combinations</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <Link
            size="sm"
            weight="normal"
            href="#"
          >
            Small Normal Link
          </Link>
          <Link
            size="md"
            weight="medium"
            href="#"
          >
            Medium Medium Link
          </Link>
          <Link
            size="lg"
            weight="semibold"
            href="#"
          >
            Large Semibold Link
          </Link>
          <Link
            size="xl"
            weight="bold"
            href="#"
          >
            Extra Large Bold Link
          </Link>
        </div>
      </section>

      <section>
        <h3>Icon Size Variations</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <Link
            size="xs"
            href="#"
            icon="popout"
          >
            XS Link (Small Icon)
          </Link>
          <Link
            size="sm"
            href="#"
            icon="popout"
          >
            SM Link (Small Icon)
          </Link>
          <Link
            size="md"
            href="#"
            icon="popout"
          >
            MD Link (Medium Icon)
          </Link>
          <Link
            size="lg"
            href="#"
            icon="popout"
          >
            LG Link (Medium Icon)
          </Link>
        </div>
      </section>

      <section>
        <h3>Polymorphic (Different Elements)</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <Link href="#">Anchor Element</Link>
          <Link
            component="button"
            onClick={() => console.log("Clicked")}
          >
            Button Element
          </Link>
          <Link component="span">Span Element</Link>
        </div>
      </section>

      <section>
        <h3>Interactive States</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <Link href="#">Default Link (hover/focus/active via pseudo-states)</Link>
          <Link
            href="#"
            icon="popout"
          >
            Link with Icon (hover/focus/active via pseudo-states)
          </Link>
        </div>
      </section>
    </div>
  ),
};
