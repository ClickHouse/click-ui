import { Meta, StoryObj } from '@storybook/react-vite';
import { GridContainer } from './GridContainer';
import { Text } from '..';
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
        <div style={{ border: '1px solid grey' }}>
          <Text>Child</Text>
        </div>
        <div style={{ border: '1px solid grey' }}>
          <Text>Child</Text>
        </div>
        <div style={{ border: '1px solid grey' }}>
          <Text>Child</Text>
        </div>
      </GridContainer>
    </GridCenter>
  ),
};
