import { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "@/components/Select/SingleSelect";
import { selectOptions } from "@/components/Select/selectOptions";
import { Container } from "@/components/Container/Container";
import { Panel } from "@/components/Panel/Panel";
import { Title } from "@/components/Typography/Title/Title";

const meta: Meta<typeof Select> = {
  component: Select,
  title: "Forms/Select",
  tags: ["form-field", "select", "autodocs"],
};

export default meta;

export const OptionsAsChildren: StoryObj<typeof Select> = {
  args: {
    label: "Label",
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

export const OptionsAsProp: StoryObj<typeof Select> = {
  args: {
    label: "Label",
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
  tags: ["form-field", "select", "autodocs"],
};
