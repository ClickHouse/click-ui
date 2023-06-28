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

  border-bottom: ${props =>
    `${props.theme.border.width[2]} solid ${props.theme.click.tabs.basic.color.accent.hover}`};
  background-color: ${props =>
    props.theme.click.tabs.basic.color.background.default};
  color: ${props => props.theme.click.tabs.basic.color.text.default};
  font: ${props => props.theme.click.tabs.typography.label.default};

  &:hover {
    background-color: ${props =>
      props.theme.click.tabs.basic.color.background.hover};
    color: ${props => props.theme.click.tabs.basic.color.text.hover};
    font: ${props => props.theme.click.tabs.typography.label.hover};
    border-bottom: ${props =>
      `${props.theme.border.width[2]} solid ${props.theme.click.tabs.basic.color.accent.selected}`};
  }

  &[data-state="active"] {
    background-color: ${props =>
      props.theme.click.tabs.basic.color.background.selected};
    color: ${props => props.theme.click.tabs.basic.color.text.selected};
    font: ${props => props.theme.click.tabs.typography.label.active};
    border-bottom: ${props =>
      `${props.theme.border.width[2]} solid ${props.theme.click.tabs.basic.color.accent.selected}`};
  }
`;

const Content = styled(RadixTabs.Content)``;

const Tab = ({ value, children }: TabProps) => (
  <Content value={value}>{children}</Content>
);

const Tabs = ({
  defaultValue,
  ariaLabel,
  children,
  onValueChange,
  ...delegated
}: TabsProps) => {
  const newChildren = Array.isArray(children) ? children : [children];

  console.log(children);
  const triggersProps = newChildren
    .filter(item => typeof item.type !== "string" && item.type.name === "Tab")
    .map(item => ({
      label: item.props.label,
      value: item.props.value,
    }));

  return (
    <RadixTabs.Root defaultValue={defaultValue} onValueChange={onValueChange}>
      <RadixTabs.List aria-label={ariaLabel}>
        {triggersProps.map(({ value, label }) => (
          <Trigger value={value} key={value} {...delegated}>
            {label}
          </Trigger>
        ))}
      </RadixTabs.List>
      {children}
    </RadixTabs.Root>
  );
};

export { Tabs, Tab };
