import { Meta, StoryObj } from '@storybook/react-vite';
import { ReactNode } from 'react';
import { Container } from '@/components/Container';
import { Text } from '@/components/Text';

const GridCenter = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      display: 'grid',
      placeItems: 'center',
      width: '100%',
      height: '100%',
    }}
  >
    {children}
  </div>
);

const Box = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '64px',
      height: '32px',
      border: '1px solid grey',
    }}
  >
    {children}
  </div>
);

const meta: Meta<typeof Container> = {
  component: Container,
  title: 'Layout/Container',
  tags: ['container', 'autodocs'],
};

export default meta;

type Story = StoryObj<typeof Container>;

export const Playground: Story = {
  args: {
    alignItems: 'center',
    fillWidth: false,
    gap: 'none',
    grow: '0',
    isResponsive: true,
    justifyContent: 'start',
    maxWidth: 'auto',
    minWidth: 'auto',
    orientation: 'horizontal',
    padding: 'none',
    shrink: '0',
    wrap: 'nowrap',
  },
  render: args => (
    <GridCenter>
      <Container
        {...args}
        style={{ border: '1px solid grey' }}
      >
        <Text>Parent container</Text>
        <Container
          {...args}
          style={{ border: '1px solid grey' }}
        >
          <Text>Child</Text>
        </Container>
        <Container
          {...args}
          style={{ border: '1px solid grey' }}
        >
          <Text>Child</Text>
        </Container>
        <Container
          {...args}
          style={{ border: '1px solid grey' }}
        >
          <Text>Child</Text>
        </Container>
      </Container>
    </GridCenter>
  ),
};

const renderBoxes = (count = 3) =>
  Array.from({ length: count }, (_, i) => <Box key={i}>{i + 1}</Box>);

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    fillWidth: false,
    isResponsive: false,
    gap: 'md',
    padding: 'md',
  },
  render: args => (
    <Container
      {...args}
      style={{ border: '1px solid grey' }}
    >
      {renderBoxes()}
    </Container>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    fillWidth: false,
    isResponsive: false,
    gap: 'md',
    padding: 'md',
  },
  render: args => (
    <Container
      {...args}
      style={{ border: '1px solid grey' }}
    >
      {renderBoxes()}
    </Container>
  ),
};

export const GapNone: Story = {
  args: {
    fillWidth: false,
    isResponsive: false,
    gap: 'none',
    padding: 'sm',
  },
  render: args => (
    <Container
      {...args}
      style={{ border: '1px solid grey' }}
    >
      {renderBoxes()}
    </Container>
  ),
};

export const GapLarge: Story = {
  args: {
    fillWidth: false,
    isResponsive: false,
    gap: 'xxl',
    padding: 'sm',
  },
  render: args => (
    <Container
      {...args}
      style={{ border: '1px solid grey' }}
    >
      {renderBoxes()}
    </Container>
  ),
};

export const PaddingLarge: Story = {
  args: {
    fillWidth: false,
    isResponsive: false,
    gap: 'sm',
    padding: 'xxl',
  },
  render: args => (
    <Container
      {...args}
      style={{ border: '1px solid grey' }}
    >
      {renderBoxes()}
    </Container>
  ),
};

export const AlignStart: Story = {
  args: {
    fillWidth: false,
    isResponsive: false,
    orientation: 'horizontal',
    alignItems: 'start',
    gap: 'md',
    padding: 'md',
    minHeight: '120px',
  },
  render: args => (
    <Container
      {...args}
      style={{ border: '1px solid grey' }}
    >
      {renderBoxes()}
    </Container>
  ),
};

export const AlignEnd: Story = {
  args: {
    fillWidth: false,
    isResponsive: false,
    orientation: 'horizontal',
    alignItems: 'end',
    gap: 'md',
    padding: 'md',
    minHeight: '120px',
  },
  render: args => (
    <Container
      {...args}
      style={{ border: '1px solid grey' }}
    >
      {renderBoxes()}
    </Container>
  ),
};

export const AlignStretch: Story = {
  args: {
    fillWidth: false,
    isResponsive: false,
    orientation: 'horizontal',
    alignItems: 'stretch',
    gap: 'md',
    padding: 'md',
    minHeight: '120px',
  },
  render: args => (
    <Container
      {...args}
      style={{ border: '1px solid grey' }}
    >
      {renderBoxes()}
    </Container>
  ),
};

export const JustifyCenter: Story = {
  args: {
    fillWidth: true,
    isResponsive: false,
    justifyContent: 'center',
    gap: 'md',
    padding: 'md',
  },
  render: args => (
    <Container
      {...args}
      style={{ border: '1px solid grey' }}
    >
      {renderBoxes()}
    </Container>
  ),
};

export const JustifySpaceBetween: Story = {
  args: {
    fillWidth: true,
    isResponsive: false,
    justifyContent: 'space-between',
    gap: 'md',
    padding: 'md',
  },
  render: args => (
    <Container
      {...args}
      style={{ border: '1px solid grey' }}
    >
      {renderBoxes()}
    </Container>
  ),
};

export const JustifyEnd: Story = {
  args: {
    fillWidth: true,
    isResponsive: false,
    justifyContent: 'end',
    gap: 'md',
    padding: 'md',
  },
  render: args => (
    <Container
      {...args}
      style={{ border: '1px solid grey' }}
    >
      {renderBoxes()}
    </Container>
  ),
};

export const FillWidth: Story = {
  args: {
    fillWidth: true,
    isResponsive: false,
    gap: 'md',
    padding: 'md',
  },
  render: args => (
    <Container
      {...args}
      style={{ border: '1px solid grey' }}
    >
      {renderBoxes()}
    </Container>
  ),
};

export const Wrap: Story = {
  args: {
    fillWidth: false,
    isResponsive: false,
    wrap: 'wrap',
    gap: 'sm',
    padding: 'sm',
    maxWidth: '160px',
  },
  render: args => (
    <Container
      {...args}
      style={{ border: '1px solid grey' }}
    >
      {renderBoxes(6)}
    </Container>
  ),
};

export const Grow: Story = {
  args: {
    fillWidth: false,
    isResponsive: false,
    orientation: 'horizontal',
    gap: 'md',
    padding: 'md',
  },
  render: args => (
    <Container
      orientation="horizontal"
      fillWidth
      isResponsive={false}
      gap="md"
      style={{ border: '1px solid grey', width: '320px' }}
    >
      <Container
        {...args}
        grow="1"
        style={{ border: '1px solid grey' }}
      >
        <Box>grow</Box>
      </Container>
      <Box>fixed</Box>
    </Container>
  ),
};

export const FillHeight: Story = {
  args: {
    fillWidth: false,
    isResponsive: false,
    fillHeight: true,
    orientation: 'vertical',
    gap: 'md',
    padding: 'md',
  },
  render: args => (
    <div style={{ height: '160px', border: '1px solid blue' }}>
      <Container
        {...args}
        style={{ border: '1px solid grey' }}
      >
        {renderBoxes()}
      </Container>
    </div>
  ),
};
