import { Meta, StoryObj } from "@storybook/react-vite";
import { SidebarCollapsibleTitle, SidebarNavigationItem } from "@/components";

const meta: Meta<typeof SidebarCollapsibleTitle> = {
  component: SidebarCollapsibleTitle,
  title: "Sidebar/CollapsibleTitle",
  tags: ["sidebar", "collapsible-title", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof SidebarCollapsibleTitle>;

export const Playground: Story = {
  args: {
    icon: "code",
    label: "Queries",
    selected: false,
    children: (
      <>
        <SidebarNavigationItem
          level={1}
          icon="code-in-square"
          label="Untitled Query 1"
        />
        <SidebarNavigationItem
          level={2}
          icon="code-in-square"
          label="Untitled Query 2"
        />
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
        <h3>Type: Main</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            maxWidth: "300px",
          }}
        >
          <SidebarCollapsibleTitle
            type="main"
            icon="code"
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
          </SidebarCollapsibleTitle>
          <SidebarCollapsibleTitle
            type="main"
            icon="code"
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
          </SidebarCollapsibleTitle>
          <SidebarCollapsibleTitle
            type="main"
            icon="code"
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
          </SidebarCollapsibleTitle>
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
          <SidebarCollapsibleTitle
            type="sqlSidebar"
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
          </SidebarCollapsibleTitle>
          <SidebarCollapsibleTitle
            type="sqlSidebar"
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
          </SidebarCollapsibleTitle>
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
          <SidebarCollapsibleTitle
            type="main"
            icon="code"
            iconDir="start"
            label="Icon Start (default)"
          >
            <SidebarNavigationItem
              level={1}
              icon="code-in-square"
              label="Nested Item"
            />
          </SidebarCollapsibleTitle>
          <SidebarCollapsibleTitle
            type="main"
            icon="code"
            iconDir="end"
            label="Icon End"
          >
            <SidebarNavigationItem
              level={1}
              icon="code-in-square"
              label="Nested Item"
            />
          </SidebarCollapsibleTitle>
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
          <SidebarCollapsibleTitle
            type="main"
            label="No Icon Title"
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
          </SidebarCollapsibleTitle>
        </div>
      </section>

      <section>
        <h3>Different Icons</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            maxWidth: "300px",
          }}
        >
          <SidebarCollapsibleTitle
            type="main"
            icon="table"
            label="Tables"
          >
            <SidebarNavigationItem
              level={1}
              icon="table"
              label="users"
            />
            <SidebarNavigationItem
              level={1}
              icon="table"
              label="products"
            />
          </SidebarCollapsibleTitle>
          <SidebarCollapsibleTitle
            type="main"
            icon="code"
            label="Queries"
          >
            <SidebarNavigationItem
              level={1}
              icon="code-in-square"
              label="Query 1"
            />
            <SidebarNavigationItem
              level={1}
              icon="code-in-square"
              label="Query 2"
            />
          </SidebarCollapsibleTitle>
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
