# Converting SVG to React components

This guide explains how to add new SVG logos to the Click UI component library using the automated conversion tool.

> [!NOTE]
> At time of writing the convertion is only supported for logos. Support for both SVG icon and logo convertions will come in future versions.

## Prerequisites

Before adding a logo, make sure that:

- You export from Figma at 64x64 pixels
- You know where the file is located or stored in your file system

## Quick Start

Let's assume that you are a macOS user and have stored the SVG file in your home **Downloads** directory, e.g. **/Users/MyUsername/Downloads**.

In the root of Click UI repository, you'd run:

```sh
yarn convert:logo ~/Downloads/click-ui.svg
```
The component name is auto-detected from filename (converted to PascalCase), e.g. `my-logo.svg` becomes `MyLogo.tsx` and `aws-s3.svg` becomes `AwsS3.tsx`.

You can override the name by providing as a second argument.

To test, start [storybook](/README.md#storybook) and open the logo playground [here](http://localhost:6006/?path=/story/display-logo--playground).

Once happy, commit your work following our [contribution guideline](/README.md#contributing).

## Naming conventions

The auto-converter has to respect naming conventions to reduce the need for configuration on the user side.

Names use only letters, numbers, hyphens, or underscores.

For example, given a convertion of a filename, it converts underscores to dashes, e.g. AWS_ATHENA becomes 'aws-athena' and Azure_Blog_Storage becomes 'azure-blog-storage'.

> [!WARNING]
> If you decide to rename a Logo filename, the converter will follow the naming convention rules. It might cause breaking changes on the consumer side, e.g. let's say that you rename src/components/Logos/AWS_S3.tsx to AWSS3.tsx, it'll cause it to be accessible as 'awss3' not 'aws-s3'.

> [!NOTE]
> If you need to override names, e.g. you have renamed a logo but would like to keep retro support, you must define the previous name mapped onto the new name it in the [src/components/Logos/system/Logo.tsx](./src/components/Logos/system/Logo.tsx).

## Naming components (optional)

Override the auto-detected name by providing it as the second argument:

```sh
yarn convert:logo ~/Downloads/click-ui.svg CustomClickUILogo
```

It'll create `src/components/Logos/CustomClickUILogo.tsx`.

As introduced in [naming conventions](#naming-conventions), the names must start with uppercase and use only letters, numbers, hyphens, or underscores.

```sh
yarn convert:logo ~/Downloads/clickhouse.svg Clickhouse-Logo
```

It'd create `src/components/Logos/Clickhouse_logo.tsx`.

## How does it work?

When you run the conversion command:

- It uses [React SVGR](https://react-svgr.com) to transform your target SVG file to React
- Assigns a custom prop type, e.g. `LogoThemeProps`
- Sets default dimensions, e.g. `64w x 64h` in pixels
- Updates the exportables LogosLight and LogosDark
- Updates the typescript types with the aditional component name
- Lints and formats the component automatically

> [!IMPORTANT]
> The exports registry LogosLight and LogosDark will change in the next versions.

## How to test?

After conversion:

- Check the generated component in `src/components/Logos/`
- Verify the logo appears in Storybook
- Test both light and dark themes (switch theme in Storybook)
- Ensure the logo key appears in type hints when using the `Logo` component

For example, start [storybook](/README.md#storybook) and open the logo playground [here](http://localhost:6006/?path=/story/display-logo--playground).

## How to create a theme based logo variant?

You can create theme based logos by providing a base component, customise the property you want computed based in theme prop, e.g. `fill={theme === 'dark' ? '#FFFFFF' : '#000000' }`.

Here's an example for `XYZ.tsx`:

```tsx
/* eslint-disable react-refresh/only-export-components */

import { LogoThemeProps } from './system/types';
import { SVGAttributes } from 'react';

const XYZBase = ({ theme, ...props }: LogoThemeProps) => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill={theme === 'dark' ? '#FFFFFF' : '#000E9C'}
        fillRule="evenodd"
        d="M57.854 16.272a30.784 30.784 0 0 1-2.868 34.145H38.528l5.065-8.957h-6.7l7.898-13.915h6.738l6.325-11.258v-.015ZM25.358 50.417H8.58A30.399 30.399 0 0 1 1.72 31.183a30.4 30.4 0 0 1 3.954-14.986l10.882 18.901L28.55 14.207h17.652L25.366 50.402l-.008.015Z"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path
          fill="#fff"
          d="M1.719 14.207h60v36.21h-60z"
        />
      </clipPath>
    </defs>
  </svg>
);

const XYZDark = (props: SVGAttributes<SVGElement>) => (
  <XYZBase
    theme="dark"
    {...props}
  />
);

const XYZLight = (props: SVGAttributes<SVGElement>) => (
  <XYZBase
    theme="light"
    {...props}
  />
);

export const XYZ = ({ theme, ...props }: LogoThemeProps) => {
  if (theme === 'dark') {return <XYZDark {...props} />;}

  return <XYZLight {...props} />;
}

export default XYZ;
```

You'd have to update the exportables registries, e.g. [LogosLight](../src/components/Logos/system/LogosLight.ts) and [LogosDark](../src/components/Logos/system/LogosDark.ts).

Given our `XYZ.tsx` example, we'd have have it in the [LogosLight](../src/components/Logos/system/LogosLight.ts) as:

```tsx
import { XYZLight as XYZ } from '../XYZ';

const LogosLight: Record<
  LogoName,
  (props: SVGAttributes<SVGElement>) => React.JSX.Element
> = {
  alloydb: AlloyDB,
  airbyte: Airbyte,
  aws: AWSLight,
  xyz: XYZ,
  ...
}

export default LogosLight;
```

> [!NOTE]
> We use `...` to keep it short (omit information), you don't have to type it.

> [!IMPORTANT]
> You MUST update both Logo [LogosLight](../src/components/Logos/system/LogosLight.ts) and [LogosDark](../src/components/Logos/system/LogosDark.ts). Bear in mind that this registry setup, need for two separate files, will likely change in the next versions.

## File structure

```sh
src/components/Logos/
├── system/
│   ├── types.ts          # LogoName union (auto-generated)
│   ├── Logo.tsx          # Main Logo component
│   ├── LogosLight.ts     # Light theme registry
│   └── LogosDark.ts      # Dark theme registry
├── YourNewLKogo.tsx       # Your new logo
└── ... (other logos)
```

## Removing logos

Delete the file from `src/components/Logos`.

Remove the logo references from:

- [LogosLight](../src/components/Logos/system/LogosLight.ts)
- [LogosDark](../src/components/Logos/system/LogosDark.ts)
- [Types](../src/components/Logos/system/types.ts)

Once complete, commit your changes!

## Custom SVGR Configuration

The conversion uses [.svgrrc.mjs](/.svgrrc.mjs) for configuration.

Modify this file to change:
- SVG optimization settings
- Component template
- Output format

To learn more read the documentation at [React SVGR website](https://react-svgr.com/docs/configuration-files/#svgr).
