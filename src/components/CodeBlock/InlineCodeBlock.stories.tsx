import { Meta, StoryObj } from '@storybook/react-vite';
import { InlineCodeBlock } from './InlineCodeBlock';

const meta: Meta<typeof InlineCodeBlock> = {
  component: InlineCodeBlock,
  title: 'CodeBlocks/Inline',
  tags: ['code-blocks', 'inline', 'autodocs'],
  decorators: [
    Story => (
      <div
        data-testid="inline-codeblock-harness"
        style={{ display: 'inline-block', padding: '24px' }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof InlineCodeBlock>;

export const Playground: Story = {
  args: {
    children: 'Text Content',
  },
};
