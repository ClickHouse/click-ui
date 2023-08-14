import { useEffect, useState } from "react";
import { Icon } from "..";
import { FileTabs as CUIFileTabs, StatusType } from "./FileTabs";

const options = [
  "a1",
  "a2",
  "a3",
  "a4",
  "a5",
  "a6",
  "a7",
  "a8",
  "a9",
  "a10",
  "a11",
  "a12",
];

const FileTabs = ({
  selected: selectedProp,
  status,
}: {
  selected: string;
  status: StatusType;
}) => {
  const [selected, setSelected] = useState(selectedProp);
  useEffect(() => {
    setSelected(selectedProp);
  }, [selectedProp]);
  const [tabs, setTabs] = useState(options);

  return (
    <CUIFileTabs
      onReorderTab={props => null}
      onClose={(value: string, index: number) => {
        setTabs(tabs => {
          tabs.splice(index, 1);
          return [...tabs];
        });
      }}
      onSelect={(value: string) => setSelected(value)}
      selected={selected}
    >
      {tabs.map((option, index) => (
        <CUIFileTabs.Tab
          value={option}
          key={`${option}-${index}`}
          icon="code-in-square"
          status={index === 0 ? status : undefined}
          text={`Tab ${index} value-${option}`}
        />
      ))}
    </CUIFileTabs>
  );
};
export default {
  component: FileTabs,
  title: "Display/FileTabs",
  tags: ["tabs", "file-tabs", "autodocs"],
  argTypes: {
    selected: { control: "select", options },
    status: {
      control: "radio",
      options: ["success", "warning", "danger", "neutral", "info"],
    },
  },
};

export const Playground = {
  args: {},
};
