import { ContextMenuProps } from "@radix-ui/react-context-menu";
import { ContextMenu } from "./ContextMenu";

interface Props extends ContextMenuProps {
  disabled?: boolean;
  showArrow?: boolean;
}
const ContextMenuExample = ({ showArrow, disabled, ...props }: Props) => {
  return (
    <ContextMenu {...props}>
      <ContextMenu.Trigger disabled={disabled}>
        <div>ContextMenu Trigger</div>
      </ContextMenu.Trigger>
      <ContextMenu.Content showArrow={showArrow}>
        <ContextMenu.Group>
          <ContextMenu.Item>Content0</ContextMenu.Item>
        </ContextMenu.Group>
        <ContextMenu.Item>Content1 long text content</ContextMenu.Item>
        <ContextMenu.Sub>
          <ContextMenu.SubTrigger>Hover over</ContextMenu.SubTrigger>
          <ContextMenu.Content sub>
            <ContextMenu.Item>SubContent0</ContextMenu.Item>
            <ContextMenu.Item>SubContent1</ContextMenu.Item>
            <ContextMenu.Item>SubContent0</ContextMenu.Item>
            <ContextMenu.Item>SubContent1</ContextMenu.Item>
            <ContextMenu.Item>SubContent0</ContextMenu.Item>
            <ContextMenu.Item>SubContent1</ContextMenu.Item>
            <ContextMenu.Item>SubContent0</ContextMenu.Item>
            <ContextMenu.Item>SubContent1</ContextMenu.Item>
            <ContextMenu.Item>SubContent0</ContextMenu.Item>
            <ContextMenu.Item>SubContent1</ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Sub>
        <ContextMenu.Item>Content2</ContextMenu.Item>
        <ContextMenu.Item disabled>Content3</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu>
  );
};
export default {
  component: ContextMenuExample,
  title: "Display/ContextMenu",
  tags: ["form-field", "dropdown", "autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    showArrow: { control: "boolean" },
  },
};

export const Playground = {
  args: {},
};
