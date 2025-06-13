import { SelectOptionListItem } from "./common/types";

export const selectOptions: Array<SelectOptionListItem> = [
  {
    heading: "Group label",
    options: [
      {
        icon: "user",
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
