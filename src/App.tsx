import { useRef, useState } from "react";

import "@/styles/globals.css";
import "./styles/variables.css";
import "./styles/variables.dark.css";

import styles from "./App.module.css";
import { ThemeName } from "./theme";
import {
  Accordion,
  Alert,
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  ClickUIProvider,
  CardSecondary,
  Checkbox,
  DangerAlert,
  Icon,
  IconButton,
  InfoAlert,
  SidebarCollapsibleItem,
  SidebarNavigationItem,
  Spacer,
  SuccessAlert,
  Switch,
  Tabs,
  WarningAlert,
  CardPrimary,
  Flyout,
  Select,
  Text,
  EllipsisContent,
  Table,
  TableRowType,
} from "@/components";
import { Dialog } from "@/components/Dialog/Dialog";
import ConfirmationDialog from "@/components/ConfirmationDialog/ConfirmationDialog";

const headers = [{ label: "Company" }, { label: "Contact" }, { label: "Country" }];
const App = () => {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>("dark");
  const [selectedButton, setSelectedButton] = useState("center1");
  const [checked, setChecked] = useState(false);
  const [disabled] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const [rows, setRows] = useState<Array<TableRowType>>([
    {
      id: "row-1",
      items: [
        { label: "Alfreds Futterkiste" },
        { label: "Maria Anders" },
        { label: "Germany" },
      ],
    },
    {
      id: "row-2",
      items: [
        { label: "Centro comercial Moctezuma" },
        { label: "Francisco Chang" },
        { label: "Mexico" },
      ],
    },
    {
      id: "row-3",
      isDisabled: true,
      items: [
        { label: "Centro comercial Moctezuma" },
        { label: "Francisco Chang" },
        { label: "Mexico" },
      ],
    },
  ]);

  const onTableDelete = (row: TableRowType, index: number) => {
    setRows(rows => {
      rows[index] = row;
      return [...rows];
    });
  };

  return (
    <div style={{ padding: "6rem" }}>
      <ClickUIProvider
        theme={currentTheme}
        config={{ tooltip: { delayDuration: 0 } }}
      >
        <div className={styles.flexWrap}>
          <IconButton
            icon="user"
            size="xs"
            onClick={() => console.log("click")}
          />
          <IconButton
            icon="user"
            size="xs"
            onClick={() => console.log("click")}
          />
          <IconButton
            icon="user"
            size="xs"
            disabled
            onClick={() => console.log("click")}
          />
        </div>
        <div className={styles.flexWrap}>
          <IconButton
            icon="user"
            size="sm"
            onClick={() => console.log("click")}
          />
          <IconButton
            icon="user"
            size="sm"
            onClick={() => console.log("click")}
          />
          <IconButton
            icon="user"
            size="sm"
            disabled
            onClick={() => console.log("click")}
          />
        </div>
        <div className={styles.flexWrap}>
          <IconButton
            icon="user"
            onClick={() => console.log("click")}
          />
          <IconButton
            icon="user"
            onClick={() => console.log("click")}
          />
          <IconButton
            disabled
            icon="user"
            onClick={() => console.log("click")}
          />
        </div>
        <div
          ref={ref}
          style={{ position: "relative", minHeight: 200 }}
        >
          <Text>Flyout</Text>
          <div className={styles.flexWrap}>
            <Flyout>
              <Flyout.Trigger>
                <Button
                  iconLeft="user"
                  onClick={() => console.log("click")}
                >
                  Flyout Relative
                </Button>
              </Flyout.Trigger>
              <Flyout.Content container={ref.current}>
                <Flyout.Header
                  title="test1"
                  description="test2"
                />
                <Flyout.Body>
                  Flyout Text
                  <Select>
                    <Select.Item value="test">test</Select.Item>
                    <Select.Item value="test2">test2</Select.Item>
                    <Select.Item value="test3">test3</Select.Item>
                    <Select.Item value="test4">test4</Select.Item>
                    <Select.Item value="test5">test5</Select.Item>
                    <Select.Item value="test6">test6</Select.Item>
                    <Select.Item value="test7">test7</Select.Item>
                    <Select.Item value="test8">test8</Select.Item>
                  </Select>
                </Flyout.Body>
                <Flyout.Footer>
                  <Button type="primary">Primary Button</Button>
                </Flyout.Footer>
              </Flyout.Content>
            </Flyout>
            <Flyout>
              <Flyout.Trigger>
                <Button
                  iconLeft="user"
                  onClick={() => console.log("click")}
                >
                  Flyout Absolute
                </Button>
              </Flyout.Trigger>
              <Flyout.Content
                container={ref.current}
                strategy="absolute"
              >
                <Flyout.Header
                  title="test1"
                  description="test2"
                />
                <Flyout.Body>
                  Flyout Text
                  <Select>
                    <Select.Item value="test">test</Select.Item>
                    <Select.Item value="test2">test2</Select.Item>
                    <Select.Item value="test3">test3</Select.Item>
                    <Select.Item value="test4">test4</Select.Item>
                    <Select.Item value="test5">test5</Select.Item>
                    <Select.Item value="test6">test6</Select.Item>
                    <Select.Item value="test7">test7</Select.Item>
                    <Select.Item value="test8">test8</Select.Item>
                  </Select>
                </Flyout.Body>
                <Flyout.Footer>
                  <Button type="primary">Primary Button</Button>
                </Flyout.Footer>
              </Flyout.Content>
            </Flyout>
            <Flyout>
              <Flyout.Trigger>
                <Button
                  iconLeft="user"
                  onClick={() => console.log("click")}
                >
                  Flyout Fixed
                </Button>
              </Flyout.Trigger>
              <Flyout.Content
                container={ref.current}
                strategy="fixed"
              >
                <Flyout.Header
                  title="test1"
                  description="test2"
                />
                <Flyout.Body>
                  Flyout Text
                  <Select>
                    <Select.Item value="test">test</Select.Item>
                    <Select.Item value="test2">test2</Select.Item>
                    <Select.Item value="test3">test3</Select.Item>
                    <Select.Item value="test4">test4</Select.Item>
                    <Select.Item value="test5">test5</Select.Item>
                    <Select.Item value="test6">test6</Select.Item>
                    <Select.Item value="test7">test7</Select.Item>
                    <Select.Item value="test8">test8</Select.Item>
                  </Select>
                </Flyout.Body>
                <Flyout.Footer>
                  <Button type="primary">Primary Button</Button>
                </Flyout.Footer>
              </Flyout.Content>
            </Flyout>
          </div>
        </div>
        <div className={styles.flexWrap}>
          <Badge text={"default"}></Badge>
          <Badge
            text={"success"}
            state={"success"}
          ></Badge>
          <Badge
            text={"neutral"}
            state={"neutral"}
          ></Badge>
          <Badge
            text={"danger"}
            state={"danger"}
          ></Badge>
          <Badge
            text={"disabled"}
            state={"disabled"}
          ></Badge>
        </div>
        <div style={{ display: "flex", padding: "1rem" }}>
          <CardSecondary
            title="Card title"
            icon="building"
            description="This is a card description"
            badgeText="experiment"
            infoText="Read More"
            infoUrl="#"
          />

          <CardSecondary
            title="Card title"
            icon="building"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut sagittis neque. Quisque ut nunc tortor. Donec ut faucibus neque. In vel suscipit nunc. Praesent odio velit, sollicitudin ac tempor a, varius vitae turpis. Donec mauris risus, dapibus a justo eu, ultricies ullamcorper lacus. Sed ligula purus, sodales quis arcu sit amet, tempor dignissim velit. In ullamcorper lectus non rutrum bibendum. Etiam velit dolor, hendrerit vitae tristique a, semper vitae est. Vivamus elit justo, pellentesque eu auctor feugiat, ultrices vitae diam. Donec accumsan tortor nec vestibulum lobortis. Proin mattis quam nisl, sed malesuada diam volutpat a."
            badgeText="experiment"
            infoText="Read More"
            infoUrl="#"
          />
        </div>
        <div style={{ display: "flex", padding: "1rem" }}>
          <CardPrimary
            title="Card title"
            icon="building"
            description="This is a card description"
            infoText="Read More"
            infoUrl="#"
            style={{ display: "flex", width: "100%" }}
          />

          <CardPrimary
            title="Card title"
            icon="building"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut sagittis neque. Quisque ut nunc tortor. Donec ut faucibus neque. In vel suscipit nunc. Praesent odio velit, sollicitudin ac tempor a, varius vitae turpis. Donec mauris risus, dapibus a justo eu, ultricies ullamcorper lacus. Sed ligula purus, sodales quis arcu sit amet, tempor dignissim velit. In ullamcorper lectus non rutrum bibendum. Etiam velit dolor, hendrerit vitae tristique a, semper vitae est. Vivamus elit justo, pellentesque eu auctor feugiat, ultrices vitae diam. Donec accumsan tortor nec vestibulum lobortis. Proin mattis quam nisl, sed malesuada diam volutpat a."
            infoText="Read More"
            infoUrl="#"
            style={{ display: "flex", width: "100%" }}
          />
        </div>
        <ButtonGroup
          options={[
            { label: "Left center", value: "leftEnd" },
            { label: "Center", value: "center1" },
            { label: "Center", value: "center2" },
            { label: "Center", value: "center3" },
            { label: "Right end", value: "rightEnd" },
          ]}
          selected={selectedButton}
          onClick={setSelectedButton}
        />
        <Switch
          checked={checked}
          disabled={disabled}
          onCheckedChange={setChecked}
        />
        <div style={{ color: "white" }}>disabled: {`${disabled}`}</div>
        <button
          onClick={() => {
            document.body.style.backgroundColor = "black";
            setCurrentTheme("dark");
          }}
        >
          Dark
        </button>
        <button
          onClick={() => {
            document.body.style.backgroundColor = "white";
            setCurrentTheme("light");
          }}
        >
          Light
        </button>
        <button
          onClick={() => {
            document.body.style.backgroundColor = "white";
            setCurrentTheme("classic");
          }}
        >
          Classic
        </button>

        <Button
          type="primary"
          onClick={() => alert("you clicked on the primary button")}
        >
          Primary
        </Button>
        <Button
          type="secondary"
          onClick={() => alert("you clicked on the secondary button")}
        >
          Secondary
        </Button>
        <Icon name="users" />
        <Icon name="in" />
        <Icon name="gcp" />
        <Accordion title="Accordion">I'm some content </Accordion>
        <SidebarNavigationItem
          icon="user"
          label={<a href="/color"> link to color</a>}
        />
        <SidebarCollapsibleItem
          icon="user"
          label="collapsible item"
          onOpenChange={(open: boolean) => console.log(open)}
        >
          <a href="/color"> link to color</a>
        </SidebarCollapsibleItem>
        <Checkbox label="accept terms and conditions of this page" />
        <Tabs
          defaultValue="tab1"
          onValueChange={e => console.log(e)}
        >
          <Tabs.TriggersList>
            <Tabs.Trigger value="tab1">tab1 </Tabs.Trigger>
            <Tabs.Trigger value="tab2">tab2 </Tabs.Trigger>
            <Tabs.Trigger value="tab3">tab3 </Tabs.Trigger>
          </Tabs.TriggersList>
          <Tabs.Content value="tab1">Tab 1 content</Tabs.Content>
          <Tabs.Content value="tab2">Tab 2 content</Tabs.Content>
          <Tabs.Content value="tab3">Tab 3 content</Tabs.Content>
        </Tabs>
        <Alert
          text="An example of alert"
          title="Title"
        />
        <DangerAlert
          text="An example of alert"
          title="Title"
        />
        <WarningAlert
          text="An example of alert"
          title="Title"
        />

        <Spacer />
        <InfoAlert
          text="An example of alert"
          title="Title"
        />
        <SuccessAlert
          text="An example of alert"
          title="Title"
        />
        <Avatar text="CH" />

        <Button onClick={() => setOpen(true)}>Open Dialog (controlled)</Button>
        <Dialog
          open={open}
          onOpenChange={setOpen}
          modal={true}
        >
          <Dialog.Content
            title="Hello"
            showClose
            onClose={() => setOpen(false)}
          >
            <p>I'm a dialog</p>
          </Dialog.Content>
        </Dialog>

        <ConfirmationDialog
          title="Confirmation Dialog Example"
          message="This is a simple dialog that will be reused across the application"
          onPrimaryActionClick={() => {
            console.log("close");
          }}
        >
          <Button>Open Confirmation Dialog</Button>
        </ConfirmationDialog>

        <EllipsisContent
          component={Text}
          color="muted"
          style={{ width: 100 }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod dolor
          vehicula tortor condimentum blandit. Quisque eget efficitur nisi, sit amet
          facilisis felis. Sed malesuada ut dui vel hendrerit. Nulla at neque libero. Ut
          id fringilla nisl. Nulla semper a sem a molestie. Vestibulum consequat feugiat
          magna, vitae pellentesque lacus gravida non. Vestibulum bibendum gravida felis
          ac elementum. In suscipit risus a sollicitudin molestie. Ut id cursus felis, vel
          auctor ex. Cras vel metus ipsum. Sed finibus, ligula ut convallis maximus,
          turpis ex imperdiet enim, ac finibus nunc ante non est. Ut mattis ex magna, ac
          faucibus mi egestas interdum.
        </EllipsisContent>
        <EllipsisContent
          component="span"
          style={{ width: 100 }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod dolor
          vehicula tortor condimentum blandit. Quisque eget efficitur nisi, sit amet
          facilisis felis. Sed malesuada ut dui vel hendrerit. Nulla at neque libero. Ut
          id fringilla nisl. Nulla semper a sem a molestie. Vestibulum consequat feugiat
          magna, vitae pellentesque lacus gravida non. Vestibulum bibendum gravida felis
          ac elementum. In suscipit risus a sollicitudin molestie. Ut id cursus felis, vel
          auctor ex. Cras vel metus ipsum. Sed finibus, ligula ut convallis maximus,
          turpis ex imperdiet enim, ac finibus nunc ante non est. Ut mattis ex magna, ac
          faucibus mi egestas interdum.
        </EllipsisContent>
      </ClickUIProvider>
      <Table
        headers={headers}
        rows={rows}
        onDelete={onTableDelete}
      />
    </div>
  );
};

export default App;
