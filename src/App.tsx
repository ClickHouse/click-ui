import { useRef, useState } from "react";

import "@/styles/globals.css";

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
  Panel,
  Tabs,
  WarningAlert,
  CardPrimary,
  Flyout,
  Select,
  Text,
  EllipsisContent,
  Table,
  TableRowType,
  TableHeaderType,
  Title,
  Tooltip,
  Container,
  InlineCodeBlock,
  GridContainer,
  TextField,
  Label,
  createToast,
  ToastProvider,
  Toast,
} from "@/components";
import { Dialog } from "@/components/Dialog/Dialog";
import { ConfirmationDialog } from "@/components/ConfirmationDialog/ConfirmationDialog";
import { ProgressBar } from "./components/ProgressBar/ProgressBar";
import GridExample from "./examples/GridExample";
import MultiAccordionDemo from "./components/MultiAccordion/MultiAccordionDemo";
import { styled } from "styled-components";

const BackgroundWrapper = styled.div`
  background: ${({ theme }) => theme.global.color.background.default};
  padding: 6rem;
`;
const headers: Array<TableHeaderType> = [
  { label: "Company", isSortable: true, sortDir: "asc" },
  { label: "Contact", isSortable: true, sortDir: "desc", sortPosition: "start" },
  { label: "Country" },
];

const App = () => {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>("dark");
  const [selectedButton, setSelectedButton] = useState("center1");
  const [checked, setChecked] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
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
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const onTableDelete = (row: TableRowType, index: number) => {
    setRows(rows => {
      rows[index] = row;
      return [...rows];
    });
  };
  return (
    <ClickUIProvider
      theme={currentTheme}
      config={{ tooltip: { delayDuration: 0 } }}
    >
      <Switch
        checked={theme === 'dark'}
        onClick={toggleTheme}
        label="toggle theme"
      />
      <Button
        onClick={() => {
          createToast({
            title: "Toast Title",
            description: "This is a toast description",
            type: "success",
            actions: [
              {
                label: "Action 1",
                altText: "Action 1 Alt Text",
                onClick: () => console.log("Action 1 clicked"),
                type: "secondary",
              },
              {
                label: "Action 2",
                altText: "Action 2 Alt Text",
                onClick: () => console.log("Action 2 clicked"),
                type: "secondary",
              },
            ],
          });
        }}
      >
        Show Normal Toast
      </Button>
      <ToastProvider align="start">
        <Button
          onClick={() => {
            createToast({
              title: "Toast Title with Align Start",
              description: "This is a toast description   with align start",
              type: "success",
              actions: [
                {
                  label: "Action 1",
                  altText: "Action 1 Alt Text",
                  onClick: () => console.log("Action 1 clicked"),
                },
                {
                  label: "Action 2",
                  altText: "Action 2 Alt Text",
                  onClick: () => console.log("Action 2 clicked"),
                },
              ],
              align: "start",
            });
          }}
        >
          Show Toast with Align Start
        </Button>
        <Toast
          onClose={() => console.log("Toast closed")}
          title="Toast Title with Align Start without Button"
          duration={5000}
          description="This is a toast description   with align start"
          type="success"
          actions={[
            {
              label: "Action 1",
              altText: "Action 1 Alt Text",
              onClick: () => console.log("Action 1 clicked"),
              type: "primary",
            },
            {
              label: "Action 2",
              altText: "Action 2 Alt Text",
              onClick: () => console.log("Action 2 clicked"),
              type: "secondary",
            },
          ]}
        />
      </ToastProvider>
      <BackgroundWrapper>
        <ProgressBar
          progress={100}
          dismissable
          onCancel={() => console.log("eee")}
          successMessage="Upload Complete"
        />
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
        <Container>
          <CardSecondary
            title="Card title"
            icon="building"
            iconUrl="https://upload.wikimedia.org/wikipedia/sco/3/3c/Cardiff_City_crest.svg"
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
        </Container>
        <Spacer size="xl" />
        <Container
          alignItems="start"
          gap="lg"
        >
          <CardPrimary
            title="Card title"
            size="sm"
            icon="building"
            description="This is a card description"
            infoText="Read More"
            infoUrl="#"
          />
          <CardPrimary
            title="Card title"
            icon="building"
            iconUrl="https://upload.wikimedia.org/wikipedia/sco/3/3c/Cardiff_City_crest.svg"
            description="This is a card description"
            infoText="Read More"
            infoUrl="#"
            topBadgeText="Top badge"
          />
          <CardPrimary
            title="Card title"
            icon="building"
            description="This is a card description"
            infoText="Read More"
            infoUrl="#"
            topBadgeText="Top badge"
            isSelected={true}
          />
          <CardPrimary
            title="Card title"
            icon="building"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut sagittis neque. Quisque ut nunc tortor. Donec ut faucibus neque. In vel suscipit nunc. Praesent odio velit, sollicitudin ac tempor a, varius vitae turpis. Donec mauris risus, dapibus a justo eu, ultricies ullamcorper lacus. Sed ligula purus, sodales quis arcu sit amet, tempor dignissim velit. In ullamcorper lectus non rutrum bibendum. Etiam velit dolor, hendrerit vitae tristique a, semper vitae est. Vivamus elit justo, pellentesque eu auctor feugiat, ultrices vitae diam. Donec accumsan tortor nec vestibulum lobortis. Proin mattis quam nisl, sed malesuada diam volutpat a."
            infoText="Read More"
            infoUrl="#"
          />
        </Container>

        <Text>Same-height cards</Text>
        <Container
          alignItems="stretch"
          gap="xl"
        >
          <CardPrimary
            title="Development"
            alignContent="center"
            icon="building"
          >
            <ul>
              <Text component="li">Designed to handle larger production workloads</Text>
              <Text component="li">Unlimited storage with 24 GB + total memory</Text>
              <Text component="li">Usage based pricing</Text>
              <Text component="li">Includes 3 availability zones</Text>
            </ul>
          </CardPrimary>
          <CardPrimary
            title="Production"
            alignContent="start"
          >
            <ul>
              <Text component="li">Designed to handle larger production workloads</Text>
              <Text component="li">Unlimited storage with 24 GB + total memory</Text>
              <Text component="li">Usage based pricing</Text>
              <Text component="li">Includes 3 availability zones</Text>
            </ul>
          </CardPrimary>
        </Container>
        <Spacer />
        <div style={{ width: "300px" }}>
          <CardPrimary
            title="Development"
            alignContent="start"
          >
            <ul>
              <Text component="li">Designed to handle larger production workloads</Text>
              <Text component="li">Unlimited storage with 24 GB + total memory</Text>
              <Text component="li">Usage based pricing</Text>
              <Text component="li">Includes 3 availability zones</Text>
            </ul>
          </CardPrimary>
        </div>

        <Spacer size="lg" />
        <Panel
          orientation="vertical"
          gap="lg"
          alignItems="start"
        >
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
            type="borderless"
          />
        </Panel>

        <Spacer size="lg" />

        <Panel>
          <Container
            orientation="vertical"
            gap="xs"
          >
            <Label>Example label</Label>
            <TextField
              onChange={inputValue => console.log(inputValue)}
              placeholder="Placeholder"
            />
          </Container>

          <Container
            orientation="vertical"
            gap="xs"
          >
            <Label>Example label</Label>
            <TextField
              onChange={inputValue => console.log(inputValue)}
              value="Value"
            />
          </Container>

          <Container
            orientation="vertical"
            gap="xs"
          >
            <Label disabled>Example label</Label>
            <TextField
              onChange={inputValue => console.log(inputValue)}
              value="Value"
              disabled
            />
          </Container>

          <Container
            orientation="vertical"
            gap="xs"
          >
            <Label disabled>Example label</Label>
            <TextField
              onChange={inputValue => console.log(inputValue)}
              placeholder="Placeholder"
              disabled
            />
          </Container>
        </Panel>
        <Spacer size="lg" />
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
        <Accordion
          title={
            <Container justifyContent="space-between">
              <div>a</div>
              <div>b</div>
            </Container>
          }
          fillWidth
        >
          I'm some content{" "}
        </Accordion>
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
            <Select
              value={"no value"}
              onSelect={(value): void => {
                alert(value);
              }}
            >
              <Select.Item value="item1">Item 1</Select.Item>
              <Select.Item value="item2">Item 2</Select.Item>
            </Select>
            <p>I'm a dialog</p>
          </Dialog.Content>
        </Dialog>

        <Button onClick={() => setConfirmationDialogOpen(true)}>
          Open Confirmation Dialog
        </Button>
        <ConfirmationDialog
          open={confirmationDialogOpen}
          onCancel={() => setConfirmationDialogOpen(false)}
          title="Confirmation Dialog Example"
          onConfirm={() => {
            console.log("close");
          }}
          showClose
        >
          <Text>This is a confirmation dialog with some content in it</Text>
          <Select options={[{ label: "1", value: "1" }]} />
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
        <Table
          headers={headers}
          rows={rows}
          onDelete={onTableDelete}
        />

        <Tooltip disabled>
          <Tooltip.Trigger>Tooltip trigger</Tooltip.Trigger>
          <Tooltip.Content>Tooltip content</Tooltip.Content>
        </Tooltip>

        <Spacer size="xxl" />

        <Container
          padding="lg"
          gap="md"
          orientation="vertical"
          alignItems="start"
        >
          <Text>
            Parent Container:
            <InlineCodeBlock>padding="none" fillWidth=true</InlineCodeBlock>
          </Text>

          <Container
            padding="none"
            fillWidth
          >
            <Container>
              <InlineCodeBlock>1. default</InlineCodeBlock>
            </Container>
            <Container>
              <InlineCodeBlock>2. default</InlineCodeBlock>
            </Container>
            <Container>
              <InlineCodeBlock>3. default</InlineCodeBlock>
            </Container>
          </Container>

          <Text>
            Parent Container:
            <InlineCodeBlock>
              padding="none" fillWidth=true justifyContent="space-between"
              isResponsive=false
            </InlineCodeBlock>
          </Text>
          <Container
            padding="none"
            fillWidth
            justifyContent="space-between"
            isResponsive={false}
          >
            <Container grow="0">
              <InlineCodeBlock>4. grow="0"</InlineCodeBlock>
            </Container>
            <Container grow="0">
              <InlineCodeBlock>5. grow="0"</InlineCodeBlock>
            </Container>
            <Container grow="0">
              <InlineCodeBlock>6. grow="0"</InlineCodeBlock>
            </Container>
          </Container>

          <Text>
            Parent Container:
            <InlineCodeBlock>fillWidth=true justifyContent="center"</InlineCodeBlock>
          </Text>

          <Container
            justifyContent="center"
            fillWidth
          >
            <Container grow="0">
              <InlineCodeBlock>7. grow="0"</InlineCodeBlock>
            </Container>
          </Container>
        </Container>

        <Spacer />
        <Title type="h2">Grid container</Title>
        <GridContainer
          gridTemplateColumns="100px 200px 1fr"
          columnGap="lg"
          rowGap="sm"
        >
          <div style={{ border: "1px solid red" }}>Child 1</div>
          <div style={{ border: "1px solid blue" }}>Child 2</div>
          <div style={{ border: "1px solid green" }}>Child 3</div>
          <div style={{ border: "1px solid red" }}>Child 4</div>
          <div style={{ border: "1px solid blue" }}>Child 5</div>
          <div style={{ border: "1px solid green" }}>Child 6</div>
        </GridContainer>
        <Spacer />
        <GridExample />
        <Spacer />
        <MultiAccordionDemo />
      </BackgroundWrapper>
    </ClickUIProvider>
  );
};

export default App;
