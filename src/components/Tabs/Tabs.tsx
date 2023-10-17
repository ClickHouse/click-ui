import * as RadixTabs from "@radix-ui/react-tabs";
import styled from "styled-components";

export interface TabsProps extends RadixTabs.TabsProps {
  ariaLabel?: string;
}

const Trigger = styled(RadixTabs.Trigger)`
  border: none;
  padding: ${props =>
    `${props.theme.click.tabs.space.y} ${props.theme.click.tabs.space.x}`};

  border-top-left-radius: ${props => props.theme.click.tabs.radii.all};
  border-top-right-radius: ${props => props.theme.click.tabs.radii.all};

  border-bottom: 2px solid ${props => props.theme.click.tabs.basic.stroke.default};
  background-color: ${props => props.theme.click.tabs.basic.color.background.default};
  color: ${props => props.theme.click.tabs.basic.color.text.default};
  font: ${props => props.theme.click.tabs.typography.label.default};
  cursor: pointer;

  &[data-state="active"] {
    border-bottom: 2px solid ${props => props.theme.click.tabs.basic.color.stroke.active};
    background-color: ${props => props.theme.click.tabs.basic.color.background.active};
    color: ${props => props.theme.click.tabs.basic.color.text.active};
    font: ${props => props.theme.click.tabs.typography.label.active};
    &:hover {
      font: ${props => props.theme.click.tabs.typography.label.active};
    }
  }

  &:hover {
    border-bottom: 2px solid ${props => props.theme.click.tabs.basic.stroke.hover};
    background-color: ${props => props.theme.click.tabs.basic.color.background.hover};
    color: ${props => props.theme.click.tabs.basic.color.text.hover};
    font: ${props => props.theme.click.tabs.typography.label.hover};
  }

  &:hover[data-state="active"] {
    border-bottom: 2px solid ${props => props.theme.click.tabs.basic.stroke.active};
  }
`;

const Content = styled(RadixTabs.Content)``;

const TriggersList = styled(RadixTabs.List)`
  border-bottom: 1px solid ${props => props.theme.click.global.color.stroke.default};
`;

const Tabs = ({
  defaultValue,
  children,
  ariaLabel,
  onValueChange,
  ...delegated
}: TabsProps) => {
  return (
    <RadixTabs.Root
      aria-label={ariaLabel}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      {...delegated}
    >
      {children}
    </RadixTabs.Root>
  );
};

Tabs.TriggersList = TriggersList;
Tabs.Trigger = Trigger;
Tabs.Content = Content;

export { Tabs };
