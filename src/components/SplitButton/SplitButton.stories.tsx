import { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import { SplitButton } from "./SplitButton";
import { GridCenter } from "../FormField/commonElement";

interface Props extends DropdownMenuProps {
  disabled?: boolean;
  side: "top" | "right" | "left" | "bottom";
}
const DropdownExample = ({ disabled, side, ...props }: Props) => {
  return (
    <GridCenter>
      <SplitButton {...props}>
        <SplitButton.Trigger disabled={disabled}>
          <div>Dropdown Trigger</div>
        </SplitButton.Trigger>
        <SplitButton.Content side={side}>
          <Dropdown.Group>
            <Dropdown.Item>Content0</Dropdown.Item>
          </Dropdown.Group>
          <Dropdown.Item>Content1 long text content</Dropdown.Item>
          <Dropdown.Sub>
            <Dropdown.Trigger sub>Hover over</Dropdown.Trigger>
            <Dropdown.Content sub>
              <Dropdown.Item>SubContent0</Dropdown.Item>
              <Dropdown.Item>SubContent1</Dropdown.Item>
              <Dropdown.Item>SubContent0</Dropdown.Item>
              <Dropdown.Item>SubContent1</Dropdown.Item>
              <Dropdown.Item>SubContent0</Dropdown.Item>
              <Dropdown.Item>SubContent1</Dropdown.Item>
              <Dropdown.Item>SubContent0</Dropdown.Item>
              <Dropdown.Item>SubContent1</Dropdown.Item>
              <Dropdown.Item>SubContent0</Dropdown.Item>
              <Dropdown.Item>SubContent1</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown.Sub>
          <Dropdown.Item>Content2</Dropdown.Item>
          <Dropdown.Item disabled>Content3</Dropdown.Item>
        </SplitButton.Content>
      </SplitButton>
    </GridCenter>
  );
};
export default {
  component: DropdownExample,
  title: "Display/Dropdown",
  tags: ["form-field", "dropdown", "autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    open: { control: "inline-radio", options: [undefined, true, false] },
    defaultOpen: { control: "boolean" },
    side: { control: "select", options: ["top", "bottom"] },
  },
};

export const Playground = {
  args: {
    side: "bottom",
  },
};
