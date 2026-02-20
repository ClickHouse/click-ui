import { Meta, StoryObj } from '@storybook/react-vite';
import { MiddleTruncator } from '@/components/MiddleTruncator';

type StoryArgs = React.ComponentProps<typeof MiddleTruncator> & {
  containerWidth: number;
};

const meta: Meta<StoryArgs> = {
  component: MiddleTruncator,
  title: 'Display/MiddleTruncator',
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: { type: 'text' },
    },
    trailingChars: {
      control: { type: 'number' },
    },
    containerWidth: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
  },
};

export default meta;

type Story = StoryObj<StoryArgs>;

export const Playground: Story = {
  args: {
    text: 'console.clickhouse.cloud_Archive.01-01-1975.lorem-ipsum-a-very-long-filename-01.csv',
    trailingChars: 10,
    containerWidth: 20,
  },
  render: ({ containerWidth, ...args }) => (
    <div style={{ width: `${containerWidth}%` }}>
      <MiddleTruncator {...args} />
    </div>
  ),
};
