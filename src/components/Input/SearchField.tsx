import { forwardRef } from "react";

import { Icon, TextField } from "..";

import { TextFieldProps } from "./TextField";

export interface SearchFieldProps extends Omit<
  TextFieldProps,
  "type" | "startContent" | "endContent"
> {
  isFilter?: boolean;
}

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  ({ isFilter = false, clear = true, ...props }, ref) => {
    return (
      <TextField
        startContent={
          <Icon
            name={isFilter ? "filter" : "search"}
            size="sm"
          />
        }
        clear={clear}
        ref={ref}
        {...props}
      />
    );
  }
);
