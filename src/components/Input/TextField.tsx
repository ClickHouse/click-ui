import {
  ChangeEvent,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  useId,
  useRef,
} from "react";
import { Icon } from "@/components/Icon/Icon";
import {
  IconButton,
  InputElement,
  InputEndContent,
  InputStartContent,
  InputWrapper,
  WrapperProps,
} from "./InputWrapper";
import { mergeRefs } from "@/utils/mergeRefs";

export interface TextFieldProps
  extends
    Omit<WrapperProps, "id" | "children">,
    Omit<
      InputHTMLAttributes<HTMLInputElement>,
      "children" | "type" | "value" | "onChange" | "dir"
    > {
  /** The input type - text, email, tel, or url */
  type?: "text" | "email" | "tel" | "url";
  /** Whether to show a loading spinner */
  loading?: boolean;
  /** Custom color for the label */
  labelColor?: string;
  /** The current value of the input */
  value?: string;
  /** Whether to show a clear button when the input has content */
  clear?: boolean;
  /** Callback when the input value changes */
  onChange: (inputValue: string, e?: ChangeEvent<HTMLInputElement>) => void;
  /** The orientation of the label relative to the input */
  orientation?: "vertical" | "horizontal";
  /** The direction/position of the label - start places label before, end places label after */
  dir?: "start" | "end";
  /** Additional content to the left of the control */
  startContent?: ReactNode;
  /** Additional content to the right of the control */
  endContent?: ReactNode;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      clear,
      type,
      disabled,
      label,
      labelColor,
      error,
      id,
      loading,
      value = "",
      onChange: onChangeProp,
      orientation,
      dir,
      startContent,
      endContent,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const defaultId = useId();
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChangeProp(e.target.value, e);
    };
    const clearInput = () => {
      onChangeProp("");
    };

    const handleStartContentClick: React.MouseEventHandler<HTMLDivElement> = () => {
      inputRef.current?.focus();
    };

    const hasStartContent = Boolean(startContent);

    const hasClear = clear && value.length > 0;
    const hasEndContent = Boolean(hasClear || loading || endContent);

    return (
      <InputWrapper
        disabled={disabled}
        id={id ?? defaultId}
        label={label}
        labelColor={labelColor}
        error={error}
        orientation={orientation}
        dir={dir}
      >
        {startContent && (
          <InputStartContent onClick={handleStartContentClick}>
            {startContent}
          </InputStartContent>
        )}

        <InputElement
          $hasStartContent={hasStartContent}
          $hasEndContent={hasEndContent}
          ref={mergeRefs([inputRef, ref])}
          type={type}
          id={id ?? defaultId}
          disabled={disabled}
          value={value}
          onChange={onChange}
          {...props}
        />

        {hasEndContent && (
          <InputEndContent>
            {endContent ? endContent : null}
            {hasClear && (
              <IconButton
                disabled={disabled}
                onClick={clearInput}
                aria-label="clear input"
                data-testid="textfield-clear"
              >
                <Icon
                  name="cross"
                  size="sm"
                />
              </IconButton>
            )}
            {loading && (
              <Icon
                name="loading-animated"
                size="sm"
              />
            )}
          </InputEndContent>
        )}
      </InputWrapper>
    );
  }
);
