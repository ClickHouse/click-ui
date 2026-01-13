import { Meta, StoryObj } from "@storybook/react-vite";
import { SidebarNavigationItem } from "@/components";

const meta: Meta<typeof SidebarNavigationItem> = {
  component: SidebarNavigationItem,
  title: "Sidebar/NavigationItem",
  tags: ["sidebar", "navigation-item", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof SidebarNavigationItem>;

export const Playground: Story = {
  args: {
    icon: "code-in-square",
    selected: false,
    disabled: false,
    label: <a href="https://clickhouse.com/">Untitled Query</a>,
  },
};

export const Variations: Story = {
  render: () => (
    <div
      style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "2rem" }}
    >
      <section>
        <h3>Type: Main (Level 0)</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            maxWidth: "300px",
          }}
        >
          <SidebarNavigationItem
            type="main"
            level={0}
            icon="code-in-square"
            label="Default State"
          />
          <SidebarNavigationItem
            type="main"
            level={0}
            icon="code-in-square"
            label="Selected State"
            selected
          />
          <SidebarNavigationItem
            type="main"
            level={0}
            icon="code-in-square"
            label="Disabled State"
            disabled
          />
          <SidebarNavigationItem
            type="main"
            level={0}
            icon="code-in-square"
            label="Selected + Disabled"
            selected
            disabled
          />
        </div>
      </section>

      <section>
        <h3>Type: Main (Level 1)</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            maxWidth: "300px",
          }}
        >
          <SidebarNavigationItem
            type="main"
            level={1}
            icon="code-in-square"
            label="Sub Item Default"
          />
          <SidebarNavigationItem
            type="main"
            level={1}
            icon="code-in-square"
            label="Sub Item Selected"
            selected
          />
          <SidebarNavigationItem
            type="main"
            level={1}
            icon="code-in-square"
            label="Sub Item Disabled"
            disabled
          />
        </div>
      </section>

      <section>
        <h3>Type: Main (Level 2)</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            maxWidth: "300px",
          }}
        >
          <SidebarNavigationItem
            type="main"
            level={2}
            icon="code-in-square"
            label="Nested Sub Item"
          />
          <SidebarNavigationItem
            type="main"
            level={2}
            icon="code-in-square"
            label="Nested Selected"
            selected
          />
        </div>
      </section>

      <section>
        <h3>Type: SQL Sidebar (Level 0)</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            maxWidth: "300px",
          }}
        >
          <SidebarNavigationItem
            type="sqlSidebar"
            level={0}
            icon="table"
            label="Default State"
          />
          <SidebarNavigationItem
            type="sqlSidebar"
            level={0}
            icon="table"
            label="Selected State"
            selected
          />
          <SidebarNavigationItem
            type="sqlSidebar"
            level={0}
            icon="table"
            label="Disabled State"
            disabled
          />
        </div>
      </section>

      <section>
        <h3>Type: SQL Sidebar (Level 1)</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            maxWidth: "300px",
          }}
        >
          <SidebarNavigationItem
            type="sqlSidebar"
            level={1}
            icon="table"
            label="Sub Item Default"
          />
          <SidebarNavigationItem
            type="sqlSidebar"
            level={1}
            icon="table"
            label="Sub Item Selected"
            selected
          />
        </div>
      </section>

      <section>
        <h3>Icon Direction</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            maxWidth: "300px",
          }}
        >
          <SidebarNavigationItem
            type="main"
            level={0}
            icon="code-in-square"
            iconDir="start"
            label="Icon Start (default)"
          />
          <SidebarNavigationItem
            type="main"
            level={0}
            icon="code-in-square"
            iconDir="end"
            label="Icon End"
          />
        </div>
      </section>

      <section>
        <h3>Without Icon</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            maxWidth: "300px",
          }}
        >
          <SidebarNavigationItem
            type="main"
            level={0}
            label="No Icon Item"
          />
          <SidebarNavigationItem
            type="main"
            level={0}
            label="No Icon Selected"
            selected
          />
        </div>
      </section>

      <section>
        <h3>Collapsible</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            maxWidth: "300px",
          }}
        >
          <SidebarNavigationItem
            type="main"
            level={0}
            icon="code"
            label="Collapsible Item"
            collapsible
          />
          <SidebarNavigationItem
            type="main"
            level={0}
            icon="code"
            label="Collapsible Selected"
            selected
            collapsible
          />
        </div>
      </section>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: [".cuiSidebarItemWrapper"],
      focus: [".cuiSidebarItemWrapper"],
      active: [".cuiSidebarItemWrapper"],
    },
    chromatic: {
      delay: 300,
    },
  },
};
