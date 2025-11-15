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
