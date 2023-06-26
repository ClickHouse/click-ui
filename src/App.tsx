import { useState } from "react";

import "@/styles/globals.css";
import "./styles/variables.css";
import "./styles/variables.dark.css";
import styles from "./App.module.css";
import { ThemeName, ThemeProvider } from "./theme";
import {
  Accordion,
  Badge,
  Button,
  ButtonGroup,
  Card,
  Icon,
  IconButton,
  ProfileIcon,
  Switch,
  TextFieldLabel,
} from "@/components";
import { SidebarNavigationItem } from "@/components/SidebarNavigationItem/SidebarNavigationItem";

const App = () => {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>("dark");
  const [selectedButton, setSelectedButton] = useState(0);
  const [checked, setChecked] = useState(false);
  const [disabled] = useState(false);

  return (
    <ThemeProvider theme={currentTheme}>
      <TextFieldLabel state="default" text="my label" />
      <TextFieldLabel state="active" text="my label" />
      <TextFieldLabel state="disabled" text="my label" />
      <TextFieldLabel state="error" text="my label" />
      <div className={styles.flexWrap}>
        <IconButton size="small">
          <ProfileIcon />
        </IconButton>
        <IconButton size="small" state="active">
          <ProfileIcon />
        </IconButton>
        <IconButton size="small" disabled>
          <ProfileIcon />
        </IconButton>
      </div>
      <div className={styles.flexWrap}>
        <IconButton>
          <ProfileIcon />
        </IconButton>
        <IconButton state="active">
          <ProfileIcon />
        </IconButton>
        <IconButton disabled>
          <ProfileIcon />
        </IconButton>
      </div>
      <div className={styles.flexWrap}>
        <IconButton display="empty">
          <ProfileIcon />
        </IconButton>
        <IconButton display="empty" state="active">
          <ProfileIcon />
        </IconButton>
        <IconButton display="empty" disabled>
          <ProfileIcon />
        </IconButton>
      </div>
      <div className={styles.flexWrap}>
        <Badge text={"default"}></Badge>
        <Badge text={"success"} state={"success"}></Badge>
        <Badge text={"neutral"} state={"neutral"}></Badge>
        <Badge text={"danger"} state={"danger"}></Badge>
        <Badge text={"disabled"} state={"disabled"}></Badge>
      </div>
      <Card
        title="Card title"
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
    </ThemeProvider>
  );
};

export default App;
