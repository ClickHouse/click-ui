import { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from '@/components/Select/SingleSelect';
import { selectOptions } from '@/components/Select/selectOptions';
import { Container } from '@/components/Container/Container';
import { Text } from '@/components/Typography/Text/Text';
import { Panel } from '@/components/Panel/Panel';
import { Title } from '@/components/Typography/Title/Title';
import { Button } from '@/components/Button/Button';
import { ReactElement } from 'react';

const meta: Meta<typeof Select> = {
  component: Select,
  title: 'Forms/Select',
  tags: ['form-field', 'select', 'autodocs'],
};

export default meta;

export const CloudProvider: StoryObj<typeof Select> = {
  args: {
    label: 'Cloud provider',
  },
  render: props => (
    <Select {...props}>
      <Select.Item
        value="aws"
        icon="aws"
      >
        AWS
      </Select.Item>
      <Select.Item
        value="gcp"
        icon="gcp"
      >
        GCP
      </Select.Item>
      <Select.Item
        value="azure"
        icon="azure"
      >
        Azure
      </Select.Item>
    </Select>
  ),
};

export const OptionsAsChildren: StoryObj<typeof Select> = {
  args: {
    label: 'Label',
  },
  render: props => (
    <Select {...props}>
      <Select.Group heading="Group label">
        <Select.Item
          value="content0"
          icon="user"
        >
          Content0
        </Select.Item>
      </Select.Group>
      <div>
        <Select.Item value="content1">Content1 long text content</Select.Item>
      </div>
      <Select.Item
        value="content2"
        disabled
      >
        Content2
        <Select.ItemDescription>Description of a disabled item</Select.ItemDescription>
      </Select.Item>
      <Select.Item value="content3">
        Content3
        <Select.ItemDescription>Description of Content3</Select.ItemDescription>
      </Select.Item>
      <Select.Item
        value="content4"
        label="Content4"
      />
    </Select>
  ),
};

export const CustomTriggerProps: StoryObj<typeof Select> = {
  argTypes: {
    triggerProps: {
      control: 'object',
    },
  },
  args: {
    label: 'Custom Cloud provider',
    triggerProps: {
      className: 'custom-trigger',
      style: {
        border: '2px dashed #00f',
        borderRadius: '8px',
        maxWidth: '200px',
      },
      onFocus: () => console.log('🤖 Trigger focused!'),
      onMouseEnter: () => console.log('👀 Mouse entered trigger!'),
    },
  },
  render: props => (
    <Select {...props}>
      <Select.Item value="aws">AWS</Select.Item>
      <Select.Item value="gcp">GCP</Select.Item>
      <Select.Item value="azure">Azure</Select.Item>
    </Select>
  ),
  tags: ['form-field', 'select', 'autodocs'],
};

export const OptionsAsProp: StoryObj<typeof Select> = {
  args: {
    label: 'Label',
  },
  render: props => (
    <Select
      options={selectOptions}
      {...props}
    />
  ),
};

export const UseFullWidth = {
  args: {},
  render: () => {
    return (
      <Container fillWidth>
        <Panel width="200px">
          <Title type="h2">Full width items</Title>
          <Select useFullWidthItems>
            <Select.Item value="item 1">
              Ask and it will be given to you; seek and you will find; knock and the door
              will be opened to you.
            </Select.Item>
            <Select.Item value="item 2">
              For everyone who asks receives; the one who seeks finds; and to the one who
              knocks, the door will be opened.
            </Select.Item>
            <Select.Item value="item 3">
              Which of you, if your son asks for bread, will give him a stone?
            </Select.Item>
          </Select>

          <Title type="h2">Larger itemCharacterLimit</Title>
          <Select
            useFullWidthItems
            itemCharacterLimit="90ch"
          >
            <Select.Item value="item 1">
              Ask and it will be given to you; seek and you will find; knock and the door
              will be opened to you.
            </Select.Item>
            <Select.Item value="item 2">
              For everyone who asks receives; the one who seeks finds; and to the one who
              knocks, the door will be opened.
            </Select.Item>
            <Select.Item value="item 3">
              Which of you, if your son asks for bread, will give him a stone?
            </Select.Item>
          </Select>

          <Title type="h2">Not full width items</Title>
          <Select>
            <Select.Item value="item 1">
              Ask and it will be given to you; seek and you will find; knock and the door
              will be opened to you.
            </Select.Item>
            <Select.Item value="item 2">
              For everyone who asks receives; the one who seeks finds; and to the one who
              knocks, the door will be opened.
            </Select.Item>
            <Select.Item value="item 3">
              Which of you, if your son asks for bread, will give him a stone?
            </Select.Item>
          </Select>
        </Panel>
      </Container>
    );
  },
  tags: ['form-field', 'select', 'autodocs'],
};

export const MaxHeight = {
  args: {},
  render: () => {
    return (
      <Container fillWidth>
        <Panel>
          <Title type="h2">Select with max height</Title>
          <Select maxHeight="200px">
            <Select.Item value="item 1">Fish</Select.Item>
            <Select.Item value="item 2">Bread</Select.Item>
            <Select.Item value="item 3">Rocks</Select.Item>
            <Select.Item value="item 4">Snakes</Select.Item>
            <Select.Item value="item 5">Boats</Select.Item>
            <Select.Item value="item 6">Sandals</Select.Item>
            <Select.Item value="item 7">Potatoes</Select.Item>
            <Select.Item value="item 8">Rabbits</Select.Item>
          </Select>
        </Panel>
      </Container>
    );
  },
  tags: ['form-field', 'select', 'autodocs'],
};

export const NoOptions: StoryObj<typeof Select> = {
  // prettier-ignore
  args: { label: 'Label', customText: 'No results for "{search}"' },
  render: ({ customText, ...rest }) => (
    <Container
      fillWidth
      gap="sm"
    >
      <Panel width="400px">
        <Title type="h2">No options available</Title>
        <Text>
          When no options are available, the component will display a custom text.
        </Text>
        <Select
          options={[]}
          customText="No results match your filters. Try adjusting them."
          {...rest}
        />
      </Panel>
      <Panel width="400px">
        <Title type="h2">Search returns no results</Title>
        <Text>
          When the search returns no results, the component will display a custom text.
        </Text>
        <Select
          options={[
            { value: 'apple', label: 'Apple' },
            { value: 'banana', label: 'Banana' },
            { value: 'cherry', label: 'Cherry' },
          ]}
          customText={customText}
          {...rest}
        />
      </Panel>
    </Container>
  ),
};

interface NoOptionsComponentProps {
  onNewQueryClick: () => void;
}

const NoOptionsComponent = ({
  onNewQueryClick,
}: NoOptionsComponentProps): ReactElement => {
  return (
    <Container
      alignItems="start"
      color="default"
      fillWidth
      orientation="vertical"
      padding="lg"
      gap="md"
    >
      <Container
        alignItems="start"
        color="default"
        fillWidth
        orientation="vertical"
        gap="sm"
      >
        <Title
          type="h3"
          size="xl"
        >
          No options have been found
        </Title>
      </Container>
      <Button
        type="primary"
        iconLeft="plus"
        onClick={onNewQueryClick}
      >
        New option
      </Button>
    </Container>
  );
};

export const NoOptionCustomNode: StoryObj<typeof Select> = {
  // prettier-ignore
  args: { },
  render: () => (
    <Container
      fillWidth
      gap="sm"
    >
      <Panel width="400px">
        <Title type="h2">Search returns no results</Title>
        <Text>
          When the search returns no results, the component will display a custom text.
        </Text>
        <Select
          placeholder="Select an option"
          showSearch={false}
          noAvailableOptions={({ close }) => (
            <NoOptionsComponent
              onNewQueryClick={() => {
                close();
              }}
            />
          )}
        />
      </Panel>
    </Container>
  ),
};
