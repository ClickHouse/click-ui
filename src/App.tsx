import { useState } from 'react'

import "@/styles/globals.css";
import "./styles/variables.css";
import "./styles/variables.dark.css";

import styles from './App.module.css'

import { Theme } from './styles/types';
import classicTheme from "./styles/variables.classic.json"
import darkTheme from "./styles/variables.dark.json"
import lightTheme from "./styles/variables.light.json"
import theme from "./styles/variables.json"

import { DefaultTheme, ThemeProvider } from "styled-components";
import { merge } from 'lodash';
import { Badge, ButtonGroup, Card, TextFieldLabel } from './components';
import IconButton from './components/IconButton';
import ProfileIcon from './components/icons/ProfileIcon';
import Switch from './components/Switch';

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}

const themes: Record<string, DefaultTheme> = {
  dark: merge({}, theme, darkTheme),
  light: merge({}, theme, lightTheme),
  classic: merge({}, theme, classicTheme),
}

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}

function App() {
  const [currentTheme, setCurrentTheme] = useState('dark')
  const [count, setCount] = useState(0)
  const [selectedButton, setSelectedButton] = useState(0)
  const [checked, setChecked] = useState(false)
  const [disabled, setDisabled] = useState(false)

  return (
    <ThemeProvider theme={themes[currentTheme]}>
      <TextFieldLabel state='default' text='my label' />
      <TextFieldLabel state='active' text='my label' />
      <TextFieldLabel state='disabled' text='my label' />
      <TextFieldLabel state='error' text='my label' />
      <div className={styles.flexWrap}>
        <IconButton size='small'>
          <ProfileIcon />
        </IconButton>
        <IconButton size='small' state='active'>
          <ProfileIcon />
        </IconButton>
        <IconButton size='small' disabled>
          <ProfileIcon />
        </IconButton>
      </div>
      <div className={styles.flexWrap}>
        <IconButton>
          <ProfileIcon />
        </IconButton>
        <IconButton state='active'>
          <ProfileIcon />
        </IconButton>
        <IconButton disabled>
          <ProfileIcon />
        </IconButton>
      </div>
      <div className={styles.flexWrap}>
        <IconButton display='empty'>
          <ProfileIcon />
        </IconButton>
        <IconButton display='empty' state='active'>
          <ProfileIcon />
        </IconButton>
        <IconButton display='empty' disabled>
          <ProfileIcon />
        </IconButton>
      </div>
      <div className={styles.flexWrap}>
        <Badge text={'default'}></Badge>
        <Badge text={'success'} state={'success'}></Badge>
        <Badge text={'neutral'} state={'neutral'}></Badge>
        <Badge text={'danger'} state={'danger'}></Badge>
        <Badge text={'disabled'} state={'disabled'}></Badge>
      </div>
      <Card
        title='Card title'
        description='This is a card description'
        badgeText='experiment'
        infoText='Read More'
        infoUrl='#'
      />

      <ButtonGroup
        labels={["Left center", "Center", "Center", "Center", "Right end"]}
        activeIndex={selectedButton}
        onClick={(index: number) => setSelectedButton(index)}
      />
      <Switch checked={checked} disabled={disabled} onCheckedChange={setChecked} />
    </ThemeProvider>
  )
}

export default App
