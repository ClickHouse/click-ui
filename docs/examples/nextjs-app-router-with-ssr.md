# Next.js App Router with SSR

This example demonstrates how to integrate `@clickhouse/click-ui` with Next.js 16 App Router and Server-Side Rendering (SSR).

## Quick Start

Install the package:

```sh
npm i @clickhouse/click-ui@latest
```

## Theme Provider Setup

Create a client-side theme provider that wraps your application with `ClickUIProvider`, e.g. app/ThemeProvider.tsx:

```tsx
"use client";

import { useState, type ReactNode } from "react";
import { ClickUIProvider, ThemeName, useInitialTheme } from '@clickhouse/click-ui';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { theme, mounted } = useInitialTheme({
    defaultTheme: 'light',
  });
  
  const [currentTheme, setCurrentTheme] = useState<ThemeName | null>(theme);

  if (!mounted || !currentTheme) {
    return null;
  }

  return (
    <ClickUIProvider theme={currentTheme} persistTheme>
      {children}
    </ClickUIProvider>
  );
};
```

## App Layout Configuration

Configure the root layout with `InitCUIThemeScript` in the `<head>` to prevent theme flash on initial load.

Include `suppressHydrationWarning` on `<html>` and `<body>` elements to suppress warnings caused by theme switching:

```tsx
import type { Metadata } from "next";
import { ThemeProvider } from './ThemeProvider'
import { InitCUIThemeScript } from '@clickhouse/click-ui';

export const metadata: Metadata = {
  title: "Next.js + Click UI",
  description: "SSR example with Click UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <InitCUIThemeScript defaultTheme="light" />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

> [!IMPORTANT]
> The `suppressHydrationWarning` prop is required in root html element. This suppresses React hydration mismatch warnings that occur when the server-rendered HTML differs from the client-side hydrated HTML due to theme state. This is a standard practice in component libraries like [Material UI](https://mui.com/material-ui/customization/css-theme-variables/configuration/#next-js-app-router) when dealing with theme variables.

## Switching Theme Colors

Add a theme toggle to your application:

```tsx
"use client";

import { useState, type ReactNode } from "react";
import { ClickUIProvider, Container, Switch, ThemeName, useInitialTheme } from '@clickhouse/click-ui';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { theme, mounted } = useInitialTheme({
    defaultTheme: 'light',
  });
  
  const [currentTheme, setCurrentTheme] = useState<ThemeName | null>(theme);

  if (!mounted || !currentTheme) {
    return null;
  }

  return (
    <ClickUIProvider theme={currentTheme} persistTheme>
      <Container orientation='horizontal' gap='sm' alignItems='center'>
        <Switch
          checked={currentTheme === 'dark'}
          onCheckedChange={(checked) => setCurrentTheme(checked ? 'dark' : 'light')}
          label='Dark mode'
        />
      </Container>
      {children}
    </ClickUIProvider>
  );
};
```

> [!NOTE]
> Currently, styling is done with css-in-js which might cause some flash since it has to compute the theme and apply it. We'll be moving from styled-components and this shall be changed and improved.

## Using Components

Use Click UI components in both server and client components:

```tsx
import { Button, Container, Title } from "@clickhouse/click-ui";

export default function Home() {
  return (
    <Container>
      <Title type="h1">Hello ClickHouse</Title>
      <Button type="primary" label="Get Started" />
    </Container>
  );
}
```

> [!NOTE]
> The `useInitialTheme` hook handles the initial theme state from localStorage and prevents hydration mismatches by returning `mounted: false` until the client-side effect runs. This ensures the first render matches the server output.

> [!TIP]
> Enable `persistTheme` on `ClickUIProvider` to automatically save theme changes to localStorage. The `InitCUIThemeScript` reads this value and applies it immediately before React hydration to prevent theme flashing.
