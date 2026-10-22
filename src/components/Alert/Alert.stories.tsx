import { Meta, StoryObj } from '@storybook/react-vite';

import { Alert } from '@/components/Alert';
import { Container } from '@/components/Container';
import { Link } from '@/components/Link';
import { ICON_NAMES } from '@/components/Icon/IconCommon';

const meta: Meta<typeof Alert> = {
  component: Alert,
  title: 'Display/Alert',
  tags: ['alert', 'autodocs'],
  argTypes: {
    customIcon: { type: { name: 'enum', value: [...ICON_NAMES] } },
    preserveLineBreaks: { control: 'boolean' },
  },
  decorators: Story => (
    <Container maxWidth="65%">
      <Story />
    </Container>
  ),
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Playground: Story = {
  args: {
    title: '',
    text: 'An alert example',
    state: 'success',
    size: 'small',
    type: 'default',
    showIcon: true,
    dismissible: false,
    preserveLineBreaks: false,
  },
};

export const TitleWithLink: Story = {
  args: {
    title: (
      <>
        Important: Please review our{' '}
        <Link
          href={'https://clickhouse.com/docs'}
          target="_blank"
          rel="noopener noreferrer"
        >
          documentation
        </Link>{' '}
        before progressing
      </>
    ),
    text: (
      <>
        Example demos how you can pass react elements like links to the title prop, with{' '}
        <Link href="https://clickhouse.com/docs">a link</Link>
      </>
    ),
    state: 'info',
    size: 'medium',
    type: 'default',
    showIcon: true,
    dismissible: false,
  },
};

// State variants — default type, small size

export const StateNeutral: Story = {
  args: { text: 'A neutral alert', state: 'neutral', size: 'small', type: 'default' },
};

export const StateSuccess: Story = {
  args: { text: 'A success alert', state: 'success', size: 'small', type: 'default' },
};

export const StateWarning: Story = {
  args: { text: 'A warning alert', state: 'warning', size: 'small', type: 'default' },
};

export const StateDanger: Story = {
  args: { text: 'A danger alert', state: 'danger', size: 'small', type: 'default' },
};

export const StateInfo: Story = {
  args: { text: 'An info alert', state: 'info', size: 'small', type: 'default' },
};

// Size variants

export const SizeSmall: Story = {
  args: {
    title: 'Alert title',
    text: 'A small alert',
    state: 'info',
    size: 'small',
    type: 'default',
  },
};

export const SizeMedium: Story = {
  args: {
    title: 'Alert title',
    text: 'A medium alert',
    state: 'info',
    size: 'medium',
    type: 'default',
  },
};

// Banner type

export const BannerSmall: Story = {
  args: {
    text: 'A small banner alert',
    state: 'warning',
    size: 'small',
    type: 'banner',
  },
};

export const BannerMedium: Story = {
  args: {
    text: 'A medium banner alert',
    state: 'warning',
    size: 'medium',
    type: 'banner',
  },
};

// Icon variants

export const NoIcon: Story = {
  args: {
    text: 'An alert without an icon',
    state: 'success',
    size: 'small',
    type: 'default',
    showIcon: false,
  },
};

export const CustomIcon: Story = {
  args: {
    text: 'An alert with a custom icon',
    state: 'info',
    size: 'small',
    type: 'default',
    showIcon: true,
    customIcon: 'gift',
  },
};

// Dismissible

export const Dismissible: Story = {
  args: {
    title: 'Dismissible alert',
    text: 'An alert that can be dismissed',
    state: 'danger',
    size: 'medium',
    type: 'default',
    dismissible: true,
  },
};

export const DismissibleBanner: Story = {
  args: {
    text: 'A dismissible banner alert',
    state: 'danger',
    size: 'medium',
    type: 'banner',
    dismissible: true,
  },
};

const multilineTitle = 'Query failed\nCode: 62';
const multilineText =
  'Syntax error: failed at position 15.\nExpected one of: token, identifier.\n\nSELECT * FROM events\nWHERE id = 1';

// Default: `\n` in text collapses. Opt-in: string text keeps line breaks and wraps long tokens.
// The title stays one line.

export const SingleLineText: Story = {
  args: {
    title: 'Query failed',
    text: 'A single-line alert.',
    state: 'warning',
    size: 'small',
    type: 'default',
    preserveLineBreaks: false,
  },
};

export const CollapsedNewlines: Story = {
  args: {
    title: multilineTitle,
    text: multilineText,
    state: 'warning',
    size: 'small',
    type: 'default',
    preserveLineBreaks: false,
  },
};

export const MultilineText: Story = {
  args: {
    title: multilineTitle,
    text: multilineText,
    state: 'warning',
    size: 'small',
    type: 'default',
    preserveLineBreaks: true,
  },
};

export const LongUnbrokenToken: Story = {
  decorators: [
    Story => (
      <Container maxWidth="320px">
        <Story />
      </Container>
    ),
  ],
  args: {
    title: 'Unknown identifier',
    text: 'DB::Exception: Unknown table expression identifier default.extremely_long_table_name_without_any_spaces_that_should_wrap_inside_the_alert_instead_of_overflowing in scope.',
    state: 'danger',
    size: 'small',
    type: 'default',
    preserveLineBreaks: true,
  },
};

// A multi-line S3 signatures error (SQL-2580 / CUI-335). Leading space before each `-` is intentional.
const multilineS3SignaturesError = `Code: 42. DB::Exception: Storage S3 requires 1 to 9 arguments. All supported signatures:
 - url
 - url, NOSIGN
 - url, format
 - url, NOSIGN, format
 - url, format, compression_method
 - url, NOSIGN, format, compression_method
 - url, access_key_id, secret_access_key
 - url, access_key_id, secret_access_key, session_token
 - url, access_key_id, secret_access_key, format
 - url, access_key_id, secret_access_key, session_token, format
 - url, access_key_id, secret_access_key, format, compression_method
 - url, access_key_id, secret_access_key, session_token, format, compression_method`;

export const CollapsedSignaturesError: Story = {
  args: {
    text: multilineS3SignaturesError,
    state: 'warning',
    size: 'small',
    type: 'default',
    preserveLineBreaks: false,
  },
};

export const PreservedSignaturesError: Story = {
  args: {
    text: multilineS3SignaturesError,
    state: 'warning',
    size: 'small',
    type: 'default',
    preserveLineBreaks: true,
  },
};
