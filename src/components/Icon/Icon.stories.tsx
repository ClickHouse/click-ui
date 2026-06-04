import { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import LogosLight from '@/components/Assets/Logos/system/LogosLight';
import FlagsLight from '@/components/Assets/Flags/system/FlagsLight';
import PaymentsLight from '@/components/Assets/Payments/system/PaymentsLight';
import { Icon } from '@/components/Icon';
import { IconName, IconProps } from '@/components/Icon/Icon.types';
import { ICONS_MAP } from '@/components/Icon/IconCommon';
import { Container } from '@/components/Container';
import { ComponentProps, useState } from 'react';
import { cn } from '@/lib/cva';
import { SearchField } from '@/components/SearchField';
import { Title } from '@/components/Title';
import { Panel } from '@/components/Panel';
import { Text } from '@/components/Text';
import { GridContainer } from '@/components/GridContainer';
import { Spacer } from '@/components/Spacer';
import storyStyles from './Icon.stories.module.css';

const IconNames = Object.keys(ICONS_MAP);
const FlagNames = Object.keys(FlagsLight);
const LogoNames = Object.keys(LogosLight);
const PaymentNames = Object.keys(PaymentsLight);

const IconWrapper = (props: IconProps) => (
  <Container>
    <Icon {...props} />
  </Container>
);

const meta: Meta<typeof Icon> = {
  component: Icon,
  title: 'Assets/Icon',
  tags: ['icon', 'autodocs'],
  argTypes: {
    name: {
      options: [...IconNames, ...FlagNames, ...LogoNames, ...PaymentNames],
      control: { type: 'select' },
    },
    size: {
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      control: { type: 'select' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Playground: Story = {
  args: {
    name: 'users',
    size: 'md',
    state: 'default',
  },
  render: args => <IconWrapper {...(args as IconProps)} />,
};

// Most Icon stories don't need the gallery/Container layout that Playground and
// the Icons gallery use, so the harness backdrop is applied per-story (not on
// meta) to keep those bespoke stories unwrapped.
const iconHarness: Decorator = Story => (
  <div
    data-testid="icon-harness"
    style={{ display: 'inline-flex' }}
  >
    <Story />
  </div>
);

export const DefaultMd: Story = {
  args: { name: 'users' },
  decorators: [iconHarness],
};

export const SizeXs: Story = {
  args: { name: 'users', size: 'xs' },
  decorators: [iconHarness],
};

export const SizeSm: Story = {
  args: { name: 'users', size: 'sm' },
  decorators: [iconHarness],
};

export const SizeMd: Story = {
  args: { name: 'users', size: 'md' },
  decorators: [iconHarness],
};

export const SizeLg: Story = {
  args: { name: 'users', size: 'lg' },
  decorators: [iconHarness],
};

export const SizeXl: Story = {
  args: { name: 'users', size: 'xl' },
  decorators: [iconHarness],
};

export const SizeXxl: Story = {
  args: { name: 'users', size: 'xxl' },
  decorators: [iconHarness],
};

export const StateSuccess: Story = {
  args: { name: 'users', state: 'success' },
  decorators: [iconHarness],
};

export const StateWarning: Story = {
  args: { name: 'users', state: 'warning' },
  decorators: [iconHarness],
};

export const StateDanger: Story = {
  args: { name: 'users', state: 'danger' },
  decorators: [iconHarness],
};

export const StateInfo: Story = {
  args: { name: 'users', state: 'info' },
  decorators: [iconHarness],
};

export const StateSuccessSm: Story = {
  args: { name: 'users', state: 'success', size: 'sm' },
  decorators: [iconHarness],
};

export const StateSuccessXl: Story = {
  args: { name: 'users', state: 'success', size: 'xl' },
  decorators: [iconHarness],
};

export const CustomColor: Story = {
  args: { name: 'users', color: '#c10000' },
  decorators: [iconHarness],
};

export const CustomWidthHeight: Story = {
  args: { name: 'users', width: 40, height: 40 },
  decorators: [iconHarness],
};

export const FlagAsset: Story = {
  args: { name: 'australia', size: 'md' },
  decorators: [iconHarness],
};

export const LogoAsset: Story = {
  args: { name: 'clickhouse', size: 'md' },
  decorators: [iconHarness],
};

export const PaymentAsset: Story = {
  args: { name: 'visa', size: 'md' },
  decorators: [iconHarness],
};

type IconGalleryProps = {
  name: IconName;
};

const IconGallery = ({ name }: IconGalleryProps) => (
  <Container gap="xs">
    <Panel
      hasBorder
      padding="xs"
    >
      <Icon
        name={name}
        size="md"
      />
    </Panel>
    <Text
      size="sm"
      color="muted"
    >
      {name}
    </Text>
  </Container>
);

const ResponsiveGridContainer = ({
  className,
  ...props
}: ComponentProps<typeof GridContainer>) => (
  <GridContainer
    className={cn(storyStyles['responsive-grid'], className)}
    {...props}
  />
);

export const Icons: Story = {
  render: () => {
    const [query, setQuery] = useState('');
    return (
      <Container
        orientation="vertical"
        gap="sm"
        maxWidth="1000px"
        style={{ margin: '0 auto' }}
      >
        <Title
          type="h2"
          size="xl"
        >
          Glyph
        </Title>

        <Container
          orientation="vertical"
          gap="md"
        >
          <SearchField
            value={query}
            placeholder="Search icons..."
            onChange={setQuery}
            tabIndex={1}
          />
          <ResponsiveGridContainer>
            {Object.keys(ICONS_MAP)
              .filter(
                key => query === '' || key.toLowerCase().includes(query.toLowerCase())
              )
              .sort()
              .map(key => {
                return (
                  <IconGallery
                    key={key}
                    name={key as IconName}
                  />
                );
              })}
          </ResponsiveGridContainer>
        </Container>

        <Spacer size="md" />

        <Title
          type="h2"
          size="xl"
        >
          Flags
        </Title>

        <ResponsiveGridContainer>
          {Object.keys(FlagsLight).map(key => (
            <IconGallery
              key={key}
              name={key as IconName}
            />
          ))}
        </ResponsiveGridContainer>

        <Spacer size="md" />

        <Title
          type="h2"
          size="xl"
        >
          Payments
        </Title>

        <ResponsiveGridContainer>
          {Object.keys(PaymentsLight).map(key => (
            <IconGallery
              key={key}
              name={key as IconName}
            />
          ))}
        </ResponsiveGridContainer>

        <Spacer size="md" />

        <Title
          type="h2"
          size="xl"
        >
          Logo
        </Title>

        <ResponsiveGridContainer>
          {Object.keys(LogosLight).map(key => (
            <IconGallery
              key={key}
              name={key as IconName}
            />
          ))}
        </ResponsiveGridContainer>
      </Container>
    );
  },
};
