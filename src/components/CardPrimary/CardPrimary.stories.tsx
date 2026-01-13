import { Meta, StoryObj } from "@storybook/react-vite";
import { CardPrimary } from "./CardPrimary";

const meta: Meta<typeof CardPrimary> = {
  component: CardPrimary,
  title: "Cards/Primary Card",
  tags: ["cardPrimary", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof CardPrimary>;

export const Playground: Story = {
  args: {
    icon: "building",
    title: "Card title",
    description: "A description very interesting that presumably relates to the card.",
    infoUrl: "https://clickhouse.com",
    infoText: "Read More",
    hasShadow: false,
    disabled: false,
    isSelected: true,
    size: "md",
    alignContent: "center",
    topBadgeText: "Top badge",
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
          <CardPrimary
            icon="building"
            title="Small Card"
            description="A description for the small sized card."
            infoText="Learn More"
            size="sm"
          />
          <CardPrimary
            icon="building"
            title="Medium Card"
            description="A description for the medium sized card."
            infoText="Learn More"
            size="md"
          />
        </div>
      </section>

      <section>
        <h3>Alignment</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <CardPrimary
            icon="building"
            title="Start Aligned"
            description="Content aligned to the start."
            infoText="Action"
            alignContent="start"
          />
          <CardPrimary
            icon="building"
            title="Center Aligned"
            description="Content aligned to the center."
            infoText="Action"
            alignContent="center"
          />
          <CardPrimary
            icon="building"
            title="End Aligned"
            description="Content aligned to the end."
            infoText="Action"
            alignContent="end"
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
          <CardPrimary
            icon="building"
            title="Default State"
            description="A card in its default state."
            infoText="Learn More"
          />
          <CardPrimary
            icon="building"
            title="Selected State"
            description="A card in its selected state."
            infoText="Learn More"
            isSelected={true}
          />
          <CardPrimary
            icon="building"
            title="Disabled State"
            description="A card in its disabled state."
            infoText="Learn More"
            disabled={true}
          />
        </div>
      </section>

      <section>
        <h3>With Shadow</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <CardPrimary
            icon="building"
            title="Without Shadow"
            description="A card without shadow effect."
            infoText="Learn More"
            hasShadow={false}
          />
          <CardPrimary
            icon="building"
            title="With Shadow"
            description="A card with shadow effect."
            infoText="Learn More"
            hasShadow={true}
          />
        </div>
      </section>

      <section>
        <h3>With Top Badge</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <CardPrimary
            icon="building"
            title="Card with Badge"
            description="A card with a top badge."
            infoText="Learn More"
            topBadgeText="New Feature"
          />
          <CardPrimary
            icon="building"
            title="Card with Badge & Shadow"
            description="A card with both badge and shadow."
            infoText="Learn More"
            topBadgeText="Popular"
            hasShadow={true}
          />
        </div>
      </section>

      <section>
        <h3>Without Button</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <CardPrimary
            icon="building"
            title="Card Without Action"
            description="A card without an action button."
          />
          <CardPrimary
            icon="star"
            title="Another Card"
            description="Another card without a button."
            size="sm"
          />
        </div>
      </section>

      <section>
        <h3>Custom Icons</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <CardPrimary
            icon="database"
            title="Database"
            description="Card with database icon."
            infoText="Connect"
          />
          <CardPrimary
            icon="cloud"
            title="Cloud"
            description="Card with cloud icon."
            infoText="Deploy"
          />
          <CardPrimary
            icon="gear"
            title="Settings"
            description="Card with gear icon."
            infoText="Configure"
          />
        </div>
      </section>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: [".cuiWrapper"],
      focus: [".cuiWrapper"],
      active: [".cuiWrapper"],
    },
  },
};
