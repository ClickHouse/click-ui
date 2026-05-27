import { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '@/components/Badge';

const meta: Meta<typeof Badge> = {
  component: Badge,
  title: 'Display/Badge',
  tags: ['badge', 'autodocs'],
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Playground: Story = {
  args: {
    text: 'experiment',
    state: 'success',
    size: 'md',
    type: 'opaque',
  },
};

// Opaque type — each state

export const OpaqueDefault: Story = {
  args: { text: 'badge', state: 'default', size: 'md', type: 'opaque' },
};

export const OpaqueSuccess: Story = {
  args: { text: 'badge', state: 'success', size: 'md', type: 'opaque' },
};

export const OpaqueNeutral: Story = {
  args: { text: 'badge', state: 'neutral', size: 'md', type: 'opaque' },
};

export const OpaqueDanger: Story = {
  args: { text: 'badge', state: 'danger', size: 'md', type: 'opaque' },
};

export const OpaqueDisabled: Story = {
  args: { text: 'badge', state: 'disabled', size: 'md', type: 'opaque' },
};

export const OpaqueWarning: Story = {
  args: { text: 'badge', state: 'warning', size: 'md', type: 'opaque' },
};

export const OpaqueInfo: Story = {
  args: { text: 'badge', state: 'info', size: 'md', type: 'opaque' },
};

// Solid type — each state

export const SolidDefault: Story = {
  args: { text: 'badge', state: 'default', size: 'md', type: 'solid' },
};

export const SolidSuccess: Story = {
  args: { text: 'badge', state: 'success', size: 'md', type: 'solid' },
};

export const SolidNeutral: Story = {
  args: { text: 'badge', state: 'neutral', size: 'md', type: 'solid' },
};

export const SolidDanger: Story = {
  args: { text: 'badge', state: 'danger', size: 'md', type: 'solid' },
};

export const SolidDisabled: Story = {
  args: { text: 'badge', state: 'disabled', size: 'md', type: 'solid' },
};

export const SolidWarning: Story = {
  args: { text: 'badge', state: 'warning', size: 'md', type: 'solid' },
};

export const SolidInfo: Story = {
  args: { text: 'badge', state: 'info', size: 'md', type: 'solid' },
};

// Sizes

export const SizeSm: Story = {
  args: { text: 'badge', state: 'success', size: 'sm', type: 'opaque' },
};

export const SizeMd: Story = {
  args: { text: 'badge', state: 'success', size: 'md', type: 'opaque' },
};

// Icon variants

export const IconStart: Story = {
  args: {
    text: 'badge',
    state: 'success',
    size: 'md',
    type: 'opaque',
    icon: 'check',
    iconDir: 'start',
  },
};

export const IconEnd: Story = {
  args: {
    text: 'badge',
    state: 'success',
    size: 'md',
    type: 'opaque',
    icon: 'check',
    iconDir: 'end',
  },
};

export const IconSolid: Story = {
  args: {
    text: 'badge',
    state: 'success',
    size: 'md',
    type: 'solid',
    icon: 'check',
    iconDir: 'start',
  },
};

export const IconSm: Story = {
  args: {
    text: 'badge',
    state: 'success',
    size: 'sm',
    type: 'opaque',
    icon: 'check',
    iconDir: 'start',
  },
};

// Dismissible

export const Dismissible: Story = {
  args: {
    text: 'badge',
    state: 'info',
    size: 'md',
    type: 'opaque',
    dismissible: true,
    onClose: () => {},
  },
};

export const DismissibleWithIcon: Story = {
  args: {
    text: 'badge',
    state: 'info',
    size: 'md',
    type: 'opaque',
    icon: 'star',
    iconDir: 'start',
    dismissible: true,
    onClose: () => {},
  },
};

// Ellipsis off

export const EllipsisOff: Story = {
  args: {
    text: 'badge text',
    state: 'success',
    size: 'md',
    type: 'opaque',
    ellipsisContent: false,
  },
};
