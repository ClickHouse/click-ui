import { Meta, StoryObj } from '@storybook/react-vite';
import { GridContainer } from '@/components/GridContainer';
import { Text } from '@/components/Text';
import { styled } from 'styled-components';

const GridCenter = styled.div`
  display: grid;
  justify-items: center;
  width: 100%;
  height: 120px;
`;

const meta: Meta<typeof GridContainer> = {
  component: GridContainer,
  title: 'Layout/GridContainer',
  tags: ['grid_container', 'autodocs'],
};

export default meta;

type Story = StoryObj<typeof GridContainer>;

const Cells = () => (
  <>
    <div style={{ border: '1px solid grey' }}>
      <Text>Child A</Text>
    </div>
    <div style={{ border: '1px solid grey' }}>
      <Text>Child B</Text>
    </div>
    <div style={{ border: '1px solid grey' }}>
      <Text>Child C</Text>
    </div>
    <div style={{ border: '1px solid grey' }}>
      <Text>Child D</Text>
    </div>
  </>
);

export const Playground: Story = {
  args: {
    alignContent: 'stretch',
    alignItems: 'stretch',
    columnGap: 'none',
    inline: false,
    isResponsive: true,
    justifyContent: 'stretch',
    justifyItems: 'stretch',
    rowGap: 'none',
  },
  render: args => (
    <GridCenter>
      <GridContainer
        {...args}
        style={{ border: '1px solid grey' }}
      >
        <Text>Parent container</Text>
        <Cells />
      </GridContainer>
    </GridCenter>
  ),
};

export const TwoColumns: Story = {
  args: {
    gridTemplateColumns: '1fr 1fr',
    gap: 'md',
  },
  render: args => (
    <GridContainer
      {...args}
      style={{ border: '1px solid grey' }}
    >
      <Cells />
    </GridContainer>
  ),
};

export const ThreeColumns: Story = {
  args: {
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 'lg',
  },
  render: args => (
    <GridContainer
      {...args}
      style={{ border: '1px solid grey' }}
    >
      <Cells />
    </GridContainer>
  ),
};

export const ColumnGap: Story = {
  args: {
    gridTemplateColumns: 'repeat(4, 1fr)',
    columnGap: 'xl',
  },
  render: args => (
    <GridContainer
      {...args}
      style={{ border: '1px solid grey' }}
    >
      <Cells />
    </GridContainer>
  ),
};

export const RowGap: Story = {
  args: {
    gridTemplateColumns: '1fr 1fr',
    rowGap: 'xl',
  },
  render: args => (
    <GridContainer
      {...args}
      style={{ border: '1px solid grey' }}
    >
      <Cells />
    </GridContainer>
  ),
};

export const Inline: Story = {
  args: {
    inline: true,
    gridTemplateColumns: 'repeat(2, 100px)',
    gap: 'sm',
    fillWidth: false,
  },
  render: args => (
    <GridContainer
      {...args}
      style={{ border: '1px solid grey' }}
    >
      <Cells />
    </GridContainer>
  ),
};

export const AlignItemsCenter: Story = {
  args: {
    gridTemplateColumns: '1fr 1fr',
    alignItems: 'center',
    gap: 'md',
    height: '160px',
  },
  render: args => (
    <GridContainer
      {...args}
      style={{ border: '1px solid grey' }}
    >
      <Cells />
    </GridContainer>
  ),
};

export const JustifyContentSpaceBetween: Story = {
  args: {
    gridTemplateColumns: 'repeat(3, 80px)',
    justifyContent: 'space-between',
    gap: 'md',
  },
  render: args => (
    <GridContainer
      {...args}
      style={{ border: '1px solid grey' }}
    >
      <Cells />
    </GridContainer>
  ),
};

export const NotResponsive: Story = {
  args: {
    gridTemplateColumns: '1fr 1fr',
    isResponsive: false,
    gap: 'md',
  },
  render: args => (
    <GridContainer
      {...args}
      style={{ border: '1px solid grey' }}
    >
      <Cells />
    </GridContainer>
  ),
};

export const HugWidth: Story = {
  args: {
    gridTemplateColumns: 'repeat(2, 80px)',
    fillWidth: false,
    gap: 'md',
  },
  render: args => (
    <GridContainer
      {...args}
      style={{ border: '1px solid grey' }}
    >
      <Cells />
    </GridContainer>
  ),
};

export const AutoFlowColumn: Story = {
  args: {
    gridTemplateRows: 'repeat(2, 1fr)',
    gridAutoFlow: 'column',
    gap: 'md',
    height: '160px',
  },
  render: args => (
    <GridContainer
      {...args}
      style={{ border: '1px solid grey' }}
    >
      <Cells />
    </GridContainer>
  ),
};

export const MaxHeightOverflow: Story = {
  args: {
    gridTemplateColumns: '1fr',
    maxHeight: '80px',
    overflow: 'auto',
    gap: 'sm',
  },
  render: args => (
    <GridContainer
      {...args}
      style={{ border: '1px solid grey' }}
    >
      <Cells />
    </GridContainer>
  ),
};
