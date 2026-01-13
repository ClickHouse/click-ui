import { Meta, StoryObj } from "@storybook/react-vite";
import { CardPromotion } from "./CardPromotion";

const meta: Meta<typeof CardPromotion> = {
  component: CardPromotion,
  title: "Cards/Promotion Card",
  tags: ["cardPromotion", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof CardPromotion>;

export const Playground: Story = {
  args: {
    icon: "star",
    label: "Join us at AWS re:Invent in Las Vegas from Nov 27 - Dec 1",
    dismissible: false,
  },
};

export const Variations: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "2rem", padding: "1rem" }}
    >
      <section>
        <h3>Default State</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <CardPromotion
            icon="star"
            label="Join us at AWS re:Invent in Las Vegas from Nov 27 - Dec 1"
            dismissible={false}
          />
        </div>
      </section>

      <section>
        <h3>Dismissible</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <CardPromotion
            icon="star"
            label="This promotional card can be dismissed by clicking the close button"
            dismissible={true}
          />
        </div>
      </section>

      <section>
        <h3>Different Icons</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <CardPromotion
            icon="star"
            label="Featured event with star icon"
            dismissible={false}
          />
          <CardPromotion
            icon="bell"
            label="Notification with bell icon"
            dismissible={false}
          />
          <CardPromotion
            icon="info-in-circle"
            label="Information with info icon"
            dismissible={false}
          />
          <CardPromotion
            icon="rocket"
            label="New feature with rocket icon"
            dismissible={false}
          />
          <CardPromotion
            icon="gift"
            label="Special offer with gift icon"
            dismissible={false}
          />
        </div>
      </section>

      <section>
        <h3>Various Message Lengths</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <CardPromotion
            icon="star"
            label="Short message"
            dismissible={true}
          />
          <CardPromotion
            icon="star"
            label="A medium length promotional message that provides more context"
            dismissible={true}
          />
          <CardPromotion
            icon="star"
            label="A longer promotional message that contains significantly more information and details about the event or announcement being promoted to the user"
            dismissible={true}
          />
        </div>
      </section>

      <section>
        <h3>Different Icons with Dismissible</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <CardPromotion
            icon="bell"
            label="Notification that can be dismissed"
            dismissible={true}
          />
          <CardPromotion
            icon="info-in-circle"
            label="Information that can be dismissed"
            dismissible={true}
          />
          <CardPromotion
            icon="warning"
            label="Important notice that can be dismissed"
            dismissible={true}
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
      active: [".cuiWrapper"],
      focus: [".cuiBackground"],
    },
  },
};
