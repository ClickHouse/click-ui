import { Meta, StoryObj } from '@storybook/react-vite';
import { SidebarCollapsibleTitle, SidebarNavigationItem } from '@/components';

const meta: Meta<typeof SidebarCollapsibleTitle> = {
  component: SidebarCollapsibleTitle,
  title: 'Sidebar/CollapsibleTitle',
  tags: ['sidebar', 'collapsible-title', 'autodocs'],
};

export default meta;

type Story = StoryObj<typeof SidebarCollapsibleTitle>;

export const Playground: Story = {
  args: {
    icon: 'code',
    label: 'Queries',
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
