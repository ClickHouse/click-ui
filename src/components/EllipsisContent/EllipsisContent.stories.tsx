import { Meta, StoryObj } from '@storybook/react-vite';
import { EllipsisContent } from '@/components/EllipsisContent';

const meta: Meta<typeof EllipsisContent> = {
  component: EllipsisContent,
  title: 'Display/EllipsisContent',
  tags: ['ellipsis-content', 'autodocs'],
  // EllipsisContent fills its parent's width and truncates overflowing text with
  // an ellipsis. The decorator constrains the available width so the truncation
  // (or lack of it) is measurable in the snapshot.
  decorators: [
    Story => (
      <div
        data-testid="ellipsis-content-harness"
        style={{
          width: '160px',
          padding: '8px',
          border: '1px solid #888',
          background: '#fff',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof EllipsisContent>;

export const Playground: Story = {
  args: {
    children: 'This is a very long line of text that should be truncated',
  },
};

export const Truncated: Story = {
  args: {
    children: 'This is a very long line of text that should be truncated',
  },
};

export const NotTruncated: Story = {
  args: {
    children: 'Short text',
  },
};

export const AsSpan: Story = {
  args: {
    component: 'span',
    children: 'This is a very long line of text rendered as a span element',
  },
};

export const WithChildElement: Story = {
  args: {
    children: <span>This is a very long line of text inside a child span</span>,
  },
};
