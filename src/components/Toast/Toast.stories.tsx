import { Meta, StoryObj } from "@storybook/react-vite";
import { Button, useToast, ToastProps, Toast } from "..";

const meta: Meta<typeof Toast> = {
  component: Toast,
  title: "Display/Toast",
  tags: ["form-field", "toast", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof Toast>;

const ToastTrigger = (props: ToastProps) => {
  const { createToast } = useToast();
  return (
    <Button
      onClick={() => {
        createToast(props);
      }}
    >
      Create Toast
    </Button>
  );
};

export const Playground: Story = {
  args: {
    description: "description",
    title: "title",
  },
  render: args => <ToastTrigger {...args} />,
};
