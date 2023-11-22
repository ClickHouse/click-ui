import { ChangeEvent, TextareaHTMLAttributes, forwardRef, useId, useRef } from "react";
import { TextAreaElement, InputWrapper, WrapperProps } from "./InputWrapper";
import { mergeRefs } from "@/utils/mergeRefs";
import styled from "styled-components";

export interface TextAreaFieldProps
  extends Omit<WrapperProps, "id" | "children">,
    Omit<
      TextareaHTMLAttributes<HTMLTextAreaElement>,
      "children" | "type" | "value" | "onChange" | "dir"
    > {
  rows?: number;
  value?: string;
  onChange: (inputValue: string, e?: ChangeEvent<HTMLTextAreaElement>) => void;
  orientation?: "vertical" | "horizontal";
  dir?: "start" | "end";
}

const TextAreaWrapper = styled(InputWrapper)`
  position: relative;
`;

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
      <TextAreaWrapper
        disabled={disabled}
        id={id ?? defaultId}
        label={label}
        error={error}
        orientation={orientation}
        dir={dir}
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
      </TextAreaWrapper>
    );
  }
);
