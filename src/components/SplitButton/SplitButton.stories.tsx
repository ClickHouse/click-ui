import { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import { SplitButton as SplitButtonMenu } from "./SplitButton";
import { GridCenter } from "../FormField/commonElement";

interface Props extends DropdownMenuProps {
  disabled?: boolean;
  side: "top" | "bottom";
}
const SplitButton = ({ disabled, side, ...props }: Props) => {
  return (
    <GridCenter>
      <SplitButtonMenu {...props}>
        <SplitButtonMenu.Trigger disabled={disabled}>
          <div>Dropdown Trigger</div>
        </SplitButtonMenu.Trigger>
        <SplitButtonMenu.Content side={side}>
          <SplitButtonMenu.Group>
            <SplitButtonMenu.Item>Content0</SplitButtonMenu.Item>
          </SplitButtonMenu.Group>
          <SplitButtonMenu.Item>Content1 long text content</SplitButtonMenu.Item>
          <SplitButtonMenu.Sub>
            <SplitButtonMenu.ContentTrigger>Hover over</SplitButtonMenu.ContentTrigger>
            <SplitButtonMenu.Content sub>
              <SplitButtonMenu.Item>SubContent0</SplitButtonMenu.Item>
              <SplitButtonMenu.Item>SubContent1</SplitButtonMenu.Item>
              <SplitButtonMenu.Item>SubContent0</SplitButtonMenu.Item>
              <SplitButtonMenu.Item>SubContent1</SplitButtonMenu.Item>
              <SplitButtonMenu.Item>SubContent0</SplitButtonMenu.Item>
              <SplitButtonMenu.Item>SubContent1</SplitButtonMenu.Item>
              <SplitButtonMenu.Item>SubContent0</SplitButtonMenu.Item>
              <SplitButtonMenu.Item>SubContent1</SplitButtonMenu.Item>
              <SplitButtonMenu.Item>SubContent0</SplitButtonMenu.Item>
              <SplitButtonMenu.Item>SubContent1</SplitButtonMenu.Item>
            </SplitButtonMenu.Content>
          </SplitButtonMenu.Sub>
          <SplitButtonMenu.Item>Content2</SplitButtonMenu.Item>
          <SplitButtonMenu.Item disabled>Content3</SplitButtonMenu.Item>
        </SplitButtonMenu.Content>
      </SplitButtonMenu>
    </GridCenter>
  );
};
export default {
  component: SplitButton,
  title: "Buttons/SplitButton",
  tags: ["split-button", "autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    type: { control: "inline-radio", options: ["primary"] },
    side: { control: "select", options: ["top", "bottom"] },
  },
};

export const Playground = {
  args: {
    side: "bottom",
    type: "primary",
  },
};
