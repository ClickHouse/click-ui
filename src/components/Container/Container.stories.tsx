import { Meta, StoryObj } from '@storybook/react-vite';
import { Container } from '@/components/Container';
import { Text } from '..';
import { styled } from 'styled-components';

const GridCenter = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
`;

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
