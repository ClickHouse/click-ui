import { Meta, StoryObj } from '@storybook/react-vite';
import { MiddleTruncator } from '@/components/MiddleTruncator';

// eslint-disable-next-line @typescript-eslint/no-deprecated -- stories of the deprecated component; remove with it
type StoryArgs = React.ComponentProps<typeof MiddleTruncator> & {
  containerWidth: number;
};

const Decorator = (Story: React.ComponentType, { args }: { args: StoryArgs }) => (
  <div
    data-testid="middle-truncator-harness"
    style={{ width: `${args.containerWidth}%` }}
  >
    <Story />
  </div>
);

const meta: Meta<StoryArgs> = {
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- stories of the deprecated component; remove with it
  component: MiddleTruncator,
  title: 'Display/MiddleTruncator',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '**Deprecated:** superseded by `TextTruncate` with `ellipsisPosition="middle"`. Internal component, still used by `Table` (`overflowMode="truncate-middle"`) and `FileUpload`; it will be removed in a future version.',
      },
    },
  },
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
  args: {
    text: 'console.clickhouse.cloud_Archive.01-01-1975.lorem-ipsum-a-very-long-filename-01.csv',
    trailingChars: 10,
    containerWidth: 20,
  },
};

export default meta;

type Story = StoryObj<StoryArgs>;

export const Playground: Story = {
  render: ({ containerWidth, ...args }) => (
    <div style={{ width: `${containerWidth}%` }}>
      {/* eslint-disable-next-line @typescript-eslint/no-deprecated -- stories of the deprecated component; remove with it */}
      <MiddleTruncator {...args} />
    </div>
  ),
};

export const Truncated: Story = {
  args: {
    containerWidth: 20,
  },
  decorators: [Decorator],
};

export const FullWidth: Story = {
  args: {
    containerWidth: 100,
  },
  decorators: [Decorator],
};

export const ShortText: Story = {
  args: {
    text: 'short.csv',
    containerWidth: 50,
  },
  decorators: [Decorator],
};

export const TrailingChars: Story = {
  args: {
    trailingChars: 20,
    containerWidth: 20,
  },
  decorators: [Decorator],
};
