import { Meta, StoryObj } from '@storybook/react-vite';
import LogosLight from '@/components/Assets/Logos/system/LogosLight';
import FlagsLight from '@/components/Assets/Flags/system/FlagsLight';
import PaymentsLight from '@/components/Assets/Payments/system/PaymentsLight';
import { Icon } from '@/components/Icon';
import { IconName, IconProps, ImageType } from '@/components/Icon/Icon.types';
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

const IconHarness = (props: ImageType) => (
  <div
    data-testid="icon-harness"
    style={{ display: 'inline-flex' }}
  >
    <Icon {...props} />
  </div>
);

export const DefaultMd: Story = {
  render: () => <IconHarness name="users" />,
};

export const SizeXs: Story = {
  render: () => (
    <IconHarness
      name="users"
      size="xs"
    />
  ),
};

export const SizeSm: Story = {
  render: () => (
    <IconHarness
      name="users"
      size="sm"
    />
  ),
};

export const SizeMd: Story = {
  render: () => (
    <IconHarness
      name="users"
      size="md"
    />
  ),
};

export const SizeLg: Story = {
  render: () => (
    <IconHarness
      name="users"
      size="lg"
    />
  ),
};

export const SizeXl: Story = {
  render: () => (
    <IconHarness
      name="users"
      size="xl"
    />
  ),
};

export const SizeXxl: Story = {
  render: () => (
    <IconHarness
      name="users"
      size="xxl"
    />
  ),
};

export const StateSuccess: Story = {
  render: () => (
    <IconHarness
      name="users"
      state="success"
    />
  ),
};

export const StateWarning: Story = {
  render: () => (
    <IconHarness
      name="users"
      state="warning"
    />
  ),
};

export const StateDanger: Story = {
  render: () => (
    <IconHarness
      name="users"
      state="danger"
    />
  ),
};

export const StateInfo: Story = {
  render: () => (
    <IconHarness
      name="users"
      state="info"
    />
  ),
};

export const StateSuccessSm: Story = {
  render: () => (
    <IconHarness
      name="users"
      state="success"
      size="sm"
    />
  ),
};

export const StateSuccessXl: Story = {
  render: () => (
    <IconHarness
      name="users"
      state="success"
      size="xl"
    />
  ),
};

export const CustomColor: Story = {
  render: () => (
    <IconHarness
      name="users"
      color="#c10000"
    />
  ),
};

export const CustomWidthHeight: Story = {
  render: () => (
    <IconHarness
      name="users"
      width={40}
      height={40}
    />
  ),
};

export const FlagAsset: Story = {
  render: () => (
    <IconHarness
      name="australia"
      size="md"
    />
  ),
};

export const LogoAsset: Story = {
  render: () => (
    <IconHarness
      name="clickhouse"
      size="md"
    />
  ),
};

export const PaymentAsset: Story = {
  render: () => (
    <IconHarness
      name="visa"
      size="md"
    />
  ),
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
