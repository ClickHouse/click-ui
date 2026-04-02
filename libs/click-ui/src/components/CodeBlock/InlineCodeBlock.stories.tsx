import { Meta, StoryObj } from '@storybook/react-vite';
import { InlineCodeBlock } from './InlineCodeBlock';

const meta: Meta<typeof InlineCodeBlock> = {
  component: InlineCodeBlock,
  title: 'CodeBlocks/Inline',
  tags: ['code-blocks', 'inline', 'autodocs'],
};

export default meta;

type Story = StoryObj<typeof InlineCodeBlock>;

export const Playground: Story = {
  args: {
    children: 'Text Content',
  },
};
