import { FileTabs as CUIFileTabs } from "./FileTabs";

const FileTabs = () => {
  return (
    <CUIFileTabs onReorderTab={props => console.log(props)}>
      <CUIFileTabs.Tab value="a1">Tab 1</CUIFileTabs.Tab>
      <CUIFileTabs.Tab value="a2">Tab 2</CUIFileTabs.Tab>
      <CUIFileTabs.Tab value="a3">Tab 3</CUIFileTabs.Tab>
      <CUIFileTabs.Tab value="a4">Tab 4</CUIFileTabs.Tab>
      <CUIFileTabs.Tab value="a5">Tab 5</CUIFileTabs.Tab>
      <CUIFileTabs.Tab value="a6">Tab 6</CUIFileTabs.Tab>
      <CUIFileTabs.Tab value="a7">Tab 7</CUIFileTabs.Tab>
      <CUIFileTabs.Tab value="a8">Tab 8</CUIFileTabs.Tab>
      <CUIFileTabs.Tab value="a9">Tab 9</CUIFileTabs.Tab>
      <CUIFileTabs.Tab value="a10">Tab 10</CUIFileTabs.Tab>
    </CUIFileTabs>
  );
};
export default {
  component: FileTabs,
  title: "Display/FileTabs",
  tags: ["tabs", "file-tabs", "autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    open: { control: "inline-radio", options: [undefined, true, false] },
    defaultOpen: { control: "boolean" },
    showArrow: { control: "boolean" },
    side: { control: "select", options: ["top", "right", "left", "bottom"] },
  },
};

export const Playground = {
  args: {
    side: "bottom",
  },
};
