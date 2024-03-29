import { Button, useToast, ToastProps } from "@/components";
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
const ToastExample = (props: ToastProps) => {
  return <ToastTrigger {...props} />;
};
export default {
  component: ToastExample,
  title: "Display/Toast",
  tags: ["form-field", "toast", "autodocs"],
  argTypes: {
    type: {
      control: "inline-radio",
      options: [undefined, "default", "danger", "warning", "success"],
    },
  },
};

export const Playground = {
  args: {
    description: "description",
    title: "title",
  },
};
