import { Meta, StoryObj } from "@storybook/react-vite";
import { SidebarCollapsibleItem, SidebarNavigationItem } from "@/components";

const meta: Meta<typeof SidebarCollapsibleItem> = {
  component: SidebarCollapsibleItem,
  title: "Sidebar/CollapsibleItem",
  tags: ["sidebar", "collapsible-item", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof SidebarCollapsibleItem>;

export const Playground: Story = {
  args: {
    icon: "table",
    selected: false,
    label: <span>system-table</span>,
    children: (
      <>
        <h2>Content</h2>
        <p>SomeText</p>
      </>
    ),
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
          <SidebarCollapsibleItem
            type="main"
            level={0}
            icon="table"
            label="Default State"
          >
            <SidebarNavigationItem
              level={1}
              icon="code-in-square"
              label="Nested Item 1"
            />
            <SidebarNavigationItem
              level={1}
              icon="code-in-square"
              label="Nested Item 2"
            />
          </SidebarCollapsibleItem>
          <SidebarCollapsibleItem
            type="main"
            level={0}
            icon="table"
            label="Selected State"
            selected
          >
            <SidebarNavigationItem
              level={1}
              icon="code-in-square"
              label="Nested Item 1"
            />
            <SidebarNavigationItem
              level={1}
              icon="code-in-square"
              label="Nested Item 2"
            />
          </SidebarCollapsibleItem>
          <SidebarCollapsibleItem
            type="main"
            level={0}
            icon="table"
            label="Open by Default"
            open
          >
            <SidebarNavigationItem
              level={1}
              icon="code-in-square"
              label="Nested Item 1"
            />
            <SidebarNavigationItem
              level={1}
              icon="code-in-square"
              label="Nested Item 2"
            />
          </SidebarCollapsibleItem>
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
          <SidebarCollapsibleItem
            type="main"
            level={1}
            icon="table"
            label="Sub Level Item"
          >
            <SidebarNavigationItem
              level={2}
              icon="code-in-square"
              label="Nested Item 1"
            />
            <SidebarNavigationItem
              level={2}
              icon="code-in-square"
              label="Nested Item 2"
            />
          </SidebarCollapsibleItem>
          <SidebarCollapsibleItem
            type="main"
            level={1}
            icon="table"
            label="Sub Level Selected"
            selected
          >
            <SidebarNavigationItem
              level={2}
              icon="code-in-square"
              label="Nested Item 1"
            />
            <SidebarNavigationItem
              level={2}
              icon="code-in-square"
              label="Nested Item 2"
            />
          </SidebarCollapsibleItem>
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
          <SidebarCollapsibleItem
            type="sqlSidebar"
            level={0}
            icon="table"
            label="Default State"
          >
            <SidebarNavigationItem
              level={1}
              icon="code-in-square"
              label="Nested Item 1"
            />
            <SidebarNavigationItem
              level={1}
              icon="code-in-square"
              label="Nested Item 2"
            />
          </SidebarCollapsibleItem>
          <SidebarCollapsibleItem
            type="sqlSidebar"
            level={0}
            icon="table"
            label="Selected State"
            selected
          >
            <SidebarNavigationItem
              level={1}
              icon="code-in-square"
              label="Nested Item 1"
            />
            <SidebarNavigationItem
              level={1}
              icon="code-in-square"
              label="Nested Item 2"
            />
          </SidebarCollapsibleItem>
        </div>
      </section>

      <section>
        <h3>Indicator Direction</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            maxWidth: "300px",
          }}
        >
          <SidebarCollapsibleItem
            type="main"
            level={0}
            icon="table"
            indicatorDir="start"
            label="Indicator Start (default)"
          >
            <SidebarNavigationItem
              level={1}
              icon="code-in-square"
              label="Nested Item"
            />
          </SidebarCollapsibleItem>
          <SidebarCollapsibleItem
            type="main"
            level={0}
            icon="table"
            indicatorDir="end"
            label="Indicator End"
          >
            <SidebarNavigationItem
              level={1}
              icon="code-in-square"
              label="Nested Item"
            />
          </SidebarCollapsibleItem>
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
          <SidebarCollapsibleItem
            type="main"
            level={0}
            icon="table"
            iconDir="start"
            label="Icon Start (default)"
          >
            <SidebarNavigationItem
              level={1}
              icon="code-in-square"
              label="Nested Item"
            />
          </SidebarCollapsibleItem>
          <SidebarCollapsibleItem
            type="main"
            level={0}
            icon="table"
            iconDir="end"
            label="Icon End"
          >
            <SidebarNavigationItem
              level={1}
              icon="code-in-square"
              label="Nested Item"
            />
          </SidebarCollapsibleItem>
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
          <SidebarCollapsibleItem
            type="main"
            level={0}
            label="No Icon Item"
          >
            <SidebarNavigationItem
              level={1}
              icon="code-in-square"
              label="Nested Item 1"
            />
            <SidebarNavigationItem
              level={1}
              icon="code-in-square"
              label="Nested Item 2"
            />
          </SidebarCollapsibleItem>
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
