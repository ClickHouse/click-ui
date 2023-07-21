import { InputProps } from "./types";
import Container from "./Container";

export const Input = ({
  type = "text",
  min,
  max,
  step,
  minLength,
  maxLength,
  pattern,
  size,
  ...props
}: InputProps) => {
  if (type === "number") {
    return (
      <Container
        type="number"
        min={min}
        max={max}
        step={step}
        {...props}
      />
    );
  }
  return (
    <Container
      type={type}
      minLength={minLength}
      maxLength={maxLength}
      pattern={pattern}
      size={size}
      {...props}
    />
  );
};
