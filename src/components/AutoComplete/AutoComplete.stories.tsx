import React, { ReactElement, useEffect, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import { AutoComplete, AutoCompleteProps } from '@/components/AutoComplete';
import { selectOptions } from '@/components/Select/Select.fixtures';

interface AutoCompleteExampleProps extends Omit<
  AutoCompleteProps,
  'options' | 'children'
> {
  childrenType: 'children' | 'options';
}

const AutoCompleteExample = ({
  childrenType,
  value,
  ...props
}: AutoCompleteExampleProps) => {
  const [selectedValue, setSelectedValue] = useState(value);
  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  if (childrenType === 'options') {
    return (
      <AutoComplete
        value={selectedValue}
        onSelect={setSelectedValue}
        options={selectOptions}
        {...props}
      />
    );
  }
  return (
    <AutoComplete
      onSelect={setSelectedValue}
      {...props}
    >
      <AutoComplete.Group heading="Group label">
        <AutoComplete.Item
          value="content0"
          icon="user"
        >
          Content0
        </AutoComplete.Item>
      </AutoComplete.Group>
      <div>
        <AutoComplete.Item value="content1">Content1 long text content</AutoComplete.Item>
      </div>
      <AutoComplete.Item
        value="content2"
        disabled
      >
        Content2
      </AutoComplete.Item>
      <AutoComplete.Item value="content3">Content3</AutoComplete.Item>
      <AutoComplete.Item
        value="content4"
        label="Content4"
      />
    </AutoComplete>
  );
};

const meta: Meta<typeof AutoCompleteExample> = {
  component: AutoCompleteExample,
  subcomponents: {
    'AutoComplete.Group': AutoComplete.Group as React.ComponentType<unknown>,
    'AutoComplete.Item': AutoComplete.Item as React.ComponentType<unknown>,
  },
  title: 'Display/AutoComplete',
  tags: ['form-field', 'autocomplete', 'autodocs'],
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    value: { control: 'text' },
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    dir: { control: 'inline-radio', options: ['start', 'end'] },
    childrenType: { control: 'inline-radio', options: ['children', 'options'] },
  },
};

export default meta;

type Story = StoryObj<typeof AutoCompleteExample>;

export const Playground: Story = {
  args: {
    label: 'Label',
    childrenType: 'children',
  },
  parameters: {
    docs: {
      source: {
        transform: (
          _: string,
          story: { args: AutoCompleteExampleProps; [x: string]: unknown }
        ) => {
          const { childrenType, value, ...props } = story.args;
          return `<AutoComplete\n  value={${value}}\n${Object.entries(props)
            .flatMap(([key, value]) =>
              typeof value === 'boolean'
                ? value
                  ? `  ${key}`
                  : []
                : `  ${key}=${typeof value == 'string' ? `"${value}"` : `{${value}}`}`
            )
            .join('\n')}
${
  childrenType === 'options'
    ? `options={${JSON.stringify(selectOptions, null, 2)}}\n/`
    : ''
}>
${
  childrenType !== 'options'
    ? `
    <AutoComplete.Group heading="Group label">
      <AutoComplete.Item value="content0" icon="user>
        Content0
      </AutoComplete.Item>
    </AutoComplete.Group>
    <div>
      <AutoComplete.Item value="content1">Content1 long text content</AutoComplete.Item>
    </div>
    <AutoComplete.Item
      value="content2"
      disabled
    >
      Content2
    </AutoComplete.Item>
    <AutoComplete.Item value="content3">Content3</AutoComplete.Item>
</AutoComplete>
`
    : ''
}`;
        },
      },
    },
  },
};

/**
 * Stories below are dedicated visual-regression fixtures for the CSS Modules
 * migration. The harness decorator carries the `data-testid="autocomplete-harness"`
 * region the closed-state Playwright snapshots capture; open-state snapshots
 * click the trigger and screenshot the portalled popover dialog.
 */
const HarnessDecorator = (Story: () => ReactElement): ReactElement => (
  <div
    data-testid="autocomplete-harness"
    style={{ width: '320px', padding: '1rem' }}
  >
    <Story />
  </div>
);

const VRItems = (): ReactElement => (
  <>
    <AutoComplete.Group heading="Group label">
      <AutoComplete.Item
        value="content0"
        icon="user"
      >
        Content0
      </AutoComplete.Item>
    </AutoComplete.Group>
    <AutoComplete.Item value="content1">Content1 long text content</AutoComplete.Item>
    <AutoComplete.Item
      value="content2"
      disabled
    >
      Content2
    </AutoComplete.Item>
    <AutoComplete.Item value="content3">Content3</AutoComplete.Item>
    <AutoComplete.Item
      value="content4"
      label="Content4"
    />
  </>
);

export const VRDefault: Story = {
  decorators: [HarnessDecorator],
  render: () => <AutoComplete label="Label">{VRItems()}</AutoComplete>,
};

export const VRDisabled: Story = {
  decorators: [HarnessDecorator],
  render: () => (
    <AutoComplete
      label="Label"
      disabled
    >
      {VRItems()}
    </AutoComplete>
  ),
};

export const VRError: Story = {
  decorators: [HarnessDecorator],
  render: () => (
    <AutoComplete
      label="Label"
      error="This field is required"
    >
      {VRItems()}
    </AutoComplete>
  ),
};

export const VROpen: Story = {
  decorators: [HarnessDecorator],
  render: () => <AutoComplete label="Label">{VRItems()}</AutoComplete>,
};

export const VROpenSelected: Story = {
  decorators: [HarnessDecorator],
  render: () => (
    <AutoComplete
      label="Label"
      value="content3"
    >
      {VRItems()}
    </AutoComplete>
  ),
};
