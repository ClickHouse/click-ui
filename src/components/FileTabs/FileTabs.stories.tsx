import { useEffect, useState } from "react";
import { FileTabs as CUIFileTabs, FileTabElement, FileTabStatusType } from "./FileTabs";

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
  selected: number;
  status: FileTabStatusType;
}) => {
  const [selected, setSelected] = useState<number>(selectedProp);
  useEffect(() => {
    setSelected(selectedProp);
  }, [selectedProp]);
  const [tabs, setTabs] = useState(options);

  return (
    <div style={{ display: "flex" }}>
      <FileTabElement icon="home" />
      <CUIFileTabs
        onReorderTab={() => null}
        onClose={(index: number) => {
          setTabs(tabs => {
            tabs.splice(index, 1);
            return [...tabs];
          });
        }}
        onSelect={(index: number) => setSelected(index)}
        selectedIndex={selected}
      >
        {tabs.map((option, index) => (
          <CUIFileTabs.Tab
            index={index}
            key={`${option}-${index}`}
            icon="code-in-square"
            status={index === 0 ? status : undefined}
            text={`Tab ${index} value-${option}`}
          />
        ))}
      </CUIFileTabs>
    </div>
  );
};
export default {
  component: FileTabs,
  title: "Display/FileTabs",
  tags: ["tabs", "file-tabs", "autodocs"],
  argTypes: {
    selected: { control: "select", options: options.map((_, index) => index) },
    status: {
      control: "radio",
      options: ["success", "warning", "danger", "neutral", "info"],
    },
  },
};

export const Playground = {
  args: {},
};
