import { ChangeEvent, ChangeEventHandler } from "react";

export const mockInputChangeEvent = (
  input?: HTMLInputElement | null,
  onChange?: ChangeEventHandler<HTMLInputElement>
) => {
  if (input) {
    input.value = "";
    const event = {
      target: input,
      currentTarget: input,
      bubbles: false,
      cancelable: false,
      defaultPrevented: false,
      eventPhase: 0,
      isTrusted: false,
      preventDefault: () => null,
      stopPropagation: () => null,
      persist: () => null,
      isDefaultPrevented: () => false,
      isPropagationStopped: () => false,
      timeStamp: Date.now(),
      type: "input",
      nativeEvent: {} as Event,
    } as ChangeEvent<HTMLInputElement>;
    onChange && onChange(event);
    input.focus();
  }
};
