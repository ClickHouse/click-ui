import React, { useEffect, useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
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

interface FileTabsExampleProps {
  selected: number;
  status: FileTabStatusType;
}

const FileTabsExample = ({ selected: selectedProp, status }: FileTabsExampleProps) => {
  const [selected, setSelected] = useState<number>(selectedProp);
  useEffect(() => {
    setSelected(selectedProp);
  }, [selectedProp]);
  const [tabs, setTabs] = useState(options);

  return (
    <div style={{ display: "flex", height: "4rem" }}>
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

const meta: Meta<typeof FileTabsExample> = {
  component: FileTabsExample,
  subcomponents: {
    "FileTabs.Tab": CUIFileTabs.Tab as React.ComponentType<unknown>,
  },
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

export default meta;

type Story = StoryObj<typeof FileTabsExample>;

export const Playground: Story = {
  args: {
    selected: 0,
    status: "neutral",
  },
};

export const Variations: Story = {
  render: () => (
    <div
      style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "2rem" }}
    >
      <section>
        <h3>Default File Tabs</h3>
        <div style={{ display: "flex", height: "4rem" }}>
          <FileTabElement icon="home" />
          <CUIFileTabs
            onReorderTab={() => null}
            onClose={() => {}}
            onSelect={() => {}}
            selectedIndex={0}
          >
            <CUIFileTabs.Tab
              index={0}
              icon="code-in-square"
              text="Tab 1 - file.sql"
            />
            <CUIFileTabs.Tab
              index={1}
              icon="code-in-square"
              text="Tab 2 - query.sql"
            />
            <CUIFileTabs.Tab
              index={2}
              icon="code-in-square"
              text="Tab 3 - test.sql"
            />
          </CUIFileTabs>
        </div>
      </section>

      <section>
        <h3>Selected Tab (Second Tab)</h3>
        <div style={{ display: "flex", height: "4rem" }}>
          <FileTabElement icon="home" />
          <CUIFileTabs
            onReorderTab={() => null}
            onClose={() => {}}
            onSelect={() => {}}
            selectedIndex={1}
          >
            <CUIFileTabs.Tab
              index={0}
              icon="code-in-square"
              text="Tab 1 - file.sql"
            />
            <CUIFileTabs.Tab
              index={1}
              icon="code-in-square"
              text="Tab 2 - query.sql"
            />
            <CUIFileTabs.Tab
              index={2}
              icon="code-in-square"
              text="Tab 3 - test.sql"
            />
          </CUIFileTabs>
        </div>
      </section>

      <section>
        <h3>Status Types</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", height: "4rem" }}>
            <FileTabElement icon="home" />
            <CUIFileTabs
              onReorderTab={() => null}
              onClose={() => {}}
              onSelect={() => {}}
              selectedIndex={0}
            >
              <CUIFileTabs.Tab
                index={0}
                icon="code-in-square"
                status="success"
                text="Success Status"
              />
              <CUIFileTabs.Tab
                index={1}
                icon="code-in-square"
                status="warning"
                text="Warning Status"
              />
              <CUIFileTabs.Tab
                index={2}
                icon="code-in-square"
                status="danger"
                text="Danger Status"
              />
            </CUIFileTabs>
          </div>
          <div style={{ display: "flex", height: "4rem" }}>
            <FileTabElement icon="home" />
            <CUIFileTabs
              onReorderTab={() => null}
              onClose={() => {}}
              onSelect={() => {}}
              selectedIndex={0}
            >
              <CUIFileTabs.Tab
                index={0}
                icon="code-in-square"
                status="info"
                text="Info Status"
              />
              <CUIFileTabs.Tab
                index={1}
                icon="code-in-square"
                status="neutral"
                text="Neutral Status"
              />
              <CUIFileTabs.Tab
                index={2}
                icon="code-in-square"
                text="No Status"
              />
            </CUIFileTabs>
          </div>
        </div>
      </section>

      <section>
        <h3>Preview Mode</h3>
        <div style={{ display: "flex", height: "4rem" }}>
          <FileTabElement icon="home" />
          <CUIFileTabs
            onReorderTab={() => null}
            onClose={() => {}}
            onSelect={() => {}}
            selectedIndex={0}
          >
            <CUIFileTabs.Tab
              index={0}
              icon="code-in-square"
              text="Regular Tab"
            />
            <CUIFileTabs.Tab
              index={1}
              icon="code-in-square"
              text="Preview Tab"
              preview
            />
            <CUIFileTabs.Tab
              index={2}
              icon="code-in-square"
              text="Another Tab"
            />
          </CUIFileTabs>
        </div>
      </section>

      <section>
        <h3>Many Tabs</h3>
        <div style={{ display: "flex", height: "4rem" }}>
          <FileTabElement icon="home" />
          <CUIFileTabs
            onReorderTab={() => null}
            onClose={() => {}}
            onSelect={() => {}}
            selectedIndex={3}
          >
            <CUIFileTabs.Tab
              index={0}
              icon="code-in-square"
              text="Tab 1 - file1.sql"
            />
            <CUIFileTabs.Tab
              index={1}
              icon="code-in-square"
              text="Tab 2 - file2.sql"
            />
            <CUIFileTabs.Tab
              index={2}
              icon="code-in-square"
              text="Tab 3 - file3.sql"
            />
            <CUIFileTabs.Tab
              index={3}
              icon="code-in-square"
              text="Tab 4 - file4.sql"
            />
            <CUIFileTabs.Tab
              index={4}
              icon="code-in-square"
              text="Tab 5 - file5.sql"
            />
            <CUIFileTabs.Tab
              index={5}
              icon="code-in-square"
              text="Tab 6 - file6.sql"
            />
          </CUIFileTabs>
        </div>
      </section>

      <section>
        <h3>Fixed Tab Element Variations</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", height: "4rem" }}>
            <FileTabElement icon="home" />
            <FileTabElement
              icon="code"
              active
            />
            <FileTabElement icon="table" />
          </div>
          <div style={{ display: "flex", height: "4rem" }}>
            <FileTabElement icon="home">Home</FileTabElement>
            <FileTabElement
              icon="code"
              active
            >
              Code
            </FileTabElement>
            <FileTabElement icon="table">Tables</FileTabElement>
          </div>
          <div style={{ display: "flex", height: "4rem" }}>
            <FileTabElement
              icon="home"
              preview
            />
            <FileTabElement
              icon="code"
              active
              preview
            >
              Preview Mode
            </FileTabElement>
          </div>
        </div>
      </section>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: [".cuiTabElement"],
      focus: [".cuiTabElement"],
    },
    chromatic: {
      delay: 300,
    },
  },
};
