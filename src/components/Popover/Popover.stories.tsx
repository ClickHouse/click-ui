import React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';
import { GridCenter } from '@/components/GridCenter';
import { Text } from '@/components/Text';
import { Title } from '@/components/Title';
import { Popover } from '@/components/Popover';

const meta: Meta<typeof Popover> = {
  component: Popover,
  subcomponents: {
    'Popover.Trigger': Popover.Trigger as React.ComponentType<unknown>,
    'Popover.Content': Popover.Content as React.ComponentType<unknown>,
  },
  title: 'Display/Popover',
  tags: ['autodocs', 'form-field', 'popover'],
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Playground: Story = {
  args: {
    modal: false,
  },
  render: args => (
    <GridCenter>
      <Popover {...args}>
        <Popover.Trigger>Click Here</Popover.Trigger>
        <Popover.Content
          side="bottom"
          showArrow
          showClose
        >
          <Title type="h2">Content popover</Title>
          <br />
          <Text>Click on the input element below.</Text>
          <br />
          <Checkbox label="This is a sample data to experiment the popover" />
        </Popover.Content>
      </Popover>
      <Popover {...args}>
        <Popover.Trigger>
          <Button>Click Here Button</Button>
        </Popover.Trigger>
        <Popover.Content
          side="bottom"
          showArrow
          showClose
        >
          <Title type="h2">Content popover</Title>
          <br />
          <Text>Click on the input element below.</Text>
          <br />
          <Checkbox label="This is a sample data to experiment the popover" />
        </Popover.Content>
      </Popover>
    </GridCenter>
  ),
};

// Open-by-default so visual regression can screenshot the content panel and its
// close button without an interaction step. The close button is rendered via
// `<CloseButton as={RadixPopover.Close}>` (CloseButton = styled(EmptyButton)),
// exercising the `as`-prop path that bypasses EmptyButton's own render. This
// guards that path against the EmptyButton CSS Modules migration.
export const OpenWithClose: Story = {
  args: {
    modal: false,
    open: true,
  },
  render: args => (
    <GridCenter>
      <Popover {...args}>
        <Popover.Trigger>Click Here</Popover.Trigger>
        <Popover.Content
          side="bottom"
          showClose
        >
          <Title type="h2">Content popover</Title>
          <br />
          <Text>Popover with a close button.</Text>
        </Popover.Content>
      </Popover>
    </GridCenter>
  ),
};
