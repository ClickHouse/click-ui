import { useState } from "react";

import "@/styles/globals.css";
import "./styles/variables.css";
import "./styles/variables.dark.css";

import styles from "./App.module.css";
import { ThemeName, ThemeProvider } from "./theme";
import {
  Accordion,
  Alert,
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  CardSecondary,
  Checkbox,
  DangerAlert,
  Icon,
  IconButton,
  InfoAlert,
  ProfileIcon,
  SidebarNavigationItem,
  Spacer,
  SuccessAlert,
  Switch,
  Tabs,
  WarningAlert,
} from "@/components";

const App = () => {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>("dark");
  const [selectedButton, setSelectedButton] = useState(0);
  const [checked, setChecked] = useState(false);
  const [disabled] = useState(false);

  return (
    <ThemeProvider theme={currentTheme}>
      <div className={styles.flexWrap}>
        <IconButton
          icon="user"
          size="small"
          onClick={() => console.log("click")}
        />
        <IconButton
          icon="user"
          size="small"
          onClick={() => console.log("click")}
        />
        <IconButton
          icon="user"
          size="small"
          disabled
          onClick={() => console.log("click")}
        />
      </div>
      <div className={styles.flexWrap}>
        <IconButton icon="user" onClick={() => console.log("click")} />
        <IconButton icon="user" onClick={() => console.log("click")} />
        <IconButton disabled icon="user" onClick={() => console.log("click")} />
      </div>
      <div className={styles.flexWrap}>
        <IconButton
          display="empty"
          icon="user"
          onClick={() => console.log("click")}
        />
        <IconButton
          display="empty"
          icon="user"
          onClick={() => console.log("click")}
        />
        <IconButton
          display="empty"
          disabled
          icon="user"
          onClick={() => console.log("click")}
        />
      </div>
      <div className={styles.flexWrap}>
        <Badge text={"default"}></Badge>
        <Badge text={"success"} state={"success"}></Badge>
        <Badge text={"neutral"} state={"neutral"}></Badge>
        <Badge text={"danger"} state={"danger"}></Badge>
        <Badge text={"disabled"} state={"disabled"}></Badge>
      </div>
      <CardSecondary
        title="Card title"
        image="building"
        description="This is a card description"
        badgeText="experiment"
        infoText="Read More"
        infoUrl="#"
      />

      <ButtonGroup
        labels={["Left center", "Center", "Center", "Center", "Right end"]}
        activeIndex={selectedButton}
        onClick={(index: number) => setSelectedButton(index)}
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
      <Accordion title="Accordion">I'm some content </Accordion>
      <SidebarNavigationItem icon="user">
        <a href="/color"> link to color</a>
      </SidebarNavigationItem>
      <SidebarNavigationItem icon="user" collapsible label="collapsible item">
        <a href="/color"> link to color</a>
      </SidebarNavigationItem>
      <Checkbox
        label="accept terms and conditions of this page"
      />
      <Tabs defaultValue="tab1" onValueChange={e => console.log(e)}>
        <Tabs.TriggersList>
          <Tabs.Trigger value="tab1">tab1 </Tabs.Trigger>
          <Tabs.Trigger value="tab2">tab2 </Tabs.Trigger>
          <Tabs.Trigger value="tab3">tab3 </Tabs.Trigger>
        </Tabs.TriggersList>
        <Tabs.Content value="tab1">Tab 1 content</Tabs.Content>
        <Tabs.Content value="tab2">Tab 2 content</Tabs.Content>
        <Tabs.Content value="tab3">Tab 3 content</Tabs.Content>
      </Tabs>
      <Alert text="An example of alert" title="Title" />
      <DangerAlert text="An example of alert" title="Title" />
      <WarningAlert text="An example of alert" title="Title" />
      
      <Spacer />
      <InfoAlert text="An example of alert" title="Title" />
      <SuccessAlert text="An example of alert" title="Title" />
      <Avatar text="CH" />
    </ThemeProvider>
  );
};

export default App;
