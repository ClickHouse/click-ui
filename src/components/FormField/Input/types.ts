import { HTMLAttributes, ReactNode } from "react";

export interface CommonProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  clear?: boolean;
  label: ReactNode;
  error?: ReactNode;
  disabled?: boolean;
  placeholder?: string;
  form?: string;
  alt?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  dir?: string;
  name?: string;
  readOnly?: boolean;
  required?: boolean;
  loading?: boolean;
}

export interface TextInput extends CommonProps {
  type?: "text" | "email" | "tel" | "url";
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  size: number;
  min: never;
  max: never;
  step: never;
}

export interface PasswordInputProps extends Omit<TextInput, "type"> {
  type?: "password";
}

export interface NumberInput extends CommonProps {
  type: "number";
  min?: string;
  max?: string;
  step?: string;
  minLength: never;
  maxLength?: never;
  pattern: never;
  size: never;
}

export type InputProps = TextInput | NumberInput;
