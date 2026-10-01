import React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import { MultiAccordion } from '@/components/MultiAccordion';

const meta: Meta<typeof MultiAccordion> = {
  component: MultiAccordion,
  subcomponents: {
    'MultiAccordion.Item': MultiAccordion.Item as React.ComponentType<unknown>,
  },
  title: 'Accordion/MultiAccordion',
  tags: ['multi-accordion', 'autodocs'],
  argTypes: {
    collapsible: { if: { arg: 'type', eq: 'single' } },
  },
  decorators: Story => (
    <div
      data-testid="multi-accordion-harness"
      style={{ width: 480, padding: 16 }}
    >
      <Story />
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof MultiAccordion>;

const items = (
  <>
    <MultiAccordion.Item
      value="content0"
      icon="user"
      title="Option 1"
      isCompleted
    >
      Content0
    </MultiAccordion.Item>
    <MultiAccordion.Item
      value="content1"
      title="Option 2"
    >
      Content1 long text content
    </MultiAccordion.Item>
  </>
);

export const Playground: Story = {
  args: {
    type: 'single',
    collapsible: true,
    showBorder: true,
    showCheck: true,
    children: items,
  },
};

export const Default: Story = {
  args: {
    type: 'single',
    collapsible: true,
    showBorder: true,
    children: (
      <>
        <MultiAccordion.Item
          value="content0"
          title="Option 1"
        >
          Content0
        </MultiAccordion.Item>
        <MultiAccordion.Item
          value="content1"
          title="Option 2"
        >
          Content1 long text content
        </MultiAccordion.Item>
      </>
    ),
  },
};

export const Small: Story = {
  args: {
    type: 'single',
    collapsible: true,
    size: 'sm',
    children: (
      <>
        <MultiAccordion.Item
          value="content0"
          title="Option 1"
        >
          Content0
        </MultiAccordion.Item>
        <MultiAccordion.Item
          value="content1"
          title="Option 2"
        >
          Content1 long text content
        </MultiAccordion.Item>
      </>
    ),
  },
};

export const Large: Story = {
  args: {
    type: 'single',
    collapsible: true,
    size: 'lg',
    children: (
      <>
        <MultiAccordion.Item
          value="content0"
          title="Option 1"
        >
          Content0
        </MultiAccordion.Item>
        <MultiAccordion.Item
          value="content1"
          title="Option 2"
        >
          Content1 long text content
        </MultiAccordion.Item>
      </>
    ),
  },
};

export const Link: Story = {
  args: {
    type: 'single',
    collapsible: true,
    children: (
      <>
        <MultiAccordion.Item
          value="content0"
          title="Option 1"
          color="link"
        >
          Content0
        </MultiAccordion.Item>
        <MultiAccordion.Item
          value="content1"
          title="Option 2"
          color="link"
        >
          Content1 long text content
        </MultiAccordion.Item>
      </>
    ),
  },
};

export const WithIcon: Story = {
  args: {
    type: 'single',
    collapsible: true,
    children: (
      <>
        <MultiAccordion.Item
          value="content0"
          title="Option 1"
          icon="bar-chart"
        >
          Content0
        </MultiAccordion.Item>
        <MultiAccordion.Item
          value="content1"
          title="Option 2"
          icon="user"
        >
          Content1 long text content
        </MultiAccordion.Item>
      </>
    ),
  },
};

export const WithCheck: Story = {
  args: {
    type: 'single',
    collapsible: true,
    showCheck: true,
    children: (
      <>
        <MultiAccordion.Item
          value="content0"
          title="Option 1"
          isCompleted
        >
          Content0
        </MultiAccordion.Item>
        <MultiAccordion.Item
          value="content1"
          title="Option 2"
        >
          Content1 long text content
        </MultiAccordion.Item>
      </>
    ),
  },
};

export const NoBorder: Story = {
  args: {
    type: 'single',
    collapsible: true,
    showBorder: false,
    children: (
      <>
        <MultiAccordion.Item
          value="content0"
          title="Option 1"
        >
          Content0
        </MultiAccordion.Item>
        <MultiAccordion.Item
          value="content1"
          title="Option 2"
        >
          Content1 long text content
        </MultiAccordion.Item>
      </>
    ),
  },
};

export const Open: Story = {
  args: {
    type: 'single',
    collapsible: true,
    showCheck: true,
    defaultValue: 'content0',
    children: (
      <>
        <MultiAccordion.Item
          value="content0"
          title="Option 1"
          icon="user"
          isCompleted
        >
          Content0
        </MultiAccordion.Item>
        <MultiAccordion.Item
          value="content1"
          title="Option 2"
        >
          Content1 long text content
        </MultiAccordion.Item>
      </>
    ),
  },
};

export const Multiple: Story = {
  args: {
    type: 'multiple',
    defaultValue: ['content0', 'content1'],
    children: (
      <>
        <MultiAccordion.Item
          value="content0"
          title="Option 1"
        >
          Content0
        </MultiAccordion.Item>
        <MultiAccordion.Item
          value="content1"
          title="Option 2"
        >
          Content1 long text content
        </MultiAccordion.Item>
      </>
    ),
  },
};
