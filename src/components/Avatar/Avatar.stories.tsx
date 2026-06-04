import { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from '@/components/Avatar';

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  title: 'Display/Avatar',
  tags: ['avatar', 'autodocs'],
  decorators: [
    Story => (
      <div
        data-testid="avatar-harness"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8px',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Playground: Story = {
  args: {
    text: 'CM',
  },
};

export const TextFallbackSm: Story = {
  args: { text: 'Claude Mendoza', textSize: 'sm' },
};

export const TextFallbackMd: Story = {
  args: { text: 'Claude Mendoza', textSize: 'md' },
};

export const TextSingleWord: Story = {
  args: { text: 'Avatar', textSize: 'sm' },
};

export const TextSingleChar: Story = {
  args: { text: 'A', textSize: 'md' },
};

export const DefaultTextSize: Story = {
  args: { text: 'Default Size' },
};

// Inline SVG data URI provides a deterministic image source for snapshot stability.
const stableImageSrc =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><rect width='24' height='24' fill='%23ff7a59'/><circle cx='12' cy='9' r='4' fill='%23ffffff'/><rect x='4' y='15' width='16' height='8' rx='4' fill='%23ffffff'/></svg>";

export const WithImage: Story = {
  args: { text: 'Claude Mendoza', textSize: 'sm', src: stableImageSrc },
};
