import { Meta, StoryObj } from '@storybook/react-vite';
import { Panel } from '@/components/Panel';
import { Text } from '@/components/Text';
import { Title } from '@/components/Title';

const meta: Meta<typeof Panel> = {
  component: Panel,
  title: 'Display/Panel',
  tags: ['panel', 'autodocs'],
  // The harness gives the Playwright spec a stable, fixed-size region to
  // screenshot. The Panel paints its own background, so the harness adds no
  // backdrop that would obscure the real rendering — it only constrains the
  // available width/height so width/fill behavior is measurable.
  decorators: [
    Story => (
      <div
        data-testid="panel-harness"
        style={{ width: '320px', height: '200px', padding: '16px' }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Panel>;

const SampleContent = (
  <>
    <Title type="h3">Example panel title</Title>
    <Text
      size="md"
      color="default"
    >
      Panel content
    </Text>
  </>
);

export const Playground: Story = {
  args: {
    alignItems: 'start',
    color: 'default',
    cursor: 'auto',
    fillHeight: false,
    fillWidth: false,
    hasBorder: true,
    hasShadow: true,
    height: '',
    orientation: 'vertical',
    padding: 'md',
    radii: 'sm',
    width: '50%',
    children: SampleContent,
  },
};

export const ColorDefault: Story = {
  args: { color: 'default', orientation: 'vertical', children: SampleContent },
};

export const ColorMuted: Story = {
  args: { color: 'muted', orientation: 'vertical', children: SampleContent },
};

export const ColorTransparent: Story = {
  args: { color: 'transparent', orientation: 'vertical', children: SampleContent },
};

export const RadiiNone: Story = {
  args: {
    radii: 'none',
    color: 'muted',
    orientation: 'vertical',
    children: SampleContent,
  },
};

export const RadiiSm: Story = {
  args: { radii: 'sm', color: 'muted', orientation: 'vertical', children: SampleContent },
};

export const RadiiMd: Story = {
  args: { radii: 'md', color: 'muted', orientation: 'vertical', children: SampleContent },
};

export const RadiiLg: Story = {
  args: { radii: 'lg', color: 'muted', orientation: 'vertical', children: SampleContent },
};

export const PaddingNone: Story = {
  args: {
    padding: 'none',
    color: 'muted',
    orientation: 'vertical',
    children: SampleContent,
  },
};

export const PaddingXs: Story = {
  args: {
    padding: 'xs',
    color: 'muted',
    orientation: 'vertical',
    children: SampleContent,
  },
};

export const PaddingSm: Story = {
  args: {
    padding: 'sm',
    color: 'muted',
    orientation: 'vertical',
    children: SampleContent,
  },
};

export const PaddingMd: Story = {
  args: {
    padding: 'md',
    color: 'muted',
    orientation: 'vertical',
    children: SampleContent,
  },
};

export const PaddingLg: Story = {
  args: {
    padding: 'lg',
    color: 'muted',
    orientation: 'vertical',
    children: SampleContent,
  },
};

export const PaddingXl: Story = {
  args: {
    padding: 'xl',
    color: 'muted',
    orientation: 'vertical',
    children: SampleContent,
  },
};

export const GapNone: Story = {
  args: { gap: 'none', color: 'muted', orientation: 'vertical', children: SampleContent },
};

export const GapSm: Story = {
  args: { gap: 'sm', color: 'muted', orientation: 'vertical', children: SampleContent },
};

export const GapLg: Story = {
  args: { gap: 'lg', color: 'muted', orientation: 'vertical', children: SampleContent },
};

export const GapXl: Story = {
  args: { gap: 'xl', color: 'muted', orientation: 'vertical', children: SampleContent },
};

export const OrientationHorizontal: Story = {
  args: { orientation: 'horizontal', color: 'muted', children: SampleContent },
};

export const OrientationVertical: Story = {
  args: { orientation: 'vertical', color: 'muted', children: SampleContent },
};

export const AlignStart: Story = {
  args: {
    alignItems: 'start',
    color: 'muted',
    orientation: 'vertical',
    children: SampleContent,
  },
};

export const AlignCenter: Story = {
  args: {
    alignItems: 'center',
    color: 'muted',
    orientation: 'vertical',
    children: SampleContent,
  },
};

export const AlignEnd: Story = {
  args: {
    alignItems: 'end',
    color: 'muted',
    orientation: 'vertical',
    children: SampleContent,
  },
};

export const HasBorder: Story = {
  args: {
    hasBorder: true,
    color: 'muted',
    orientation: 'vertical',
    children: SampleContent,
  },
};

export const HasShadow: Story = {
  args: {
    hasShadow: true,
    color: 'default',
    orientation: 'vertical',
    children: SampleContent,
  },
};

export const FillWidth: Story = {
  args: {
    fillWidth: true,
    color: 'muted',
    orientation: 'vertical',
    children: SampleContent,
  },
};

export const FillHeight: Story = {
  args: {
    fillHeight: true,
    color: 'muted',
    orientation: 'vertical',
    children: SampleContent,
  },
};

export const FixedWidth: Story = {
  args: {
    width: '200px',
    color: 'muted',
    orientation: 'vertical',
    children: SampleContent,
  },
};
