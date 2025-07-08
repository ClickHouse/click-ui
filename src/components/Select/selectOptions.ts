import { SelectOptionListItem } from "./common/types";

export const selectOptions: Array<SelectOptionListItem> = [
  {
    heading: "Group label",
    options: [
      {
        icon: "user",
        iconDir: "start",
        value: "content0",
        label: "Content0",
      },
    ],
  },
  {
    value: "content1",
    label: "Content1 long text content",
  },
  {
    value: "content2",
    label: "Content2",
    description: "Description of a disabled item",
    disabled: true,
  },
  {
    value: "content3",
    label: "Content3",
    description: "Description of Content3",
  },
  {
    value: "content4",
    label: "Content4",
  },
];

export const selectOptionsLong: Array<SelectOptionListItem> = [
  {
    value: "1",
    label:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    value: "2",
    label:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    value: "3",
    label:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    value: "4",
    label:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];
