import { CardHorizontal } from "./CardHorizontal";
import { ICON_NAMES } from "@/components/Icon/types.ts";
import styles from "./CardHorizontal.stories.module.scss";

const CardHorizontalExample = ({ ...props }) => {
  return (
    <div className={styles.cuiGridCenter}>
      <CardHorizontal
        title={props.title}
        icon={props.icon}
        description={props.description}
        disabled={props.disabled}
        isSelected={props.isSelected}
        size={props.size}
        badgeText={props.badgeText}
        badgeIcon={props.badgeIcon}
        badgeState={props.badgeState}
        badgeIconDir={props.badgeIconDir}
        infoText={props.infoText}
        infoUrl={props.infoUrl}
      />
    </div>
  );
};

export default {
  component: CardHorizontalExample,
  title: "Cards/Horizontal Card",
  tags: ["cardHorizontal", "autodocs"],
  argTypes: {
    icon: { control: "select", options: ICON_NAMES, description: "`IconName`" },
    size: {
      control: "radio",
      options: ["sm", "md"],
      description: "`sm` `md`",
      defaultValue: { summary: "md" },
    },
    badgeIcon: { control: "select", options: ICON_NAMES, description: "`IconName`" },
    badgeText: {
      control: "text",
      description: "Shows and hides the badge <br />`string`",
    },
    badgeState: {
      control: "select",
      options: ["default", "info", "success", "warning", "danger"],
      description: "`BadgeState`",
    },
    badgeIconDir: {
      control: "radio",
      options: ["start", "end"],
      description: "`start` `end`",
    },
    title: { control: "text", description: "`ReactNode`" },
    description: { control: "text", description: "`ReactNode`" },
    infoText: {
      control: "text",
      description: "Shows and hides the button <br />`string`",
    },
    infoUrl: { control: "text", description: "`string`" },
    disabled: {
      control: "boolean",
      description: "`boolean`",
      defaultValue: { summary: "false" },
    },
    isSelected: {
      control: "boolean",
      description: "`boolean`",
      defaultValue: { summary: "false" },
    },
  },
};

export const Playground = {
  args: {
    icon: "building",
    title: "Card title",
    description: "A description very interesting that presumably relates to the card.",
    disabled: false,
    isSelected: false,
    size: "md",
    badgeText: "",
    badgeIcon: null,
    badgeState: "default",
    badgeIconDir: "",
    infoText: "",
    infoUrl: "",
  },
};

export const Variations = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "2rem", padding: "1rem" }}
    >
      <section>
        <h3>Sizes</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <CardHorizontal
            icon="building"
            title="Small Card"
            description="A description for the small sized card."
            size="sm"
          />
          <CardHorizontal
            icon="building"
            title="Medium Card"
            description="A description for the medium sized card."
            size="md"
          />
        </div>
      </section>

      <section>
        <h3>Colors</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <CardHorizontal
            icon="building"
            title="Default Color"
            description="A card with default color variant."
            color="default"
          />
          <CardHorizontal
            icon="building"
            title="Muted Color"
            description="A card with muted color variant."
            color="muted"
          />
        </div>
      </section>

      <section>
        <h3>States</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <CardHorizontal
            icon="building"
            title="Default State"
            description="A card in its default state."
          />
          <CardHorizontal
            icon="building"
            title="Selected State"
            description="A card in its selected state."
            isSelected={true}
          />
          <CardHorizontal
            icon="building"
            title="Disabled State"
            description="A card in its disabled state."
            disabled={true}
          />
          <CardHorizontal
            icon="building"
            title="Disabled & Selected"
            description="A card that is both disabled and selected."
            disabled={true}
            isSelected={true}
          />
        </div>
      </section>

      <section>
        <h3>Badge States</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <CardHorizontal
            icon="building"
            title="Default Badge"
            description="Card with default badge state."
            badgeText="default"
            badgeState="default"
          />
          <CardHorizontal
            icon="building"
            title="Info Badge"
            description="Card with info badge state."
            badgeText="info"
            badgeState="info"
          />
          <CardHorizontal
            icon="building"
            title="Success Badge"
            description="Card with success badge state."
            badgeText="success"
            badgeState="success"
          />
          <CardHorizontal
            icon="building"
            title="Warning Badge"
            description="Card with warning badge state."
            badgeText="warning"
            badgeState="warning"
          />
          <CardHorizontal
            icon="building"
            title="Danger Badge"
            description="Card with danger badge state."
            badgeText="danger"
            badgeState="danger"
          />
        </div>
      </section>

      <section>
        <h3>Badge with Icons</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <CardHorizontal
            icon="building"
            title="Badge Icon Start"
            description="Card with badge icon at start position."
            badgeText="feature"
            badgeIcon="star"
            badgeIconDir="start"
            badgeState="info"
          />
          <CardHorizontal
            icon="building"
            title="Badge Icon End"
            description="Card with badge icon at end position."
            badgeText="feature"
            badgeIcon="star"
            badgeIconDir="end"
            badgeState="info"
          />
        </div>
      </section>

      <section>
        <h3>With Button</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <CardHorizontal
            icon="building"
            title="Card With Button"
            description="A card with an action button."
            infoText="Learn More"
            infoUrl="https://clickhouse.com"
          />
          <CardHorizontal
            icon="database"
            title="Card With Button & Badge"
            description="A card with both button and badge."
            infoText="Connect"
            infoUrl="https://clickhouse.com"
            badgeText="beta"
            badgeState="warning"
          />
        </div>
      </section>

      <section>
        <h3>Custom Icons</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <CardHorizontal
            icon="database"
            title="Database"
            description="Card with database icon."
          />
          <CardHorizontal
            icon="cloud"
            title="Cloud"
            description="Card with cloud icon."
          />
          <CardHorizontal
            icon="gear"
            title="Settings"
            description="Card with gear icon."
          />
        </div>
      </section>

      <section>
        <h3>Size & Color Combinations</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <CardHorizontal
            icon="building"
            title="Small Default"
            description="Small card with default color."
            size="sm"
            color="default"
          />
          <CardHorizontal
            icon="building"
            title="Small Muted"
            description="Small card with muted color."
            size="sm"
            color="muted"
          />
          <CardHorizontal
            icon="building"
            title="Medium Default"
            description="Medium card with default color."
            size="md"
            color="default"
          />
          <CardHorizontal
            icon="building"
            title="Medium Muted"
            description="Medium card with muted color."
            size="md"
            color="muted"
          />
        </div>
      </section>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: [".cuiWrapper.cuiIsSelectable"],
      focus: [".cuiWrapper.cuiIsSelectable"],
      active: [".cuiWrapper.cuiIsSelectable"],
    },
  },
};
