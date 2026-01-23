import { ChangeEvent, TextareaHTMLAttributes, forwardRef, useId, useRef } from "react";
import { TextAreaElement, InputWrapper, WrapperProps } from "./InputWrapper";
import { mergeRefs } from "@/utils/mergeRefs";

export interface TextAreaFieldProps
  extends
    Omit<WrapperProps, "id" | "children">,
    Omit<
      TextareaHTMLAttributes<HTMLTextAreaElement>,
      "children" | "type" | "value" | "onChange" | "dir"
    > {
  /** Number of visible text rows */
  rows?: number;
  /** The current value of the textarea */
  value?: string;
  /** Callback when the textarea value changes */
  onChange: (inputValue: string, e?: ChangeEvent<HTMLTextAreaElement>) => void;
  /** The orientation of the label relative to the input */
  orientation?: "vertical" | "horizontal";
  /** The direction/position of the label - start places label before, end places label after */
  dir?: "start" | "end";
}

export const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  (
    {
      rows,
      disabled,
      label,
      error,
      id,
      value = "",
      onChange: onChangeProp,
      orientation,
      dir,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const defaultId = useId();
    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      onChangeProp(e.target.value, e);
    };

    return (
      <InputWrapper
        disabled={disabled}
        id={id ?? defaultId}
        label={label}
        error={error}
        orientation={orientation}
        dir={dir}
        resize="vertical"
      >
        <TextAreaElement
          ref={mergeRefs([inputRef, ref])}
          rows={rows ?? 5}
          id={id ?? defaultId}
          disabled={disabled}
          value={value}
          onInput={onChange}
          {...props}
        />
      </InputWrapper>
    );
  }
);
