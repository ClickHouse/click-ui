import { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumbs, BreadcrumbItem, BreadcrumbSeparator } from './Breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
  component: Breadcrumbs,
  title: 'Navigation/Breadcrumbs',
  tags: ['breadcrumbs', 'autodocs'],
};

export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

export const Playground: Story = {
  render: () => (
    <Breadcrumbs>
      <BreadcrumbItem
        icon="home"
        href="#"
      >
        Home
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem href="#">Data sources</BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem href="#">ClickPipes</BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem active>GCS Unordered mode with service account</BreadcrumbItem>
    </Breadcrumbs>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Breadcrumbs>
      <BreadcrumbItem
        icon="home"
        href="#"
      >
        Data sources
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem active>Settings</BreadcrumbItem>
    </Breadcrumbs>
  ),
};

export const TwoLevels: Story = {
  render: () => (
    <Breadcrumbs>
      <BreadcrumbItem href="#">Home</BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem active>Current page</BreadcrumbItem>
    </Breadcrumbs>
  ),
};
