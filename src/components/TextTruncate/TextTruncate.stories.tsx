import { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '@/components/Badge';
import { Container } from '@/components/Container';
import { Icon } from '@/components/Icon';
import { IconButton } from '@/components/IconButton';
import { Link } from '@/components/Link';
import { Text } from '@/components/Text';
import { TextTruncate } from '@/components/TextTruncate';

const LONG_TEXT = 'This is a very long line of text that should be truncated';
const FILE_NAME = 'console.clickhouse.cloud_Archive.01-01-1975.lorem-ipsum-01.csv';

const meta: Meta<typeof TextTruncate> = {
  component: TextTruncate,
  title: 'Display/TextTruncate',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Truncates a single line of text with an ellipsis at the end or in the middle. While the text is cut off, it shows the full text in a tooltip on hover, and becomes a tab stop that shows it on keyboard focus. Inside a button, link, tab, menu item or option it adds no tab stop of its own, so the tooltip is hover-only there. Replaces `EllipsisContent` and `MiddleTruncator`.',
      },
    },
  },
  argTypes: {
    ellipsisPosition: { control: 'inline-radio', options: ['end', 'middle'] },
    trailingChars: { control: 'number' },
    maxWidth: { control: 'text' },
    showTooltip: { control: 'boolean' },
  },
  decorators: [
    Story => (
      <div
        data-testid="text-truncate-harness"
        style={{
          width: '200px',
          padding: '8px',
          border: '1px dashed var(--click-global-color-stroke-default)',
          color: 'var(--click-global-color-text-default)',
          font: 'var(--typography-styles-product-text-normal-md)',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof TextTruncate>;

export const Playground: Story = {
  args: {
    children: LONG_TEXT,
    ellipsisPosition: 'end',
    showTooltip: true,
  },
};

export const Truncated: Story = {
  args: { children: LONG_TEXT },
};

export const NotTruncated: Story = {
  args: { children: 'Short text' },
  parameters: {
    docs: {
      description: {
        story: 'Text that fits has no tooltip and is not a tab stop.',
      },
    },
  },
};

export const Middle: Story = {
  args: { ellipsisPosition: 'middle', children: FILE_NAME },
  parameters: {
    docs: {
      description: {
        story:
          'Keeps the end of the text visible: file names, IDs, host names, paths. Text is not split when the kept end would be longer than the rest. In a box narrower than the kept end, the end gets its own ellipsis; use `ellipsisPosition="end"` or fewer `trailingChars` there.',
      },
    },
  },
};

export const MiddleTrailingChars: Story = {
  args: { ellipsisPosition: 'middle', trailingChars: 14, children: FILE_NAME },
};

export const MaxWidth: Story = {
  args: { maxWidth: '15ch', children: LONG_TEXT },
};

export const WithoutTooltip: Story = {
  args: { showTooltip: false, children: LONG_TEXT },
  parameters: {
    docs: {
      description: {
        story:
          'No measuring, tooltip or tab stop. Use it in large lists and in grid cells, where the grid owns keyboard focus.',
      },
    },
  },
};

export const TooltipContent: Story = {
  args: {
    tooltipContent: 'Owned by the data-platform-observability team',
    children: (
      <>
        Owned by <Link href="#team">the data-platform-observability team</Link>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'When `children` holds links or buttons, pass plain text as `tooltipContent` so the tooltip does not copy them.',
      },
    },
  },
};

export const TooltipOnRight: Story = {
  args: { tooltipProps: { side: 'right' }, children: LONG_TEXT },
};

export const AsText: Story = {
  render: () => (
    <TextTruncate
      component={Text}
      size="sm"
      weight="mono"
    >
      {FILE_NAME}
    </TextTruncate>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Use `component={Text}` for typography. A `<Text>` child would be a block inside the root and get clipped without an ellipsis.',
      },
    },
  },
};

export const InFlexRow: Story = {
  render: () => (
    <Container
      orientation="horizontal"
      gap="xs"
    >
      <Icon
        name="table"
        size="sm"
        aria-hidden
      />
      <TextTruncate style={{ flex: 1 }}>{LONG_TEXT}</TextTruncate>
      <IconButton
        icon="dots-vertical"
        size="sm"
        type="ghost"
        aria-label="More actions"
      />
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Truncates as a flex item without extra props. Pass `style={{ flex: 1 }}` or a `className` to push the next item to the end of the row.',
      },
    },
  },
};

export const InBadge: Story = {
  render: () => (
    <Badge
      ellipsisContent={false}
      text={<TextTruncate maxWidth="12ch">{FILE_NAME}</TextTruncate>}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Pass `ellipsisContent={false}` so Badge does not truncate twice.',
      },
    },
  },
};

export const InsideLink: Story = {
  render: () => (
    <Link
      href="#file"
      style={{ maxWidth: '100%' }}
    >
      <TextTruncate ellipsisPosition="middle">{FILE_NAME}</TextTruncate>
    </Link>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Inside a control the link is the only tab stop; the tooltip still opens on hover. Link and Badge are `inline-flex` and grow with their text, so cap their width (here `maxWidth: 100%`) or there is nothing to truncate against.',
      },
    },
  },
};
