import { ContextMenuProps } from "@radix-ui/react-context-menu";
import { ContextMenu } from "./ContextMenu";
import styles from "./ContextMenu.stories.module.scss";

interface Props extends ContextMenuProps {
  disabled?: boolean;
  showArrow?: boolean;
  side: "top" | "right" | "left" | "bottom";
}

const ContextMenuExample = ({ showArrow, disabled, side, ...props }: Props) => {
  return (
    <div className={styles.cuiGridCenter}>
      <ContextMenu {...props}>
        <ContextMenu.Trigger disabled={disabled}>
          <div className={styles.cuiTrigger}>ContextMenu Trigger</div>
        </ContextMenu.Trigger>
        <ContextMenu.Content
          showArrow={showArrow}
          side={side}
        >
          <ContextMenu.Group>
            <ContextMenu.Item>Content0</ContextMenu.Item>
          </ContextMenu.Group>
          <ContextMenu.Item icon="activity">Content1 long text content</ContextMenu.Item>
          <ContextMenu.Sub>
            <ContextMenu.SubTrigger>Hover over</ContextMenu.SubTrigger>
            <ContextMenu.Content sub>
              <ContextMenu.Item>SubContent0</ContextMenu.Item>
              <ContextMenu.Item>SubContent1</ContextMenu.Item>
              <ContextMenu.Item>SubContent0</ContextMenu.Item>
              <ContextMenu.Item>SubContent1</ContextMenu.Item>
              <ContextMenu.Item>SubContent0</ContextMenu.Item>
              <ContextMenu.Item>SubContent1</ContextMenu.Item>
              <ContextMenu.Item>SubContent0</ContextMenu.Item>
              <ContextMenu.Item>SubContent1</ContextMenu.Item>
              <ContextMenu.Item>SubContent0</ContextMenu.Item>
              <ContextMenu.Item>SubContent1</ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu.Sub>
          <ContextMenu.Item
            icon="activity"
            iconDir="end"
          >
            Content2
          </ContextMenu.Item>
          <ContextMenu.Item disabled>Content3</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu>
    </div>
  );
};
export default {
  component: ContextMenuExample,
  title: "Display/ContextMenu",
  tags: ["form-field", "dropdown", "autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    showArrow: { control: "boolean" },
    side: { control: "select", options: ["top", "right", "left", "bottom"] },
  },
};

export const Playground = {
  args: {
    showArrow: true,
    side: "left",
  },
};

export const Variations = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "3rem", padding: "2rem" }}
    >
      <section>
        <h3>Item Types</h3>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <ContextMenu>
            <ContextMenu.Trigger>
              <div className={styles.cuiTrigger}>Default Items</div>
            </ContextMenu.Trigger>
            <ContextMenu.Content
              showArrow={true}
              side="bottom"
            >
              <ContextMenu.Item type="default">Default Item 1</ContextMenu.Item>
              <ContextMenu.Item type="default">Default Item 2</ContextMenu.Item>
              <ContextMenu.Item type="default">Default Item 3</ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu>

          <ContextMenu>
            <ContextMenu.Trigger>
              <div className={styles.cuiTrigger}>Danger Items</div>
            </ContextMenu.Trigger>
            <ContextMenu.Content
              showArrow={true}
              side="bottom"
            >
              <ContextMenu.Item>Regular Item</ContextMenu.Item>
              <ContextMenu.Item type="danger">Delete</ContextMenu.Item>
              <ContextMenu.Item type="danger">Remove</ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu>
        </div>
      </section>

      <section>
        <h3>Item States</h3>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <ContextMenu>
            <ContextMenu.Trigger>
              <div className={styles.cuiTrigger}>Item States</div>
            </ContextMenu.Trigger>
            <ContextMenu.Content
              showArrow={true}
              side="bottom"
            >
              <ContextMenu.Item>Normal Item</ContextMenu.Item>
              <ContextMenu.Item disabled>Disabled Item</ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu>
        </div>
      </section>

      <section>
        <h3>Items with Icons</h3>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <ContextMenu>
            <ContextMenu.Trigger>
              <div className={styles.cuiTrigger}>Icon Start</div>
            </ContextMenu.Trigger>
            <ContextMenu.Content
              showArrow={true}
              side="bottom"
            >
              <ContextMenu.Item icon="activity">Activity</ContextMenu.Item>
              <ContextMenu.Item icon="user">Profile</ContextMenu.Item>
              <ContextMenu.Item icon="settings">Settings</ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu>

          <ContextMenu>
            <ContextMenu.Trigger>
              <div className={styles.cuiTrigger}>Icon End</div>
            </ContextMenu.Trigger>
            <ContextMenu.Content
              showArrow={true}
              side="bottom"
            >
              <ContextMenu.Item
                icon="activity"
                iconDir="end"
              >
                Activity
              </ContextMenu.Item>
              <ContextMenu.Item
                icon="user"
                iconDir="end"
              >
                Profile
              </ContextMenu.Item>
              <ContextMenu.Item
                icon="settings"
                iconDir="end"
              >
                Settings
              </ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu>
        </div>
      </section>

      <section>
        <h3>Arrow Variants</h3>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <ContextMenu>
            <ContextMenu.Trigger>
              <div className={styles.cuiTrigger}>With Arrow</div>
            </ContextMenu.Trigger>
            <ContextMenu.Content
              showArrow={true}
              side="bottom"
            >
              <ContextMenu.Item>Item 1</ContextMenu.Item>
              <ContextMenu.Item>Item 2</ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu>

          <ContextMenu>
            <ContextMenu.Trigger>
              <div className={styles.cuiTrigger}>Without Arrow</div>
            </ContextMenu.Trigger>
            <ContextMenu.Content
              showArrow={false}
              side="bottom"
            >
              <ContextMenu.Item>Item 1</ContextMenu.Item>
              <ContextMenu.Item>Item 2</ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu>
        </div>
      </section>

      <section>
        <h3>Position Variants</h3>
        <div
          style={{
            display: "flex",
            gap: "2rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <ContextMenu>
            <ContextMenu.Trigger>
              <div className={styles.cuiTrigger}>Top</div>
            </ContextMenu.Trigger>
            <ContextMenu.Content
              showArrow={true}
              side="top"
            >
              <ContextMenu.Item>Item 1</ContextMenu.Item>
              <ContextMenu.Item>Item 2</ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu>

          <ContextMenu>
            <ContextMenu.Trigger>
              <div className={styles.cuiTrigger}>Bottom</div>
            </ContextMenu.Trigger>
            <ContextMenu.Content
              showArrow={true}
              side="bottom"
            >
              <ContextMenu.Item>Item 1</ContextMenu.Item>
              <ContextMenu.Item>Item 2</ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu>

          <ContextMenu>
            <ContextMenu.Trigger>
              <div className={styles.cuiTrigger}>Left</div>
            </ContextMenu.Trigger>
            <ContextMenu.Content
              showArrow={true}
              side="left"
            >
              <ContextMenu.Item>Item 1</ContextMenu.Item>
              <ContextMenu.Item>Item 2</ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu>

          <ContextMenu>
            <ContextMenu.Trigger>
              <div className={styles.cuiTrigger}>Right</div>
            </ContextMenu.Trigger>
            <ContextMenu.Content
              showArrow={true}
              side="right"
            >
              <ContextMenu.Item>Item 1</ContextMenu.Item>
              <ContextMenu.Item>Item 2</ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu>
        </div>
      </section>

      <section>
        <h3>With Sub-menus</h3>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <ContextMenu>
            <ContextMenu.Trigger>
              <div className={styles.cuiTrigger}>Nested Menu</div>
            </ContextMenu.Trigger>
            <ContextMenu.Content
              showArrow={true}
              side="bottom"
            >
              <ContextMenu.Item>Regular Item</ContextMenu.Item>
              <ContextMenu.Sub>
                <ContextMenu.SubTrigger>More Options</ContextMenu.SubTrigger>
                <ContextMenu.Content sub>
                  <ContextMenu.Item>Sub Item 1</ContextMenu.Item>
                  <ContextMenu.Item>Sub Item 2</ContextMenu.Item>
                  <ContextMenu.Item>Sub Item 3</ContextMenu.Item>
                </ContextMenu.Content>
              </ContextMenu.Sub>
              <ContextMenu.Item type="danger">Delete</ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu>
        </div>
      </section>

      <section>
        <h3>With Groups</h3>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <ContextMenu>
            <ContextMenu.Trigger>
              <div className={styles.cuiTrigger}>Grouped Items</div>
            </ContextMenu.Trigger>
            <ContextMenu.Content
              showArrow={true}
              side="bottom"
            >
              <ContextMenu.Group>
                <ContextMenu.Item>Group 1 - Item 1</ContextMenu.Item>
                <ContextMenu.Item>Group 1 - Item 2</ContextMenu.Item>
              </ContextMenu.Group>
              <ContextMenu.Item>Ungrouped Item</ContextMenu.Item>
              <ContextMenu.Item>Another Item</ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu>
        </div>
      </section>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: [".cuiGenericMenuItem"],
      focus: [".cuiGenericMenuItem"],
      focusVisible: [".cuiGenericMenuItem"],
    },
  },
};
