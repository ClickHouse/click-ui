import { Meta, StoryObj } from "@storybook/react-vite";
import { MiddleTruncator } from "./index";

const meta: Meta<typeof MiddleTruncator> = {
  component: MiddleTruncator,
  title: "Display/MiddleTruncator",
  tags: ["autodocs"],
  argTypes: {
    text: {
      control: { type: "text" },
    },
    trailingChars: {
      control: { type: "number" },
    },
  },
  decorators: [
    Story => (
      <div style={{ width: "200px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof MiddleTruncator>;

export const Playground: Story = {
  args: {
    text: "console.clickhouse.cloud_Archive.01-01-1975.lorem-ipsum-a-very-long-filename-01.csv",
    trailingChars: 10,
  },
};
