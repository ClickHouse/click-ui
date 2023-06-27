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
  children: React.ReactElement<TabProps>[] | React.ReactElement<TabProps>;
};

const Trigger = styled(RadixTabs.Trigger)`
  &:hover {
    color: deeppink;
  }
  &[data-state="active"] {
    color: deeppink;
    box-shadow: inset 0 -1px 0 0 darkmagenta, 0 1px 0 0 darkblue;
  }
  &:focus {
    position: relative;
    box-shadow: 0 0 0 2px black;
  }
`;

const Content = styled(RadixTabs.Content)``;

const Tab = ({ value, children }: TabProps) => (
  <Content value={value}>{children}</Content>
);

const Tabs = ({ defaultValue, ariaLabel, children }: TabsProps) => {
  const newChildren = Array.isArray(children) ? children : [children];

  const triggersProps = newChildren
    .filter(item => typeof item.type !== "string" && item.type.name === "Tab")
    .map(item => ({
      label: item.props.label,
      value: item.props.value,
    }));

  return (
    <RadixTabs.Root defaultValue={defaultValue}>
      <RadixTabs.List aria-label={ariaLabel}>
        {triggersProps.map(({ value, label }) => (
          <Trigger value={value} key={value}>
            {label}
          </Trigger>
        ))}
      </RadixTabs.List>
      {children}
    </RadixTabs.Root>
  );
};

export { Tabs, Tab };
