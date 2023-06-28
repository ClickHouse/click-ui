import * as RadixTabs from "@radix-ui/react-tabs";
import styled from "styled-components";

export type TabProps = {
  label: string;
  value: string;
  children?: React.ReactNode;
};

export type TabsProps = {
  defaultValue?: string;
  ariaLabel?: string;
  onValueChange?: (s: string) => unknown;
  children: React.ReactElement<TabProps>[] | React.ReactElement<TabProps>;
};

const Trigger = styled(RadixTabs.Trigger)`
  border: none;
  padding: ${props =>
    `${props.theme.click.tabs.space.y} ${props.theme.click.tabs.space.x}`};

  border-top-left-radius: ${props => props.theme.click.tabs.radii.all};
  border-top-right-radius: ${props => props.theme.click.tabs.radii.all};

  border-bottom: ${props => props.theme.click.tabs.basic.stroke.default};
  background-color: ${props =>
    props.theme.click.tabs.basic.color.background.default};
  color: ${props => props.theme.click.tabs.basic.color.text.default};
  font: ${props => props.theme.click.tabs.typography.label.default};

  &:hover {
    border-bottom: ${props => props.theme.click.tabs.basic.stroke.hover};
    background-color: ${props =>
      props.theme.click.tabs.basic.color.background.hover};
    color: ${props => props.theme.click.tabs.basic.color.text.hover};
    font: ${props => props.theme.click.tabs.typography.label.hover};
  }

  &[data-state="active"] {
    border-bottom: ${props => props.theme.click.tabs.basic.stroke.active};
    background-color: ${props =>
      props.theme.click.tabs.basic.color.background.selected};
    color: ${props => props.theme.click.tabs.basic.color.text.selected};
    font: ${props => props.theme.click.tabs.typography.label.active};
  }
`;

const Content = styled(RadixTabs.Content)``;

const TriggersList = styled(RadixTabs.List)`
  border: ${props => props.theme.click.tabs.basic.stroke.default};
`;

const Tab = ({ value, children }: TabProps) => (
  <Content value={value}>{children}</Content>
);

const Tabs = ({
  defaultValue,
  ariaLabel,
  children,
  onValueChange,
}: TabsProps) => {
  const newChildren = Array.isArray(children) ? children : [children];

  const triggersProps = newChildren
    .filter(item => item.type === Tab)
    .map(item => ({
      ...item.props,
      label: item.props.label,
      value: item.props.value,
    }));

  return (
    <RadixTabs.Root defaultValue={defaultValue} onValueChange={onValueChange}>
      <TriggersList aria-label={ariaLabel}>
        {triggersProps.map(({ value, label, ...delegated }) => (
          <Trigger {...delegated} value={value} key={value}>
            {label}
          </Trigger>
        ))}
      </TriggersList>
      {children}
    </RadixTabs.Root>
  );
};

export { Tabs, Tab };
