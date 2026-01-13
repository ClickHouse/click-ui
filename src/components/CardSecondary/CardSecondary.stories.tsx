import { Meta, StoryObj } from "@storybook/react-vite";
import { CardSecondary } from "./CardSecondary";

const meta: Meta<typeof CardSecondary> = {
  component: CardSecondary,
  title: "Cards/Secondary Card",
  tags: ["cardSecondary", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof CardSecondary>;

export const Playground: Story = {
  args: {
    title: "Card title",
    icon: "building",
    description: "A description very interesting that presumably relates to the card",
    infoUrl: "https://clickhouse.com",
    infoText: "Read More",
    hasShadow: false,
    disabled: false,
    badgeText: "experiment",
    badgeState: "success",
  },
};

export const Variations: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "2rem", padding: "1rem" }}
    >
      <section>
        <h3>Badge States</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <CardSecondary
            icon="building"
            title="Default Badge"
            description="A card with default badge state."
            infoUrl="https://clickhouse.com"
            infoText="Read More"
            badgeText="default"
            badgeState="default"
          />
          <CardSecondary
            icon="building"
            title="Success Badge"
            description="A card with success badge state."
            infoUrl="https://clickhouse.com"
            infoText="Read More"
            badgeText="success"
            badgeState="success"
          />
          <CardSecondary
            icon="building"
            title="Neutral Badge"
            description="A card with neutral badge state."
            infoUrl="https://clickhouse.com"
            infoText="Read More"
            badgeText="neutral"
            badgeState="neutral"
          />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <CardSecondary
            icon="building"
            title="Danger Badge"
            description="A card with danger badge state."
            infoUrl="https://clickhouse.com"
            infoText="Read More"
            badgeText="danger"
            badgeState="danger"
          />
          <CardSecondary
            icon="building"
            title="Warning Badge"
            description="A card with warning badge state."
            infoUrl="https://clickhouse.com"
            infoText="Read More"
            badgeText="warning"
            badgeState="warning"
          />
          <CardSecondary
            icon="building"
            title="Info Badge"
            description="A card with info badge state."
            infoUrl="https://clickhouse.com"
            infoText="Read More"
            badgeText="info"
            badgeState="info"
          />
        </div>
      </section>

      <section>
        <h3>States</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <CardSecondary
            icon="building"
            title="Default State"
            description="A card in its default state."
            infoUrl="https://clickhouse.com"
            infoText="Read More"
            badgeText="experiment"
            badgeState="success"
          />
          <CardSecondary
            icon="building"
            title="Disabled State"
            description="A card in its disabled state."
            infoUrl="https://clickhouse.com"
            infoText="Read More"
            badgeText="experiment"
            badgeState="success"
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
          <CardSecondary
            icon="building"
            title="Without Shadow"
            description="A card without shadow effect."
            infoUrl="https://clickhouse.com"
            infoText="Read More"
            badgeText="feature"
            badgeState="info"
            hasShadow={false}
          />
          <CardSecondary
            icon="building"
            title="With Shadow"
            description="A card with shadow effect."
            infoUrl="https://clickhouse.com"
            infoText="Read More"
            badgeText="feature"
            badgeState="info"
            hasShadow={true}
          />
        </div>
      </section>

      <section>
        <h3>Without Badge</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <CardSecondary
            icon="building"
            title="Card Without Badge"
            description="A card without a badge."
            infoUrl="https://clickhouse.com"
            infoText="Read More"
          />
          <CardSecondary
            icon="star"
            title="Another Card"
            description="Another card without a badge."
            infoUrl="https://clickhouse.com"
            infoText="Learn More"
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
          <CardSecondary
            icon="database"
            title="Database"
            description="Card with database icon."
            infoUrl="https://clickhouse.com"
            infoText="Connect"
            badgeText="beta"
            badgeState="warning"
          />
          <CardSecondary
            icon="cloud"
            title="Cloud"
            description="Card with cloud icon."
            infoUrl="https://clickhouse.com"
            infoText="Deploy"
            badgeText="stable"
            badgeState="success"
          />
          <CardSecondary
            icon="gear"
            title="Settings"
            description="Card with gear icon."
            infoUrl="https://clickhouse.com"
            infoText="Configure"
            badgeText="new"
            badgeState="info"
          />
        </div>
      </section>

      <section>
        <h3>Without Info Link</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <CardSecondary
            icon="building"
            title="No Link"
            description="A card without an info link."
            badgeText="stable"
            badgeState="success"
          />
          <CardSecondary
            icon="star"
            title="No Link or Badge"
            description="A card without both link and badge."
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
    },
  },
};
