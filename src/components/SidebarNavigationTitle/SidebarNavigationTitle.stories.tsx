import { Meta, StoryObj } from "@storybook/react-vite";
import { SidebarNavigationTitle } from "@/components";

const meta: Meta<typeof SidebarNavigationTitle> = {
  component: SidebarNavigationTitle,
  title: "Sidebar/NavigationTitle",
  tags: ["sidebar", "navigation-title", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof SidebarNavigationTitle>;

export const Playground: Story = {
  args: {
    icon: "table",
    selected: false,
    label: <a href="/profile">Tables</a>,
  },
};

export const Variations: Story = {
  render: () => (
    <div
      style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "2rem" }}
    >
      <section>
        <h3>Type: Main</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            maxWidth: "300px",
          }}
        >
          <SidebarNavigationTitle
            type="main"
            icon="table"
            label="Default State"
          />
          <SidebarNavigationTitle
            type="main"
            icon="table"
            label="Selected State"
            selected
          />
          <SidebarNavigationTitle
            type="main"
            icon="code"
            label="Different Icon"
          />
        </div>
      </section>

      <section>
        <h3>Type: SQL Sidebar</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            maxWidth: "300px",
          }}
        >
          <SidebarNavigationTitle
            type="sqlSidebar"
            icon="table"
            label="Default State"
          />
          <SidebarNavigationTitle
            type="sqlSidebar"
            icon="table"
            label="Selected State"
            selected
          />
          <SidebarNavigationTitle
            type="sqlSidebar"
            icon="code"
            label="Different Icon"
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
          <SidebarNavigationTitle
            type="main"
            icon="table"
            iconDir="start"
            label="Icon Start (default)"
          />
          <SidebarNavigationTitle
            type="main"
            icon="table"
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
          <SidebarNavigationTitle
            type="main"
            label="No Icon Title"
          />
          <SidebarNavigationTitle
            type="main"
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
          <SidebarNavigationTitle
            type="main"
            icon="code"
            label="Collapsible Title"
            collapsible
          />
          <SidebarNavigationTitle
            type="main"
            icon="code"
            label="Collapsible Selected"
            selected
            collapsible
          />
        </div>
      </section>

      <section>
        <h3>Long Text</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            maxWidth: "300px",
          }}
        >
          <SidebarNavigationTitle
            type="main"
            icon="table"
            label="Very Long Title That Might Wrap Or Truncate"
          />
          <SidebarNavigationTitle
            type="main"
            icon="table"
            label="Very Long Title That Might Wrap Or Truncate"
            selected
          />
        </div>
      </section>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: [".cuiSidebarTitleWrapper"],
      focus: [".cuiSidebarTitleWrapper"],
    },
    chromatic: {
      delay: 300,
    },
  },
};
