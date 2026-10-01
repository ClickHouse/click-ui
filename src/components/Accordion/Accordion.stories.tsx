import { Meta, StoryObj } from '@storybook/react-vite';
import { Panel } from '@/components/Panel';
import { Accordion } from '@/components/Accordion';
import { Spacer } from '@/components/Spacer';
import { Text } from '@/components/Text';
import { Title } from '@/components/Title';

const meta: Meta<typeof Accordion> = {
  component: Accordion,
  title: 'Accordion/Accordion',
  tags: ['accordion', 'autodocs'],
  decorators: Story => (
    <div
      data-testid="accordion-harness"
      style={{ width: 480, padding: 16 }}
    >
      <Story />
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof Accordion>;

const children = (
  <Panel color="muted">
    <Title type="h2">Content</Title>
    <Spacer />
    <Text>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
      Ipsum has been the industry's standard Lorem Ipsum is simply dummy text of the
      printing and typesetting industry. Lorem Ipsum has been the industry's standard
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
      Ipsum has been the industry's standard.
    </Text>
  </Panel>
);

const baseArgs = {
  title: 'Accordion title',
  size: 'md' as const,
  gap: 'md' as const,
  color: 'default' as const,
  fillWidth: false,
  children,
};

export const Playground: Story = {
  args: baseArgs,
};

export const Default: Story = {
  args: baseArgs,
};

export const Small: Story = {
  args: {
    ...baseArgs,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    ...baseArgs,
    size: 'lg',
  },
};

export const Link: Story = {
  args: {
    ...baseArgs,
    color: 'link',
  },
};

export const WithIcon: Story = {
  args: {
    ...baseArgs,
    icon: 'bar-chart',
  },
};

export const FillWidth: Story = {
  args: {
    ...baseArgs,
    fillWidth: true,
  },
};

export const Open: Story = {
  args: {
    ...baseArgs,
    defaultValue: 'item',
  },
};
